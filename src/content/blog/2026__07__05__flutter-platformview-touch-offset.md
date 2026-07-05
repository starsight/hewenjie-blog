---
title: "Flutter PlatformView 点击坐标错位问题排查"
pubDate: 2025-01-05 20:42:44 +0800
description: "一次 Flutter PlatformView 嵌入原生地图后点击坐标错位的排查记录，核心问题来自 Flutter 逻辑坐标和 Android density 的转换边界。"
permalink: "/2025/01/05/flutter-platformview-touch-offset/"
categories:
  - 'Android'
tags: ["Android", "Flutter", "PlatformView", "事件分发", "问题排查"]
---

> 脱敏说明：本文根据真实问题排查笔记整理，已删除公司、业务、内部类名和截图。示例只保留 PlatformView 坐标转换相关的通用逻辑。

## 背景

某个 Flutter 页面里嵌入了 Android 原生地图组件，测试时发现 Marker 的点击响应有偏移：用户需要点击目标点偏右下的位置，才能命中真实 Marker。

地图类组件对点击精度要求很高，普通按钮偏一点可能只是手感不好，地图 Marker 偏一点就会变成完全不可用。

排查时观察到一个现象：修改 Android 开发者选项里的「最小宽度」后，偏移程度会变化。当最小宽度接近 Flutter 侧设计稿宽度时，点击偏移消失。

这说明问题大概率和坐标换算、逻辑宽度或 density 有关。

## PlatformView 的事件链路

Flutter 中嵌入 Android 原生 View，一般会经历几步：

1. Android 侧实现 `PlatformView`，通过 `getView()` 返回原生 View。
2. 实现 `PlatformViewFactory`，负责创建 PlatformView。
3. 在 FlutterPlugin 中注册 viewType。
4. Flutter 侧通过 `AndroidView` 或相关封装使用这个原生控件。

触摸事件并不是直接从 Android View 原封不动传进去。大致链路是：

- Android 接收到触摸事件。
- Flutter Engine 和 Flutter Widget 树参与命中测试。
- `AndroidView` 对应的控制器把事件再传回 Android 侧。
- Android 侧重新构造 `MotionEvent` 分发给 PlatformView。

问题就出在最后一步：Flutter 逻辑坐标传回 Android 时，需要乘以 Android 当前的 `density` 转成物理像素。如果 Flutter 页面做过固定设计宽度适配，而 Android 侧仍使用系统真实 density，就可能出现二次换算不一致。

## 问题本质

这里容易混淆三个概念：

- Android dp。
- Flutter logical pixel。
- 设备物理像素。

Flutter logical pixel 和 Android dp 很像，但不能简单认为它们永远相等。Flutter 有自己的 `devicePixelRatio`，Android 有自己的 `DisplayMetrics.density`。当 Flutter 页面为了适配设计稿宽度而改写逻辑宽度时，PlatformView 事件回传过程中如果仍按 Android 原始 density 换算，坐标就会偏。

可以把问题简化成：

```text
Flutter 侧认为：页面宽度 = 设计稿宽度
Android 侧认为：页面宽度 = 真实屏幕宽度 / 系统 density
PlatformView 回传事件时：坐标又按 Android density 转了一次
结果：点击坐标和原生 View 实际坐标不在同一个坐标系
```

于是 Marker 的视觉位置和触摸命中位置就错开了。

## 尝试一：在 PlatformView 内修正 MotionEvent

一种直接思路是在原生 View 的 `dispatchTouchEvent` 中重新构造 `MotionEvent`，把坐标从 Flutter 适配后的逻辑坐标换回真实屏幕坐标。

伪代码大致如下：

```java
@Override
public boolean dispatchTouchEvent(MotionEvent ev) {
    MotionEvent.PointerCoords[] coords = copyPointerCoords(ev);

    for (int i = 0; i < coords.length; i++) {
        coords[i].x = convertToPhysicalX(coords[i].x);
        coords[i].y = convertToPhysicalY(coords[i].y);
    }

    MotionEvent fixedEvent = MotionEvent.obtain(
        ev.getDownTime(),
        ev.getEventTime(),
        ev.getAction(),
        ev.getPointerCount(),
        copyPointerProperties(ev),
        coords,
        ev.getMetaState(),
        ev.getButtonState(),
        ev.getXPrecision(),
        ev.getYPrecision(),
        ev.getDeviceId(),
        ev.getEdgeFlags(),
        ev.getSource(),
        ev.getFlags()
    );

    try {
        return super.dispatchTouchEvent(fixedEvent);
    } finally {
        fixedEvent.recycle();
    }
}
```

这个方案能修正一部分事件，但它有一个天然限制：只有事件已经进入 PlatformView 后，才有机会修正坐标。

如果点击发生在 PlatformView 边缘，Flutter 命中测试阶段可能已经认为这个事件不属于 PlatformView，事件根本不会传进来。这时 View 内修正就无能为力。

## 尝试二：统一页面 density

另一个方向是从源头统一坐标系：进入相关 Flutter 容器页面时，把 Android Activity 的 density 调整到和 Flutter 设计宽度一致；离开页面时再恢复。

这个方案更彻底，因为 Flutter 命中测试和 Android PlatformView 收到的事件更容易落在同一套坐标系里。

但它的风险也更大：

- 影响资源选择。
- 影响字体缩放。
- 影响弹窗和键盘。
- 影响第三方 SDK。
- 横竖屏、多窗口、折叠屏场景需要额外验证。

所以它适合封装在明确的基类或容器里，并且只对经过验证的 Flutter 页面生效。

## 最后的经验

PlatformView 问题难排，是因为它跨了 Flutter、Engine、Android View、输入事件分发几层边界。只在其中一层看日志，很容易得到片面的结论。

这类问题建议按顺序确认：

1. Flutter 页面的设计宽度适配方式。
2. Android 当前 `DisplayMetrics.density`。
3. PlatformView 使用的渲染模式。
4. `MotionEvent` 到达 PlatformView 前后的坐标。
5. 边缘点击是否会被 Flutter 命中测试提前丢弃。

如果只是组件内部坐标偏移，View 内修正可能够用；如果命中测试阶段已经错了，就需要从页面 density 或 PlatformView 容器层统一处理。

## 总结

这次问题的关键不是地图，也不是 Marker，而是 Flutter logical pixel 和 Android density 在 PlatformView 边界上没有保持一致。

跨技术栈嵌入原生 View 时，最容易出问题的往往不是业务代码，而是这些看起来理所当然的坐标、生命周期和事件边界。

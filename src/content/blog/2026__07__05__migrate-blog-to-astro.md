---
title: '把旧博客迁移到 Astro 和 Vercel'
pubDate: '2026-07-05'
description: '记录一次从旧静态博客到 Astro 的迁移过程：文章抽取、路径保留、GitHub 建仓、Vercel 部署，以及中间踩到的几个小坑。'
permalink: '/2026/07/05/migrate-blog-to-astro/'
categories:
  - '2026-07'
tags:
  - '博客迁移'
  - 'Astro'
  - 'Vercel'
  - 'GitHub'
---

这次迁移的起点有点突然。

原来的博客是 `starsight.github.io`，已经是生成后的静态站点。目录里能看到 `2015`、`2016`、`2017`、`2018`、`archives`、`tags`、`categories`、`search.xml` 这些文件和目录。它还能作为静态页面存在，但已经不太适合作为继续写作和维护的工程了。

我想要一个更干净的博客工程：文章可以重新回到 Markdown 里，样式和页面结构可以自己控制，部署也尽量简单。最后选了 Astro。

## 旧站点的问题

旧目录不是源码工程，而是已经生成好的 HTML。

这意味着不能简单地找到 `_posts`，也不能直接沿用 Hexo 或 Jekyll 的源文件结构。真正有用的数据主要藏在两个地方：

- 每篇文章生成后的 `index.html`
- 站点里的 `search.xml`

一开始直接从目录里找文章页，但旧站里除了文章，还有标签页、分类页、归档页和分页页。如果直接按 `index.html` 扫描，很容易把非文章页面也迁进去。

后来改成以 `search.xml` 为入口。这个文件里已经整理好了文章标题、URL、HTML 内容、分类和标签，反而比逐个解析页面更稳定。

## 新工程的选择

这次新建了一个 Astro 项目。

Astro 适合这种偏静态的博客：构建后是普通 HTML，部署到 Vercel 也很直接。文章放在 `src/content/blog` 下，每篇文章有 frontmatter，页面通过 content collection 读取。

新工程里保留了几个基本页面：

- 首页文章列表
- 归档页
- 标签页
- 分类页
- RSS
- 文章详情页

我没有一开始就套很复杂的主题，而是先写了一个简单的布局。旧博客最重要的是文章内容和路径能保留下来，视觉可以以后再慢慢修。

## 文章迁移

迁移脚本从旧站的 `search.xml` 里读取每个 `<entry>`。

每篇文章会抽取：

- `title`
- `url`
- `content`
- `categories`
- `tags`

然后根据原始 URL 生成新的 permalink。比如旧文章：

```text
http://wenjiehe.com/2018/07/20/Flip-RecyclerView/
```

迁移后仍然保留为：

```text
/2018/07/20/Flip-RecyclerView/
```

这样做的好处是，以后如果换域名，旧文章路径仍然可以继续使用，不会把内部链接和搜索引擎记录全部打断。

这次一共迁移了 42 篇文章。

## 遇到的坑

第一个坑是旧站点的内容不在纯 Markdown 里，而是 HTML 片段。

这倒不算大问题，因为 Astro 的 Markdown 文件里可以直接放 HTML。真正的问题是脚本一开始只匹配了：

```xml
<content>...</content>
```

但旧的 `search.xml` 里实际是：

```xml
<content type="html">...</content>
```

结果第一次迁移出来的文章只有标题、日期和标签，正文全是空的。

修正匹配规则之后，正文才正常进入新的 Markdown 文件。

第二个坑是 npm 的 optional dependencies。

本地安装依赖时，`fsevents` 卡住过一次；后来跳过 optional dependencies 又导致 Rollup 的 macOS 平台包缺失。最后单独补上 `@rollup/rollup-darwin-arm64`，构建才正常。

第三个坑是 Vercel CLI。

本机全局的 Vercel CLI 版本太旧，部署时提示接口要求更高版本。最后用：

```bash
npx vercel@latest --prod --yes
```

完成了生产部署。

## GitHub 和 Vercel

新仓库建在 GitHub：

```text
starsight/hewenjie-blog
```

本地工程提交后推送到 `main` 分支。

Vercel 项目也已经创建并部署成功，当前访问地址是：

```text
https://hewenjie-blog.vercel.app
```

这里还有一个没完全收尾的点：Vercel 项目目前是通过 CLI 部署成功的，还没有正式连接 GitHub 自动部署。

原因是 Vercel 的 GitHub App 当前还看不到新建的 `hewenjie-blog` 仓库，需要额外授权这个仓库。这个不影响网站访问，只影响以后 `git push` 后是否自动部署。

## 迁移后的状态

迁移后，新博客有几个变化：

- 文章重新变成可维护的内容文件
- 图片资源统一放到 `public/images`
- 旧文章路径保留下来
- 构建命令简单清晰
- Vercel 可以直接托管

现在写新文章，只需要在 `src/content/blog` 下新增一篇 Markdown。

比如这篇迁移总结，本身就是迁移之后的第一篇新文章。

这次迁移没有做得特别“豪华”，但它先把博客从一堆生成物里救了出来。对个人博客来说，这一步很重要：不是先把样式做到多漂亮，而是重新拥有继续写下去的入口。

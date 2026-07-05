---
title: 'Raspberry Pi 3 编译opencv'
pubDate: '2016-04-30'
description: 'OpenCV的全称是：Open Source Computer Vision Library。OpenCV是一个基于（开源）发行的跨平台计算机视觉库，可以运行在Linux、Windows和Mac OS操作系统上。它轻量级而且高效——由一系列C函数和少量C++类构成，同时提供了Python、Ruby、MATLAB等语言的'
permalink: '/2016/04/30/2016-04-30-raspberry-opencv-install/'
categories: 
  - '2016-04'
tags: 
  - '树莓派'
  - '编译opencv'
---
<p>OpenCV的全称是：Open Source Computer Vision Library。OpenCV是一个基于（开源）发行的跨平台计算机视觉库，可以运行在Linux、Windows和Mac OS操作系统上。它轻量级而且高效——由一系列C函数和少量C++类构成，同时提供了Python、Ruby、MATLAB等语言的接口，实现了图像处理和计算机视觉方面的很多通用算法。</p>
<p>需要完成此次的项目，离不开opencv的支持，接下来我们就在树莓派上安装opencv。<br></p>
<p>安装OpenCV的依赖包：</p>
<figure class="highlight plain"><table><tr><td class="gutter"><pre><div class="line">1</div></pre></td><td class="code"><pre><div class="line">sudo apt-get install libqt4-dev libvtk5-qt4-dev</div></pre></td></tr></table></figure>
<p>接下来需要从OpenCV官方网站：<a href="http://opencv.org" target="_blank" rel="noopener noreferrer">http://opencv.org</a> 下载Linux版本的OpenCV的源代码：</p>
<img src="/images/opencv-install/1.jpg">
<p>我选择Linux平台下的2.4.9版本的源码包，将压缩包解压到/usr/local目录下。</p>
<p>进入opencv-2.4.9目录，新建一个build目录： </p>
<figure class="highlight plain"><table><tr><td class="gutter"><pre><div class="line">1</div></pre></td><td class="code"><pre><div class="line">sudo mkdir build</div></pre></td></tr></table></figure>
<p>先安装 cmake  </p>
<figure class="highlight plain"><table><tr><td class="gutter"><pre><div class="line">1</div></pre></td><td class="code"><pre><div class="line">sudo apt-get install cmake</div></pre></td></tr></table></figure>
<p>进入build目录，利用下面的cmake命令进行编译设置：</p>
<p>注意下python部分：</p>
<img src="/images/opencv-install/2.jpg">
<figure class="highlight plain"><table><tr><td class="gutter"><pre><div class="line">1</div></pre></td><td class="code"><pre><div class="line">cmake -D CMAKE_BUILD_TYPE=RELEASE -D ..</div></pre></td></tr></table></figure>
<p>等待检测和设置完成,就可以开始编译了:</p>
<figure class="highlight plain"><table><tr><td class="gutter"><pre><div class="line">1</div><div class="line">2</div><div class="line">3</div><div class="line">4</div></pre></td><td class="code"><pre><div class="line">sudo make</div><div class="line">sudo make install</div><div class="line">#更新搜索动态链接库</div><div class="line">sudo ldconfig</div></pre></td></tr></table></figure>
<img src="/images/opencv-install/3.jpg">
<img src="/images/opencv-install/4.jpg">
<p>在python环境下执行</p>
<figure class="highlight plain"><table><tr><td class="gutter"><pre><div class="line">1</div></pre></td><td class="code"><pre><div class="line">import cv</div></pre></td></tr></table></figure>
<p>没有报错则安装成功~</p>
<p>参考:<br><a href="http://jjliu.blog.ustc.edu.cn/198/" target="_blank" rel="noopener noreferrer">GoBian安装OpenCV2.4.10</a><br><a href="http://blog.csdn.net/xukai871105/article/details/40988101" target="_blank" rel="noopener noreferrer">树莓派学习笔记—— 源代码方式安装opencv </a>  </p>

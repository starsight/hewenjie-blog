---
title: 'Raspberry Pi 3 开箱+扩容+samba'
pubDate: '2016-04-20'
description: '昨儿树莓3到手，今天先用了下电阻屏，帖子在此 ，花了些时间，今晚重点吧树莓基础环境先搭建下。 开箱图： Pi3和微雪的屏 说明书多国语言： 正面照： 背面： 这个3的卡槽由以前的弹出式变成现在直插的，安装时候没有弹簧按压声。 安装很简单，去 http://downloads.raspberrypi.org/raspbi'
permalink: '/2016/04/20/2016-04-20-raspberry-dilatation-and-samba/'
categories:
  - '树莓派'
tags: 
  - '树莓派'
  - '扩容'
  - 'samba'
---
<p>昨儿树莓3到手，今天先用了下电阻屏，帖子在此 ，花了些时间，今晚重点吧树莓基础环境先搭建下。<br>开箱图：<br>Pi3和微雪的屏</p>
<img src="/images/samba/1.jpg"> 
<img src="/images/samba/2.jpg"> 
<p>说明书多国语言：</p>
<img src="/images/samba/3.jpg"> 
<p>正面照：</p>
<img src="/images/samba/4.jpg"> 
<p>背面：</p>
<img src="/images/samba/5.jpg"> 
<p>这个3的卡槽由以前的弹出式变成现在直插的，安装时候没有弹簧按压声。</p>
<p>安装很简单，去 <a href="http://downloads.raspberrypi.org/raspbian_latest" target="_blank" rel="noopener noreferrer">http://downloads.raspberrypi.org/raspbian_latest</a> 下载最新镜像即可，用Win32DiskImager 软件写入TF卡。</p>
<p>到显示器上显示：</p>
<img src="/images/samba/6.jpg"> 
<p>接下来扩展下TF卡:<br>树莓派有傻瓜式方法：<br><figure class="highlight plain"><table><tr><td class="gutter"><pre><div class="line">1</div></pre></td><td class="code"><pre><div class="line">sudo raspi-config</div></pre></td></tr></table></figure></p>
<p>直接修改下重启就0k了~<br>如果想自己弄可以看这篇帖子：<br><a href="http://bbs.hqchip.com/group-topic-id-35428.html" target="_blank" rel="noopener noreferrer">http://bbs.hqchip.com/group-topic-id-35428.html</a></p>
<p>扩张后如下：</p>
<img src="/images/samba/7.jpg"> 
<p>安装samba的话和Nanopi什么的大同小异</p>
<figure class="highlight plain"><table><tr><td class="gutter"><pre><div class="line">1</div><div class="line">2</div><div class="line">3</div><div class="line">4</div><div class="line">5</div><div class="line">6</div><div class="line">7</div><div class="line">8</div><div class="line">9</div><div class="line">10</div><div class="line">11</div><div class="line">12</div><div class="line">13</div><div class="line">14</div><div class="line">15</div></pre></td><td class="code"><pre><div class="line">sudo apt-get install samba</div><div class="line">sudo vi /etc/samba/smb.conf</div><div class="line"></div><div class="line">[global]</div><div class="line">        guest ok = yes</div><div class="line">        security =share</div><div class="line">[wj]</div><div class="line">        comment = User</div><div class="line">        path = /home/pi</div><div class="line">        create mask = 0777</div><div class="line">        directory mask = 0777</div><div class="line">        guest ok = yes</div><div class="line">        browseable = yes</div><div class="line"></div><div class="line">sudo smbd restart</div></pre></td></tr></table></figure>
<p>修改下权限：<br><figure class="highlight plain"><table><tr><td class="gutter"><pre><div class="line">1</div></pre></td><td class="code"><pre><div class="line">chmod -R go+rwx /home/pi</div></pre></td></tr></table></figure></p>
<p>然后查看下ip，就可以在电脑上连接啦~</p>
<img src="/images/samba/8.jpg">

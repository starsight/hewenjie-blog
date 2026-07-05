---
title: 'Raspberry Pi 3 wifi问题'
pubDate: '2016-04-21'
description: '树莓派自带wifi模块，应该说是很实用的功能，用法其实和USB wifi一样使用，但是树莓派3死活连接不上我的wifi，于是我就参照USB wifi的使用。 先用SSH登陆： 由于回宿舍，没有显示器，所以需要直接修改此文件： 按照道理说，直接点图形界面的wifi连接，输入密码就可以了，然而我的死活就是不行 尝试加入一些'
permalink: '/2016/04/21/2016-04-21-raspberry-wifi-problems/'
categories:
  - '树莓派'
tags: 
  - '树莓派'
  - 'wifi'
---
<p>树莓派自带wifi模块，应该说是很实用的功能，用法其实和USB wifi一样使用，但是树莓派3死活连接不上我的wifi，于是我就参照USB wifi的使用。<br><br>先用SSH登陆：</p>
<img src="/images/wifi/1.jpg">  
<img src="/images/wifi/2.jpg"> 
<figure class="highlight plain"><table><tr><td class="gutter"><pre><div class="line">1</div></pre></td><td class="code"><pre><div class="line">sudo vi /etc/wpa_supplicant/wpa_supplicant.conf</div></pre></td></tr></table></figure>
<p>由于回宿舍，没有显示器，所以需要直接修改此文件：<br><figure class="highlight plain"><table><tr><td class="gutter"><pre><div class="line">1</div><div class="line">2</div><div class="line">3</div><div class="line">4</div><div class="line">5</div></pre></td><td class="code"><pre><div class="line">network=&#123;</div><div class="line">        ssid=&quot;ssid&quot;</div><div class="line">        psk=&quot;password&quot;</div><div class="line">        key_mgmt=WPA-PSK</div><div class="line">&#125;</div></pre></td></tr></table></figure></p>
<p>按照道理说，直接点图形界面的wifi连接，输入密码就可以了，然而我的死活就是不行</p>
<p>尝试加入一些配置选项：<br><figure class="highlight plain"><table><tr><td class="gutter"><pre><div class="line">1</div><div class="line">2</div><div class="line">3</div></pre></td><td class="code"><pre><div class="line">proto=WAP2</div><div class="line">pairwise=TKIP</div><div class="line">group=TKIP</div></pre></td></tr></table></figure></p>
<p>依旧不行</p>
<p>于是我就换一种方法就行修改：<br><figure class="highlight plain"><table><tr><td class="gutter"><pre><div class="line">1</div><div class="line">2</div><div class="line">3</div><div class="line">4</div><div class="line">5</div></pre></td><td class="code"><pre><div class="line">sudo vim /etc/network/interfaces</div><div class="line"></div><div class="line">auto wlan0</div><div class="line">iface wlan0 inet dhcp</div><div class="line">    wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf</div></pre></td></tr></table></figure></p>
<p>依旧不行。。</p>
<p>后来</p>
<p>……</p>
<p>……</p>
<p>……</p>
<p>……</p>
<p>（这是个悲伤的故事）</p>
<p>发现路由器是斐讯的，网上有人说不支持、、不支持。。。</p>
<p>于是我试了下我手机开的热点，直接在图形化界面就连上了……</p>
<p>折腾了一天，好了，wifi算是可以用了（悲伤好大）</p>
<p>总结：wifi好不好用看路由器，TP的可以，腾达的也行，同时最好使用最新的3-18的镜像，之前版本可以有问题。</p>

---
title: 'Raspberry Pi 3 使用owncloud云服务'
pubDate: '2016-04-29'
description: '我们将要搭建自己的云系统平台，更精确的说是一个云存储系统，正如上面的产品所提供的功能。我们将使用开源软件ownCloud来搭建自己的私有云。ownCloud 起源于一个叫The KDE 云计算项目，现在已经适用于大多主流平台，它最早是KED的开发者Frank Karlitschek 创建的，现在由一个ownCloud '
permalink: '/2016/04/29/2016-04-29-raspberry-owncloud/'
categories: 
  - '2016-04'
tags: 
  - '树莓派'
  - '云服务'
  - 'owncloud'
---
<p>我们将要搭建自己的云系统平台，更精确的说是一个云存储系统，正如上面的产品所提供的功能。我们将使用开源软件ownCloud来搭建自己的私有云。ownCloud 起源于一个叫The KDE 云计算项目，现在已经适用于大多主流平台，它最早是KED的开发者Frank Karlitschek 创建的，现在由一个ownCloud team共同开发。</p>
<p>首先介绍一下ownCloud：<br>简单来说就是一个基于PHP的自建网盘。基本上是私人使用，没有用户注册功能，但是有用户添加功能，你可以无限制地添加用户，OwnCloud还提供了不少的免费应用，这些应用可以让你更好观看视频、倾听音乐等。<br></p>
<p>ownCloud 内核是用PHP5写的，支持SQLite、MySQL、Oracle以及PostgreSQL等数据库。为了简单，我们将用MySQL数据库。在你的Linux系统下你需要安装以下软件：</p>
<p>PHP 安装包：php5, php5-gd, php-xml- parser,php5-intl<br>数据库驱动：php5-mysql（如果你使用其他数据库，需要安装相应的数据库以及驱动）<br>Curl 安装包：curl, libcurl3, php5-curl<br>SMB 客户端：smbclient （这个用来挂载Windows共享文件夹的）<br>Web 服务器：apache2  </p>
<p>####一键安装：<br><figure class="highlight plain"><table><tr><td class="gutter"><pre><div class="line">1</div></pre></td><td class="code"><pre><div class="line">sudo apt-get install apache2 php5 php5-gd php-xml-parser php5-intl php5-sqlite php5-mysql smbclient curl libcurl3 php5-curl mysql-server</div></pre></td></tr></table></figure></p>
<p>从 <a href="https://owncloud.org/install/" target="_blank" rel="noopener noreferrer">https://owncloud.org/install/</a> 下载最新的ownCloud Server 对于本文，我们使用owncloud-9.0.1 版本</p>
<img src="/images/owncloud/1.jpg">
<p>对于基于Debian发行版的Linux系统，web服务器的根目录为/var/www  我实际操作过程中似乎不可用，于是我就放在了html文件夹下。</p>
<figure class="highlight plain"><table><tr><td class="gutter"><pre><div class="line">1</div><div class="line">2</div><div class="line">3</div><div class="line">4</div><div class="line">5</div></pre></td><td class="code"><pre><div class="line">cd /var/www/html  #（网页目录）</div><div class="line">tar jxf owncloud-9.0.1.tar.bz2 -C  /var/www/html   #(解压至web目录)</div><div class="line">cd /var/www/html/owncloud	 #（进入owncloud web目录）</div><div class="line">mkdir data  	#(建立数据库目录)</div><div class="line">cd data</div></pre></td></tr></table></figure>
<p>####OwnCloud在安装的过程中需要对一些目录有写的权限，为此，web服务器用户（www-data对于基于Debian的系统）必须要拥有apps、data、config目录的权限。运行以下命令完成：</p>
<figure class="highlight plain"><table><tr><td class="gutter"><pre><div class="line">1</div><div class="line">2</div><div class="line">3</div><div class="line">4</div></pre></td><td class="code"><pre><div class="line">#data 目录下</div><div class="line">sudo chown -R www-data:www-data data </div><div class="line">sudo chown -R www-data:www-data config </div><div class="line">sudo chown -R www-data:www-data apps</div></pre></td></tr></table></figure>
<p>还需要修改下配置文件：<br>（网上说法不一,有说是 /etc/apache2/sites-enabled/000-default.conf ，还有说 /etc/httpd/conf.d/owncloud.conf 不过我没找到此文件）<br><figure class="highlight plain"><table><tr><td class="gutter"><pre><div class="line">1</div></pre></td><td class="code"><pre><div class="line">sudo vi /etc/apache2/apache2.conf</div></pre></td></tr></table></figure></p>
<p>修改如下：<br><figure class="highlight plain"><table><tr><td class="gutter"><pre><div class="line">1</div><div class="line">2</div><div class="line">3</div><div class="line">4</div><div class="line">5</div></pre></td><td class="code"><pre><div class="line">&lt;Directory /var/www/&gt;</div><div class="line">        Options Indexes FollowSymLinks</div><div class="line">        AllowOverride All</div><div class="line">        Require all granted</div><div class="line">&lt;/Directory&gt;</div></pre></td></tr></table></figure></p>
<p>打开浏览器，输入<a href="http://IP/owncloud" target="_blank" rel="noopener noreferrer">http://IP/owncloud</a> </p>
<img src="/images/owncloud/2.jpg">
<p>电脑上装一下owncloud的客户端，然后操作比较简单</p>
<p>看我的同步效果：</p>
<img src="/images/owncloud/3.jpg">
<img src="/images/owncloud/4.jpg">
<img src="/images/owncloud/5.jpg">
<p>这是局域网的访问，如果没公网ip，则可用ngrok内网转发来实现外网访问。</p>
<p>参考:<br><a href="http://jjliu.blog.ustc.edu.cn/198/" target="_blank" rel="noopener noreferrer">使用OwnCloud创建私有云</a><br><a href="https://alexlee.cn/%e6%a0%91%e8%8e%93%e6%b4%beraspberry-pi%e5%ae%89%e8%a3%85owncloud%e6%90%ad%e5%bb%ba%e7%a7%81%e6%9c%89%e4%ba%91%e6%9c%8d%e5%8a%a1%e5%99%a8/" target="_blank" rel="noopener noreferrer">树莓派Raspberry Pi安装ownCloud搭建私有云服务器</a><br><a href="http://www.linuxidc.com/Linux/2013-08/89380.htm" target="_blank" rel="noopener noreferrer">Ubuntu 12.04下使用ownCloud搭建私人存储云</a><br><a href="http://www.linuxidc.com/Linux/2014-03/98757.htm" target="_blank" rel="noopener noreferrer">CentOS 6.3搭建个人私有云存储ownCloud</a>  </p>

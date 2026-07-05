---
title: 'Raspberry Pi 3 中文显示及输入+百度云传输'
pubDate: '2016-04-22'
description: '树莓派系统显示中文的话，大部分都是一个的小方块，还好我们有非常无私的开源者： 文泉驿的开源中文字体，树莓派全网唯一的开源中文字体库 能显示中文，输入也是必不可少的： 快捷键也是Ctrl+空格 然后选择第五项Internationalisation Options，change_locale，在Default local'
permalink: '/2016/04/22/2016-04-22-raspberry-baiduyun/'
categories:
  - '树莓派'
tags: 
  - '树莓派'
  - '中文显示输入'
  - '百度云'
---
<p>树莓派系统显示中文的话，大部分都是一个的小方块，还好我们有非常无私的开源者：<br><figure class="highlight plain"><table><tr><td class="gutter"><pre><div class="line">1</div></pre></td><td class="code"><pre><div class="line">sudo apt-get install ttf-wqy-zenhei</div></pre></td></tr></table></figure></p>
<p>文泉驿的开源中文字体，树莓派全网唯一的开源中文字体库</p>
<p>能显示中文，输入也是必不可少的：<br><figure class="highlight plain"><table><tr><td class="gutter"><pre><div class="line">1</div></pre></td><td class="code"><pre><div class="line">sudo apt-get install scim-pinyin</div></pre></td></tr></table></figure></p>
<p>快捷键也是Ctrl+空格<br><figure class="highlight plain"><table><tr><td class="gutter"><pre><div class="line">1</div></pre></td><td class="code"><pre><div class="line">sudo raspi-config</div></pre></td></tr></table></figure></p>
<img src="/images/baiduyun/1.jpg">  
<p>然后选择第五项Internationalisation Options，change_locale，在Default locale for the system environment:中选择zh_CN.UTF-8</p>
<p>重启就可以生效啦~</p>
<p>下面装神器：百度云~</p>
<p><a href="https://github.com/houtianze/bypy" target="_blank" rel="noopener noreferrer">https://github.com/houtianze/bypy</a><br>这是地址，把它下载到树莓派上，解压。</p>
<p>我的树莓派好多python库都装了，所以直接：<br><figure class="highlight plain"><table><tr><td class="gutter"><pre><div class="line">1</div></pre></td><td class="code"><pre><div class="line">./bypy.py info</div></pre></td></tr></table></figure></p>
<p>在浏览器中粘贴那个网址，再输入你的百度账号，<br>会得到一串授权码。</p>
<img src="/images/baiduyun/2.jpg">  
<p>粘贴到刚才的终端上：</p>
<img src="/images/baiduyun/3.jpg">  
<p>好了，至此就搞定了~</p>
<p>下面测试下：<br><figure class="highlight plain"><table><tr><td class="gutter"><pre><div class="line">1</div><div class="line">2</div><div class="line">3</div><div class="line">4</div><div class="line">5</div><div class="line">6</div><div class="line">7</div><div class="line">8</div><div class="line">9</div><div class="line">10</div><div class="line">11</div><div class="line">12</div><div class="line">13</div><div class="line">14</div><div class="line">15</div><div class="line">16</div><div class="line">17</div><div class="line">18</div><div class="line">19</div><div class="line">20</div><div class="line">21</div></pre></td><td class="code"><pre><div class="line">显示使用帮助和所有命令（英文）: </div><div class="line">bypy.py </div><div class="line"></div><div class="line">更详细的了解某一个命令： </div><div class="line">bypy.py help &lt;command&gt; </div><div class="line"></div><div class="line">显示在云盘（程序的）根目录下文件列表： </div><div class="line">bypy.py list </div><div class="line"></div><div class="line">把当前目录同步到云盘： </div><div class="line">bypy.py syncup </div><div class="line">or </div><div class="line">bypy.py upload </div><div class="line"></div><div class="line">把云盘内容同步到本地来： </div><div class="line">bypy.py syncdown </div><div class="line">or </div><div class="line">bypy.py downdir / </div><div class="line"></div><div class="line">## 比较本地当前目录和云盘（程序的）根目录（这个很有用）：## </div><div class="line">bypy.py compare</div></pre></td></tr></table></figure></p>
<p>上传下，看一下我的百度云，有了！</p>
<img src="/images/baiduyun/4.jpg"> 
<p>下载：</p>
<img src="/images/baiduyun/5.jpg">

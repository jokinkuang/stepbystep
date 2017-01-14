# stepbystep  
A jekyll theme, simple and clear, compatible with PC iPad and Phone (RWD)

## Preview
#### PC or Pad
<img style="box-shadow: 10px 10px 5px #888888;border: 1px solid black;" src="https://github.com/jokinkuang/stepbystep/raw/master/article.png"></img>
#### Mobile
<div style="box-shadow: 10px 10px 5px #888888;border: 1px solid black;">
<img style="width:50%;" src="https://github.com/jokinkuang/stepbystep/raw/master/mobile.png"></img>
<img style="width:50%;" src="https://github.com/jokinkuang/stepbystep/raw/master/mobile2.png"></img>
</div>

## Features  

1. Compatible with PC iPad and Phone (RWD)
2. Support blogger mood-talk(说说)
3. Support post subdirs as post categories  
  `_post/linux/nodejs/2016-9-1-About-Nodejs.md => linux and nodejs would merge into the post categories`
4. Support pagination
5. Support pinning posts

## What Must To Be Set!
```
title:         # your title
author:        # your name
email:         # your email
description: > # your description

domain: "http://yourdomain.github.io" # your domain

page_size: 2   # your pagination page size

duoshuo_short_name: "sbys"              # your duoshuo name xxx.duoshuo.com
duoshuo_user_uid: "6324572809590735618" # your duoshuo user uid
duoshuo_user_name: "xk"                 # your duoshuo user name

google_analytics_id: ""                 # your google analytics id
baidu_tongji_id: ""                     # your baidu tongji id
```
*NOTE* **If you do NOT set the duoshuo short name, all comments would commit to this demo site !**

## Install
assume the github username is "hello" then:  

1. create a repository named "hello.github.io"  
2. clone this repository  
  `git clone https://github.com/jokinkuang/stepbystep.git`  
3. push the whole thing to your repo "hello.github.io"  
  `git remote set-url origin https://github.com/hello/hello.github.io.git`  
  `git push origin master`  
4. browse "hello.github.io"  

> if your github username is "world" then replace upper "hello" all to "world"  

## Custom Domain  
if you want to visit "www.hello.com" instead of "hello.github.io" then:  

1. create a file named "CNAME" (the file is already exist)  
2. buy the "www.hello.com" domain  
3. add following to the "CNAME"  
  `www.hello.com`  
4. go to the Shop where your domain bought and set the Domain DNS to:  
  | prefix | record-type |      host       |  
  |   www  |   CNAME     | hello.github.io |  
5. wait a long long time  
6. browse "www.hello.com"

## Custom Your Site  
1. you need a [duoshuo](http://www.duoshuo.com) account  
2. you need a [google-analytics](https://www.google.com/analytics/) account  
3. all settings are in `_config.yml`

## Other  
whoever use this theme please add your site to the [wiki](https://github.com/jokinkuang/stepbystep/wiki)  

## Bugs
see [Release](https://github.com/jokinkuang/stepbystep/releases)

## How It works  
[English](http://www.jokinkuang.info/2016/09/03/stey-by-step-to-create-a-jekyll-theme.html)  
[ 中文 ](http://www.jokinkuang.info/2016/09/03/how-to-create-the-jekyll-theme.html)

## License  
Under The [MIT](https://tldrlegal.com/license/mit-license) License

---
layout: post
title: 一步一步创建Jekyll主题
categories: jekyll
image: jekyll.jpg
date: 2016-9-3 15:47:05
pid: 20160903-154705
pin: 10
# excerpt: ""
# you can override the settings in _config.yml here !!
---
讲述当前Jekyll站点的制作过程

{% include toc %}

## 搭建本地的Jekyll环境

因为图方便所以个人直接在Ubuntu下搭建了环境，在Mac下也几乎一样。

1. 安装ruby环境
  `sudo apt-get install ruby`
2. 安装Jekyll
  `sudo gem install jekyll`
3. 安装kramdown
  `sudo gem install kramdown`
4. 安装rouge
  `sudo gem install rouge`
5. 测试Jekyll是否安装完成
  `jekyll --version`

> 从上面可以看出，这是一套基于Ruby语言的工具集。
> **题外话：**gem install是ruby用来管理ruby工具集的工具，而npm install是nodejs用来管理js工具集的工具。

## 本地跑起来
```
jekyll new mytheme
cd mytheme
jekyll server
```
运行上面的命令，然后访问[127.0.0.1:4000](http://127.0.0.1:4000)，就能看到一个由Jekyll搭建的博客了。

## Github Pages环境本地化

上面搭建的只是Jekyll的本地环境，当push到Github Pages后环境会有所变化，为了本地看到的效果和托管在Github Pages看到的效果一致，我们最好搭建本地的Github Pages环境。

1. 升级ruby到2.0.0以上
  如果`ruby --version`查看版本低于2.0.0，那么需要升级ruby。
2. 安装ruby工具集管理工具[Bundler](http://bundler.io/)
  `sudo gem install bundler`
3. 创建Gemfile
  在上面的mytheme根目录下创建一个Gemfile文件，内容为：
  `source 'https://rubygems.org'`
  `gem 'github-pages', group::jekyll_plugins`
4. 安装Github Pages的工具集
  在Gemfile所在的目录，即Jekyll主题的根目录，执行下面的命令：
  `bundle install`
5. 跑起来
  `bundle exec jekyll serve`

如果出现`bundle exec jekyll serve`能启动，而`jekyll serve`不能启动，则删除Gemfile和Gemfile.lock重新运行`jekyll serve`即可。
更多Github Pages本地化环境搭建，可参考[github-helper-setting-up-your-github-pages-site-locally-with-jekyll](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll)

## Windows下搭建Jekyll环境
因为不少的时间在Windows平台下工作，所以后来还是搭建了Windows下的Jekyll环境。

1. 安装ruby环境
  下载[ruby for windows](http://rubyinstaller.org/downloads)，随便搜索即可，建议安装ruby2.0以上。
2. 安装完毕，设置Windows环境变量
  在我的电脑 - 属性 - 高级 - 环境变量 - 系统 - path字段，添加ruby的安装路径。比如`C:\Ruby22\bin;`，安装包有提供选项可以在安装时自动添加到path。
3. 安装Jekyll
    打开命令行，输入gem.bat (Ruby22/bin/gem.bat)，如果没有找到该命令，说明环境变量还没有生效。在命令行输入`set a = b`，然后重启命令行即可(运行set只是让命令行重新加载环境变量)。
    执行`gem install jekyll`
4. 安装bundler
    `gem install bundler`
5. 使用bundler安装github pages的依赖
    `bundle install`
6. 跑起来
    `bundle exec jekyll server`
7. 如果端口被占用
    `bundle exec jekyll server --port 5000`

### bundle install失败
bundle install出现了以下错误:

Please update your PATH to include build tools or download the DevKit
from 'http://rubyinstaller.org/downloads' and follow the instructions
at 'http://github.com/oneclick/rubyinstaller/wiki/Development-Kit'
大致意思是插件需要编译安装，而系统没有安装编译环境，只有运行环境，请按照wiki里面的步骤安装。

修复：
下载[ruby-devkit](http://rubyinstaller.org/downloads)，如果ruby是32位则下载32位的devkit，否则下载64位的。

> ruby --version可以看到是32位还是64位

安装：
详细说明在[github wiki](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit)里

1. 解压devkit到目录A
2. 进入目录A
3. 命令行下运行`ruby dk.rb init`
4. 运行`ruby dk.rb review`
5. 运行`ruby dk.rb install`
6. 如果上述步骤只有info输出而没有warning输出，则应该安装成功了
7. 测试`gem install json --platform=ruby`如果安装成功，则表示devkit安装成功
8. 如果失败，可以重装ruby和ruby-devkit，或者选择更低的ruby版本

### ruby/bin下面的bundle与bundle.bat区别

bundle是ruby脚本而bundle.bat是windows批处理文件
在windows命令行下，bundle其实执行的是bundle.bat，所以不会报错。bundle文件不会被识别为可执行文件。
在mingw命令行下(mingw/msys.bat)，bundle可以成功执行，而bundle.bat则会因为使用了windows命令而报错。

## 环境配置总结
环境的配置，简而言之，只有以下的步骤：

1. 安装ruby
2. gem install jekyll
3. gem install bundle
4. git clone https://github.com/jokinkuang/stepbystep.git
5. cd stepbystep
6. bundle install
7. bundle exec jekyll server

## 需要一个网页原型

Github Pages和Jekyll本地环境已经搭建完成，访问[127.0.0.1:4000](http://127.0.0.1:4000)也能够看到一个简单的博客，接下来就是思考自己的博客应该长哪样。

一般来说，要定制自己的博客，最好先设计出博客的网页原型，所谓网页原型即是使用html、css甚至js来完成静态的网页效果。当前博客的原型只有三个页面：`index.html`、`article.html`和`post.html`。

最后，**Jekyll模板已经跑起来了，网页原型也有了，怎么将两者结合起来呢？**在整合之前，我们需要先了解Jekyll博客系统。

## 初步认识Jekyll

### Jekyll是什么

Jekyll的描述是，将纯文本转化为静态博客网站，不需要数据库和评论功能。
其实更贴切的描述应该是这样

> Jekyll是一个静态博客系统，在服务器启动前可写，在服务器启动后只读，所以无法实现数据库和评论功能。

### 静态网页

静态网页和动态网页的区别是，静态网页无论是否访问，它就已经存在那里，并且内容已经固定不可改。所以Jekyll在每次增加文章时就已经生成对应的静态网页，而不是每次访问时动态生成的。

举个例子

> 当前Jekyll模板有一个页面：categories.html（目录和对应的文章列表页）
>
> 当新增一篇demo.md文章后，Jekyll会重新生成新的博客站点，demo.md会被转化为demo.html，而categories.html会被重新生成，内容是包含demo这篇新文章的列表。
>
> **所以**，Jekyll的页面都是在访问前就已经重新生成了，这就是静态。

### 没有数据库

如果`数据库`指的是像MySQL那种可读写的数据库，Jekyll确实没有。但是如果`数据库`指的只是存储数据的地方，Jekyll其实是有的，只不过是`只读`的。

Jekyll内的`_config.yml`配置、各种内置对象(`site`、`page`、`categories`等)、用户自定义的内容（变量、集合、文本、网页等），都可以看做是Jekyll的数据库，开发者可以访问这个数据库组织自己的页面内容，**除了可以在Jekyll构建站点时直接访问，还可以写到json格式的文件暴露出来在网页初始化时访问**。

> 但有一点要注意：Jekyll内所有可访问的变量都是`静态`的，也即是`只读`的，所以不可以重新赋值！

### 没有评论功能

Jekyll是无法写入的，所以无法支持评论功能。任何写入操作都只能借助第三方服务。

## 理解Markdown是如何工作的

这是一段markdown文本：

```markdown
## Markdown Demo

This is a `markdown` demo

> try it
```

使用markdown转换器转换后得到的html是这样的：

```html
<h2>Markdown Demo</h2>
<p>This is a <code>markdown</code> demo</p>
<blockquote>
    <p>try it</p>
</blockquote>
```

直接使用浏览器打开是这样的：

![markdown-plain][markdown-plain]

**Markdown转换结果只是单纯的html页面，关于页面的样式，需要我们自己提供css**
添加下面的css

```css
<style>
h2 {
	color: red;
}
blockquote {
	background-color: #fef3f3;
	border-left: 4px solid #d6a6a6;
	margin: 0;
}
</style>
```

为页面添加css后html是这样的：

![markdown-css][markdown-css]

总结

> Markdown解析器只是将文本转换为html，并不会为html添加默认的css样式。
> Jekyll模板里有对应的css文件用于转换后的html页面效果。
> **另外注意，不同的markdown转换器得到的html标签的属性可能不一样，有的转换器可能会在标签中加入转换器名称做标识，所以css选择器具体要以转换后的结果为准。**

比如，Markdown的TOC功能得到的列表是这样的

```html
<ul id="markdown-toc">
<li>目录</li>
</ul>
```

## 理解Highlight语法高亮是如何实现的

markdown里代码块是这样的：

```
 ```css
  <style>
 ```
```

通过rouge语法高亮引擎，得到的html内容是这样的：

```html
<div class="language-css highlighter-rouge">
  <pre class="highlight">
    <code>
      <span class="o">&lt;</span>
      <span class="nt">style</span>
      <span class="o">&gt;</span>>
    </code>
  </pre>
</div>
```

rouge语法高亮引擎附带了对应的rouge.css：

```css
.highlight {
  color: #D53FB7;
}
.highlight .o {
  color: #f92672;
}
.highlight .nt {
  color: #f92672;
}
```

**于是，页面的代码块就根据关键字、变量、字符串等有了不一样的颜色**

总结

> 语法高亮引擎的作用，只是根据代码的语言，分割出与之对应的关键字、变量、字符串等，并赋予对应的css样式，最后调整css的颜色就形成了代码高亮的效果。
> 同样，Jekyll模板里有对应的css文件用于高亮效果。

`Tips`

rouge.css导出需要执行命令，可以参考[rouge文档](https://github.com/jneen/rouge)

```shell
$ rougify foo.rb
$ rougify style monokai.sublime > rouge.css
```


## 开始制作自己的Jekyll主题

### 新建Jekyll模板
**按照上面的指引，新建一个模板，并搭建好Github Pages的本地环境：**

`jekyll new mytheme`

### 认识Jekyll模板的结构
下面是用`tree`命令输出的目录结构，只是位置进行了调整

```ruby
├── index.html
├── about.md
├── _config.yml       # Jekyll核心配置文件
├── feed.xml
├── Gemfile           # Github Pages本地化的文件
├── Gemfile.lock      # Github Pages本地化的文件
├── _sass
│   ├── _base.scss                  # markdown对应的css
│   ├── _layout.scss
│   └── _syntax-highlighting.scss   # 语法高亮对应的css
├── css
│   └── main.scss           # 其实就是css
├── _includes
│   ├── footer.html         # 页脚html片段
│   ├── header.html         # 页头html片段
│   ├── head.html           # html片段
│   ├── icon-github.html    # html片段
│   ├── icon-github.svg     # github图标
│   ├── icon-twitter.html   # html片段
│   └── icon-twitter.svg    # twitter图标
├── _layouts
│   ├── default.html        # default页面
│   ├── page.html           # page页面
│   └── post.html           # post页面
├── _posts
│   └── 2016-08-24-welcome-to-jekyll.markdown
└── _site             # Jekyll最终生成的静态网站
    ├── about
    │   └── index.html
    ├── css
    │   └── main.css  # 如果不喜欢上面的那堆scss，那么复制这个过去就够了
    ├── feed.xml
    ├── Gemfile
    ├── Gemfile.lock
    ├── index.html
    └── jekyll
        └── update
            └── 2016
                └── 08
                    └── 24
                        └── welcome-to-jekyll.html
```

### 简化模板
去掉不必要的文件，简化当前模板，得到结构：

```ruby
├── index.html
├── _config.yml       # Jekyll核心配置文件
├── feed.xml
├── Gemfile           # Github Pages本地化的文件
├── Gemfile.lock      # Github Pages本地化的文件
├── css
│   └── markdown.css    # 提取上面_site/css/main.css中设置html部分
│   └── highlight.css   # 提取上面_site/css/main.css中语法高亮部分
├── _includes
├── _layouts
│   └── post.html       # 文章页框架
├── _posts
│   └── 2016-08-24-welcome-to-jekyll.markdown

```

> 如果不知道如何动手，删除多余文件保留上面的结构即可

### 将网页原型加入模板
把设计好的html、javascript、css复制到模板开始改造，在改造前需要**深入理解Jekyll**

### 深入理解Jekyll

#### `_layouts`目录
该目录下的页面是”包含”其它内容的关系，一般是页面框架

#### `_includes`目录
该目录下的片段是“被包含”的关系，可以是任何格式的文件，片段也可以include片段。
include的语法：{% raw %}  `{% include head.html %}` {% endraw %}

_layouts和_includes与普通页面的关系图：
![jekyll-layout-include][jekyll-layout-include]

> 注意：default.html里访问index.html生成的内容是直接访问`content`，而不是`page.content`或`post.content`，这两者的关系大概是前者才是经过处理后的html片段，而后者是原始的文本，包含未解析的liquid语法。

#### `_config.yml`配置文件
Jekyll站点的配置文件，可以存储数据，用于配置Jekyll的插件和运行环境

```ruby
# 自定义变量
domain: "http://jokinkuang.info" # the domain URL for your site

# 配置
excerpt_separator: "\n\n" # you can specify your own separator here, default is "\n\n" String
permalink: /:year/:month/:day/:title.html
highlighter: rouge  # 使用rouge作为语法高亮引擎
markdown: kramdown  # 使用kramdown作为markdown的转换器
kramdown:
  input: GFM
  hard_wrap: true # a newline in markdown text would be changed to <br>
gems:
  - jemoji # 要站点支持Github表情，必须添加

# 上传到Github Pages时Github会进行配置的项，详见：Github Help With Configuring Jekyll

# Github Pages默认配置项，Jekyll的配置可以覆盖
# kramdown:
#   input: GFM
#   hard_wrap: false
# gems:
#   - jekyll-coffeescript
#   - jekyll-paginate

# Github Pages不可改变项，会覆盖Jekyll的配置
# lsi: false
# safe: true
# source: [your repo's top level directory]
# incremental: false
# highlighter: rouge
# gist:
#  noscript: false
# kramdown:
#  math_engine: mathjax
```

#### 创建页面

方式一 | **某路径**下添加`xxx.html`，访问地址为`该路径/xxx.html`
方式二 | **某路径**下添加`xxx/index.html`，访问地址为`该路径/xxx`，无需后缀

#### `front matter`(Yaml头信息)
每个页面都可以有自己的头信息，可以覆盖Jekyll和_config.yml里面的值

```ruby
---
layout: post
title: 一步一步创建Jekyll主题
categories: [jekyll github markdown rouge]
date: 2016-9-3 15:47:05
excerpt: ""   # 覆盖清掉文章的摘要
pid: ""       # 新建一个pid的字符串变量
---
```

#### `site`变量
来自`_config.yml`配置文件和Jekyll内置变量，下面是常用的属性：

site.posts | 从新到旧排序的posts文章列表集合
site.categories | 以目录分类的文章列表Map`{cate1:[post1, post2], cate2:[post3, post4]}`
site.tags | 同上，以tags分类的文章列表Map`{tag1:[post1, post2], tag2:[post3, post4]}`
site.XXX | `_config.yml`配置文件中`XXX: val`的val值，val可以是字符串/数组/集合

#### `page`变量
指代当前页面的变量，在index.html里使用page，page指的就是index.html这个页面，常用属性：

page.content | 页面**源码**(含有markdown/liquid等语句)
page.title | 页面标题
page.excerpt | 页面摘要**源码**，可通过_config.yml配置摘要算法
page.url | 页面的**相对路径**
page.date | 页面的时间和日期
page.categories | 页面的categories数组，`linux/ruby/_posts/ruby.md`文章会把linux和ruby加入categories，和上面的site.categories不同！
page.tags | 页面的tags数组
page.path | 页面的实际路径(源码路径)

> 注意：当前页面的Front Matter中设置的xxx: val可以通过page.xxx访问val值
> 另外：site.posts数组的元素post和page具有几乎一样的属性

#### `liquid`语法
Jekyll内变量操作是使用[Liquid语法](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)

主要有：

1. 显示变量的值
    {% raw %}`{{ 变量名 }}`{% endraw %}

    如果要组成字符串，可以这样：{% raw %}`"字符串头部{{ 变量名 }}字符串尾部"`{% endraw %}    

    也可以使用Filter：{% raw %}`{{ "字符串头部" | append : 变量名 | append : "字符串尾部" }}`{% endraw %}

    如，显示文章的标题：{% raw %}`{{ page.title }}`{% endraw %}

2. 使用变量的值进行计算
    文章的标题计算 {% raw %}`{% assign titleAndDate = page.title | append: page.date %}`{% endraw %}

    `assign x = y`是声明一个变量并赋值，**声明必须赋值！**

    `xxx | append: "str"`是Liquid语法中的Filter，可以理解为管道，也可以简单理解为`对象|方法:参数`

    Filter可以连续执行：`xxx | append: "str1" | append: "str2"`

3. if语句
  {% raw %}
   ```liquid
   {% if site.title == "" %}
   {% assign title = "A" %}
   {% elsif site.title == "stepbystep" %}
   {% assign title = "B" %}
   {% else %}
   {% assign title = "C" %}
   {% endif %}
   ```
   {% endraw %}

4. for语句
   {% raw %}

   ```liquid
   {% for post in site.posts %}
    {% assign title = post.title %}
    The post title is {{ title }}
   {% endfor %}
   ```
   {% endraw %}

5. 访问map的key和value
    像`site.categories`其实是一个map，访问分类是linux的文章集合有两种方式：
    方式一: `site.categories.linux`即是分类为linux的posts列表
    方式二: `for cate in site.categories`，`cate[0]`是linux，`cate[1]`是posts列表

> 注意：如果{% raw %}{% %}{% endraw %}里面的是语句，**一行只能有一个而不能有多个**

### 改造自己的主题
至此，Jekyll的使用、Liquid的语法、Markdown的样式、语法高亮的配色都已经讲述，接下来就是动手完成自己的主题，以下是一些点：

- 加入`html`、`css`、`js`等需要的文件
- 提取相同的内容到`_includes`目录
- 需要复用的页面框架，比如post文章页，放到`_layouts`目录
- 一些配置字符串，放在`_config.yml`文件内
- 使用**Liquid语法**在页面中访问`site`，`page`等信息组织内容
- 调整html页面标签的css定制自己的Markdown样式
- 调整语法高亮的css定制自己的语法高亮颜色值
- 你可能需要一个MarkdownDemo来测试站点的样式

## 除此之外我做了什么
请参考[我做了什么](http://www.jokinkuang.info/2016/09/18/what-did-i-do-for-the-blog.html)

## 上传自己的主题到JekyllThemes
如果希望自己的主题可以让更多人看到或使用，可以上传到[JekyllThemes](http://jekyllthemes.org/)这个站点

1. 准备一张250x200的预览图
2. `fork`这个[JekyllThemes](https://github.com/mattvh/jekyllthemes/fork)项目源码到自己的Github仓库
3. 找到自己的Github仓库中fork的这个JekyllThemes项目
4. `clone`自己仓库的JekyllThemes项目到本地
5. 将预览图放到`thumbnails`目录，在`_posts`下复制一篇文章，替换为自己的主题信息
6. 执行`bundle exec jekyll server`本地预览效果
7. 本地调试直到网站已经添加了自己的主题
8. `commit`并且`push`添加的代码(此时代码只是提交到自己仓库的JekyllThemes项目)
9. 网页访问自己仓库的JekyllThemes项目，点击`New pull request`发起一个合并请求
10. 此时提交已经发送给JekyllThemes项目的管理员，等待管理员合并提交

> 注意：图片的规格最好一致，并且进行本地测试，否则即使提交了也很可能会被管理员拒绝合并代码

## Jekyll
Error: No repo name found. Specify using PAGES_REPO_NWO environment variables, 'repository' in your configuration, or set up an 'origin' git remote pointing to your github.com repository.

 Error: No such file or directory - git rev-parse HEAD
###

## 参考文档

阅读·[Jekyll的中文文档](http://jekyll.bootcss.com/) | [英文文档](http://jekyllrb.com/)
阅读·[Liquid的文档1](https://help.shopify.com/themes/liquid) | [文档2](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) | [文档3](https://shopify.github.io/liquid/)
阅读·[语法高亮引擎rouge的文档](https://github.com/jneen/rouge) |
阅读·[Markdown转换器kramdown的文档（支持maruku语法）](http://kramdown.gettalong.org/) |
阅读·[Markdown转换器maruku的文档（支持TOC语法）](http://maruku.rubyforge.org/maruku.html) |


[markdown-parser]: {{ site.images_url }}markdown/markdown-parser.jpg "markdown转换例子"
[markdown-plain]: {{ site.images_url }}markdown/markdown-plain.jpg "html效果"
[markdown-css]: {{ site.images_url }}markdown/markdown-css.jpg "添加css后html效果"
[jekyll-layout-include]: {{ site.images_url }}jekyll/jekyll-layout-include.jpg "layout与include关系图"

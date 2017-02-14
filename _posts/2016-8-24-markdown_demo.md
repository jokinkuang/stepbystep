---
layout: post
title: Markdown Demo
categories: markdown
date: 2016-08-24 12:38:11
pid: 20160824-123811
pin: 100
# you can override the settings in _config.yml here !!
---

> 一个用来测试当前站点的Markdown样式的Demo

```
Attentions (放在开头)：

1,markdown的解析遇到一个空行作为一次解析，所以上下两个语法需要有一个空行做间隔。
  比如：
  # H1
  ## H2
  只能解析H1，##H2被解析为<p>

  要正确被解析，应该在两个解析间插入空行

2,markdown语法关键字与内容一般都要留个空格。
  比如： # 空格 H1

3,代码块内不能再使用markdown关键字，因为代码块是<pre>。

4,本demo开启了kramdown的hard_wrap: true自动将换行符转换为<br>。

5,本demo展示了本站点的样式(css)，如果不喜欢，可以通过此demo修改。

6,本demo还包含了markdown的基本语法（红块）。
```
:smile:本Demo的[Markdown源码](https://raw.githubusercontent.com/jokinkuang/stepbystep/master/_posts/2016-8-24-markdown_demo.md)

目录：
{:use_numbered_headers => true}
* auto-gen TOC:
{:toc}

# Kramdown Markdown Syntax

# H1

## H2

### H3

#### H4

###### H5
> \# 空格 TEXT or
> \- - - -
> TEXT
> \=====  or \-----

## TOC
If you create a list, and then set the toc attribute, when rendering Maruku will create an auto-generated table of contents(TOC). TOC was supported by Maruku, and Kramdown implements the Maruku so it also support TOC!

> add following to the post
>
> \* 空格(or 1. 空格) This is a list and would become a table of contents(TOC) and this text will be scraped that you cannot see(it doesn't matter what you write here)!
> \{:toc\}
>

## blockquote
> This is a blockquote.
>
> This is the second paragraph in the blockquote.
>

> \> 空格 TEXT
> \> 空格 TEXT
> \> 空格 TEXT

## italic
Some of these words *are emphasized*.
Some of these words _are emphasized also_.

> \*TEXT\*  or \_TEXT\_

## emphasis
Use two asterisks for **strong emphasis**.
Or, if you prefer, __use two underscores instead__.

> \**TEXT\**  or \__TEXT\__

## inline code
inline `code`

> \`TEXT\`

## unordered list
*   Candy.
*   Gum.
*   Booze.

+   Candy.
+   Gum.
+   Booze.

-   Candy.
-   Gum.
-   Booze.

> \* 空格 TEXT  or
> \- - - -
> \+ 空格 TEXT  or
> \- - - -
> \- 空格 TEXT

## ordered list
1.  Red
2.  Green
3.  Blue

> 1. 空格 TEXT
> 数字有没有序是没关系的

*   A list item.
    With multiple paragraphs.

*   Another item in the list.

> \* 空格 TEXT

## link
This is an [example link](http://example.com/).
This is an [example link](http://example.com/ "With a Title").
I get 10 times more traffic from [Google][1] than from
[Yahoo][2] or [MSN][3].

[1]: http://google.com/        "Google"
[2]: http://search.yahoo.com/  "Yahoo Search"
[3]: http://search.msn.com/    "MSN Search"

I start my morning with a cup of coffee and
[The New York Times][NY Times].

[ny times]: http://www.nytimes.com/

> \[example link](http://example.com/ "With a Title")  or
> - - - -
> \[example link]\[id]
> 空行
> \[id]: http://example.com/ "With a Title"

## image
![alt text](/w3c/images/avator.jpg "Title")
![alt text][id]

[id]: /w3c/images/avator.jpg "Title"

> The same as Link
> But start with  `!`

How to make the image to show center？
1.  CSS           cannot
2.  javascript    can
3.  use img in markdown text instead

> NOTE kmarkdown 转换图片是直接转换成 \<p>\<img /></p>，因为css3也没有选择父的选择器（比如没有选择器可以选择含有\<img>的\<p>），所以从css角度无法实现图片居中。


# GFM Syntax

```c
int main() {
	printf("hello world!");
}
```

> \`\`\`language
>   // code here
> \`\`\`

## Task Lists

- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported
- [x] list syntax required (any unordered or ordered list supported)
- [x] this is a complete item
- [ ] this is an incomplete item

## Tables

First Header | Second Header
------------ | -------------
Content from cell 1 | Content from cell 2
Content in the first column | Content in the second column

> 表格
> cell1 \| cell2  （ \| 两边要空格）

## SHA references

Any reference to a commit’s SHA-1 hash will be automatically converted into a link to that commit on GitHub.

16c999e8c71134401a78d4d46435517b2271d6ac
mojombo@16c999e8c71134401a78d4d46435517b2271d6ac
mojombo/github-flavored-markdown@16c999e8c71134401a78d4d46435517b2271d6ac
Issue references within a repository

Any number that refers to an Issue or Pull Request will be automatically converted into a link.

#1
mojombo#1
mojombo/github-flavored-markdown#1
Username @mentions

Typing an @ symbol, followed by a username, will notify that person to come and view the comment. This is called an “@mention”, because you’re mentioning the individual. You can also @mention teams within an organization.

## Automatic linking for URLs

Any URL (like <http://www.github.com/>) will be automatically converted into a clickable link.    

> 自动链接，必须以http开头
> \<http://example.com>


## Strikethrough

Any word wrapped with two tildes (like ~~this~~) will appear crossed out.

> 划掉线
> \~~关键字~~

## Emoji

GitHub supports emoji! :sparkles: :camel: :boom:

To see a list of every image we support, check out the Emoji Cheat Sheet.
<http://www.webpagefx.com/tools/emoji-cheat-sheet/>

> 表情
> 空格:emoji:

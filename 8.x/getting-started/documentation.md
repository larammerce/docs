## Documentation

[[toc]]

This section guides you to write a document for larammerce project .

### Overall Structure

Each larammerce document should have the parts below :

**1. Introduction :** Describe the overall view of the page , e.g. the subject it is talking about .

**2. Details :** Give technical details about the subject of document .

**3. Sum Up :** Make a brief review of the parts above and write the page references .

### How to write sections and subsections

Each page starts with a `##` header as a section which continues with one or more `###` headers as subsections .

**NOTE :** You can use more than one `##` header in a document .

**NOTE :** A subsection with a `###` header may contain multiple `####` , `#####` or `######` headers .

:::warning Sidebar Index
Only `##` and `###` headers are indexed in right sidebar as table of contents .
:::

:::danger Avoid # Header
The use of `#` header is not permitted in larammerce documents .
:::

### How to describe life cycles and road maps

You can use the professional tools such as  `starUML`  *<sup>[1](#1)</sup>*  or  `figma`  *<sup>[2](#2)</sup>*  in order to visually describe the details .

##### EXAMPLE

![life cycles: starUML diagram](/03.png)

:::danger Avoid Windows Paint
'Windows Paint' is not suitable for this purpose . Don't use it !
:::

### How/When to put the notices, warnings, and danger zone sections

Notices , warnings and danger zone sections help you to get user's attention to the important hints .

##### PATTERN

```bash
:::tip title-of-notice
text-of-notice
:::
```

##### EXAMPLE

:::tip NOTE
This function checks the activation of the representative management section.
:::

##### PATTERN

```bash
:::warning title-of-warning
text-of-warning
:::
```

##### EXAMPLE

:::warning Laravel Version
The tutorials in this document are based on Laravel version 8.75 .
:::

##### PATTERN

```bash
:::danger title-of-danger
text-of-danger
:::
```

##### EXAMPLE

:::danger Avoid Manipulation
Any change in this section may lead to unwanted consequences !
:::

### How/When to add tables

Tables help you to represent a list in a nice configuration with ordered alignment .

:::warning Table's Width
Select the number and contents of columns carefully so that the table wouldn't exceed the width of the page !
:::

:::danger Avoid Long Text
Don't use a long text in a cell of the table !
:::

##### PATTERN

```bash
Title 1 | Title 2
--------|--------
Content | Content
Content | Content 
```

##### EXAMPLE

Name | Age | Job
-----|-----|---------
John |  29 | architect
Mary |  33 | teacher

### How to present the paths and directories

Paths and directory trees are represented in accordance with the pattern below :

```bash
|--- directory/
    |--- subdirectory/
        |--- file
```

##### EXAMPLE

```bash
|--- .vuepress/
    |--- config.js
    |--- styles/
        |--- index.styl
|--- 8.x/
    |--- core-concepts/
        |--- cruds.md
```

:::tip Optional Description
You can add some optional description in parentheses .

##### EXAMPLE

```bash
|--- .vuepress/ (dir)
    |--- styles/ (dir)
        |--- index.styl (styl file)
```
:::

### How to present the file names (Addressing the project files)

Follow the pattern below in order to address a file of the project into the text :

```
`/path/to/your/docs/directories-or-files-of-the-project`
```

 :::tip EXAMPLE
 ```
Correct the first line in the file `/path/to/your/docs/.vuepress/styles/index.styl` and then change the active directory .
```

**OUTPUT**

Correct the first line in the file `/path/to/your/docs/.vuepress/styles/index.styl` and then change the active directory .

:::

In order to address a file of the project into the code block , you should write the path of this file as a comment before the first line of the code .

##### EXAMPLE

```stylus
// .vuepress/styles/index.styl

.sidebar
  position relative !important
  background-color transparent !important
  border none !important
  top: 0 !important
  display inline-block
  padding-top 6rem
  overflow initial
```

### How to present the variables and technical words

 Variables and technical words must be placed inside double graves .

 :::tip EXAMPLE
 ```
Run this project on your `local host` , maybe the `port:8080` .
```

**OUTPUT**

Run this project on your `local host` , maybe the `port:8080` .
:::

### How to describe the methods and classes

Methods and classes should be described in accordance with the pattern below :

![code blocks: methods and classes](/01-code.png)

##### EXAMPLE

```php
// app/Models/User.php

class User extends BaseModel{
    ...
    private int $id; // This attribute keeps the user's primary key
    ...
}

function test(string $input){
    ...
    return true; // if $input=="1"
    ...
}
```

### Where to put video blocks

Put the video block at the lowermost part of the document , before the reference section .

:::tip EXAMPLE

```
<iframe src="https://www.aparat.com/video/video/embed/videohash/MqHk6/vt/frame"  allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>
```

**OUTPUT**

<iframe src="https://www.aparat.com/video/video/embed/videohash/MqHk6/vt/frame"  allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>

:::

### How to write the page references

In order to create a link to another web site , you should mention it as a reference . Each reference has a number which should be superscript and italic . For this purpose , use the pattern below :

```
*<sup>[number](#number)</sup>*
```

:::tip EXAMPLE
```
You can use the professional tools such as  `starUML`  *<sup>[1](#1)</sup>* .
```

**OUTPUT**

You can use the professional tools such as  `starUML`  *<sup>[1](#1)</sup>* .
:::

This number is an internal link which redirects the user to the reference section at the bottom of the same page , where you can place the external link with the same number and a suitable expression . The pattern is as follows :

```
*number. <a name="number">[expression](external-link)</a>*
```

:::tip EXAMPLE
```
*1. <a name="1">[Introduction to starUML .](https://docs.staruml.io/)</a>*
```

**OUTPUT**

*1. <a name="1">[Introduction to starUML .](https://docs.staruml.io/)</a>*
:::

:::danger Avoid Direct External link
Never insert the external link to another web site directly into the larammerce document paragraph !
:::

### How to put links to other documents

Each section in a larammerce document has a title on which you can hold the mouse to see the `#` sign at the left side . Clicking on this sign will show you the url address of this section which can be used to create a link to that section into your document . For example to create a link to `PR Requirements` section of `Contributing` page , do the following steps in order :

**1.** Hold the mouse on this title to appear the `#` sign .

![internal link: first image](/02-link.png)

**2.** Click on the `#` sign and copy the url address .

![internal link: second image](/03-link.png)

**3.** Insert this address into your document with the following format :

```
[expression](address)
```

In this example , the link may be as follows :

```
For further information , read the [PR Requirements](https://docs.larammerce.com/8.x/getting-started/contributing.html#pr-requirements) .
```

**OUTPUT**

For further information , read the [PR Requirements](https://docs.larammerce.com/8.x/getting-started/contributing.html#pr-requirements) .

:::warning Repetition
If your desired topic is discussed before in another page of larammerce document , create an internal link to that page instead of repetition the subject !
:::

### How to show the code block outputs

This topic is presented by a few examples .

**1.** Suppose you are going to show the output of the following `php` code block :

```php
// app/Models/User.php

class User extends BaseModel{
    ...
    private int $id; // This attribute keeps the user's primary key
    ...
}

function test(string $input){
    ...
    echo "Hello World!";
    ...
}
```

To do this , use the following code :

![code block output: first image](/04-code.png)

The result is as follows :

```bash
php script.php
# output: Hello World!
```

**2.** The second example is related to the following `API` call :

```
fetch localhost:8080/api/v1/some/test/api
```

Here is the code to show the related `json` output :

![code block output: second image](/05-code.png)

and the result is :

output:
```json
{
    "keyA": "valueA",
    "keyB": [
        "item1",
        "item2"
    ]
}
```

### How to present theoretical concepts and technical subjects

You can get help from the appropriate images in order to represent the theoretical and technical concepts . Put the image file into the directory `/path/to/your/docs/.vuepress/public/` and then use the format below :

```
![image-subject](/image-file-name)
```

##### EXAMPLE

```
![internal link: second image](/03-link.png)
```
**OUTPUT**

![internal link: second image](/03-link.png)

:::warning Where to Use the Images ?
You are allowed to embed an image into the larammerce document only in 3 situations :

**1.** To define some parts of admin panel that is difficult to understand .

**2.** To describe a difficult technical concept .

**3.** To illustrate a road map or life cycle or diagram .
:::










## References

*1. <a name="1">[Introduction to starUML .](https://docs.staruml.io/)</a>*

*2. <a name="2">[Getting started with figma .](https://www.figma.com/)</a>*


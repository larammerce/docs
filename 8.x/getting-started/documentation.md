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

Notices , Warnings and Danger sections help you to get users' attention to the important tips .

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
Any change in this section may lead to unwanted concequences !
:::

### How/When to add tables

Tables help you to represent a list in a nice configuration with ordered alignment .

:::warning Table's Width
Select the columns' number and content carefully so that the table wouldn't exceed the width of the page !
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

Paths and directory trees are represented via the pattern below :

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









## References

*1. <a name="1">[Introduction to starUML .](https://docs.staruml.io/)</a>*

*2. <a name="2">[Getting started with figma .](https://www.figma.com/)</a>*


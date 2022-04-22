# How to write?

The Markdown elements outlined in the original design document.
 
## Overview

The **github** website introduced a syntax called **markdown** for formatting and formatting texts and comments. Using this syntax, texts can be converted to a format similar to html. For example, **text can be bolded. Or created a link in the text or put a photo and other things.**

Markdown is a **simple** punctuation text display, a lightweight text structure with full text structure and easy-to-use writing for documents and web content that is eventually translated into html and structured.

Unlike existing heavy word processing software, content generated in markdown format can be easily shared between different devices such as pc, mobile and so on. That's why it's becoming a writing standard for academics, scientists, writers, and more. Markdown files are stored with the `.markdown` extension, or `.md` for short, and have a structure and rules for displaying content.

**Larammerce documents and tutorials are also written in markdown markup language**, and the larammerce team in this document intends to teach you how to write larammerce documents, so it is imperative to follow these **rules** in the structure of larammerce documents.

## Headings

***1.*** **At the beginning of each document, the name of the same document with (`# Heading level 1`) structure must be mentioned and this structure should never be repeated anywhere in the document.**

:white_check_mark: ***Do this:***

>  # Contributing

```
# Contributing
```

:x: ***Don't do this:***

>  ### Contributing

```
### Contributing
```

***2.*** **For better compatibility, you should place blank lines before and after the title.**

:white_check_mark: ***Do this:***

> Try to put a blank line before...
>
> ### Heading
> 
> ...and after a heading.

:x: ***Don't do this:***

> Try to put a blank line before...  
> **Heading**  
> ...and after a heading.


***3.*** **larammerce in each document provides examples to better understand the code that follows the structure (##### Level 5 heading), so you follow this structure.**

:white_check_mark: ***Do this:***

> ##### Example:


```
##### Level 5 heading
```

:x: ***Don't do this:***

> ### Example:


```
### Level 3 heading
```

## Paragraphs

***1.*** **To create paragraphs, use a blank line to separate one or more lines of text.**

:white_check_mark: ***Do this:***

> I really like using larammerce....
>
> Larammerce is on open source project.

:x: ***Don't do this:***

> I really like using larammerce....  
> Larammerce is on open source project.

***2.*** **Never indent when writing paragraphs, unless the paragraph is in the list.**

:white_check_mark: ***Do this:***

> Keep lines left-aligned like this

:x: ***Don't do this:***

>>> Don't put tabs or spaces in front of your paragraphs.





## Emphasis

You can add emphasis by making text bold or italic.

### Bold

***1.*** **The title paragraph in the documents should be **bolded** and each paragraph should be **numbered**.**

:white_check_mark: ***Do this:***   

> ***1.*** **Each time you complete a piece of work, you must add the files to a staging environment.**
>
> ***2.*** **In this step you commit our changes.**

:x: ***Don't do this:***

> 1. Each time you complete a piece of work, you must add the files to a staging environment.
>
> 2. In this step you commit our changes.

***2.*** **In the text of the document, there are words that are mentioned for the first time, or there are words that refer to the names of people, or there are words that are important in terms of content, so they must be **bold** in the text.**

:white_check_mark: ***Do this:***  

> It is interesting to know **Mike Cohn**, who is one of the main inventors of the **Scrum** development method.

:x: ***Don't do this:***

> It is interesting to know Mike Cohn, who is one of the main inventors of the scrum development method.

Here, if you look closely, you will see that (Mike Cohn) is in bold because it refers to a person's name, and also the word scrum is in the same state because it is important in terms of content and is mentioned for the first time in the document.

This method makes the reader understand better.

***3.*** **Tables are very important in Laramres documents because they contain important content and therefore you must comply with its requirements in document writing.
Note that the title of the table row should be bold, and if the table rows are in stages, it is necessary to follow the principles of numbering.**

:white_check_mark: ***Do this:***  

| **Syntax**      | **Description** |
| ----------- | ----------- |

:x: ***Don't do this:***

| Syntax      | Description |
| ----------- | ----------- |


### Italic

***1.*** **If you want to create sub-descriptions or for more information, quotes from personalities, etc. in documents, you should use blockquotes, which are italics in larammerce documents.**


:white_check_mark: ***Do this:***    

> *After creating the user story, team members are required to create their own tasks.*

:x: ***Don't do this:***

> **After creating the user story, team members are required to create their own tasks.**


### Bold and Italic

***1.*** **Paragraphs in the list **do not need to be bold**, but if they contain numbers, the numbers must be in **bold** and **italic**.**

:white_check_mark: ***Do this:***  

> ***1.*** Who is it designed for?
>
> ***2.*** What are the expectations from the system?
>
> ***3.*** Why is it important?

:x: ***Don't do this:***

> **1. Who is it designed for?**
>
> **2. What are the expectations from the system?**
>
> **3. Why is it important?**

***2.*** **The numbers in the document must be **bold** and **italic**.**

:white_check_mark: ***Do this:***                        

> ***1***
> 
> ***2***
> 
> ***3***

:x: ***Don't do this:***

> **1**
> 
> **2**
> 
> **3**

***3.*** **Sometimes it is necessary to write notes in the documents so that the reader remembers these points in his mind and usually he also has important reminders that it is important to use these points in larammerce documents and the structure of these points should be bold and diagonal. It should also be written in capital letters.**

:white_check_mark: ***Do this:***                        

> ***NOTE***: Here the **stable** branch is actually the name of the main branch of our project that we can not modify.


:x: ***Don't do this:***

> NOTE: Here the **stable** branch is actually the name of the main branch of our project that we can not modify.

## Code

***1.*** **To denote a word or phrase as code, enclose it in backticks (`).**

:white_check_mark: ***Do this:***  

`TG-449 #ready-for-rest `

***2.*** **File names and file paths must also be in the (`) symbol.**

:white_check_mark: ***Do this:***  

`TEST.php`

`git/docs/8.x/getting-started`

### Code Blocks

***1.*** **For your training, our team uses blocks of code that are written as follows:**

:white_check_mark: ***Do this:***  

> \`\`\`php
>
> echo "Hello World"; #php code
>
> \`\`\`

The rendered output looks like this:

```php
echo "Hello World"; #php code
```

:white_check_mark: ***Do this:***  

> \`\`\`bash
> 
> git add index.php
> 
> git commit -a -m "test code" 
>
> git push #Uploaded file on github
>
> \`\`\`

The rendered output looks like this:

```bash
git add index.php
git commit -a -m "test code" 
git push #Uploaded file on github
```
> *It is better to use comments to understand the codes.*
   

***2.*** **To create code blocks, indent every line of the block by at least four spaces or one tab.**

:white_check_mark: ***Do this:***  

```php
    <html>
      <head>
      </head>
      <body>
      	<?php
        	echo "Hello World";
        ?>
      </body>
    </html>
```

The rendered output looks like this:

    <html>
      <head>
      </head>
      <body>
        <?php
            echo "Hello World";
        ?>
      </body>
    </html>
    
## breafly

In the table below you can see a **summary** of the larammerce team documenting method.
    
**Rule** | **Markdown** | **Rendered Output**
----------|--------------|----------------
Important paragraphs | \*\*This text is really important.\*\* | **This text is really important.**
Paragraphs in the list | \*\*\*1.\*\*\* Paragraphs in the list | ***1.*** Paragraphs in the list
important words | \*\*larammerce*\* | **larammerce**
important note | \*\*\*NOTE*\*\* | ***NOTE***
Table header | \*\*header*\* | **header**
blockquotes | \*blockquotes* | *blockquotes*
numbers | \*\*\*1*\*\* - \*\*\*2*\*\*  - \*\*\*3*\*\* |  ***1*** - ***2*** - ***3*** 
Code | \`echo "Hello World";\` | `echo "Hello World";`
File names | \`TEST.php\` | `TEST.php`











  
  
  






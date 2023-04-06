## Documentation

[[toc]]

This article is a complete guide to writing documents for the larammarce project.<br/>
Larammerce documentation is composing with *markdown syntax* *<sup>[1](#1)</sup>*.also initial knowledge of *git commands* *<sup>[2](#2)</sup>* is necessary.

### Starting point </br>

If this is your first contribution, follow instructions composed on [`contributing`](https://docs.larammerce.com/8.x/getting-started/contributing.html#contributing) article on [`larammerce.com`](https://larammerce.com/).

--------------------------------
### Requirements
| Tool name        | Version(distro)                                                       |
|------------------|-----------------------------------------------------------------------|
| Operating system | Every version of windows,Osx, linux supporting installation of Node.js |
| Node.js          | V16 or higher                                                         |

::: success NODE version support :

Consider that this project integrates well only with Node.js version 16.
:::

**You can Install Node.js [here](https://nodejs.org/en/download/).**</br>

::: warning In order to use different Node.js versions, install `nvm` or `direnv` following description below:
<br/>
:::
- **_[Install nvm](https://github.com/nvm-sh/nvm)_**  </br>nvm is a tool which gives you the ability to switch between different versions of Node depends on project's requirements. <br/>

OR

- **_[Install direnv](https://direnv.net/docs/installation.html)_** </br>You can set an environment variable to enable **_legacy_** mode by creating a file named `.envrc` on `.gitignore` directory including code below :

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```
---------------------------
### Overall structure

Each document must consist of the following parts:<br/>

**1) Introduction**<br/>
Describe the overall view of the page by writing a general illustration of the represented subject. <br/>

**2) Technical description**<br/>
Write technical details based on markdown structure.<br/>

**2) Sum Up**<br/>
Make a brief review of the parts above (optional) and write the page references.<br/><br/>

-----------------
#### How to write sections and subsections

 Write the article title using `h2` tag and `h3 ,h4 ,..., h6 ` for the subsections. 
<br/>

NOTE:
- Overusing these tags makes the sidebar crowded and complicated.
- Only `h2` and `h3` headers get indexed in the right sidebar as the table of contents.
- Avoid `h1` Header. The usage of `h1` header is not permitted in Larammerce documents.

**EXAMPLE**

 ```bash
## Documentation
[[toc]]
...
This article ... is necessary.
...

### Overall Structure
...
Each document must consist... parts.
...

#### How to write sections and subsections
```
------------------

#### How to describe life cycles and road maps

In order to visually describing the details of a procedure or showing a map or a diagram, Draw a schema following these 2 steps:<br/>
1. Upload the schema on `vuepress\public` directory.
2. Use Markdown syntax to upload it on your `.md` file. <br/>


Consider the example below:

 ![road map sample](/road-map-sample.png)

 :::danger Avoid Windows Paint!
 'Windows Paint' is not suitable for this purpose.
 :::
------------------
#### How/When to put the notices, warnings, and danger zone sections

You can use it when you want to get your readership's attention.

**PATTERN**

```bash
:::tip title-of-notice
text-of-notice
:::
```
**EXAMPLE**

```
:::tip NOTE
This function checks the activation of the representative management section.
:::
```
**OUTPUT**

:::tip NOTE
This function checks the activation of the representative management section.
:::

NOTE: `Tip` can be replaced (according to your purpose and situation) with `warning`, `danger`, `notice` or `success`  after three colon signs.

-----------------------
#### How/When to add tables

To represent a list in a nice configuration with ordered alignment use tables.

Consider that tables should Have:
- Organized alignment
- Clear content
- Container width (never exceed the page width)
- Suitable amount of columns

NOTE: Avoid using a table when there are many explanations or a code sample. 

-------------------
#### How to present the paths and directories

To write paths hierarchical structure from the main directory to subdirectories follow description below:
```
|---main directory
    |---sub directory1
    |---sub directory2
        |---sub of sub direcroty2
```
NOTE: You can add some optional descriptions in parentheses.

**EXAMPLE**


```bash
|--- .vuepress/ (dir)
    |--- styles/ (dir)
        |--- index.styl (styl file)
```
------------------------
#### How to present the file names (Addressing the project files)

Addressing files is applicable in many parts of a document. writing the path between `grave signs` is the right way to represent the address **_through a text_**.<br/><br/>
 **EXAMPLE:**
```bash
`/path/to/your/docs/.vuepress/theme/styles/custom-blocks/styl`
```

In order to create a new custom block you can modify the file `/path/to/your/docs/.vuepress/theme/styles/custom-blocks/styl`.<br/>
To show the path use commenting on the top of the commands.

```stylus
//root address: .vuepress/theme/styles/custom-blocks/styl
&.success
    background-color rgba(80,153,61,.3)
    border-color darken(#50993d, 35%)
    color darken(#50993d, 70%)
    .custom-block-title
      color darken(#50993d, 50%)
    a
      color $textColor
```

-------------------------
#### How to present the variables and technical words <br/>

Variables and technical words must be placed inside double graves.

**EXAMPLE**

 ```
Run this project on your `local host`, `port:8080`.
```

**OUTPUT**

Run this project on your `local host`, `port:8080`.

---------------------------
#### How to describe the methods and classes
Methods and classes should be described following the pattern below:

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
NOTE: Dots mean you have more codes previously and thereafter.

-------------------
#### How to write code blocks

To do so, use 3 graves to create a code block and use labels showing what syntax are you using.<br/><br/>
**EXAMPLE**

![code blocks:image](/CodeBlockSample.png)

**OUTPUT** :

```bash
this is a bash code block sample
```
```php
function test(string $input){
    ...
    return true; // if $input=="1"
    ...
}
```
```stylus
&.success
    background-color rgba(80,153,61,.3)
    border-color darken(#50993d, 35%)
```
--------
#### Where to put video blocks

better to put the video block at the lowermost part of the document, before the reference section.
to upload a video on your .md file follow description below:<br/>
1. Copy the video iframe code.
2. Paste it at the bottom of your document

```
<iframe src="video iframe code "  allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe> 
```
------
#### How to write the page references<br/>

In order to link a word or a part of the article to a website, you should mention it as a reference following structure below:

1. Hyperlink the specific part and give it a superscript so the user can find it in your article. (this is an internal link, redirects you to the reference section)

```bahs 
*the specific word or sentence* *<sup>[1](#1)</sup>*
```
2. Now use this command to build your reference.

```bash
*1.<a name="1">[write whatever you want](put the link here )</a>*
```
------
#### How to put links to other documents

Each section in a Larammerce document has a title on which you can hold the mouse to see the `sharp sign`  at the left side . Clicking on this sign will show you the url address of this section which can be used to create a link to that section into your document.

1. Hover on the considered title.
2. copy the url.
3. paste url in the pattern below:
```
[expression](url address)
```
NOTE: If your desired topic has been already composed before in another Larammerce document, refrence the topic to the section or the whole document.

------
#### How to show the code block outputs
Here is an example on how to show the hello world output script :

```php 
function test_function(string $input){
    ...echo "hello world"
    return...
}
```
```bahs
php script.php
# output: hello world
```
-------
#### How to show an HTTP request and its response

To do so, you can call an API:

```
fetch localhost:8080/api/v1/some/test/api
```
**OUTPUT :**
```json
{
   "keyA" : "valueA",
   "keyB" : "valueB",
   "keyT" : [
      "item1",
      "item2"
   ]
}
```

-----
#### How to put links to other websites
There are 2 ways for it:

1) Create a notice section.
2) Bring it to the reference section.

NOTE: It should have an independent container and should not be inside a paragraph describing other subjects.

-------

#### How to present theoretical concepts inside MD files

Representing a theoretical concepts might be complicated, inexplicable or have long explanations .
The solution is designing and embedding appropriate related images.
NOTE: upload the pictures on `/path/to/your/docs/.vuepress/public/` directory and show it on your document composing code format below:

```
![image-subject](/image-file-name)
```
---------
#### How to present the technical subjects related to the admin dashboard <br/><br/>

Working with a complicated dashboard can cause many misunderstandings among users. to avoid upcoming problems, you can use a schema or a snapshot of the specific part you considered.


NOTE: the screenshot should not contain your tabs and all your computer environment.

------
#### a quick sum-up on picture usage rules

:::warning Where to Use the Images ?
You are allowed to embed an image into the Larammerce document only in 3 situations :

**1.** To define some parts of admin panel that is difficult to understand .

**2.** To describe a difficult technical concept .

**3.** To illustrate a road map or life cycle or diagram .
:::
------
#### the following article has been recorded in persian just in case of subscribers need:<br/><br/><br/>



<iframe src="https://www.aparat.com/video/video/embed/videohash/6et8I/vt/frame" height="300" width="700" style="  border: 2px solid #bdc3c7;
border-radius: 5px; opacity: 1;" ></iframe>

## References

*1. <a name="1"> [What is markdown ?](https://www.markdownguide.org/) </a>* </br>
*2. <a name="2"> [How to work with git ?](https://git-scm.com/book/en/v2/Getting-Started-The-Command-Line) </a>*
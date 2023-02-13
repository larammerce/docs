## Documentation

[[toc]]

This article is a complete guide to writing documents for the larammarce project.<br/>
Larammerce documentation is composing with *markdown syntax* *<sup>[1](#1)</sup>*.also initial knowledge of *git commands* *<sup>[2](#2)</sup>* is necessary.

### Starting point </br>

If this is your first contribution, follow instructions composed on [`contributing`](https://docs.larammerce.com/8.x/getting-started/contributing.html#contributing) article on [`larammerce.com`](https://larammerce.com/).

### Requirements
| Tool name        | Version(distro)                                                       |
|------------------|-----------------------------------------------------------------------|
| Operating system | Every version of windows,Osx, linux supporting installation of Node.js |
| Node.js          | V16 or higher                                                         |

::: warning NODE version support :

Consider that no errors will be detected using Node.js version 16 for this project.
:::

You can Install [Node.js](https://nodejs.org/en/download/) here.</br>

::: warning In order to use a different Node.js version, install `nvm` or `direnv` following description below: :::

- **_[Install nvm](https://github.com/nvm-sh/nvm)_**  </br>nvm is a tool which gives you the ability to switch between different versions of Node depends on project's requirements. <br/>

OR

- **_[Install direnv](https://direnv.net/docs/installation.html)_** </br>You can set an environment variable to enable **_legacy_** mode by creating a file named `.envrc` on `.gitignore` directory including code below :

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```
### Overall structure

<br/> Each document must consist of the following parts:<br/><br/>

**1) Introduction** :<br/>
Describe the overall view of the page by writing a general illustration of the represented subject. <br/>

**2) Technical description** :<br/>
Write technical details based on markdown structure.<br/>

**2) Sum Up** :<br/>
Make a brief review of the parts above (optional) and write the page references.<br/><br/>

#### How to write sections and subsections

 Write the article title using `h2` tag and `h3 ,h4 ,..., h6 ` for the subsections. 
<br/>
NOTE:<br/> 

- Overusing these tags makes the sidebar crowded and complicated.

- Only `h2` and `h3` headers get indexed in the right sidebar as the table of contents.
- Avoid `h1` Header. The use of `h1` header is not permitted in Larammerce documents.

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

#### How to describe life cycles and road maps

In order to visually describing the details of a procedure or showing a map or a diagram, Draw a schema following these 2 steps:<br/>
1. Upload the schema on `vuepress\public` directory.
2. Use Markdown syntax to upload it on your `.md` file. <br/>


 Notice to the example below:

 ![road map sample](/.vuepress/public/road-map-sample.png)

 :::danger Avoid Windows Paint!
 'Windows Paint' is not suitable for this purpose.
 :::

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


#### How/When to add tables

To represent a list in a nice configuration with ordered alignment use tables.

Consider that tables should Have:
- Organized alignment
- Clear content
- Container width (never exceed the page width)
- Suitable amount of columns

NOTE: Avoid using a table when there are many explanations or a code sample. 

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
#### How to present the file names (Addressing the project files)

Addressing files is applicable in many parts of a document. writing the path between `grave signs` is the right way to represent the address **_through a text_**.<br/>
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

#### How to present the variables and technical words <br/>

Variables and technical words must be placed inside double graves.

**EXAMPLE**

 ```
Run this project on your `local host`, `port:8080`.
```

**OUTPUT**

Run this project on your `local host`, `port:8080`.

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
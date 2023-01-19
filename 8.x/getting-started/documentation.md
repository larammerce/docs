## Documentation

[[toc]]

This documentation is going to define the steps of writing docs for larammerce.</br>
larammerce documenting is with *markdown language* *<sup>[1](#1)</sup>* and you should also know about</br> *git commands* *<sup>[2](#2)</sup>* so you can easily start writing docs.

### Starting point </br>
First of all you have to **fork** `larammerce/larammerce-docs` repository which is already hosted on `github.com`.</br>
Then you can modify any change on your own repository after you clone it on your local space.

### quick preview
1) Fork the repository on Github
2) Create and switch to the new branch then pull project
   ```bahs
    git checkout newbranch
    git pull
   ```   
     

3) Initialize git on the local directory by writing the code below
    ```
    git clone https://github.com/larammerce/larammerce-docs.git 
   ```


4) Modify any change via your command line (better) or on Github
5) Commit and push your changes
```
git commit -a
``` 
```
git push
```
6) Make a pull request ([Pr](http://localhost:8080/8.x/getting-started/contributing.html#pr-requirements)) with reasonable description
7) Wait for the confirmation.
</br></br>
   **NOTE**: Make sure you are on the right exact directory while writing commands in all steps.

 ### requirements
| tool name        | Version(distro)                                                       |
|------------------|-----------------------------------------------------------------------|
| Operating system | Every version of windows,Osx, linux supporting installation of NodeJS |
| NodeJS           | V16 or higher                                                         |




::: warning NODE version support :

Please consider that this software runs with no error only with Node version 16.
:::


Install [NodeJS](https://nodejs.org/en/download/)

::: warning In order to use a different version follow description below:

1) **_Install [nvm](https://github.com/nvm-sh/nvm)_**  </br>nvm is a tool which gives you the ability to switch between different versions of Node depends on project's requirements or
2)  **_Install [direnv](https://direnv.net/docs/installation.html)_**</br>so can set an environment variable to enable legacy mode by creating a file named .envrc on .gitignore directory including code below :

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```
:::

Now you can run your project on `localhost:8080` by running these 2 commands respectively
```bash
npm install
npm run docs:dev
```


Start writing your document.<br/><br/>
### Writing rules
There are some writing rules you should follow:

#### Overall structure

Your document has to have 3 sections
   1) **Introduction**: Giving your readership an overall view of the page.
   2) Writing **technical description** based on markdown structure.
   3) Doing a **recapitulate**(sum up). (optional).

   
#### How to write sections and subsections
1) Don't use h1 tag in your article. start with h2 and use h3,h4,h5,h6 for subsections.<br/>
2) Also never overuse tags because it makes the sidebar crowded and complicated.

#### How to describe life cycles and road maps
Draw a schema when there are steps to follow or you want to show a map or a diagram...
- Upload the file on 
```
|---vuepress/
    |---public
 ```

and use markdown on the article to call it.  

#### How/When to put the notices, warnings, and danger zone sections

This is the markdown command which allows you to create a notice:
```bash
:::warning/danger/success
your text
::: 
```
You can use it when you want to get your readership's attention.

#### How/When to add tables?

Use tables when you want to show a list of data<br/>
Tables should have
- Organized alignments
- Clear content
- Few columns
- Container width

NOTE: Don't use a table when you have much explanation or a code sample.

#### How to present the paths and directories ?
 Create a code block and write paths respectively from main dir to subs.
```
|---main directory
    |---sub directory1
    |---sub directory2
        |---sub of sub direcroty2
```

#### How to present the file names (Addressing the project files) ?

In order to create a new custom block you can modify the file `/path/to/your/docs/.vuepress/theme/styles/custom-blocks/styl` and add the code below to it:
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
Whenever you decided to talk about a technical word, you have to put the technical words inside double graves.

#### How to describe the methods and classes?
This is the way in which you can write classes in PHP lang:
```php
// app/models/user.php/
class user extend basemodel {
    ...
    private int $id 
    ...
    }
```
NOTE: Dots means you have more codes before and after what you write here.

#### How to write code blocks? <br/>
Use 3 graves to create a code block and use labels to show what lang are you using.

#### Where to put video blocks?
It's better to put it at the end of your article .
1) Copy the iframe code of the video
2) Paste it at the bottom of your document

   - You can use video's link instead
   - Add a style for its design if you wanted


#### How to write the page references<br/>
Write the word or the sentence in this format:
```bahs 
*the word or sentence* *<sup>[1](#1)</sup>*
```
And then use the command below to call it and give it a reference:
```bash
*1.<a name="1">[write whatever you want](put the link here )</a>*
```

#### How to put links to other documents?
When you are explaning something and it has already been uploaded somewhere, don't start over and take your time. just use the page link.

#### How to show the code block outputs?
For example when you want to show the hello world output script, do this:
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

#### How to show an HTTP request and its response
 
This is how you can call an API:
```
fetch localhost:8080/api/v1/some/test/api
```
Output:
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
#### How to put links to other websites 
There are 2 ways for it:

1) Create a notice section.
2) Bring it to the reference section.

It should have separate container and should not be inside of a paragraph describing other subjects.

#### How to present theoretical concepts inside MD files
Theoretical concepts might be complicated, inexplicable or have long explanations .
The solution is designing and embedding related pictures.

#### How to present the technical subjects related to the admin dashboard

Sometimes the need of showing a part of an app is recognized, so it's better to use a schema in your text.
You can use its screenshot for it. but note that the screenshot should contains just the specific part you are describing and should not shows your tabs and all your environment.<br/>


#### the following article has been recorded in persian just in case of subscribers need:

<iframe src="https://www.aparat.com/video/video/embed/videohash/6et8I/vt/frame"  allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>

## References

*1.<a name="1">[What is markdown ?](https://www.markdownguide.org/)</a>* </br>
*2.<a name="2">[How to work with git ?](https://git-scm.com/book/en/v2/Getting-Started-The-Command-Line)</a>*

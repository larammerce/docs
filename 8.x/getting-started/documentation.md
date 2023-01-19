## Documentation

[[toc]]

this documentation is going to define the steps of writing docs for larammerce.</br>
larammerce documenting is with *markdown language* *<sup>[1](#1)</sup>* and you should also know about</br> *git commands* *<sup>[2](#2)</sup>* so you can easily start writing docs

### starting point </br>
first of all you have to **fork** `larammerce/larammerce-docs` repository which is already hosted on github.com.</br></br>
then you can modify any change on your own repository after you clone it on your local space.

### quick preview
1) fork the repository on Github
2) switch to the master branch and pull project
   ```bahs
    git checkout master
    git pull
   ```   
     

3) initialize git on the local directory by writing the code below
    ```
    git clone https://github.com/larammerce/larammerce-docs.git 
   ```


4) modify any change via your command line (better) or on Github
5) stage, commit and push your changes
```
git commit -A
```
6) make a pull request with reasonable description
7) wait for the confirmation.
</br></br>
   **Note**: make sure you are on the right exact directory while writing commands in all steps.

 ###requirements
| tool name        | version(distro)                                                       |
|------------------|-----------------------------------------------------------------------|
| operating system | every version of windows,Osx, linux supporting installation of NodeJS |
| NodeJS           | V16 or higher                                                         |




::: warning NODE version support :

please consider that this software runs with no error only with Node version 16. 


install [NodeJS](https://nodejs.org/en/download/)

in order to use a different version follow description below:

1) **_install nvm_**  </br>nvm is a tool which gives you the ability to switch between different versions of Node despite of project's requirements or
2)  **_install [direnv](https://direnv.net/docs/installation.html)_**</br>so can set an environment variable to enable legacy mode by creating a file named .envrc on .gitignore directory including code below :

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```
:::

now you can run your project on `localhost:8080` by running these 2 commands respectively
```bash
npm install
npm run docs:dev
```
now you can see your change results on http://localhost:8080/

start writing your document.<br/><br/>
###there are some writing rules you should follow

####overall structure

your document has to have 3 sections
   1) **introduction**: giving your readership an overall view of the page
   2) writing **technical description** based on markdown structure
   3) doing a **recapitulate**(sum up)

   
####How to write sections and subsections
1) don't use h1 tag in your article. start with h2 and use h3 for subsections.<br/>
2) also never overuse tags because it makes the sidebar crowded and complicated

####How to describe life cycles and road maps
draw a schema when there are steps to follow or you want to show a map or a diagram...
- upload the file on 
```
|---vuepress/
    |---public
 ```

and use markdown on the article to call it.  

####How/When to put the notices, warnings, and danger zone sections

this is the markdown command which allows you to create a notice:
```bash
:::warning/danger/success
your text
::: 
```
you can use it when you want to get your readership's attention.

####How/When to add tables?

use tables when you want to show a list of data<br/>
tables should have
- organized alignments
- clear content
- few columns
- container width

NOTE: don't use a table when you have much explanation or a code sample.

####How to present the paths and directories ?
 create a code block and write pathes in order of main to subs.
```
|---main directory
    |---sub directory1
    |---sub directory2
        |---sub of sub direcroty2
```

####How to present the file names (Addressing the project files) ?

in order to create a new custom block you can modify the file `/path/to/your/docs/.vuepress/theme/styles/custom-blocks/styl` and add the code below to it:
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

####How to present the variables and technical words <br/><br/>
whenever you decided to talk about a technical word, you have to put the technical words inside double graves

####How to describe the methods and classes?
this is the way in which you can write classes in PHP lang:
```php
// app/models/user.php/
class user extend basemodel {
    ...
    private int $id 
    ...
    }
```
NOTE: dots means you have more codes before and after what you write here

####How to write code blocks? <br/>
use 3 graves to create a code block and use labels to show what lang are you using

####Where to put video blocks?
it's better to put it at the end of your article 
1) copy the iframe code of the video
2) paste it at the bottom of your document<br/>


   - you can use video's link instead
   - add a style for its design if you wanted


#### How to write the page references<br/>
write the word or the sentence in this format
```bahs 
*the word or sentence* *<sup>[1](#1)</sup>*
```
and then use the command below to call it and give it a reference
```bash
*1.<a name="1">[write whatever you want](put the link here )</a>*
```

#### How to put links to other documents?
when you are explaning something and it has already been uploaded somewhere, don't start over and take your time. just use the page link.

####How to show the code block outputs?
for example when you want to show the hello world output script, do this:

```bahs
php script.php
# output: hello world
```
or show an api:
# output: 
```
fetch localhost:8080/api/v1/some/test/api
```
n

<iframe src="https://www.aparat.com/video/video/embed/videohash/6et8I/vt/frame"  allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>

##References
---
*1.<a name="1">[what is markdown ?](https://www.w3schools.io/file/markdown-introduction/)</a>* </br>
*2.<a name="2">[how to work with git ?](https://faradars.org/courses/fvgit9609-git-github-gitlab?registered=1)</a>*

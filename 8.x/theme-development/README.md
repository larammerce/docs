---
pageClass: no-toc
---

## :rocket: 5 minute quick start

This document teaches you how to install the Larammerce-base-theme project from GitHub.
And install the Larammerce-base-theme project on Larammerce

::: tip You're not allowed to change the Larammerce code
The Larammerce project is a separate project from Larammerce-base-theme.
For example, if you want to create a project with Larammerce,
You don't need to change the Larammerce code Our team to make your work easier project Larammerce_base_theme provided to you,
And you can use it to personalize your website.
:::
## Install Larammerce-base theme
### To install, first enter the [Larammerce](https://github.com/larammerce)website

![githubLarammerce](/githublarammerce1.png)
And in the next step, you select the code button![Plus button](/codebutton.png)

::: warning Copy one of the codes below:


```bash
git clone git@github.com:larammerce/larammerce-base-theme.git 
```
```bash
git clone https://github.com/larammerce/larammerce-base-theme.git
```
:::
And open your terminal or cmd and paste the code.
After installation, enter Larammerce-base-theme project and enter the following code:
``` 
npm install
```
And in the next step, we enter the following code:
```
git checkout -- .
```
Now your project is ready to work
Open the Larammerce-base-theme project with your IDE *<sup>[1](#1)</sup>*

## Launch Larammerce-base-theme
To work with Larammerce-base-theme
First, create a file called .envrc
```

|---resources/
|---.envrc  
|---.envrc.example

```


And put the following code in the .envrc file:

``` bash
export ECOMMERCE_BASE_PATH=
```
And enter the Larammerce project with the terminal or cmd and find the project address with the pwd command:

![githubLarammerce](/terminalpwd.png)

And copy the project address Place it like the code below:

``` bash
export ECOMMERCE_BASE_PATH=/Users/mohammad/projects/Larammerce
```
If you are using a version other than ``node.js 16`` and ``php 8.0`` Put the following code in the .envrc file:
``` bash
export NODE_OPTIONS=--openssl-legacy-provider
export PATH=/usr/local/lib/php/8.0:$PATH
```
Then save the file and enter this command in the terminal:
``` bash
direnv allow .
```

:::danger If you don't have direnv installed on your system,
Go to [```direnv.net```](https://direnv.net/docs/installation.html) and install it according to your operating system.
:::

The next command will convert sass files to css:
```bash
npm run watch
```
:::warning Development or Production:
Use ``npm run watch`` when programming
and from ``npm run prod`` Use for production
:::


And the last command to put Larammerce-base-theme project On the project Larammerce Is:


```bash
./deploy.sh
```
And finally, enter the Larammerce project and run your local.

## How to import the database file to the Larammerce project.

Sometimes we want to import a SQL file into the Larammerce project database
For example, the retopi_main.sql file To put it in the Larammerce project
go to the terminal or cmd and go to the directory of the SQL file.


::: tip
Create your database with the following command,
and instead of ``your password`` Enter your MYSQL password:
```bash 
mysql -u root -p<your password> -e "create database larammerce_base"
```
:::
And with the next command, all the code of the retopi_main project in Larammerce_base will be pasted.

```bash
 mysql -u root -p<your password> larammerce_base < retopi_main.sql
```
And in the last step, we enter the Larammerce project,
Open the ``.env`` file
and enter your database settings:
![githublarammerce](/Screenshot-.env-sql.png)



Larammerce is using the Laravel framework as its core system and obviously inherits all Laravel features. for example, Larammerce uses Blade (Laravel’s templating engine), to easily create a standard page template, or layout.
The complete directory structure of the template for this project is shown below.

```
|---node_modules/
|---public/
     |---HCMS-assets/
     |---views/
|---resources/
     |---assets/
          |---css
          |---js
          |---sass
|---.envrc
|---.envrc.example
|---.gitignore
|---composer.json
|---deploy.sh
|---mix-manifest.json
|---package.json
|---package-lock.json
|---webpack.mix.js
```
The template directory has two subdirectories, **public** and **resources**, which are the Boilerplate of this project.
>a boilerplate is a unit of writing that can be reused over and over without change.

In the **public** directory, there are two subdirectories, **HCMS-assets** and **views**. and `./deploy.sh` command to deploy the **HCMS-assets** and **views** directories to the backend directory.

```
|---public/
     |---HCMS-assets/
     |---views/
```
And in the **resources** directory there are sass, css, and js files.
```
|--->resources/
     |---assets/
          |---css
          |---js
          |---sass
```


## Create layouts in a few steps.
As you know Larammerce is based on the Laravel framework and creates a layout using the  Blade template engine.

So, let's follow a few steps to create layouts:

First, create the following file `public/views/5-minute.blade.php`

Put the following in the file:
```html
<h1> Hello World! </h1>
```
Then to build the project resource file run:
```bash
npm run watch # to watch for resource file changes and then build and export them after every change.
```
And enter this command to deploy the resources to the backend directory:
```bash
./deploy.sh
```
Open the admin panel in the browser and in the list of directories:

Click the Plus button ![Plus button](/plus-button.png), then create a new folder ![Plus button](/new-folder.png).

The new folder settings are as follows:

![Plus button](/add-new-folder.png)

Enter a **title** and **url section** for this page .
>title: 5 minute quick start

>url section: min-5

Activate the **Show in menu button** and **Show in mobile app button** to display this page in the menu and application, then activate the **Web page button** to connect the blade page.

Finally, click the **Edit webpage button** and select the blade page.

After all you can check to the URL of your web page in a browser and see the page is created with the desired contents:
>https://localhot:8080/min-5

#### Video source
___

<iframe src="https://www.aparat.com/video/video/embed/videohash/fx6sa/vt/frame"  height="300" width="700" style="  border: 2px solid #bdc3c7; border-radius: 5px; opacity: 1;" allowFullScreen="true"></iframe>

<iframe src="https://www.aparat.com/video/video/embed/videohash/6a75J/vt/frame?titleShow=true"  height="300" width="700" style=" margin-top: 15px;  border: 2px solid #bdc3c7; border-radius: 5px; opacity: 1;" allowFullScreen="true"></iframe>

## References

*1.<a name="1"> [What is IDE ?](https://aws.amazon.com/what-is/ide/#seo-faq-pairs#what-is-an-ide) </a>*




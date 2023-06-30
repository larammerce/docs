---
pageClass: no-toc
---

## :rocket: 5 minute quick start

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

> a boilerplate is a unit of writing that can be reused over and over without change.

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

As you know Larammerce is based on the Laravel framework and creates a layout using the Blade template engine.

So, let's follow a few steps to create layouts:

First, create the following file `public/views/5-minute.blade.php`

Put the following in the file:

```html
<h1>Hello World!</h1>
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

> title: 5 minute quick start

> url section: min-5

Activate the **Show in menu button** and **Show in mobile app button** to display this page in the menu and application, then activate the **Web page button** to connect the blade page.

Finally, click the **Edit webpage button** and select the blade page.

After all you can check to the URL of your web page in a browser and see the page is created with the desired contents:

> https://localhot:8080/min-5

#### Video source

---

<iframe src="https://www.aparat.com/video/video/embed/videohash/fx6sa/vt/frame"  height="300" width="700" style="  border: 2px solid #bdc3c7; border-radius: 5px; opacity: 1;" allowFullScreen="true"></iframe>

## Basics

[[toc]]

As you know, Larammerce is based on the [Laravel framework Version 8](https://laravel.com), and if you have seen the files and directory structure of the Larammerce project,
you will notice the similarity, in the **Theme Development** section, *'front-end'* topics such as project theme installation were discussed,
but in the **Core Concepts** section, the Larammerce team examines the *'back-end'* topics of the Larammerce project, so if you wanna know more about the system and dive deeper,
please continue reading this page and other listed documents in the **Core concepts**  index.

In this tutorial, the *'back-end'* basics of the Larammerce project will be explained, so, this document is divided into the following three parts:

**1.** Receive the project

**2.** Project installation

**3.** Directory Structure

::: warning WARNING
The tutorials in this document are based on Laravel **version 8.75**.
:::

Let's take a look at the above:

### Receive the project

**1.** The first step is to get the Larammerce project, which is located in **GitHub** at the address [https://github.com/larammerce/larammerce](https://github.com/larammerce/larammerce).

**2.** At this stage, the Larammerce project should be **cloned** into a directory.

The address of the Larammerce project repository can be obtained in two formats, HTTPS and SSH, on Github.
Also, if you don't want to use git, you can download the Larammerce project as a zip file.

HTTPS format is used here:

```bash
git clone https://github.com/larammerce/larammerce.git
```

:::warning WARNING
If you intend to develop the project, you must create a separate fork for yourself before cloning, and then clone from the created fork.
:::

For how to clone and fork a project, you can refer to [Cloning and forking repositories from GitHub Desktop](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop).

### Project installation

After cloning the project, it is time to install the **requirements** and launch the project, to launch Larammerce needs to install and run the requirements listed in the table below on the system.

Title | Description
------|-----------------
Operation system | gnu/Linux-based operating system (Centos 7 preferred)
Relational database | MySQL 5.7
Interpreter | Php8
WebServer | Apache2/Nginx
Cache DB | Redis
Logs DB | MongoDB
Composer | V2.3.10
Node.js| v16.16.0

:::tip NOTE
Installation of **MongoDB** and **httpd** is not required for deployment.
:::

For more information and how to install the project, see "[installation](https://docs.larammerce.com/8.x/getting-started/installation.html)".

### Directory Structure

The structure of the Larammerce project is the most important part of the training of this document because it will lead to a better understanding of the Larammerce project.

So, let's take a deeper look at the project's directory and file structure.

#### The Root Directory

The root directory structure of the **Larammerce** project is generally as follows:

```php{1}
|---larammerce/
    |---app/
    |---bootstrap/
    |---config/
    |---data/
    |---database/
    |---docs/
    |---public_html/
    |---resources/
    |---routes/
    |---runtimes/
    |---scripts/
    |---storage/
    |---tests/
    |---.editorconfig
    |---.env.example
    |---.gitattributes
    |---.gitignore
    |---artisan
    |---composer.json
    |---composer.lock
    |---composer.phar
    |---docker-compose.yml
    |---package-lock.json
    |---package.json
    |---phpunit.xml
    |---readme.md
    |---server.php
    |---webpack.mix.js
```

#### The App Directory

The `app` directory contains the core code of the application.
Almost all of the classes in the application will be in this directory.

```php{1}
|---app/
    |---Console/
    |---Exceptions/
    |---Http/
    |---Jobs/
    |---Models/
    |---ProtectedModels/
    |---Providers/
    |---TranslationModels/
    |---Utils/
```

##### **Console**
___
The `Console` directory includes commands necessary for Larammerce. It includes a directory named commands, where all the commands are declared with the appropriate signature.
The file `Kernal.php` calls the commands declared in `Inspire.php`.

##### **Exceptions**
___
The `Exceptions` directory contains all the methods needed to handle exceptions. It also contains the file `handle.php` that handles all the exceptions.

#####  **Http**
___
The `Http` folder has sub-folders for `controllers`, `middleware`, and application requests.
Since Larammerce is based on Laravel, it follows the MVC design pattern like Laravel, this folder contains **models**, **controllers**, and  **views** defined for specific directories.

#####  **Jobs**
___
The `Jobs` directory maintains the activities queued for the Laravel  application.
The base class is shared among all the Jobs and provides a central location to place them under one roof.

#####  **Models**
___
The `Model` directory contains Laravel system models that are responsible for connecting to the database. 
This directory is segregated into **enums**, **exceptions**, **globalScopes**, **interfaces**, **traits** and **wp** directories.

#####  **ProtectedModels**
___
The `ProtectedModels` directory contains a product class, this class is sometimes used to get model data.

#####  **Providers**
___
In the `Providers` directory, all the service providers needed to log events for the main servers and configure Larammerce.

#####  **Utils**
___
The `Utils` directory contains all the source code written beyond the Laravel system, that's why we will examine it more deeply.
`Utils` is one of the biggest folds of the Larammerce project, developed by the Larammerce team.

```php{1}
|---Utils/
    |---CMS/
    |---ClassFinder/
    |---Common/
    |---Comparison/
    |---Composer/
    |---DS/
    |---FinancialManager/
    |---Jalali/
    |---Migrator/
    |---NewsletterManager/
    |---OneTimeCode/
    |---PaymentManager/
    |---PushNotification/
    |---Reflection/
    |---SMSManager/
    |---ShipmentService/
    |---Translation/
    |---Validation/
```

The following table explains each of the folders in the Utils directory, let's take an overview.

Num   | Directory           |Description
------|---------------------|-------------
**1** | `CMS`               |Packages related to CMS are developed in this section
**2** | `ClassFinder`       |
**3** | `Common`            |
**4** | `Comparison`        |
**5** | `Composer`          |Composer.json file processing package is developed in this section.
**6** | `DS`                |
**7** | `FinancialManager`  |The financial system management package has been developed in this section.
**8** | `Jalali`            |Jalali dates management package is developed in this section.
**9** | `Migrator`          |The database migration management package has been developed in this section (this package is more intelligent than Maharjet Laravel).
**10**| `NewsletterManager` |The newsletter management package has been developed in this section.
**11**| `OneTimeCode`       |The package for sending disposable codes has been developed in this section.
**12**| `PaymentManager`    |The payment operation management package has been developed in this section.
**13**| `PushNotification`  |The package for sending notifications to different devices has been developed in this section.
**14**| `Reflection`        |
**15**| `SMSManager`        |SMS sending management package has been developed in this section.
**16**| `ShipmentService`   |The product shipping method management package has been developed in this section.
**17**| `Translation`       |The translation management package in the system has been developed in this section.
**18**| `Validation`        |The management package for the validation of roles has been developed in this section.

:::tip NOTE
* These are packages developed by the Larammerce team, but they are not exclusive to the Larammerce project, and it is possible to use them in projects other than Larammerce.
* `Reflection` package separately in Larammerce GitHub with the title 'annotation-parser'
  It is available at the address [https://github.com/larammerce/annotation-parser](https://github.com/larammerce/annotation-parser).
:::

#### The Bootstrap Directory

The `bootstrap` directory contains the `app.php` file which bootstraps the framework.
This directory also houses a **cache** directory which contains framework-generated files for performance optimization such as the route and services cache files.
You should not typically need to modify any files within this directory.

```php{1}
|---bootstrap/
    |---cache/
    |---app.php
    |---autoload.php
```

#### The Config Directory

The `config` directory, as the name implies, contains all of your application's configuration files.
It's a great idea to read through all of these files and familiarize yourself with all of the options available to you, but Later in another document,
the training and review of each of the config directory files will be discussed.

```php{1}
|---config/
    |---cms/
    |---app.php
    |---auth.php
    |---broadcasting.php
    |---cache.php
    |---captcha.php
    |---compile.php
    |---cors.php
    |---database.php
    |---delivery.php
    |---excel.php
    |---filesystems.php
    |---hashing.php
    |---html.php
    |---image.php
    |---jwt.php
    |---location.php
    |---logging.php
    |---mail-notifications.php
    |---mail.php
    |---newsletter.php
    |---pdf.php
    |---queue.php
    |---recaptcha.php
    |---services.php
    |---session.php
    |---translation.php
    |---view.php
    |---wp.php
```

The following files have been developed by the **Larammerce** team and added to the config directory.

* `wp.php`
* `translation.php`
* `pdf.php`
* `newsletter.php`
* `mail-notifications.php`
* `location.php`
* `jwt.php`
* `image.php`
* `html.php`
* `excel.php`
* `delivery.php`
* `captcha.php`

:::danger DANGER
It is very important to remember that the settings in the config directory are system settings related to Laravel, so if the administrator wants to change the settings,
he should refer to the **`.env`** file in the Larammerce project or to the **admin panel**.
:::

#### The Data Directory

The `data` directory is the keeper of Larammerce project metadata, which is different for each project, make sure that all the contents of the data directory are gitignore.

#### The Database Directory

The `database` directory contains your database **migrations**, model **factories**, and **seeds**.

```php{1}
|---database/
    |---factories/
    |---migrations/
    |---seeders/
```

#### The Public_html Directory

The `public` directory contains the `index.php` file, which is the entry point for all requests entering your application and configures autoloading.
This directory also houses your assets such as **images**, **JavaScript**, and **CSS**.

```php{1}
|---public_html/
    |---HCMS-assets/
    |---ResponsiveFilemanager/
    |---admin_dashboard/
    |---primary_data/
    |---uploads/
    |---.htaccess.example
    |---favicon.ico
    |---index.php
    |---manifest.json
    |---web.config
```

##### **HCMS-assets**
___
This directory is divided into **CSS**, **font**, **img**, **js** and **video** directories, in fact, this directory contains the system built theme.

##### **ResponsiveFilemanager**
___
This directory will be dedicated to managing and uploading files in the admin panel in the future.

##### **admin_dashboard**
___
This directory is segregated into **favicon**, **fonts**, **images** and **vendor** directories.

##### **primary_data**
___
This directory in Larammerce stores the logos of the payment portal.

##### **uploads**
___
This directory contains uploaded files and manages these files.
Be careful that its content is gitignore.

##### **.htaccess.example**
___
`.htaccess.example` file an example of the `.htaccess` file is, note that the `.htaccess` file is the apache web services management file,
also, the `.htaccess` file may be different in each project, that's why this file is gitignore, but the `.htaccess.example` file is available.

As an example, let's examine a short piece of code in this file:

```php
    RewriteCond %{REQUEST_FILENAME} !-d # If the request requested from you was not a directory (if it was not a folder address),
    RewriteCond %{REQUEST_FILENAME} !-f # And if the requested request was not a file,
    RewriteRule ^ index.php [L]  # Transfer the request address directly to the index.php` file.
```

:::tip NOTE
The most important thing about the Laravel projects is to put the `.htaccess` file according to Laravel configurations in the document root of the project,
so as there is an example file for this use, you can just copy and modify it:

```bash
cd public_html
cp .htaccess.example .htacces
```
:::

#### **The Resources Directory**

The resources directory contains **views** *<sup>[1](#1)</sup>* as well as raw and uncompiled resources, such as **SASS**, **CSS** or **JavaScript**.
This directory also contains all your language files.

```php{1}
|---resources/
    |---assets/
    |---fonts/
    |---hc-template/
    |---lang/
    |---views/
```

##### **assets**
___
The `assets` directory separated from **coffee**, **js** and **sass** folders.

Let's dig a little deeper into this directory:

**1.** coffee

The `coffee` directory contains a **CoffeeScript** file.

:::tip NOTE
CoffeeScript is a little language that compiles into JavaScript.

For more information, you can refer to [introduction](https://coffeescript.org/#introduction).
:::

**2.** js

The `js` directory contains JavaScript files developed by the **Larammerce team**. The `js` directory is separated from the **define** and **require** folders. In the following tutorials,
we will examine the files of both folders in more depth.

`JavaScript` files that are defined in the **define** folder are tools for creating new features in the admin panel that make it unnecessary to write *'front-end'* code.


**3.** sass

All `CSS` files that are in `.scss` format are kept in this directory, it also includes a `vendor` folder.
Since all the styles of the project are written with `sass`, knowing `sass` is required to change the front of the Larammerce project.


##### **fonts**
___
The `font` directory contains the Larammerce project font files, currently, the Larammerce project has the following font files:

* `BYekan.ttf`
* `IRANSansWeb.ttf`
* `IRANSansWeb_Bold.ttf`
* `IRANSansWeb_Medium.ttf`
* 
##### **hc-template**
___


##### **lang**
___


##### **views**
___
The `views` directory contains all views of the Larammerce project. This directory is separated from **admin**, **auth**, **developer**, **errors**, **public** and **vendor**.

#### The Routes Directory

The `routes` directory contains all of the route definitions for your application. By default, several route files are included with Laravel: 
`web.php`, `api.php`, `console.php`, and `channels.php`.

```php{1}
|---routes/
    |---api.php
    |---channels.php
    |---console.php
    |---web.php
```

#### The Runtimes Directory

The `runtime` directory is related to the dockerization of the Larammerce project.

```php{1}
|---runtimes/
    |---nginx/conf.d/
    |---php-cli/
    |---php-fpm/
```

#### The Scripts Directory

The `script` directory is separated from **bash** and **python**, the scripts needed to run and modify the Larammerce project are kept in this directory.

```php{1}
|---scripts/
    |---bash/
    |---python/
```

#### The Storage Directory

The storage directory contains your logs, compiled Blade templates, file-based sessions, file caches, and other files generated by the framework.
This directory is segregated into **app**, **debugbar**, **framework**, **logs** and **tmp** directories.
The **app** directory may be used to store any files generated by your application.
The **framework** directory is used to store framework-generated files and caches.
Finally, the **logs** directory contains your application's log files.

```php{1}
|---storage/
    |---app/
    |---debugbar/
    |---framework/
    |---logs/
    |---tmp/
```

#### The Tests Directory

The `tests` directory contains your automated tests.

```php{1}
|---tests/
    |---Browser/
    |---Feature/
    |---Unit/
    |---CreatesApplication.php
    |---TestCase.php
```

#### The composer.json File

The most important and basic part of the Larammerce project is the `composer.json` file,
which includes dependencies and `PHP` packages installed by the Larammerce team, please note that two autoload files that are helper functions have also been added to this section.

```php{10-47,64-65}
{
    "name": "laravel/laravel",
    "description": "The Laravel Framework.",
    "keywords": [
        "framework",
        "laravel"
    ],
    "license": "MIT",
    "type": "project",
    "require": {
        "php": "8.0.*",
        "ext-bcmath": "*",
        "ext-curl": "*",
        "ext-imagick": "*",
        "ext-json": "*",
        "ext-pdo": "*",
        "ext-simplexml": "*",
        "ext-soap": "*",
        "ext-xml": "*",
        "ext-redis": "*",
        "ext-mongodb": "*",
        "ext-gd": "*",
        "ext-mbstring": "*",
        "albertcht/invisible-recaptcha": "^1.8",
        "barryvdh/laravel-debugbar": "^3.2",
        "bordoni/phpass": "dev-main",
        "doctrine/dbal": "^3.1",
        "fideloper/proxy": "^4.0",
        "fruitcake/laravel-cors": "^2.0",
        "guzzlehttp/guzzle": "^7.0.1",
        "intervention/image": "^2.4",
        "ixudra/curl": "^6.16",
        "jenssegers/mongodb": "^3.8",
        "laravel/framework": "^8.75",
        "laravel/sanctum": "^2.11",
        "laravel/tinker": "^2.5",
        "laravel/ui": "^3.3",
        "maatwebsite/excel": "^3.1",
        "mailerlite/mailerlite-api-v2-php-sdk": "^0.3.2",
        "niklasravnsborg/laravel-pdf": "^4.1",
        "phpseclib/phpseclib": "^2.0",
        "predis/predis": "~1.0@dev",
        "riverskies/laravel-mobile-detect": "^1.3",
        "stevebauman/location": "^6.1",
        "tymon/jwt-auth": "1.0.*@dev",
        "yangqi/htmldom": "dev-master"
    },
    "require-dev": {
        "facade/ignition": "^2.5",
        "fakerphp/faker": "^1.9.1",
        "laravel/sail": "^1.0.1",
        "mockery/mockery": "^1.4.4",
        "nunomaduro/collision": "^5.10",
        "phpunit/phpunit": "^9.5.10"
    },
    "autoload": {
        "psr-4": {
            "App\\": "app/",
            "Database\\Factories\\": "database/factories/",
            "Database\\Seeders\\": "database/seeders/"
        },
        "files": [
            "app/Utils/Common/helpers.php",
            "app/Utils/CMS/Template/helpers.php",
            "app/Utils/CMS/Platform/helpers.php"
        ]
    },
    "autoload-dev": {
        "psr-4": {
            "Tests\\": "tests/"
        }
    },
    "scripts": {
        "post-autoload-dump": [
            "Illuminate\\Foundation\\ComposerScripts::postAutoloadDump",
            "@php artisan package:discover --ansi"
        ],
        "post-update-cmd": [
            "@php artisan vendor:publish --tag=laravel-assets --ansi"
        ],
        "post-root-package-install": [
            "@php -r \"file_exists('.env') || copy('.env.example', '.env');\""
        ],
        "post-create-project-cmd": [
            "@php artisan key:generate --ansi"
        ]
    },
    "extra": {
        "laravel": {
            "dont-discover": [
            ]
        }
    },
    "config": {
        "optimize-autoloader": true,
        "preferred-install": "dist",
        "sort-packages": true,
        "allow-plugins": {
            "composer/package-versions-deprecated": false
        }
    },
    "minimum-stability": "dev",
    "prefer-stable": true
}
```

#### Reference
___

*1. <a name="1">[What Is View?](https://laravel.com/docs/8.x/views)</a>*

#### Video source
___

<iframe src="https://www.aparat.com/video/video/embed/videohash/pVDIf/vt/frame" height="300" width="700" style="  border: 2px solid #bdc3c7;
border-radius: 5px; opacity: 1;" ></iframe>
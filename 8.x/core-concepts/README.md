## Basics

[[toc]]

As you know, Larammerce is based on the [Laravel framework](https://laravel.com), and if you have seen the files and directory structure of the Larammerce project,
you will notice the similarity, In the **Theme Development** section, *'front-end'* topics such as project theme installation were discussed,
but in the **Core Concepts** section, the Larammerce team examines the *'back-end'* topics of the Larammerce project, so if you wanna know more about the system and dive deeper,
please continue reading this page and other listed documents in the **Core concepts**  index.

In this tutorial, the *'back-end"* basics of the Larammerce project will be explained, so, this document is divided into the following three parts:

**1.** Receive the project

**2.** Project installation

**3.** Directory Structure

let's take a look at the above:

### Receive the project

**1.** The first step is to get the Larammerce project, which is located in GitHub at the address [https://github.com/larammerce/larammerce](https://github.com/larammerce/larammerce).

**2.** At this stage, the Larammerce project should be cloned into a directory.

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

After cloning the project, it is time to install the **requirements** and launch the project, to launch Larammerce need to install and run the requirements listed in the table below on the system.

Title | Description
------|-----------------
Operation system | gnu/Linux-based operating system (Centos 7 preferred)
Relational database | MySQL 5.7
Interpreter | Php8
WebServer | Apache2/Nginx
Cache DB | Redis
Logs DB | MongoDB
composer | V2.3.10
Node.js| v16.16.0

:::tip NOTE
Installation of **MongoDB** and **httpd** is not required for deployment.
:::

For more information and how to install the project, see "[installation](https://docs.larammerce.com/8.x/getting-started/installation.html)".

### Directory Structure

The structure of the Larammerce project is the most important part of the training of this document because it will lead to a better understanding of the Larammerce project.

So, let's take a deeper look at the project's directory and file structure.

#### The Root Directory

The root directory structure of the **Larammerce** project is generally as follows

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
almost all of the classes in the application will be in this directory.

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

1. Console
2. Exceptions
3. Http
4. Jobs
5. Models
6. Providers
7. TranslationModels

#### The Bootstrap Directory

The `bootstrap` directory contains the `app.php` file which bootstraps the framework.
This directory also houses a `cache` directory which contains framework generated files for performance optimization such as the route and services cache files.
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
The following files have been developed by **Larammerce** team and added to the config directory.

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


#### The Database Directory

The `database` directory contains your database migrations, model factories, and seeds.

```php{1}
|---database/
    |---factories/
    |---migrations/
    |---seeders/
```

1. factories
2. migrations
3. seeders

#### The Docs Directory


```php{1}
|---docs/
    |---features/
    |---reports/
    |---deployment-notes.md
    |---fin-man-webservices.md
    |---hinza_ecommerce.gliffy
    |---roles.md
    |---update_demo_sever.md
```

1. features
2. reports
3. deployment-notes.md
4. fin-man-webservices.md
5. hinza_ecommerce.gliffy
6. roles.md
7. update_demo_sever.md

#### The Public_html Directory

The `public` directory contains the `index.php` file, which is the entry point for all requests entering your application and configures autoloading.
This directory also houses your assets such as images, JavaScript, and CSS.

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

1. HCMS-assets
2. ResponsiveFilemanager
3. admin_dashboard
4. primary_data
5. uploads
6. .htaccess.example
7. favicon.ico
8. index.php
9. manifest.json
10. web.config

#### The Resources Directory

The `resources` directory contains your **views** *<sup>[1](#1)</sup>* as well as your raw, un-compiled assets such as CSS or JavaScript.

```php{1}
|---app/
    |---assets/
    |---fonts/
    |---hc-template/
    |---lang/
    |---views/
```

1. assets
2. fonts
3. hc-template
4. lang
5. views

#### The Routes Directory

The `routes` directory contains all of the route definitions for your application. By default, several route files are included with Laravel: `web.php`, `api.php`, `console.php`, and `channels.php`.

```php{1}
|---routes/
    |---api.php
    |---channels.php
    |---console.php
    |---web.php
```

1. api.php
2. channels.php
3. console.php
4. web.php

#### The Runtimes Directory


```php{1}
|---runtimes/
    |---nginx/conf.d/
    |---php-cli/
    |---php-fpm/
```

1. nginx/conf.d
2. php-cli
3. php-fpm

#### The Scripts Directory


```php{1}
|---scripts/
    |---bash/
    |---python/
    |---sql/
    |---general.regex
```

1. bash
2. python
3. sql
4. general.regex

#### The Storage Directory

The storage directory contains your logs, compiled Blade templates, file based sessions, file caches, and other files generated by the framework.
This directory is segregated into `app`, `debugbar`, `framework`, `logs` and `tmp` directories.
The `app` directory may be used to store any files generated by your application.
The `framework` directory is used to store framework generated files and caches.
Finally, the `logs` directory contains your application's log files.

```php{1}
|---storage/
    |---app/
    |---debugbar/
    |---framework/
    |---logs/
    |---tmp/
```

1. app
2. debugbar
3. framework
4. logs
5. tmp

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

1. Browser
2. Feature
3. Unit
4. CreatesApplication.php
5. TestCase.php

#### The .editorconfig File

#### The .env.example File

#### The .gitattributes File

#### The .gitignore File

#### The artisan File

#### The composer.json File

#### The composer.lock File

#### The composer.phar File

#### The docker-compose.yml File

#### The package-lock.json File

#### The package.json File

#### The phpunit.xml File

#### The readme.md File

#### The server.php File

#### The webpack.mix.js File



#### Reference
___

*1. <a name="1">[What Is View?](https://laravel.com/docs/9.x/views)</a>*
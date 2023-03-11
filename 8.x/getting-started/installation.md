## installation
Larammerce is an open-source ecommerce platform that helps business owners to focus on their concerns and just have the whole complete solution for their online market.

It's been built on top of [Laravel framework](https://laravel.com) which is open source and free to use.

This guide is a comprehensive resource for both development and production environment setup. We welcome your contributions to Larammerce!


Note: The instruction of development is based on Linux/Ubuntu22.04, and the instruction of production is based in linux/CentOS7.

---

## Development installation guide

To develop on Larammerce project, sufficient knowledge of `PHP` and `Laravel framework` is vital. Follow requirements and setup instructions demonstrated in this article. 

### Requirements


| Title |  Description |
|-----------|-------------------|
| Operation system | linux |
| Linux distribution | Ubuntu 22.04 |
| Relational database | MySQL5.7 or higher|
| Interpreter | PHP version 8.0 |
| Node.js | Version 16 (Recomended)|
| Package manager | Composer |
| Cache DB| Redis |
 
---


#### Install linux and ubuntu

However `PHP` is already a cross-platform language and doesn't need a unique platform; Still, to extend Larammerce project scripts and develop them, you must be running a *`Linux`* *<sup>[1](#1)</sup>* operation system or a *`WSL`* *<sup>[2](#2)</sup>* (Windows Subsystem for Linux) on your windows due to the lateral scripts involved with this project.

If you are already using linux, please install `Ubuntu` distro, and if using `WSL`, no need to do extra! By default, the installed Linux distribution will be Ubuntu.

**Note:** Rather than other distros,`Ubuntu` is ideal for early adopters, is more reliable and has community support and complete documantation.


Here we assume you have Ubuntu distribution either on your `Linux` or `WSL`.

Once you finalized these installations, open powershell or wsl shell and write the command `lsb_release -a ` just to check your current operating system info.
Also by running ` df -h ` you will be able to see your storage details.

::: warning Administration warning

Consider that if you are in administration mode `(#)` in your powershell you have to really watch out about the commands you commit. For safety, its better to commit as a regular user`($)`.

:::


---

#### Install MySQL 5.7 (oracle) 


- To install MySQL on Linux OS, follow instruction demonstrated in [this page](https://www.devart.com/dbforge/mysql/how-to-install-mysql-on-ubuntu/).

- To install MySQL on wsl, download MySQL for windows from [here](https://dev.mysql.com/downloads/mysql/5.7.html).

Once you installed MySQL, create a database so to connect it to the project. 

---

#### Install php 8.0 

You can follow php installation guide from this [link](https://medium.com/@laraveltuts/how-to-install-and-run-php-8-x-on-ubuntu-20-04-8f18e7565c41) or just follow steps below:

First, optimize repositories management by running the following command:

``` bash
sudo apt install software-properties-common
```

Now add `PHP PPA` to get access to new packages and be able to download php8.0: 

```
sudo add-apt-repository ppa:ondrej/php
```

Running the command below displayes the latest available packages list:

```
sudo apt update
```

And as the final step, use this command to install php. All future launches should take less than 1 minute.

```
sudo apt install php8.0 php8.0-bcmath php8.0-mysql php8.0-pdo php8.0-mbstring php8.0-curl php8.0-imagick php8.0-simplexml php8.0-soap php8.0-xml php8.0-redis php8.0-mongodb php8.0-gd php8.0-zip
```
We're done here !

---

#### Install Node.js

According to the need of the project we tend to install node.js version 16.

```
curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh
```
As the installation is finalized, run this script to check whether the correct commands are being passed to your package manager based on distro and version requirements:

```
vim nodesource_setup.sh
```

If it integrates well, exit the text editor and run the script with `sudo`:

```
sudo bash nodesource_setup.sh
```
Now execute this command to install nodejs:

```
sudo apt install nodejs
```

Run the following commands to install `Node.js` packages build the resource files:

```
npm install
npm run prod
```

---

#### Install composer 

Execute commands below to install composer as dependency management tool:

```
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === '55ce33d7678c5a611085589f1f3ddf8b3c52d662cd01d4ba75c0ee0459970c2200a51f492d557530c71c15d8dba01eae') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"

```
```
sudo mv composer.phar /usr/local/bin/composer
```
To check the installed version run:

```
composer -v
``` 

---

#### Install redis

Redis provides data structures, is an in-memory data structure store, is a cache broker, and is needed for this project:

To install redis, run:

```
sudo apt install redis
```
**Note:** Redis needs to be enabled. There would be a instructio for enabling redis in setup section.

All the development requirements installation is done. you can now setup Larammerce project.

---

## Production installation guide

Larammerce has its stack of technologies and utilities as described below:

**Apache** as a web server, **MySQL** version 5.7 as the main relational database, **Redis** database as the cache layer and session management, and **MongoDB** as the log saving database.

---




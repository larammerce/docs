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

### Requirements

Title | Description
------|-----------------
Operation system | gnu/Linux-based operating system (Centos 7 preferred)
Relational database | MySQL 5.7
Interpreter | Php8
WebServer | Apache2/Nginx
Cache DB | Redis
Logs DB | MongoDB
Mail Server | any SMTP server
| Package manager | Composer |

**Note 1:** In the following part, we are going to run the operating system commands in an interactive shell. Please note that all the commands are executing by the **root** user, if not, you should run them by a sudoer user and prepend **sudo** before every command.

**Note 2:** Installation of MongoDB is not required for deployment.

---
#### OS requirements

As every application has its tools and requirements, Larammerce requires some of them as listed below, to install them follow the instructions.

- Install the `JSON` processor running command below:

```bash
yum install jq
```
- Run the following command to install direnv:

```bash
curl -sfL https://direnv.net/install.sh | bash
```
- Then add the following line at the end of the ~/.bashrc file:

```bash
eval "$(direnv hook bash)"
```
---

#### Install HTTPD (Apache2 web server)

To install apache2 on Centos you have to run the command below:

```bash
yum install httpd
systemctl enable httpd # Make the os to load httpd on startup.
systemctl start httpd # Start the httpd service in the background.
```

As the `apache` user crated by `httpd` has no access to the system shell, run the command below to solve this issue:

```bash
vim /etc/passwd # open the passwd file to modify it.
```

To change the default shell and home directory for the `apache` user open the passwd file and apply the following changes:

```bash
apache:x:48:48:Apache:/var/www:/bin/bash # change the /bin/nologin to /bin/bash or any other desired shell. 
```

Then set a password for the apache user.

```bash
passwd apache # Enter the desired password twice for this command.
```
Once the password got set, login as the Apache user with the following command:

```bash
su - apache
```

Modify the current configurations for the httpd:

```
vim /etc/httpd/conf/httpd.conf
```

Find and replace all the `/var/www/html` with the `/var/www/larammerce/public_html`:

```bash
:%s/\/var\/www\/html/\/var\/www\/larammerce\/public_html/g
```

And after all, restart the httpd daemon:

```bash
systemctl restart httpd
```
---

#### Install Node.js and npm

As Larammerce is using the Laravel framework as its core system, inherits all the Laravel features. For example, Larammerce uses nodejs to build its resource bundles and minify them.


In the root user run the following curl command to add the NodeSource yum repository to your system:

```bash
curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -
```
**Note:** According to the need of the project we tend to install node.js version 16.

Once the NodeSource repository is enabled, install Node.js and npm by typing:

```bash
sudo yum install nodejs
``` 

Run the following command to install node requirements:

```bash
cd larammerce
npm install
```
Then run this command to build the resource files:

```bash
npm run prod # In addition to prod parameter there are some alternatives like 'dev' and 'watch' which for more information you have to refer to laravel/mix projec docs.
```
---

#### Install MySQL 5.7

As Larammerce is used for production and stable versions of dependencies are needed to be used, the preferred version of Oracle/Mysql is 5.7.

First, we need to enable MySQL 5.7 community to release the "yum" repository on the system.

As the root user run the following command:

```bash
yum localinstall https://dev.mysql.com/get/mysql57-community-release-el7-9.noarch.rpm
```

As you successfully finalized enabling MySQL yum repository on your system, install MySQL 5.7 community server with its other dependencies using the following commands:

```bash
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022 #loding the key
yum install mysql-community-server
```
During the installation process of packages, a temporary password will be created and will be placed in MySQL log files. Follow these steps to find your temporary MySQL password:

- Start the MySQL Service and enable it:
  
```bash
systemctl enable mysqld
systemctl start mysqld 
```

- Now run the following command to get the temporary root password:

```bash
grep 'A temporary password' /var/log/mysqld.log |tail -1 
```

Output sample :

```bash
2017-03-30T02:57:10.981502Z 1 [Note] A temporary password is generated for root@localhost: Nm(!pKkkjo68e
```

- You may have to change the password. To do so run the following command:

```bash
mysql_secure_installation # After running this command the process will begin, enter the copied password, and set the desired configurations according to demands.
```
You can create a new database with the following command:

```bash
mysql -u root -p -e "create database larammerce_main"
```

---

#### Install Redis

Larammerce project uses Redis for some sections, for example, its queue management system, cache server, and session storage.

As the root user run the following command to install the Redis package:

```bash
yum install redis
systemctl enable redis
systemctl start redis
```
---

#### Install php 8.0

As Centos is based on the stable version of packages, its default repositories do not contain php8.0.
To install php8.0 you have to add the `Remi` repo to your list of repositories.
Follow the steps below:

- Add the yum repo by running the following command:

```bash
rpm -Uvh https://rpms.remirepo.net/enterprise/remi-release-7.rpm
```


- Open/Modify the remi-php80.repo file and edit this repository:

```bash
cd /etc/yum.repos.d
vim remi-php80.repo # In the file change the value of the `enable` variable to enable = 1 
```


- Update the list of repositories and existing packages:

```bash
yum update
```


- Install php:

```bash
yum install php
``` 

- To install Larammerce necessary php extensions , run:

```bash
yum install php-bcmath php-mysql php-pdo php-mbstring php-curl php-imagick php-json php-simplexml php-soap php-xml php-redis php-mongodb php-gd php-zip
```

---

#### Install MongoDB 

By default, MongoDB is used as the logs 'DB' for the Larammerce system.
To install mongoDB:

- Create/Modify the following file `/etc/yum.repos.d/mongodb-org-4.4.repo`.

```bash
vim /etc/yum.repos.d/mongodb-org-4.4.repo
```
- Put the following in the file and then save it:

```repo
[mongodb-org-4.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.4.asc
```
- To install the latest stable version of MongoDB, issue the following command:

```bash
yum install -y mongodb-org
```
- Start the mongod process by executing the command below:

```bash
systemctl enable mongod
systemctl start mongod
```
---

#### Install composer

Composer is an application-level package manager for the php programming language that provides a standard format for managing dependencies of php software and required libraries.

First, in the root user install the PHP CLI (command line interface) package and all other dependencies with:

```bash
yum install php-cli php-zip wget unzip
```
Once PHP CLI is installed, download the composer installer script with:

```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
```
The command above will download the composer-setup.php file in the current working directory.

To verify the data integrity of the script, compare the script SHA-384 hash with the latest installer hash found on the Composer Public Keys / Signatures page.

The following wget command will download the expected signature of the latest Composer installer from the Composer’s Github page and store it in a variable named `HASH`:

```bash
HASH="$(wget -q -O - https://composer.github.io/installer.sig)"
```
To verify that the installation script is not corrupted run the following command:

```bash
php -r "if (hash_file('SHA384', 'composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
```
Run the following command to install Composer in the /usr/local/bin directory:

```bash
php composer-setup.php --install-dir=/usr/local/bin --filename=composer
```
Run the following command to install Composer dependencies:

```bash
composer install
```
--- 


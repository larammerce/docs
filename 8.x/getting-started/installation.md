# Installation

[[toc]]


Larammerce is an open-source ecommerce platform that helps business owners to focus on their concerns and just have the whole complete solution for their online market.

It's been built on top of [Laravel framework](https://laravel.com) which is open source and free to use.

This guide is a comprehensive resource for both development and production environment setup. We welcome your contributions to Larammerce!


**Note:** The instruction for development is based on Ubuntu 22.04, and the instruction for production is based on CentOS 7.

As you are going to work on linux consider this alert:

## Development installation guide

To develop the Larammerce project, sufficient knowledge of `PHP` and `Laravel framework` is vital. Follow the requirements and setup instructions demonstrated in this article. 

### Requirements


| Requirement |  Details |
|-----------|-------------------|
| Operating system | GNU/Linux (Ubuntu 22.04 Recomended) |
| Relational database | MySQL 5.7 or higher|
| Interpreter | PHP version 8.0 |
| Node.js | Version 16 (Recomended)|
| Package manager | Composer |
| Cache DB| Redis |
 
---

### Environment setup

:::tip
This tutorial assumes you have a **raw Ubuntu** distro on your Linux kernel. You are free to use your preffered distribution, but consider changing commands based on your distro structure.
:::

#### OS requirements

However `PHP` is already a cross-platform language and doesn't need a specific platform; Still, to extend Larammerce project scripts and develop the project, you must have the *`Linux`* *<sup>[1](#1)</sup>* kernel or the *`WSL`* *<sup>[2](#2)</sup>* (Windows Subsystem for Linux) on your windows due to the lateral scripts involved with this project.


:::danger Potential Risk of Root User Mode in Linux

There are two different user modes in Linux: the root user and the regular user. If you are in root mode, you must be careful because you have superuser privileges, which can lead to accidentally deleting critical files or causing other problems. For safety, it's better to remain in regular mode whenever possible.
 
:::

 ![Linux root user](/rootuser.png)


---

#### Install MySQL 5.7 (oracle) 

Due to security issues, oracle released version of MySQL is recommended for businesses.

To install MySQL on Ubuntu, follow instruction demonstrated in [this page](https://ubuntu.com/server/docs/databases-mysql) or follow steps bellow:

Download the MySQL repository by executing the following command:

```bash
wget https://dev.mysql.com/get/mysql-apt-config_0.8.12-1_all.deb
```

Now install MySQL package:
```bash
sudo dpkg -i mysql-apt-config_0.8.12-1_all.deb
```

Now update the apt repository:
```bash
sudo apt update
```

Facing GPG error? No worries you have to set a public key to resolve this error. To do so run the following command:

```bash
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 467B942D3A79BD29
```

execute the apt update again:

```bash
sudo apt update
```

To check whether MySQL 5.7 repository has been successfully installed, execute:
```bash
sudo apt-cache policy mysql-server
```
You should see MySQL 5.7 repository at the bottom of the displayed list.



Now install MySQL 5.7 :
```bash
sudo apt install -f mysql-client=5.7* mysql-community-server=5.7* mysql-server=5.7*
```


Before starting to use MySQL 5.7, you need to secure it first:
```bash
sudo mysql_secure_installation
```
Provide a password and answer the security questions.

**Enable MySQL:**

Run this command to enable MySQL on Linux:
```bash
sudo systemctl enable mysql
```
Now start MySQL :
```bash
sudo systemctl start mysql
```
You may need to restart MySQL in order to apply updates or make configuration modifications:

```bash
sudo systemctl restart mysql
```

- If you are working with WSL, it is recommended to download the windows version of MySQL from [here](https://dev.mysql.com/downloads/mysql/5.7.html).

Once you installed MySQL, create a database so to connect the project to a database:

```bash
mysql -u root -p -e "create database <database name>"
```
---

#### Install php 8.0 

To install php 8.0 on Ubuntu follow steps below:

- First, retrieve the list of system packages and dependencies to the latest available version:
```bash
sudo apt update
```

- Second, optimize repositories management by running the following command:

``` bash
sudo apt install software-properties-common
```

- Now add `PHP PPA` to get access to new php packages and be able to download php 8.0: 

```bash
sudo add-apt-repository ppa:ondrej/php
```

- And as the final step, use this command to install php 8.0:

```bash
sudo apt install php8.0 php8.0-bcmath php8.0-mysql php8.0-pdo php8.0-mbstring php8.0-curl php8.0-imagick php8.0-simplexml php8.0-soap php8.0-xml php8.0-redis php8.0-mongodb php8.0-gd php8.0-zip
```
We're done here !

---

#### Install jq

To install the `JSON` processor run the command below:

```bash
sudo apt install jq
```
---
#### Install Node.js

According to the need of the project we tend to install node.js version 16.

```
curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh
```

Run the script with sudo:

```
sudo bash nodesource_setup.sh
```
By running the above command, the PPA will be added to your configuration and your local package cache will be updated automatically.

Now execute this command to install nodejs:

```
sudo apt install nodejs
```

---

#### Install composer 

Composer is a dependency management tool. Follow download instructions step by step:

- First, download the installer to the current directory:
```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
```
If you have any security concerns, verify the installer SHA-384 by following the instructions composed on [composer.com](https://getcomposer.org/download/).

- Second, run the installer:
```bash
php composer-setup.php
```

- Third, remove the installer:
```bash
php -r "unlink('composer-setup.php');"
```
Now move the file to this directory of your path:
```bash
sudo mv composer.phar /usr/local/bin/composer
```
To check the installed version run:

```bash
composer -v
``` 

---

#### Install redis

Redis is an in-memory data structure store, used as a distributed, in-memory key–value database, cache and message broker, with optional durability.

To install redis, run:

```bash
sudo apt install redis
```
**Enable Redis**

Run this command to enable Redis on Linux:
```bash
sudo systemctl restart redis-server
```

If using WSL, consider you should execute this script every time you start the windows to initialize Redis:
```bash
/etc/init.d/redis-server start
``` 



All the development requirements installations are done. you can now [setup Larammerce project](#setup-larammerce-project).

---

## Production installation guide

This section provides procedures for installing the Larammerce project for the production environment.
The tutorial is based on `CentOS 7`. you are free to choose your preffered distro, but consider changing command structures based on your distro.

### Requirements

Requirement | Details
------|-----------------
Operating system | gnu/Linux-based (CentOS 7 preferred)
Relational database | MySQL 5.7
Interpreter | Php8
WebServer | Apache2/Nginx
Cache DB | Redis
Logs DB | MongoDB
Mail Server | any SMTP server
| Package manager | Composer |

---


**Note:** Installation of MongoDB is not required for deployment.


### Environment setup

:::danger Potential Risk of Root User Mode in Linux

There are two different user modes in Linux: the root user and the regular user. If you are in root mode, you must be careful because you have superuser privileges, which can lead to accidentally deleting critical files or causing other problems. For safety, it's better to remain in regular mode whenever possible.
 
:::

 ![Linux root user](/rootuser.png)


#### Install jq

- Install the `JSON` processor running command below:

```bash
sudo yum install jq
```
---


#### Install HTTPD (Apache2 web server)

To install apache2 on CentOS you have to run the command below:

```bash
sudo yum install httpd
```

Enable and start the HTTPD service in Linux:

```
systemctl enable httpd 
systemctl start httpd 
```

As the `apache` user crated by `httpd` has no access to the system shell, you have to manualy get the permission.

Open the passwd file with your editor:

```bash
vim /etc/passwd 
```

To change the default shell and home directory for the `apache` user open the passwd file and change the `/bin/nologin` to `/bin/bash` or any other desired shell.:

```bash
apache:x:48:48:Apache:/var/www:/bin/bash 
```

Then set a password for the apache user.

```bash
passwd apache your_password
```
Once you set a password, login as the Apache user with the following command:

```bash
su - apache
```

In order to odify the current configurations for the httpd, Open the `httpd.conf` file:

```
vim /etc/httpd/conf/httpd.conf
```

Find and replace all the `/var/www/html` with the `/var/www/larammerce/public_html`:

```bash
:%s/\/var\/www\/html/\/var\/www\/larammerce\/public_html/g
```
Note: The above command is for replacing path in search field using VIM. May be different in your text editor.

And after all, restart the httpd daemon:

```bash
systemctl restart httpd
```
---

#### Install Node.js 

As Larammerce is using the Laravel framework as its core system, inherits all the Laravel features. For example, Larammerce uses nodejs to build its resource bundles and minify them.


In the root user run the following curl command to add the NodeSource yum repository to your system:

```bash
curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -
```
**Note:** According to the need of the project we tend to install node.js version 16.

Now install Node.js:

```bash
sudo yum install nodejs
``` 

---

#### Install MySQL 5.7

As Larammerce is used for production and stable versions of dependencies are needed to be used, the preferred version of Oracle/Mysql is 5.7 due to security issues.

First, add the MySQL Yum repository to your system's repository list.This is a one-time operation, which can be performed by installing an RPM provided by MySQL:

```bash
sudo yum localinstall https://dev.mysql.com/get/mysql57-community-release-el7-9.noarch.rpm
```

RPM packages have a built-in GPG signature. Import the MySQL public build key into your own GPG keyring directly from a URL by this command:

```bash
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022 
```
Install MySQL by the following command:

```bash
sudo yum install mysql-community-server
```
This installs the package for MySQL server (mysql-community-server) and also packages for the components required to run the server, including packages for the client (mysql-community-client), the common error messages and character sets for client and server (mysql-community-common), and the shared client libraries (mysql-community-libs).


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

Output sample:

```bash
2017-03-30T02:57:10.981502Z 1 [Note] A temporary password is generated for root@localhost: Nm(!pKkkjo68e
```

- You may have to change the password. To do so run the following command:

```bash
mysql_secure_installation 
```
After running this command the process will begin, enter the copied password, and set the desired configurations according to demands.

You can create a new database with the following command:

```bash
mysql -u root -p -e "create database larammerce_main"
```

---

#### Install Redis

Larammerce project uses Redis for some sections, for example, as its queue management system, cache server, and session storage.

As the root user run the following command to install the Redis package:

```bash
sudo yum install redis
systemctl enable redis
systemctl start redis
```
---

#### Install php 8.0

As CentOS is based on the stable version of packages, its default repositories do not contain php 8.0.
To install php 8.0 you have to add the `Remi` repo to your list of repositories.
Follow the steps below:

- Add the yum repo by running the following command:

```bash
rpm -Uvh https://rpms.remirepo.net/enterprise/remi-release-7.rpm
```


- Open the `remi-php80.repo` file and edit this repository. In the fileو change the value of the `enable` variable to `enable=1`.


```bash
cd /etc/yum.repos.d
vim remi-php80.repo  
```

- Update the list of repositories and existing packages:

```bash
sudo yum update
```

- Install php:

```bash
sudo yum install php
``` 

- To install Larammerce necessary php extensions , run:

```bash
sudo yum install php-bcmath php-mysql php-pdo php-mbstring php-curl php-imagick php-json php-simplexml php-soap php-xml php-redis php-mongodb php-gd php-zip
```
---

#### Install MongoDB 

By default, MongoDB is used as the logs 'DB' for the Larammerce system.
To install mongoDB follow these steps:

- Create the following file `/etc/yum.repos.d/mongodb-org-4.4.repo`.

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
**Note:** To add the repository information for the latest stable release to the file, visit the [install on Red Hat](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-red-hat/#configure-the-package-management-system-yum) section of MongoDB’s documentation.

- To install the latest stable version of MongoDB, issue the following command:

```bash
sudo yum install -y mongodb-org
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
To verify that the installation script is not corrupted run the following command.This command compares the official hash against the one you’ve downloaded:

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

## Setup Larammerce project

First you need to clone the project, set the configurations and then upload the project data. To do so follow these step-by-step instructions. Notice to change the commands structure based on your distro. in the following we assume you are working with `Ubuntu`. If you are on `CentOS`, change `apt` to `yum` and so on.

#### Clone the project

1. Create a folder

- Run the `mkdir <folder name>` command in your terminal to create a folder.
- Run the `pwd` command to see full pathname of the current working directory.

- Update your system package manager:
```bash
sudo apt update
```

- Install an editor (vim, nano, etc.)
   
```bash
sudo apt install vim 
```

- Install git 
```bash
sudo apt install git
```

2. Clone the project

Login to your github on `github.com`. if you have adminstartor access to the project, you should clone the main project, otherwise fork the [`larammerce project`](https://github.com/larammerce/larammerce) and then clone it.

::: warning CentOS project files Ownership Requirement

If you are using `CentOS`, it is important that the project file is owned by the Apache user. To create the project as the apache user run these scripts:

```bash
su - apache 
git clone https://github.com/larammerce/larammerce 
```

:::


**Note:** If it's complaining of not having access to the repository for read and write, you will be needed to some keys. We recommend following our guide for a step-by-step walk-through of how to build a key.

- Build the key 

```
ssh-keygen -t rsa -C " <enter a name> "
```

:::danger Security Alert
 Never share this key to anyone. It may cause attacks to your app.
:::

   - Copy the generated key

By running the command below, you will have access to components of the file including the key. find the key and copy.

   ```bash
   cat id_rsa.pub
   ```

**Note:** The file name might be different in your system. here we just accepted the default name for the directory. so look for a `.pub` file to reach the key.


- Set the keys on your github

Open your github account. `setting > SSH and GPG keys > new SSH key`, paste the key on the key field and then confirm the access by entering your password.

 ![set SSH key on github step1](/sshkey1.png)
 ![set SSH key on github step2](/sshkey2.png)

As you finalized this proccess, just back to your terminal, direct to the main repository and clone the project again.

 

## Configure the project

The components of `.env.example` must be copied to a new file named `.env`.

```
cp .env.example .env
```

Through your terminal, execute the command below to set the values of `.env` file as the table below:

```
vim .env
```
**Note:** The selected text editor here is `vim`, replace your installed text editor name.



| Variable |  Value & explanation |
-------------|----------------------|
| APP_NAME  | Use any name (English) not encluding spaces. Use underscore sign instead.<br>Example: Larammerce_test |
|APP_ENV | local |
|APP_KEY  |This value will be generated automatically.|
|APP_DEBUG | Values: true/false. <br>`True` stands for development situations, in which the error report will be displayed in detail.<br>`False` value leads you to a single page displaying `error 500` without any explanation or detail. In your production environment this value should be `false` otherwise you risk exposing sensitive configuration values to your app's end users. <br> set this value to `true`.|
|APP_URL  | The default value is `http://localhost:8080`. <br>Replace the system IP with localhost If using another system . |
|APP_SHORT_HOST | short-host |
|APP_DEFAULT_LOCALE | fa |
|LOG_CHANNEL | Value: stack<br> The stack channel is used to aggregate multiple log channels into a single channel. [more](https://laravel.com/docs/10.x/logging) |
|LOG_DEPRECATIONS_CHANNEL| Value: null <br> It avoids notifying users of deprecations. [more](https://laravel.com/docs/10.x/logging#logging-deprecation-warnings) |
|LOG_LEVEL | Value: debug  <br> limitting the information written to the log destination. [more](https://laravel.com/docs/5.3/errors#log-severity-levels)|
|PROXY_URL | `http://localhost:8080` OR the system IP you are using. |
| PROXY_SCHEMA | http |
|JWT_SECRET| This value will also be generated automatically as well as `APP KEY` |

---

#### Generate required keys

Execute this script using terminal to generate the required app key:

```bash
php artisan key:generate
```

Now run the script below to generate `jwt secret`:

```bash
php artisan jwt:secret
```
Once executed these commands, you'll be able to see generated keys on `.env` file.

::: danger Security Alert
Do not share these keys with anyone. Otherwise, you will be at risk of being attacked.
:::

---

#### Setup database 

Once you created a database in `mysql`, connect the project to database by editing values below: 

| Variable | Value & explanation |
|----------|----------------------|
|DB_CONNECTION|mysql|
|DB_HOST|127.0.0.1|
|DB_PORT|3306|
|DB_DATABASE|Your database name|
|DB_USERNAME|root|
|DB_PASSWORD|Enter your password|


Also you may need to set redis connections:

| Variable | Value & explanation |
|----------|----------------------|
|QUEUE_CONNECTION|Value: sync <br> Change this value if you  are developing on `queue management system`.|
|CACHE_DRIVER|Value: redis/file <br> Set this value to `redis`. `file` value also integerates as well as `redis`.|
|REDIS_HOST|127.0.0.1|
|REDIS_PASSWORD|null|
|REDIS_PORT|6379|

---

#### Upload project data

To upload all the project data, run the script below.

```bash
php artisan migrate
```
**Note:** If there is a MySQL dump file you can load it on the database, or can just migrate the DB to start the project database.

Load dumped data to MySQL by the following command and then run the migration script:

```bash
mysql -u root -password database_name < file_name
```

To create primary data, seed database:  

```bash
php artisan migrate --seed
```
Once you deployed the project, go to `localhost:8080/admin` and login as admin.
Check the username and password in `~ database/seeders` by running:
```bash
vim UsersTableSeeder.php
```

**Note:** The most important thing about the Laravel projects is to put the .htaccess file according to Laravel configurations in the document root of the project, so as there is an example file for this use, you can just copy and modify it:

```bash
cd public_html
cp .htaccess.example .htacces
```

## Setup project template

- Fork and clone the `larammerce_base_theme` project from [larammerce github](https://github.com/larammerce/larammerce-base-theme).


- Install `direnv` tool.
  
  `direnv` is necessory for development to create different environment in each directory:

 See how to install direnv [here](https://direnv.net) or follow this instruction:

 On `larammerce_base_theme` directory run:
```bash
cd path/to/larammerce_base_theme
sudo apt install direnv
```
To hook direnv into your shell, add the following line to the end of `~ /.bashrc` file by these steps:
1. Open the `/.bashrc` file.

```bash
cd path/to/larammerce_base_theme
vim ~/.bashrc
```

2. Enable editing with `shift+g+o+enter`.
3. Add the line below at the end of the file:
```bash
eval "$(direnv hook bash)"
``` 
- Open `.envrc` and add this line on top of the file:
```bash
export ECOMMERCE_BASE_PATH=/home/your-sysytem-name/your-root/larammerce
```
Note: On the main directory run `pwd` to get the path used in the command above.

Here, you may run to an access issue, to solve it run:
```bash
direnv allow . 
```

To test the accuracy of this command, run:

``` bash
echo  $ECOMMERCE_BASE_PATH
```
The result should be the path you equalized before.

Run the following command to install node requirements:

```bash
cd path/to/the/larammerce/project
npm install
```
Then run this command to build the resource files:

```bash
npm run prod 
```


 Everything is ready to deploy the project on `localhost:8080`. Execute:
 ```bash
 php -S 0.0.0.0:8080 -t public_html/
 ```

 To enable a basic theme on the project, run this command on ` ~/.../larammerce-base-theme` :

```bash
./deploy.sh
```

---

#### Working with the theme

As a sample, lets build a web page! 

Once you logged in as admin on `localhost:8080/admin`, press plus button on the left buttom of the page ,create a folder and equalized some random values in the form displayed. 

For example:

 | Field name | Value |
 |------------|-------|
 |Title: | Test folder|
 |url part: | test |
 |Preference : | 0|
 |Content type :| regular|
 |Enabling web page| on |

 Save changes!

Afterward, another form will be displayed. Here you may need to build a theme file prior to editing the web page.
To do so, follow this step-by-step instruction:

1. Create a file on `/larammerce-base-theme/public/views`.

```
 touch test.blade.php
```
2.Add the script below to the file:

```
@php

echo "hello world!"

@endphp
```
3.Now deploy the project on `~ /larammerce-base-theme` directory:
```
./deploy.sh 
```

Finally, press `edit web page` button in the form, select the url name you created, and save.(here the url name is test)<br> 
See the result on `localhost:8080/test`.

---

#### Video sources
___

<iframe src="https://www.aparat.com/video/video/embed/videohash/tOGkm/vt/frame"  height="300" width="700" style="  border: 2px solid #bdc3c7; border-radius: 5px; opacity: 1;" allowFullScreen="true"></iframe>

___

<iframe src="https://www.aparat.com/video/video/embed/videohash/n7Du6/vt/frame"  height="300" width="700" style="  border: 2px solid #bdc3c7; border-radius: 5px; opacity: 1;" allowFullScreen="true"></iframe>



## References

*1.<a name="1"> [how to install Linux ?](https://www.linux.org/pages/download/) </a>*

*2.<a name="2"> [how to install WSL on windows ?](https://learn.microsoft.com/en-us/windows/wsl/install) </a>*


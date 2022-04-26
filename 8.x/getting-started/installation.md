# Installation

[[toc]]
Larammerce is an open-source ecommerce platform which helps the business owners to focus on their own concerns and just have the whole complete solution for their online market.

It's been built on top of [Laravel framework](https://laravel.com) which is open source and free to use.

Larammerce has its own stack of technologies and utilities as described bellow:

**Apache** as a web server, **MySQL** version 5.7 as the main relational database, **Redis** database that as the cache layer and session management and **MongoDB** as the log saving database.

## Requirements
Title | Description
------|-----------------
Operation system | gnu/linux based operating system (Centos 7 preffered)
Relational database | mysql 5.7
Interpreter | Php8
WebServer | Apache2/Nginx
Cache DB | redis
Logs DB | mongodb
Mail Server | any smpt server


> In the following part, we are going to run the Operating system commands in interactive shell, Please note that all the commands are executing by the **root** user, if not you should run them by a sudoer user and prepend **sudo** before every command.

## OS requirements
As every applications has its own tools and requirements, larammerce requires some of them as listed bellow, to install them follow the instructions:

```bash
yum install jq
```


Direnv is an extension for your shell. It augments existing shells with a new feature that can load and unload environment variables depending on the current directory.
Run the following command to install direnv
```bash
curl -sfL https://direnv.net/install.sh | bash
```

Then add the following line at the end of the ~/.bashrc file:
```bash
eval "$(direnv hook bash)"
```

## Install HTTPD (Apache2 web server)

As you know apache2 is used to serve as a web server for our application.

To install apache2 on Centos you have to run the command bellow:
```bash
yum install httpd
systemctl enable httpd # Make the os to load httpd on startup.
systemctl start httpd # Start the httpd service in background.
```

As you know at first **httpd** creates a user named **apache** in the system, but there is no shell access for it by default. so to make this user to have access to the system shell do the following:
```bash
vim /etc/passwd # open the passwd file to modify it.
```
In order to change the default shell and home directory for **apache** user open the passwd file and apply the following changes:
```bash
apache:x:48:48:Apache:/var/www:/bin/bash # change the /bin/nologin to /bin/bash or any other desired shell. 
```
Then set a password for apache user
```bash
passwd appache # Enter the desired password twice for this command.
```
password is set and then you have to login as the Apache user with the following command:
```bash
su - appache
```

Modify the current configurations for the httpd:
```
vim /etc/httpd/conf/httpd.conf
```
Find and replace all the `/var/www/html` with the `/var/www/larammerce/public_html`:
```bash
:%s/\/var\/www\/html/\/var\/www\/larammerce\/public_html/g
```
And after all restart the httpd daemon:
```bash
systemctl restart httpd
```

## Install Node.js and npm

As you know larammerce is using Laravel framework as its core system, and obviously inherits all Laravel features. for example larammerce uses nodejs to build its resource bundles and minify them.

> Larammerce needs node v16

In the root user run the following curl command to add the NodeSource yum repository to your system:
```bash
curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash-
```
Once the NodeSource repository is enabled, install Node.js and npm by typing:
```bash
sudo yum install nodejs
``` 

## Install MySQL 5.7
As larammerce is used for production and stable versions of dependencies are needed to be used, prefered version of Oracle/Mysql is 5.7.

First, we need to enable MySQL 5.7 community release yum repository on system.

As the root user run the following command:
```bash
yum localinstall https://dev.mysql.com/get/mysql57-community-release-el7-9.noarch.rpm
```
As you have successfully enabled MySQL yum repository on your system. Now, install MySQL 5.7 community server using following commands as per your operating system version.
```bash
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022 #loding the key
yum install mysql-community-server
```
The above command will install MySQL community server with other dependencies on your system. During the installation process of packages, a temporary password is created and is placed to MySQL log files. Use the following command to find your temporary MySQL password.

First start the  MySQL Service and enable it, and then run the following command to get the temporary root password:
```bash
systemctl enable mysqld
systemctl start mysqld
grep 'A temporary password' /var/log/mysqld.log | tail -1
```
Now change the password by running the following command:
```bash
mysql_secure_installation # After running this command the process will begin, enter the coppied password and set the desired configurations according to demands.
```

## Install Redis
Larammerce project uses redis for some sections, for example its queue management system, cache server and session storage.

As the root user run the following command to install the Redis package:
```bash
yum install redis
yum enable redis
yum start redis
```

## Install php

As you know Centos is based on stable version of packages, so there is no php8 on its default repositories.
In order to install php8 you have to add **remi** repo to your list of repositories.

Add the yum repo by running the following command:
```bash
rpm -Uvh https://rpms.remirepo.net/enterprise/remi-release-7.rpm
```
Open/Modify the remi-php80.repo file and edit this repository
```bash
cd /etc/yum.repos.d
vim remi-php80.repo # In the file change the value of `enable` bariable to enable = 1 
```

Then update list of repositories and existing packages:
```bash
yum update
```

Then install php with the following command:
```bash
yum install php
``` 
To use php for larammerce installing some php extentions are necceccary so install them by the following command:
```bash
yum install php-bcmath php-mysql php-pdo php-mbstring php-curl php-imagick php-json php-simplexml php-soap php-xml php-redis php-mongodb php-gd php-zip
```

## Install MongoDB 
By default mongodb is used as the logs db for larammerce system.

Create/Modify the following file `/etc/yum.repos.d/mongodb-org-4.4.repo`
```bash
vim /etc/yum.repos.d/mongodb-org-4.4.repo
```
Put the following in the file and then save it:
```repo
[mongodb-org-4.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.4.asc
```
To install the latest stable version of MongoDB, issue the following command:
```bash
yum install -y mongodb-org
```
You can start the mongod process by issuing the following command:
```bash
systemctl enable mongod
systemctl start mongod
```

## Install composer
Composer is an application-level package manager for the PHP programming language that provides a standard format for managing dependencies of PHP software and required libraries.

First in the root user install the PHP CLI (command line interface) package and all other dependencies with:
```bash
yum install php-cli php-zip wget unzip
```
Once PHP CLI is installed, download the Composer installer script with:
```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
Copy
```
The command above will download the composer-setup.php file in the current working directory .

To verify the data integrity of the script compare the script SHA-384 hash with the latest installer hash found on the Composer Public Keys / Signatures page.

The following wget command will download the expected signature of the latest Composer installer from the Composer’s Github page and store it in a variable named HASH:
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

## Setup Larammerce project
As you know if we want to serve the project files with apache2 web server, project files must be owned by apache user. so you have to create the porject as the apache user.

Clone the project: 
```bash
su - apache # To login as the apache user
git clone https://gitlab.larammerce.com/larammerce.git # this makes us the directory named larammerce in the path /var/www which is the home directory for the user **apache**
```
Enter the Larammerce directory
```bash
cd larammerce
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

Run the following command to install Composer dependencies:
```bash
composer install
```

Then you can create a new database with the following command:
```bash
mysql -u root -p -e "create database larammerce_main"
```

Create/Modify environment variables by the following command:
```bash
cp .env.example .env
```

Open the .env file
```bash
vim .env
```
Then edit the file
```bash
APP_NAME=larammerce

APP_URL=http://192.168.80.2:8080

PROXY_URL=http://192.168.80.2:8080

DB_DATABASE=larammerce
DB_USERNAME=root
DB_PASSWORD=password

LOG_DB_DATABASE=larammerce_log
LOG_DB_USERNAME=root
LOG_DB_PASSWORD=

CACHE_DRIVER=redis
SESSION_DRIVER=redis
```
Run the following command to set your application key to a random string.
```bash
php artisan key:generate
```
Then this command to generate jwt secret:
```bash
php artisan jwt:secret
```

> If there is a mysql dump file you can load it on the database, of the you can just migrate the db for start the project databse.

Load dumped data to mysql by the following command:
```bash
mysql -u root -password larammerce_main < template_project.sql
```
If you have no dump file you can just migrate your databse:
```bash
php artisan migrate
```

The most important thing about the laravel projects is to put the .htaccess file according to laravel configurations in the document root of the project, so as there is an example file for this use, you can just copy and modify it:
```bash
cd public_html
cp .htaccess.example .htacces
```

## Setup the project template
According to the larammerce project structure, the project template and backend are developed dedicated and independent to each other.

Clone the template project:
```bash
cd /var/www/larammerce/data
clone https://github.com/path/to/template-project.git
```
Install npm dependencies after cloning the project
```bash
cd template-project
npm install
```

Then to build the project resource files run:
```bash
npm run prod # to build and minify the project resource files.
npm run watch # to watch for resource file changes and then build and export them after every change.
```

Create a new .envrc file from the .envrc.example file
```bash
cp .envrc.example .envrc
```
Add the following to the file named `.envrc`:
```bash
export ECOMMERCE_BASE_PATH=/var/www/larammerce 
```

Then this command to make the direnv package to know this directory as its own list of directories:
```bash
direnv allow .
```
And after each change in the template, we enter this command again to deploy the resources to the backend directory:
```bash
./deploy.sh
```
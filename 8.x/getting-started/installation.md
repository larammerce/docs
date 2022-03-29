# Installation

[[toc]]

## Requirements

* PHP: `^8.0`
* composer
* node.js
* PHP extension `php_zip` enabled
* PHP extension `php_mbstring` enabled
* PHP extension `php_mcrypt` enabled
* PHP extension `php_mysql` enabled
* PHP extension `php-bcmath` enabled
* PHP extension `php_curl` enabled
* PHP extension `php_imagick` enabled
* PHP extension `php_json` enabled
* PHP extension `php_pdo` enabled
* PHP extension `php_simplexml` enabled
* PHP extension `php_soap` enabled
* PHP extension `php_xml` enabled
* PHP extension `php_redis` enabled
* PHP extension `php_mongodb` enabled
* PHP extension `php-gd` enabled


## Installation Larammerce

- php version

```bash
php -v
```

- Install PHP `php:8.0` 
```bash
sudo yum module install php:remi-8.0
```

- Install `composer`
```bash
sudo yum install composer
```

- Install PHP extension `php-zip`
```bash
sudo yum --enablerepo=remi install libzip
sudo yum install php-zip
```

- Install PHP extension `php_mbstring` 
```bash
sudo yum install php_mbstring
```

- Install PHP extension `php_mcrypt` 
```bash
sudo yum install php-mcrypt
```

- Install PHP extension `php_mysql` 
```bash
sudo yum install php_mysql
```

- Install PHP extension `php-bcmath` 
```bash
sudo yum install php-bcmath
```

- Install PHP extension `php_curl` 
```bash
sudo yum install php_curl
```

- Install PHP extension `php_imagick` 
```bash
sudo yum install php_imagick
```

- Install PHP extension `php_json` 
```bash
sudo yum install php_json
```

- Install PHP extension `php_pdo` 
```bash
sudo yum install php_pdo
```

- Install PHP extension `php_simplexml` 
```bash
sudo yum install php_simplexml
```

- Install PHP extension `php_soap` 
```bash
sudo yum install php_soap
```

- Install PHP extension `php_xml` 
```bash
sudo yum install php_xml
```

- Install PHP extension `php_redis` 
```bash
sudo yum install php_redis
```

- Install PHP extension `php_mongodb` 
```bash
sudo yum install php_mongodb
```

- Install PHP extension `php-gd`
```bash
sudo yum install php-gd
```
---------------------------------

- Install project dependency
```bash
composer install
```

- Install database (mongodb-redis-mysql)
```bash
```

- Create file .env
```bash
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
vim .env
```
```bash
CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
```

- Install `node.js`
```bash
sudo yum install nodejs
npm install
npm run production
```

- Install project template
```bash
cd ..
git (clone Template address)
cd (Template folder name)
npm install 
npm run production
cd ..
cd hinza-ecommerce
pwd
export ECOMMERCE-BASE-PATH=(/home--------------)
cd (Template folder name)
./deploy.sh
```

- Update the project backend
```bash
cd ..
cd hinza-ecommerce
git pull
php artisan migrate
./scripts/bash/check-env-heys.sh
npm run production
```

- Update the template
```bash
cd ..
cd retopo-website 
git pull
npm run prod
./deploy.sh
```

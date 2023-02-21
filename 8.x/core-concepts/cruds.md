## CRUD/s

[[toc]]

This document reviews how to implement CRUD (create, read, update, delete) in Larammerce. A ToDoList project is done step by step to illustrate the operational concepts.

## Make migrations

Run the following command in the CMD:

php artisan make:migration create_todos_table

Insert these codes in the path /larammerce/database/migrations/[some_numbers]_create_todos_table.php:

code

Run the following command in the CMD:

php artisan migrate

## Create Todo model

Create the file Todo.php in the path /larammerce/app/Models/ and put these codes inside:

code

## Add route

Put the code below in the path /larammerce/routes/web.php inside the admin routes:

code

## Add controller

Create the file TodoController.php in the path /larammerce/app/Http/Controllers/Admin/ and put these codes inside:

code

## Define icon

Search and select a todo flat icon png file and put it into the path /larammerce/public_html/admin_dashboard/images/icons/.

Put the following code in the path /larammerce/resources/assets/sass/icons.scss:

code

Run the following command in the CMD:

npm run prod

Write the code below in the path larammerce/config/cms/appliances.php:

code

## Correct translation

Insert the following code in the path /larammerce/resources/lang/fa/general.php inside the appliances section:

"todo" => "لیست وظایف",

## Define index method

Put the following code in the path /larammerce/app/Http/Controllers/Admin/TodoController.php inside the index method section:

code

## Create index view

Create the file index.blade.php in the path /larammerce/resources/views/admin/pages/todo/ and put these codes inside:

code

## Add layout

Create the file list.blade.php in the path /larammerce/resources/views/admin/pages/todo/layout/ and put these codes inside:

code

## Correct translation

Write the code below in the path /larammerce/resources/lang/fa/structures.php inside the attributes section:

'status' => 'وضعیت'

Run the following command in the CMD:

php artisan translation:fill

## Define create method

Put the following code in the path /larammerce/app/Http/Controllers/Admin/TodoController.php inside the create method section:

code

## Add create view

Make the file create.blade.php in the path /larammerce/resources/views/admin/pages/todo/ and put these codes inside:

code

## Define store method

Insert the code below in the path /larammerce/app/Http/Controllers/Admin/TodoController.php inside the store method section:

code

## Add edit view

Make the file edit.blade.php in the path /larammerce/resources/views/admin/pages/todo/ and write these codes inside:

code

## Define todo status

Create the file TodoStatus.php in the path code /larammerce/app/Models/Enums/ and put these codes inside:

code

## Correct translation

Write the code below in the path /larammerce/resources/lang/fa/general.php:

code

Run the following command in the CMD:

php artisan translation:fill

## Complete edit view

Put the following code in the path /larammerce/resources/views/admin/pages/todo/edit.blade.php:

code

## Define edit method

Insert the code below in the path /larammerce/app/Http/Controllers/Admin/TodoController.php inside the edit method section:

code

## Correct translation

Put the following code in the path /larammerce/resources/views/admin/pages/todo/layout/list.blade.php

code

Run the following command in the CMD:

php artisan translation:fill

## Define update method

Write the following code in the path /larammerce/app/Http/Controllers/Admin/TodoController.php inside the update method section:

code

## Define destroy method

Insert the code below in the path /larammerce/app/Http/Controllers/Admin/TodoController.php inside the destroy method section:

code

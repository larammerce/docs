## CRUD/s

[[toc]]

This document reviews how to run CRUD (create, read, update, delete) in Larammerce.
As you know, CRUD is not only related to Larammerce and is related to the structure of the Laravel framework.
In larammerce, tools have been created to make CRUD easier. Also, the created CRUD should be the same as the previous CRUD of the system, so it should be followed the guidelines provided in this document.

In this tutorial, the principles of CRUD operation in Larammerce will be taught, so, let's follow a few steps to create CRUD:

**Step 1**: Create Migration

**Step 2**: Add Model

**Step 3**: Add Controller

**Step 4**: Add Veiws 

::: warning WARNING
The tutorials in this document are based on Laravel **version 8.75**.
:::

For example, a to-do list is created to show how to create a CRUD.

### Step 1: Create Migration
Since the Laravel framework is a **schema-first** framework, so, the database schema must be created first.
At this migration, so open a terminal or command line and run the following command:

```bash
php artisan make:migration create_todos_table
```

After this command, a file will be placed in the `database/migrations` path, also, the following code should be placed in the migration file to create a `todos` table.

##### EXAMPLE
```php{17-24}
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTodosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('todos', function (Blueprint $table) {
            #ID column
            $table->id(); 
            #subject column
            $table->string("subject");
            #status column
            $table->tinyInteger("status");
            #create_at and update_at column
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('todos');
    }
}
```

Now, enter this command in the terminal to run the migration:

```bash
php artisan migrate
```

:::tip NOTE
You can check your database to make sure the table `todos` is created.
:::

### Step 2: Add  Model
At this stage, a Laravel model should be created, so for this purpose, create a file in the path `app/Models/Todo.php`
and put some properties in the `Todo` class as follows:

##### EXAMPLE
```php{7-13,16,18-20,22-24,26-28,30,31,33-36}
<?php

namespace App\Models;

use Illuminate\Support\Carbon;

/**
 * @property integer id
 * @property string subject
 * @property integer status
 * @property Carbon created_at
 * @property Carbon updated_at
 */
class Todo extends BaseModel
{
    protected $table="todos";

    protected $fillable = [
        "subject", "status"
    ];

    protected static array $SORTABLE_FIELDS = [
        "id", "status", "created_at"
    ];

    protected static array $SEARCHABLE_FIELDS = [
        "subject"
    ];

    protected static ?string $EXACT_SEARCH_FIELD = "subject";
    protected static ?string $EXACT_SEARCH_ORDER_FIELD = "created_at";

    public function getSearchUrl(): string
    {
        return "";
    }
}
```

:::tip NOTE
Note that the `Todo` class extends from the `BaseModel` class.
:::

Let's take a deeper look at the written codes in the `Todo` class:

#### PhpDoc
---
_PhpDoc_, short for **PhpDocumentor**, is a powerful tool that makes project code documented through specially formatted comments. 
Also, PHPDoc is an adaptation of Javadoc for the PHP programming language. It is still an informal standard for commenting on PHP code, but it is in the process of being formalized.

```php
/**
 * @property integer id
 * @property string subject
 * @property integer status
 * @property Carbon created_at
 * @property Carbon updated_at
 */
```

:::warning WARNING
In Larammerce, PhpDoc is an important standard, so every programmer developing a Larammerce project must follow it.
:::

#### $table
---
The first property that must be write in the todo class is the name of the database table that connects the `todo` class to the `todos` table.

```php
    #The name of the to-do list database table
    protected $table="todos";
```

#### $fillable
---
The fillable property specifies which attributes should be mass-assignable. This can be set at the class or instance level.

```php
    protected $fillable = [
        "subject", "status"
    ];
```

#### $SORTABLE_FIELDS
---
Using this property, it is possible to define for each field on what basis the user can sort the list of fields.

```php
    protected static array $SORTABLE_FIELDS = [
        #Sort by id, status, creation date 
        "id", "status", "created_at" 
    ];
```

#### $SEARCHABLE_FIELDS
---
This property is a list of fields and allows the user to search for a field in the list of fields.

```php
    protected static array $SEARCHABLE_FIELDS = [
        #Search by subject
        "subject" 
    ];
```

#### $EXACT_SEARCH_FIELD
---
This property makes a column of the database table more important in the search system.

```php
    #Increasing the importance of the subject column of the database table in the search system
    protected static ?string $EXACT_SEARCH_FIELD = "subject"; 
```

#### $EXACT_SEARCH_ORDER_FIELD
---
This property configures what field the search results are sorted by.

```php
    #Search results are sorted based on creation date
    protected static ?string $EXACT_SEARCH_ORDER_FIELD = "created_at";
```

### Step 3: Add Veiws
At this stage, the view files should be created, but before that, let's add the route path and the icon file to the Larammerce project as follows.

#### Add resource route
Here, the source path for the to-do list CRUD program should be added. Therefore, the following route should be written in the `routes/web.php` file.

##### EXAMPLE
```php
#TodoModel
Route::resource("todo", "TodoController", ["as" => "admin"]);
```

:::tip NOTE
The `web.php` file contains all system routes and including admin routes.
:::

####  Add an icon to the admin panel
One of the most important parts of this tutorial is adding the task list icon in the management panel so that you can manage the tasks in it.
It can be easily added to the admin panel by following a few simple steps.

Now, let's take a look at the steps.

#### Step 1
---
In the first step, the to-do list icon file (for example `icon.png`) must be added to the following path:

`public_html/admin_dashboard/images/icons`


#### Step 2
---
After adding the icon file, the address of the icon file should be added in the path `resources/assets/sass/icons.scss`.

##### EXAMPLE
```php
&.icon-todo {
    background: url("/admin_dashboard/images/icons/todo.png");
}
```

To build and minify the project resource files and save the given changes, the following command should be used in the terminal.

```bash
npm run prod
```

#### Step 3
---
In the third stage, the **icon** and **icon path** must be introduced to the system in the path `config/cms/appliances.php`.

##### EXAMPLE
```php
#todolist appliances
[
    "show_in_toolbar" => true,
        "properties" => [
            "id" => "todo_management",
            "name" => "general.appliances.todo",
            "icon" => "/admin_dashboard/images/icons/todo.png",
            "route" => "admin.todo.index"
    ],
],
``` 

:::tip
Pay attention that `show_in_toolbar` contains boolean data if the value is `true`, the icon will be displayed in the toolbar of the management panel,
and if it is `false`, a new `appliance` must be defined in it.
:::

Therefore, a todo folder should be created in the `larammerce/resources/views/admin/pages` path, which contains the blade files of the CRUD program.

Blade files include the following:

1. `index.blade.php`

2. `list.blade.php`

3. `edit.blade.php`

4. `create.blade.php`

Let's create the blade files:

#### index.blade.php
---
First, an `index.blade.php` file in `larammerce/resources/views/admin/pages/todo`
it should be made, which can include (breadcrumb, toolbar, fav icon, paginator, etc.) items:

##### EXAMPLE
```php
#Extends from admin.layout
@extends('admin.layout')

#breadcrumb
@section('bread_crumb')
    <li><a href="{{route('admin.todo.index')}}">وظایف</a></li>
    <li class="active"><a href="{{route('admin.todo.index')}}">لیست وظیفه ها</a></li>

@endsection

@section('main_content')
    <div class="inner-container">
        
        #toolbar (Including search, sort, etc. buttons)
        <div class="toolbar">
            <ul>
                @foreach(SortService::getSortableFields('Todo') as $sortable_field)
                    <li class="btn btn-default {{$sortable_field->is_active ? "active" : ""}}"
                        href="{{route('admin.null')}}?sort_model=Todo&sort_field={{$sortable_field->field}}&sort_method={{$sortable_field->method}}"
                        act="link">
                        @if($sortable_field->is_active)
                            <i class="fa {{$sortable_field->method == SortMethod::ASCENDING ? "fa-long-arrow-up" : "fa-long-arrow-down"}}"></i>
                        @endif
                        {{$sortable_field->title}}
                    </li>
                @endforeach
            </ul>
        </div>
        <div class="inner-container has-toolbar has-pagination">
            <div class="view-port">
                @include('admin.pages.todo.layout.list')
            </div>
            
            #fav icon
            <div class="fab-container">
                <div class="fab green">
                    <button act="link" href="{{route('admin.todo.create')}}">
                        <i class="fa fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
        
        #Paginator
        @include('admin.templates.pagination', [
            "modelName" => "Todo",
            "lastPage" => $todos->lastPage(),
            "total" => $todos->total(),
            "count" => $todos->perPage(),
            "parentId" => $scope ?? null
        ])
    </div>
@endsection
```

#### list.blade.php
---
In this step, the file `list.blade.php` should be created in the path `larammerce/resources/views/admin/pages/todo/layout`.
This page contains fields (ID, subject, Status and destroy and edit buttons).

##### EXAMPLE
```php
@foreach($todos as $todo)
    <div
        class="col-lg-offset-1 col-lg-10 col-md-offset-0 col-md-12 col-sm-offset-0 col-sm-12 col-xs-offset-0 col-xs-12 list-row roles">
        
        #identifier field
        <div class="col-lg-2 col-md-2 col-sm-4 col-xs-3 col">
            <div class="label">شناسه</div>
            <div>{{$todo->id}}</div>
        </div>
        
        #Subject field
        <div class="col-lg-6 col-md-3 col-sm-4 col-xs-6 col">
            <div class="label">موضوع</div>
            <div>{{$todo->subject}}</div>
        </div>
        
        #Status field
        <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 col">
            <div class="label">وضعیت</div>
            <div>{{trans("general.todo.status.".$todo->status)}}</div>
        </div>
        
        #Operation fields
        <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12 col">
            <div class="label">عملیات</div>
            <div class="actions-container">
                #edit button
                <a class="btn btn-sm btn-primary" href="{{route('admin.todo.edit', $todo)}}">
                    <i class="fa fa-pencil"></i>
                </a>
                #destroy button
                <a class="btn btn-sm btn-danger virt-form"
                   data-action="{{ route('admin.todo.destroy', $todo) }}"
                   data-method="DELETE" confirm>
                    <i class="fa fa-trash"></i>
                </a>
            </div>
        </div>
    </div>
@endforeach
```
:::tip NOTE
If a new field is added to the system, the following command must be executed in the terminal.

```bash
php artisan translation:fill
```
:::

#### create.blade.php
---
One of the most important files to add to the todo directory is the `create.blade.php` file.
This file should be placed in the `larammerce/resources/views/admin/pages/todo` path.
On this page, a task can be created and then saved.
##### EXAMPLE
```php
@extends('admin.form_layout.col_4')

#Add task
@section('bread_crumb')
    <li><a href="{{route('admin.todo.index')}}">وظایف</a></li>
    <li class="active"><a href="{{route('admin.todo.create')}}">اضافه کردن وظیفه</a></li>
@endsection

@section('form_title')اضافه کردن وظیفه@endsection

@section('form_attributes') action="{{route('admin.todo.store')}}" method="POST"  @endsection

@section('form_body')
    <div class="input-group group-sm col-lg-12 col-sm-12 col-md-12 col-xs-12">
        <span class="label">موضوع</span>
        <input class="form-control input-sm" name="subject" value="{{old('subject')}}">
    </div>
@endsection

#Save the task
@section('form_footer')
    <button type="submit" class="btn btn-default btn-sm">ذخیره</button>
@endsection
```


#### edit.blade.php
---
At this stage, the `edit.blade.php` file should be added to the `larammerce/resources/views/admin/pages/todo` path in the Larammerce project.
On this page, the user can edit a task.


##### EXAMPLE
```php{25-33}
@extends('admin.form_layout.col_4')

#Edit task
@section('bread_crumb')
    <li><a href="{{route('admin.todo.index')}}">وظایف</a></li>
    <li class="active"><a href="{{route('admin.todo.create', compact('todo'))}}">ویرایش وظیفه</a></li>

@endsection

@section('form_title')
    ویرایش وظیفه
@endsection

@section('form_attributes')
    action="{{route('admin.todo.update', $todo)}}" method="POST"
@endsection

@section('form_body')
    {{ method_field('PUT') }}
    <input type="hidden" name="id" value="{{ $todo->id }}">
    <div class="input-group group-sm col-lg-12 col-sm-12 col-md-12 col-xs-12">
        <span class="label">موضوع</span>
        <input class="form-control input-sm" name="subject" value="{{ $todo->subject }}">
    </div>
    <div class="input-group group-sm col-lg-12 col-sm-12 col-md-12 col-xs-12">
        <span class="label">وضعیت</span>
        <select class="form-control input-sm" name="status">
            @foreach($statuses as $status_id => $status_title)
                <option @if($status_id == $todo->status) selected
                        @endif value="{{$status_id}}">{{$status_title}}</option>
            @endforeach
        </select>
    </div>
@endsection

#Save and exit
@section('form_footer')
    <button type="submit" class="btn btn-default btn-sm">ذخیره</button>
    <input type="submit" class="btn btn-warning btn-sm" name="exit" value="ذخیره و خروج">
@endsection
```

If a field has a multi-selected mode, it should be defined in the `app/Models/Enums` path.
Therefore, since the status field is multi-selected, the `TodoStatus.php` file should be created in the mentioned path, and all the selected states should be defined in it.

```php
<?php

namespace App\Models\Enums;

use App\Utils\Common\BaseEnum;

class TodoStatus extends BaseEnum
{
    #New
    const NEW_IN=0;
    #In progress
    const IN_PROGRESS=1;
    #Ready for test
    const READY_FOR_TEST=2;
    #Done
    const DONE=3;
}
```

:::tip NOTE
Note that the `TodoStatus` class extends from the `BaseEnum` class.
:::


Finally, in the path of `resources/lang/fa/general.php`, in a separate branch, the translation of each selected mode should be implemented.

```php
    "todo" =>[
        "status" => [
            "جدید",
            "درحال اجرا",
            "آماده بررسی",
            "انجام شده"
        ]
    ],
```


### Step 4: Add Controller
This part is divided into several steps to make it easier to understand, so let's take an in-depth look at each step.
In this section, a controller must be created so that logic can be written to **create**، **store**، **edit** and **delete** the to-do list.

#### Create a controller class
---
At this point, a new controller should now be created as `TodoController`, which extends from the `BaseController` class.
Therefore, a class by the name `TodoController.php` should be created in the path `app/Http/Controllers/Admin`.

##### EXAMPLE
```php
<?php

    namespace App\Http\Controllers\Admin;
    
    use App\Models\Enums\TodoStatus;
    use App\Models\Todo;
    use App\Utils\Common\History;
    use Illuminate\Contracts\Foundation\Application;
    use Illuminate\Contracts\View\Factory;
    use Illuminate\Contracts\View\View;
    use Illuminate\Http\RedirectResponse;
    use Illuminate\Http\Request;
    
    /**
    * @role(enabled=true)
    */
    class TodoController extends BaseController
{
    public function getModel(): ?string
    {
        return Todo::class;
    }
}
?>
```

:::warning WARNING
The following annotation must be written before the controller function:
```php
/**
* @role(enabled=true)
*/
```
Also, above each function of this controller, an annotation must be written that specifies access to each function.
```php
/**
* @role(super_user)
*/
```
In the annotation above, as written, superuser access is required.
:::

To implement CRUD operations in Laravel on an object, **seven** functions are used, which include the following.

1. `index()`

2. `create()`

3. `store()`

4. `show()`

5. `edit()`

6. `update()`

7. `destroy()`

For more information, you can refer to [resource controller](https://laravel.com/docs/8.x/controllers#actions-handled-by-resource-controller).

Since the Larammerce project is based on Laravel, these seven functions must be used in the CRUD operation,
so let's use these seven functions in the construction of the to-do list controller.

#### index()
---

```php
    #Super user level access
    /**
     * @role(super_user)
     */
    public function index(): Factory|View|Application
    {
        parent::setPageAttribute();
        #Content pagination
        $todos = Todo::paginate(Todo::getPaginationCount());
        #Return to index.blade.php
        return view("admin.pages.todo.index", compact("todos"));
    }
```

:::warning WARNING
In the `index()` function, function `parent::setPageAttribute()` it must be written.
also in Larammerce, calling this function in the `index()` function must be followed and it is an important standard.

function `setPageAttribute()` is related to all functions such as paging and checking how to display a page, etc.
:::


#### create()
---

```php
    /**
     * @role(super_user)
     */
    public function create(): Factory|View|Application
    {
        #Return to index.blade.php
        return view("admin.pages.todo.create");
    }
```

#### store()
---

```php
    /**
     * @role(super_user)
     * @rules(subject="required|min:10")
     */
    public function store(Request $request): RedirectResponse
    {
        #The request is only the subject
        $todo = Todo::create($request->only("subject"));
        #Return to index.blade.php
        return response()->redirectToRoute("admin.todo.index");
    }
```

:::tip NOTE
The following role indicates that the input field must be a string with at least ten characters.

```php
/**
* @rules(subject="required|min:10")
*/
```
:::

#### show()
---

```php
    public function show(Todo $todo)
    {

    }
```


#### edit()
---

```php
    /**
     * @role(super_user)
     */
    public function edit(Todo $todo): Factory|View|Application
    {
        #Return list of all todos
        $statuses = [];
        foreach (TodoStatus::values() as $value) {
            $statuses[$value] = trans("general.todo.status." . $value);
        }
        #Return to edit.blade.php
        return view("admin.pages.todo.edit", compact("todo", "statuses"));
    }
```

#### update()
---

```php
    /**
     * @role(super_user)
     * @rules(subject="required|min:10", status="in:".\App\Models\Enums\TodoStatus::stringValues())
     */
    public function update(Request $request, Todo $todo): RedirectResponse
    {
        ##The request is only the subject and status
        $todo->update($request->only("subject", "status"));
        return History::redirectBack();
    }
```

:::tip NOTE
The following role indicates that the input field must be a string with at least ten characters, also, if the status is outside of (1, 2, 3, 4, 5), it is not accepted by the system.

```php
/**
* @rules(subject="required|min:10", status="in:".\App\Models\Enums\TodoStatus::stringValues())
*/
```
:::

#### destroy()
---

```php
    public function destroy(Todo $todo): RedirectResponse
    {
        #delete the task
        $todo->delete();
        return redirect()->back();
    }
```

#### Video source
___

<iframe src="https://www.aparat.com/video/video/embed/videohash/zUXFL/vt/frame" height="300" width="700" style="  border: 2px solid #bdc3c7;
border-radius: 5px; opacity: 1;" ></iframe>



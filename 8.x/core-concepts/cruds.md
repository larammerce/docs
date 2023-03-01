## CRUD/s

[[toc]]

This document reviews how to implement `CRUD` (create, read, update, delete) in the Larammerce platform. A `ToDoList` project is done step by step to illustrate the operational concepts.

## Make migrations

Larammerce is a schema-first platform. So you must create a table for your todos.

Run the following command in the terminal:

```bash{1}
php artisan make:migration create_todos_table
```

Insert these codes in the path `/larammerce/database/migrations/[some_numbers]_create_todos_table.php`:

```php{7,8}
<?php
    ...
    public function up()
    {
        Schema::create('todos', function (Blueprint $table) {
            $table->id();
            $table->string("subject");
            $table->tinyInteger("status");
            $table->timestamps();
        });
    }
    ...
   
```

Run the following command in the terminal:

```bash{1}
php artisan migrate
```

You can check your database to make sure the table `todos` is created:

![todos_table](/40.png)

## Create Todo model

Create the file `Todo.php` in the path `/larammerce/app/Models/` and put these codes inside:

```php{1-36}
<?php

namespace App\Models;

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

    protected $fillable=[
        "subject", "status"
    ];

    protected static array $SORTABLE_FIELDS = [
        "id", "status", "created_at"
    ];

    protected static array $SEARCHABLE_FIELDS = [
        "subject"
    ];

    protected static ?string $IMPORTANT_SEARCH_FIELD = "subject";
    protected static ?string $EXACT_SEARCH_ORDER_FIELD = "created_at";

    public function getSearchUrl(): string
    {
        return "";
    }
}

```

## Add route

Put the code below in the path `/larammerce/routes/web.php` inside the `admin routes`:

```php{8,9}
<?php
...
//Admin private routes
    ...
    //CustomerAddress
    Route::resource("customer-address", "CustomerAddressController", ["as" => "admin"]);

    //TodoModel
    Route::resource("todo", "TodoController", ["as" => "admin"]);
    ...
```

## Add controller

Create the file `TodoController.php` in the path `/larammerce/app/Http/Controllers/Admin/` and put these codes inside:

```php{1-58}
<?php

namespace App\Http\Controllers\Admin;

use App\Models\Todo;
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
    
    public function index(): Factory|View|Application
    {

    }
    
    public function create(): Factory|View|Application
    {
        
    }

    public function store(Request $request): RedirectResponse
    {

    }

    public function show(Todo $todo)
    {
        
    }

    public function edit(Todo $todo): Factory|View|Application
    {

    }

    public function update(Request $request, Todo $todo): RedirectResponse
    {

    }

    public function destroy(Todo $todo): RedirectResponse
    {

    }

    public function getModel(): ?string
    {
        return Todo::class;
    }
}

```

## Define icon

A todo icon is required in the top toolbar in order to perform the crud processes.

![top_toolbar](/01-edited.png)

Search and select a `todo flat icon png` file and put it into the path `/larammerce/public_html/admin_dashboard/images/icons/`.

Put the following code in the path `/larammerce/resources/assets/sass/icons.scss`:

```scss{8-10}
.h-icon {
    background-size: 100% 100% !important;
    ...
    &.icon-link-shortener {
        background: url("/admin_dashboard/images/icons/link-shortener.png");
    }

    &.icon-todo {
        background: url("/admin_dashboard/images/icons/todo-icon.png");
    }
    ...
```

Run the following command in the terminal:

```bash{1}
npm run prod
```

Write the code below in the path `larammerce/config/cms/appliances.php`:

```php{8-17}
<?php
return [
    ...
    //analytic appliance
    [
        ...
    ],
    //todolist appliance
    [
        "show_in_toolbar" => true,
        "properties" => [
            "id" => "todo_management",
            "name" => "general.appliances.todo",
            "icon" => "/admin_dashboard/images/icons/todo-icon.png",
            "route" => "admin.todo.index"
        ],
    ],
];
```

**OUTPUT**

![todo_icon](/04-edited.png)


## Correct translation

Insert the following code in the path `/larammerce/resources/lang/fa/general.php` inside the `appliances` section:

```php{9}
<?php
return [
    "appliances" => [
        "setting" => "تنظیمات",
        "shop" => "فروشگاه",
        "directory" => "مدیریت فایل ها",
        "analytic" => "تحلیل و بررسی",
        "short_links" => "لینک های کوتاه",
        "todo" => "لیست وظایف",
    ],
    ...
];
```

Run the following command in the terminal:

```bash{1}
php artisan translation:fill
```

**OUTPUT**

![todo_icon_translated](/08-edited.png)


## Define index method

If you click on todo icon to show the list of todos, you will get this error:

![index_error](/05.png)

So you must define the index method.

Put the following code in the path `/larammerce/app/Http/Controllers/Admin/TodoController.php` inside the `index method` section:

```php{5-13}
<?php
...
class TodoController extends BaseController
{
    /**
     * @role(super_user)
     */
    public function index(): Factory|View|Application
    {
        parent::setPageAttribute();
        $todos = Todo::paginate(Todo::getPaginationCount());
        return view('admin.pages.todo.index', compact('todos'));
    }
    ...
}
```

## Create index view

Create the file `index.blade.php` in the path `/larammerce/resources/views/admin/pages/todo/` and put these codes inside:

```php{1-46}
@extends('admin.layout')

@section('bread_crumb')
    <li><a href="{{route('admin.todo.index')}}">وظایف</a></li>
    <li class="active"><a href="{{route('admin.todo.index')}}">لیست وظیفه ها</a></li>

@endsection

@section('main_content')
    <div class="inner-container">
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
            <div class="fab-container">
                <div class="fab green">
                    <button act="link" href="{{route('admin.todo.create')}}">
                        <i class="fa fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
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

## Add layout

Create the file `list.blade.php` in the path `/larammerce/resources/views/admin/pages/todo/layout/` and put these codes inside:

```php{1-31}
@foreach($todos as $todo)
    <div
        class="col-lg-offset-1 col-lg-10 col-md-offset-0 col-md-12 col-sm-offset-0 col-sm-12 col-xs-offset-0 col-xs-12 list-row roles">
        <div class="col-lg-2 col-md-2 col-sm-4 col-xs-3 col">
            <div class="label">شناسه</div>
            <div>{{$todo->id}}#</div>
        </div>
        <div class="col-lg-6 col-md-3 col-sm-4 col-xs-6 col">
            <div class="label">موضوع</div>
            <div>{{$todo->subject}}</div>
        </div>
        <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 col">
            <div class="label">وضعیت</div>
            <div>{{$todo->status}}</div>
        </div>        
        <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12 col">
            <div class="label">عملیات</div>
            <div class="actions-container">
                <a class="btn btn-sm btn-primary" href="{{route('admin.todo.edit', $todo)}}">
                    <i class="fa fa-pencil"></i>
                </a>
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

**OUTPUT**

![index_view](/06-edited.png)

## Correct translation

Write the code below in the path `/larammerce/resources/lang/fa/structures.php` inside the `attributes` section:

```php{7}
<?php
return [
  'attributes' => 
  [
    ...
    'representative_type' => 'نوع آشنایی با سیستم',
    'status' => 'وضعیت'
    ...
  ]
  ...
]; 
```

Run the following command in the terminal:

```bash{1}
php artisan translation:fill
```

**OUTPUT**

![index_view_translated](/08-2-edited.png)

## Define create method

So far, you have got the list of todos:

![todos_list](/08.png)

If you click on the `+` icon to create a new todo, you will get this error:

![create_error](/09.png)

So you must define the create method.

Put the following code in the path `/larammerce/app/Http/Controllers/Admin/TodoController.php` inside the `create method` section:

```php{6-12}
<?php
...
class TodoController extends BaseController
{
    ...
    /**
     * @role(super_user)
     */
    public function create(): Factory|View|Application
    {
        return view('admin.pages.todo.create');
    }
    ...
}
```

## Add create view

Make the file `create.blade.php` in the path `/larammerce/resources/views/admin/pages/todo/` and put these codes inside:

```php{1-23}
@extends('admin.form_layout.col_4')

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

@section('form_footer')
    <button type="submit" class="btn btn-default btn-sm">ذخیره</button>
@endsection

```

**OUTPUT**

![create_view](/10.png)

## Define store method

In order to save the new todo, you must define the store method.

Insert the code below in the path `/larammerce/app/Http/Controllers/Admin/TodoController.php` inside the `store method` section:

```php{6-14}
<?php
...
class TodoController extends BaseController
{
    ...
    /**
     * @role(super_user)
     * @rules(subject="required|min:5")
     */
    public function store(Request $request): RedirectResponse
    {
        $todo=Todo::create($request->only("subject"));
        return response()->redirectToRoute("admin.todo.index");
    }
    ...
}
```

Now create a new todo:

![create_new_todo](/13.png)

Click on the `ذخیره` button to save the new todo.

**OUTPUT**

![new_todo_created](/14.png)


## Add edit view

In the todo list, each item has an edit icon:

![edit_icon](/14-edited.png)

Clicking on the edit icon will give you this error:

![edit_error](/15.png)

So you must add an edit view.

Make the file `edit.blade.php` in the path `/larammerce/resources/views/admin/pages/todo/` and write these codes inside:

```php{1-26}
@extends('admin.form_layout.col_4')

@section('bread_crumb')
    <li><a href="{{route('admin.todo.index')}}">وظایف</a></li>
    <li class="active"><a href="{{route('admin.todo.create', compact('todo'))}}">ویرایش وظیفه</a></li>

@endsection

@section('form_title')ویرایش وظیفه@endsection

@section('form_attributes') action="{{route('admin.todo.update', $todo)}}" method="POST" @endsection

@section('form_body')
    {{ method_field('PUT') }}
    <input type="hidden" name="id" value="{{ $todo->id }}">
    <div class="input-group group-sm col-lg-12 col-sm-12 col-md-12 col-xs-12">
        <span class="label">موضوع</span>
        <input class="form-control input-sm" name="subject" value="{{ $todo->subject }}">
    </div>
@endsection

@section('form_footer')
    <button type="submit" class="btn btn-default btn-sm">ذخیره</button>
    <input type="submit" class="btn btn-warning btn-sm" name="exit" value="ذخیره و خروج">
@endsection

```

## Define todo status

4 statuses can be attributed to each todo item: new in, in progress, ready for test, done. So you must define these statuses.

Create the file `TodoStatus.php` in the path `/larammerce/app/Models/Enums/` and put these codes inside:

```php{1-13}
<?php

namespace App\Models\Enums;

use App\Utils\Common\BaseEnum;

class TodoStatus extends BaseEnum
{
    const NEW_IN=0;
    const IN_PROGRESS=1;
    const READY_FOR_TEST=2;
    const DONE=3;
}
```

## Correct translation

Write the code below in the path `/larammerce/resources/lang/fa/general.php`:

```php{11-18}
<?php
return [
    "appliances" => [
        "setting" => "تنظیمات",
        "shop" => "فروشگاه",
        "directory" => "مدیریت فایل ها",
        "analytic" => "تحلیل و بررسی",
        "short_links" => "لینک های کوتاه",
        "todo" => "لیست وظایف",
    ],
    "todo" => [
        "status" => [
            "جدید",
            "در حال اجرا",
            "آماده بررسی",
            "انجام شده"
        ]
    ],
    ...
];
```

Run the following command in the terminal:

```bash{1}
php artisan translation:fill
```

## Complete edit view

Put the following code in the path `/larammerce/resources/views/admin/pages/todo/edit.blade.php`:

```php{10-17}
@extends('admin.form_layout.col_4')
...
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
                <option @if($status_id == $todo->status) selected @endif value="{{$status_id}}">{{$status_title}}</option>
            @endforeach
        </select>
    </div>
@endsection
...

```

## Define edit method

Insert the code below in the path `/larammerce/app/Http/Controllers/Admin/TodoController.php` inside the `edit method` section:


```php{6,11-21}
<?php

namespace App\Http\Controllers\Admin;

use App\Models\Todo;
use App\Models\Enums\TodoStatus;
...
class TodoController extends BaseController
{
    ...
    /**
     * @role(super_user)
     */
    public function edit(Todo $todo): Factory|View|Application
    {
        $statuses=[];
        foreach(TodoStatus::values() as $value){
            $statuses[$value]=trans("general.todo.status." . $value);
        }
        return view('admin.pages.todo.edit', compact('todo', 'statuses'));
    }
    ...
}
```

**OUTPUT**

![edit_view](/16-edited.png)

Now you can select a new status for your todo:

![select_status](/17-edited.png)

The result is as follows:

![status_selected](/19-edited.png)

## Correct list status

In the list of todos, the status item is represented as a number:

![todo_status_number](/14-edited.png)

So you must correct the code for status in the path `/larammerce/resources/views/admin/pages/todo/layout/list.blade.php`:


```php{7}
@foreach($todos as $todo)
    <div
        class="col-lg-offset-1 col-lg-10 col-md-offset-0 col-md-12 col-sm-offset-0 col-sm-12 col-xs-offset-0 col-xs-12 list-row roles">
        ...
        <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 col">
            <div class="label">وضعیت</div>
            <div>{{trans("general.todo.status.".$todo->status)}}</div>
        </div>
        ...
    </div>
@endforeach
```

**OUTPUT**

![todo_status_translated](/18-edited.png)

## Define update method

So far you have created the edit form:

![edit_form](/19-edited.png)

If you click on `ذخیره` button, this error will appear:

![update_error](/20.png)

So you must define the update method to save the changes.

Write the following code in the path `/larammerce/app/Http/Controllers/Admin/TodoController.php` inside the `update method` section:


```php{7,12-20}
<?php

namespace App\Http\Controllers\Admin;

use App\Models\Todo;
use App\Models\Enums\TodoStatus;
use App\Utils\Common\History;
...
class TodoController extends BaseController
{
    ...
    /**
     * @role(super_user)
     * @rules(subject="required|min:10", status="in:".\App\Models\Enums\TodoStatus::stringValues())
     */
    public function update(Request $request, Todo $todo): RedirectResponse
    {
        $todo->update($request->only("subject", "status"));
        return History::redirectBack();
    }
    ...
}
```

Now click on `‌ذخیره و خروج` button to save the new status for your todo.

**OUTPUT**

![save_edited_todo](/22-edited.png)

## Define destroy method

Create some new todos with different statuses:

![some_new_todos](/33-edited.png)

Clicking on the delete icon should omit the related todo. So you must define the destroy method.

Insert the code below in the path `/larammerce/app/Http/Controllers/Admin/TodoController.php` inside the `destroy method` section:

```php{6-10}
<?php
...
class TodoController extends BaseController
{
    ...
    public function destroy(Todo $todo): RedirectResponse
    {
        $todo->delete();
        return redirect()->back();
    }
    ...
}

```

Now click on the delete icon for todo #2.

**OUTPUT**

![delete_confirm](/34-edited.png)

Click on `بله`.

**OUTPUT**

![todo_deleted](/35-edited.png)

The todo #2 has been deleted from the list.

## Video source
___

<iframe src="https://www.aparat.com/video/video/embed/videohash/zUXFL/vt/frame" height="300" width="700" style="  border: 2px solid #bdc3c7;
border-radius: 5px; opacity: 1;" allowFullScreen="true"></iframe>

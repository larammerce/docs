## Template helper functions

[[toc]]

According to the need of every single content management engine, to simplify the process of pulling, modifying, and displaying changes for template creators, some special functions called **Helpers** are defined.
The Larammerce engine is no exception.
Therefore, for a better understanding, this document is provided for you, explaining the use of each helper function.
To reach all the helpers, `/path/to/larammerce-project/app/Utils/CMS/Template/helpers.php`.

**NOTE:** Check for updates in the helpers file, due to any changes in functions.

---

### How to setup a play ground

To test these functions, `/path/to/larammerce-base-theme-project/public/views/` directory and add a new blade file, then follow these steps:

1. Create a directory in the Larammerce project root from the admin panel.
2. Click the plus button located at the bottom left of the page.
3. Enter a title and URL, and enable the "has webpage" option in the form.

- Note: the URl name should be same as the blade file name.

1. Save the changes.
2. After saving the changes, a new form will be displayed. Choose "editing webpage" from the dropdown menu and select the created blade file name.
3. Save and exit.
4. Write your desired functions (they are mentioned as `Example` in this document) in the blade file, then `/path/to/larammerce-base-theme-project/` and run `./deploy.sh` in the terminal and view their results on the specified URL.

![create webpage in admin panel](/helpers/CreatePage.png)

---

### Helper functions description

#### parse_url

_This is a built-in php function which parses a URL and returns an associative array containing any of the various components of the URL that are present(such as `scheme`, `user`, `pass`, `host`, `port`,`path`, `query`, `fragment`). The values of the array elements are not URL decoded._ _<sup>[1](#1)</sup>_

To do so, lets define a url and parse it:

```php
@php

$url= "https://google.com/salam/donya?test=sample";
dd(parse_url($url));

@endphp
```

`path/to/larammerce-base-theme-project/` and run this command:

```bash
./deploy.sh
```

Output:

```bash
array:4 [▼
  "scheme" => "https"
  "host" => "google.com"
  "path" => "/salam/donya"
  "query" => "test=sample"
]
```

As you see URL components are returned as an array.

---

#### unparse_url

```php
function unparse_url(array $parsed_url, array $ommit = []): string {
    ...
}
```

This function takes the parsed URL array as input, merges all the components, and as the result, returns a unified URL.

For instance, let's change the `query's` value and unparse the URL and see the result:

```php{5,6}
@php

$url= "https://google.com/salam/donya?test=sample";
$parsed_url = parse_url($url);
$parsed_url["query"] = " ";
$new_url = unparse_url($parsed_url);

@endphp

<p> the changed url : {{ $new_url }}</p>
```

Output:

```html
<p>the changed url : "https://google.com/salam/donya? "</p>
```

As you see, `test=sample` has been removed as an empty value is given to the query.

---

#### get_product_all_extras_percentage

```php
 function get_product_all_extras_percentage() {
        return \App\Utils\CMS\ProductService::getAllExtrasPercentage();
    }
```

This function returns the summation of `Tax percentage` and `Toll percentage` values.

Example:

```php
<p>Product all extra percentages: {{ get_product_all_extras_percentage() }}</p>
```

Output:

```html
<p>Product all extra percentages: 9</p>
```

---

#### locale_url

```php
function locale_url(string $normal_url): string {
        if (count(config("translation.locales")) <= 1)
            return $normal_url;

        $parsed_url = parse_url($normal_url);
        $parsed_url["path"] = "/" . app()->getLocale() . ($parsed_url["path"] ?? "");
        return unparse_url($parsed_url);
    }
```

This function is designed to modify the URL by adding a language identifier (e.g., "/en") at the beginning of the URL. This could be useful if you are building a multilingual website and need to generate URLs for different languages.
So the first step is to make the website multilingual.
To do so, Enable at least two languages(e.g. Persian & English) from the `admin panel -> setting -> language`.
Then set the app locale to one of the languages. Once the function determined the appropriate locale, it can add it to the URL by appending it as a query parameter or as part of the path.

Example:

```php{4}
@php

$url= "https://google.com/salam/donya?test=sample";
app()->setLocale("fa");

@endphp

<p> {{ locale_url($url) }}</p>
```

The output if the system default language is set to Persian:

```html
<p>https://google.com/fa/salam/donya?test=sample</p>
```

And if the system default language is set to English:

```php{4}
@php

$url= "https://google.com/salam/donya?test=sample";
app()->setLocale("en");

@endphp

<p> {{ locale_url($url) }}</p>
```

The output would be:

```html
<p>https://google.com/en/salam/donya?test=sample</p>
```

---

#### lm_route

```php
 function lm_route($name, $parameters = [], $absolute = true): string {
        $route_result = route($name, $parameters, $absolute);
        return locale_url($route_result);
    }
```

This function takes in a route name, and by using the built-in laravel helper function "route", generates a URL for the provided route name. It then passes this generated URL to another helper function called "locale_url". The "locale_url" function appends the user's preferred language code as a segment in the path of the URL.
Essentially, this function ensures that URLs for routes in a multilingual application include the user's preferred language code.

---

#### lm_url

```php
function lm_url($path = null, $parameters = [], $secure = null): string{
   $route_result = route($name, $parameters, $absolute);
        return locale_url($route_result);
    }
```

This function is a custom helper function that generates a localized URL for a given route name and parameters. It takes three arguments:

- `$path`: This is the path or name of the route for which you want to generate a URL. If no path is specified, it defaults to `null`.
- `$parameters`: This is an associative array of any parameters that should be passed to the route. It defaults to an empty array.
- `$secure`: This is a boolean flag that determines whether the generated URL should use HTTPS (`true`) or HTTP (`false`). If no value is specified, it defaults to `null`.

The function passes the resulting path through another custom helper function called `locale_url()`, which prefixes the path with the current locale code (e.g. `/en`, `/fa`, etc.) to generate a fully localized URL.

---

#### get_identity

```php
    function get_identity(): array {
        $default = config("cms.identity.default");
        return config("cms.identity.$default", []);
    }
```

This function is to display the project supporter identification. Enter the following code to display identification. If no identification is set, the default value would be the Larammerce logo and its default color pallette.

Example:

```php
@php

dd(get_identity());

@endphp
```

Output:

```bash
array:8 [▼
  "logo" => "/admin_dashboard/images/logo"
  "title" => "Larammerce | Another open-source e-commerce project"
  "name" => "Larammerce"
  "motto" => "ورود به پنل مدیریت لارامرس"
  "website" => "larammerce.com"
  "url" => "https://larammerce.com"
  "color" => "#ff2e20"
  "fav" => "favicon"
]
```

You can now return specific details by the array index.

Example:

```php
This project has been set up by: {{get_identity()["name"]}}
```

Output:

```html
This project has been set up by: Larammerce
```

---

#### shorten_text

```php

    function shorten_text($text, $wordsCount = 75) {
        $textParts = explode(' ', strip_tags($text));
        if (count(is_countable($textParts) ? $textParts : []) <= $wordsCount)
            return $text;
        return join(' ', array_slice($textParts, 0, $wordsCount)) . '...';
    }

```

This function's usage is to appoint the length of displayed descriptions at first sight, including two different input types; text and integer.
The integer input determines the count of words allowed to be shown before the `.etc` sign ( ... ).

Example:

```php
@php
$text= "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
@endphp

<p> {{shorten_text($text,10)}}</p>
```

Output:

```html
<p>Lorem Ipsum is simply dummy text of the printing and...</p>
```

---

#### get_gallery

```php
    function get_gallery(string $galleryName) {
        $result = Gallery::where("identifier", $galleryName)->first();
        if ($result != null)
            return $result;
        return false;
    }
```

This function uses the gallery identifier given to the considered gallery in your blade files and will return the gallery object. It may not be so practical for you but is used in the Larammerce template engine.

Example:

```php
@php
dd(get_gallery("index_banner1"));
@endphp
```

Output:

```html
App\Models\Gallery {#2412 ▼ #table: "galleries" #hidden: array:1 [▶] #fillable:
array:2 [▶] ... }
```

---

#### get_gallery_items

```php
function get_gallery_items(string $gallery_name, int $count = -1,
 bool $random_select = false){
    ...
}
```

`get_gallery_items` function takes the gallery identifier and the count of items you want to be shown and checks whether the random select value is true or false.
This function's structure is so similar to defining the display of larammerce template engine gallery items.

Example:

```php
@php
dd(get_gallery_items("faqs"));
@endphp
```

Output:

```html
Illuminate\Database\Eloquent\Collection {#2420 ▼ #items:array:5 [▶]
#escapeWhenCastingToString: false }
```

---

#### get_locale

```php
    function get_locale(): string {
        return app()->getLocale();
    }
```

This function directly connects to the app and returns the current system language.

Example:

```php
@php
  dd(getLocale());
@endphp
```

Output:

```bash
"fa"
```

---

#### get_user

```php
    function get_user(string $guard = null): bool|Authenticatable|null {
        if (auth($guard)->check()) {
            if (!auth('web_eloquent')->check()) {
                $user = User::getEloquentObject(auth($guard)->user());
                auth('web_eloquent')->login($user);
            }
            return auth('web_eloquent')->user();
        }
        return false;
    }
```

The function returns the current authenticated user information if a user is logged in, otherwise returns false.

Example 1:

```php
@php
dd(get_user());
@endphp
```

Output:

```bash
...
attributes: array:18 [▼
    "id" => 1
    "name" => "user name"
    "family" => "user family"
    "email" => "user email"
    "username" => "user username"
    "password" => "user password"
    "image_path" => null
]
...
```

Example 2:

```php
@if(get_user() !== false)
    <h5> The current user logged in is : {{get_user()->full_name}}</h5>
@endif
```

Output:

```html
<h5>The current user logged in is : [authenticated user name]</h5>
```

---

#### get_customer_user

```php

if (!function_exists('get_customer_user')) {
    function get_customer_user(string $guard = null): bool|CustomerUser {
        if (auth($guard)->check() and get_user($guard)?->is_customer_user)
            return get_user($guard)?->customerUser;
        return false;
    }
}

```

This function is like the previous function, with the difference that it checks whether the subscriber is a customer.
Consider that there is no information in the get_customer_user() itself. To access the customer information, you you have to get connect to the `user`.

Example:

```php
@if(get_customer_user() !== false)
    <h5> The current customer user logged in is : {{get_customer_user()->user->full_name}}</h5>
@endif
```

Output:

```html
<h5>The current customer user logged in is : [authenticated user name]</h5>
```

---

#### get_customer_legal_info

```php
    function get_customer_legal_info(): bool|CustomerUserLegalInfo {
        $customer = get_customer_user();
        if ($customer)
            return $customer->legalInfo;
        return false;
    }
```

Use this function to return the legal information of the authenticated customer user. (such as company name & etc.)

Example:

```php{3}
@if(get_customer_legal_info() !== false)
    <h5> The current legal info of customer user logged in is : {{get_customer_legal_info()->
    customerUser->user->full_name}}</h5>
@endif
```

Output:

```html
<h5> The current legal info of customer user logged in is : <authenticated user name> / <company name or address and etc.>  </h5>
```

**NOTE:** To access the customer information, you must connect to the `user` through the `customerUser` (line 3).

---

#### customer_need_list_exist

```php
    function customer_need_list_exist(Product $product): bool {
        if (!isset($product->is_in_need_list)) {
            try {
                $product->is_in_need_list = get_customer_user()->needList->contains($product->id);
            } catch (Exception $exception) {
                $product->is_in_need_list = false;
            }

        }
        return $product->is_in_need_list;
    }
```

This function takes the product number and checks if the logged-in user has the given product in their Need list. `false` will be returned if the user is not logged in.

Example:

```php
  <p>this customer {{customer_need_list_exist(\App\Models\Product::find(100)) ? "has":"has not"}} the product with id '100' in his need list.</p>
```

Output :

```html
<p>this customer has the product with id 100 in his need list.</p>
```

Or:

```html
<p>this customer has not the product with id 100 in his need list.</p>
```

---

#### customer_cart_count

```php
    function customer_cart_count(): int {
        $customer = get_customer_user();
        if ($customer !== false) {
            return $customer->cartRows()->count();
        } else {
            return count(get_local_cart());
        }
    }
```

The count of the ordered products in the customor's shopping cart will be displayed by this function.

```php
<p>this customer has {{customer_cart_count()}} products in his basket.</p>
```

Output:

```html
<p> This customer has <count of products> products in his basket. </p>
```

Sample:

```html
<p>This customer has 3 products in his basket.</p>
```

---

#### pending_invoices_count

```php
    function pending_invoices_count(): bool|int {
        //TODO: I thinks this should be a model scope.
        $customer = get_customer_user();
        if ($customer !== false) {
            return $customer->invoices()->whereIn('payment_status', [
                PaymentStatus::PENDING,
                PaymentStatus::CANCELED,
                PaymentStatus::FAILED
            ])->where('is_active', true)->count();
        }
        return false;
    }
```

This function returns the count of pending invoices that a customer user has. This function returns the number if the user is logged in, otherwise returns the `false` value.

```php
<p>this customer has {{pending_invoices_count()
}} pending invoices in his resume.</p>
```

Output:

```html
<p>this customer has 0 pending invoices in his resume.</p>
```

---

#### get_local_cart

```php
    function get_local_cart(bool $full_data = false): array {
        $cart_data = [];
        if (key_exists(env("SITE_LOCAL_CART_COOKIE_NAME"), $_COOKIE)) {
            $cart_data = json_decode($_COOKIE[env("SITE_LOCAL_CART_COOKIE_NAME")], true);
        }
        ...
```

When a user adds an item to their shopping cart on the website, the website stores this information in the user's browser as a cookie. To access the contents of the user's local cart on the server side (i.e., in the website's backend code), a function called `get local cart()` is used. This function reads the user's local cart cookies and retrieves the relevant product data from the website's database. The function then returns an array of objects containing this product data.

As a sample, see shopping cart products with the instruction below:

```php
<p>this customer has {{customer_cart_count()}} product in his basket.</p>

<ul>
    @foreach(get_local_cart(true) as $cart_row)
        <li>
        {{$cart_row -> product-> title }}
        ({{$cart_row -> product_id}}) => {{$cart_row -> count}}
         :sum ({{$cart_row -> count* $cart_row -> product-> latest_price}})</li>
    @endforeach
</ul>
```

Output:

```html
<p>this customer has 1 product in his basket.</p>

<ul>
  <li>product name => 2 :sum (2440000)</li>
</ul>
```

As the `true` value is passed to the `get_local_cart` function, the product object will be returned too.
To calculate the product price, the `count` and the `latest price` are considered.

---

#### get_system_user

```php
function get_system_user(string $guard = null): ?SystemUser
```

According to the Larammerce user management structure, there are two types of users in the system:

1- System User(admins)

2- Customer User

This function returns the system user object if the logged-in user is a system user(admin), otherwise returns `null`.

---

#### get_system_users

```php
    function get_system_users(string $guard = null) {
        if (auth($guard)->check() and auth($guard)->user()->is_system_user)
            return SystemUser::all();
        return false;
    }
```

This function returns a list of system users(which are admins). All system users will be displayed with the following code:

Example:

```php
<ul>
    @foreach(get_system_users() as $system_user)
        <li>{{$system_user->user->full_name }}</li>
    @endforeach
</ul>
```

The output would be the names of the authenticated system users.

```php
<ul>
    <li>
        Gabriel Marsh
    </li>
     <li>
        William Shaw
    </li>
     <li>
        Freddy Harmon
    </li>
</ul>
```

---

#### is_customer

```php
    function is_customer(string $guard = null): bool {
        return auth($guard)->check() and auth($guard)->user()->is_customer_user;
    }
```

`is_customer` function checks if the logged-in user is the customer user or not.

Example:

```php
<p> The current user logged in {{ is_customer() ? "is" : "is not" }} customer user.</p>
```

- Mode 1:
  The output if the user is customer:

```html
<p>The current user logged in is customer user.</p>
```

- Mode 2:
  The output if the user is not customer:

```html
<p>The current user logged in is not customer user.</p>
```

---

:::tip Working with Directories
As an administrator, you have the option to edit any folders that you have created in the admin panel. This allows you to customize the display setting for each folder, including the location of the folder's directory on the app interface.

1. First login to the admin panel and navigate to the folders section.
2. Create a folder and enable the `web page` option.
3. Tap edit option:

- A form will be displayed for you in which you can determine where the directory will be shown.

![Navbar options](/helpers/Navbardirectory.png)

The `app_navbar_directories`, `navbar_directories`, `footer_directories`, and the `only_footer_directories` are the functions associated with these features. These functions' usages and how to work with them will be discussed in the following part.
:::

#### app_navbar_directories

```php
    function app_navbar_directories(array $conditions = []) {
        $tree = build_directories_tree(conditions: $conditions);
        return array_filter($tree, function ($root_item) {
            return $root_item->show_in_app_navbar;
        });
    }
```

This function returns the list of directories that should be displayed in the application navigation bar.
The function can be developed and have more conditions as input.

Sample 1:

```php{4}
...
    function app_navbar_directories(array $conditions = [

        "content_type"=>1

    ]) {
        $tree = build_directories_tree(conditions: $conditions);
        ...
}
```

Sample 2:

```php{4}
...
    function app_navbar_directories(array $conditions = [

        "content_type"=>DirectoryType::BLOG

    ]) {
        $tree = build_directories_tree(conditions: $conditions);
        ...
}
```

To use this function and see the result, enter these codes to the `blade file` and run `./deploy.sh` and refresh the related web page.

Example:

```php
<ul>
    @foreach(app_navbar_directories() as $directory)
        <li>{{$directory->title }}</li>
    @endforeach
</ul>
```

Output:

```html
<ul>
  <li>directory a</li>
  <li>directory b</li>
  <li>directory c</li>
</ul>
```

These directories are display in the mobile app.

---

#### navbar_directories

```php
    function navbar_directories(array $conditions = []): array {
        $tree = build_directories_tree(conditions: $conditions);
        return array_filter($tree, function ($root_item) {
            return $root_item->show_in_navbar;
        });
    }
```

This function gets the website navigation bar directories. If no condition sets for the function, it will pass the default datas to `app_navbar_directories`.

Example:

```php
<ul>
    @foreach(navbar_directories() as $directory)
        <li>{{$directory->title }}</li>
    @endforeach
</ul>
```

The output would be a list of directories that are allowed to display in the navbar.

Output:

```html
<ul>
  <li>directory a</li>
  <li>directory b</li>
  <li>directory c</li>
  <li>directory d</li>
  <li>directory e</li>
</ul>
```

These directories are only active for the header.

---

#### footer_directories

```php
    function footer_directories(array $conditions = []): array {
        $tree = build_directories_tree(conditions: $conditions);
        return array_filter($tree, function ($root_item) {
            return $root_item->show_in_footer;
        });
    }
```

Returns the directories displayed in the website's footer.

Example:

```php
<ul>
    @foreach(footer_directories() as $directory)
        <li>{{$directory->title }}</li>
    @endforeach
</ul>
```

Output:

```html
<ul>
  <li>directory a</li>
  <li>directory b</li>
  <li>directory c</li>
</ul>
```

Sample:

```html
<ul>
  <li>درباره ما</li>
  <li>تماس با ما</li>
  <li>باشگاه مشتریان</li>
</ul>
```

These directories are active in the footer.

---

#### only_footer_directories

```php{4}
    function only_footer_directories(array $conditions = []): array {
        $tree = build_directories_tree(conditions: $conditions);
        return array_filter($tree, function ($root_item) {
            return !$root_item->show_in_navbar and $root_item->show_in_footer;
        });
    }
```

Returns the directories that will be only displayed in the website footer. These directories are not active for the header. (This function shows the result when only and only the footer display option is active and other options stay deactivated).

Example:

```php
<ul>
    @foreach(only_footer_directories() as $directory)
        <li>{{$directory->title }}</li>
    @endforeach
</ul>
```

Output:

```html
<ul>
  <li>directory a</li>
  <li>directory b</li>
  <li>directory c</li>
</ul>
```

Sample:

```html
<ul>
  <li>درباره ما</li>
  <li>تماس با ما</li>
  <li>باشگاه مشتریان</li>
</ul>
```

---

#### is_directory_group_manual

```php
    function is_directory_group_manual(): bool {
        $settingVal = null;
        try {
            $settingVal = Setting::getCMSRecord('is_directory_group_manual');
        } catch (Exception $e) {
            return false;
        }
        return $settingVal->value !== "false";
    }
```

This function checks whether the category management of different groups of directories in the menu is manual or automatic. The output is a boolean value. `True` stands for manual and `false` stands for automatic setting.

Group categories on the websites are not constant. The fact that which submenu should be in which column of the mega menu will be determined with the config named `is_directory_group_manual`.

Example:

```php
@php
   dd(is_directory_group_manual());
@endphp

```

Output:

```bash
true
#or
false
```

---

#### directory_make_children_groups

```php
function directory_make_children_groups(?Directory $directory, int $column_count): array
...
```

This function allows you to partition directories into a specified number of columns based on the parent directory and desired column count. In manual mode, you can prioritize directories, while in automatic mode, the system arranges them so that each column has nearly equal height.

```php
@php
    directory_make_children_groups(\App\Models\Directory::find(2),5);
@endphp

```

Output

```html
array:5 [▼ 0 => array:3 [▼ 0 => App\Models\Directory {#id ▶} 1 =>
App\Models\Directory {#id ▶} 2 => App\Models\Directory {#id ▶} ] 1 => array:2 [▼
0 => App\Models\Directory {#id ▶} 1 => App\Models\Directory {#id ▶} ] 2 =>
array:3 [▼ 0 => App\Models\Directory {#id ▶} 1 => App\Models\Directory {#id ▶} 2
=> App\Models\Directory {#id ▶} ] 3 => array:3 [▼ 0 => App\Models\Directory {#id
▶} 1 => App\Models\Directory {#id ▶} 2 => App\Models\Directory {#id ▶} ] 4 =>
array:2 [▶] 0 => App\Models\Directory {#id ▶} 1 => App\Models\Directory {#id ▶}
]
```

---

#### get_product_root

**Deprecated function**

```php
 function get_product_root() {
        return Directory::roots()->from(DirectoryType::PRODUCT)->first();
    }
```

This function returns the main branch of the products. As a sample, let's categorize the menu based on the product's main branch:

Example 1:

```php
@php
    dd(directory_make_children_groups(get_product_root(),3));
@endphp
```

The output would be 3 main branches:

```html
<ul>
  <li>main branch 1</li>
  <ul>
    <li>subbranch 1.1</li>
    <li>subbranch 1.2</li>
  </ul>
  <li>main branch 2</li>
  <ul>
    <li>subbranch 2.1</li>
    <li>subbranch 2.2</li>
  </ul>
  <li>main branch 3</li>
  <ul>
    <li>subbranch 3.1</li>
    <li>subbranch 3.2</li>
  </ul>
</ul>
```

Example 2:

```php

<ul>
    @foreach(directory_make_children_groups(get_product_root(), 4) as $partition)
        <li>
            <ul>
                @foreach($partition as $directory)
                    <li>
                        <h4>{{$directory->title}}</h4>
                        <ul>
                            @foreach($directory->directories as $sub_directory)
                                <li>
                                    {{$sub_directory->title}}
                                </li>
                            @endforeach
                        </ul>
                    </li>
                @endforeach
            </ul>
        </li>
    @endforeach
</ul>
```

The output would show the directories and subdirectories as a list based on your system data. Here is an output sample:

```html
<ul>
  <li>
    <ul>
      <li>
        <h4>Directory 1</h4>
        <ul>
          <li>Subdirectory 1.1</li>
          <li>Subdirectory 1.2</li>
          <li>Subdirectory 1.3</li>
        </ul>
      </li>
      <li>
        <h4>Directory 2</h4>
        <ul>
          <li>Subdirectory 2.1</li>
          <li>Subdirectory 2.2</li>
          <li>Subdirectory 2.3</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>
    <ul>
      <li>
        <h4>Directory 3</h4>
        <ul>
          <li>Subdirectory 3.1</li>
          <li>Subdirectory 3.2</li>
          <li>Subdirectory 3.3</li>
        </ul>
      </li>
      <li>
        <h4>Directory 4</h4>
        <ul>
          <li>Subdirectory 4.1</li>
          <li>Subdirectory 4.2</li>
          <li>Subdirectory 4.3</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
```

---

#### get_directory

```php
function get_directory($directory_id): ?Directory {
        return Directory::find($directory_id);
    }

```

This function takes `directory_id` and returns the directory title. The output will be `null` if it does not find the directory.

Example:

```php
<p> The directory with  id `2` has the title of `{{get_directory(2)->title}}`</p>
```

Output:

```html
<p>
  The directory with id `2` has the title of
  `<the-title-of-the-directory-with-id-'2'>`
</p>
```

---

#### get_important_product_leaves

```php
function get_important_product_leaves(Directory $root_directory, int $count): array|Collection {
        return $root_directory->leafProducts()->mainModels()->visible()
            ->where('important_at', '!=', null)
            ->orderBy('important_at', 'DESC')
            ->orderBy('updated_at', 'DESC')
            ->take($count)->get();
    }
```

This function takes a specific directory, considers all the product leaves, extracts the given product count, and sorts them based on their priority.

Example:

```php
<h2>Latest important products for directory: {{$directory->title}}</h2>

<ul>
    @foreach(get_important_product_leaves($directory, 10) as $product)
        <li><a href="{{$product->getFrontUrl()}}">{{$product->title}}</a></li>
    @endforeach
</ul>
```

The output would contain a list of the latest important products.

Output:

```html

<h2>Latest important products for directory: <The directory name> </h2>

<ul>
     <li> directory a</li>
     <li> directory b</li>
     <li> directory c</li>
     <li> directory d</li>
     <li> directory e</li>
     <li> directory f</li>
     <li> directory g</li>
     <li> directory h</li>
     <li> directory i</li>
     <li> directory j</li>
</ul>

```

---

#### get_visible_product_leaves

```php{1,3}
function get_visible_product_leaves(Directory $root_directory, int $count): array|Collection {
        return $root_directory->leafProducts()->mainModels()->visible()->isActive()
            ->orderBy('important_at', 'DESC')
            ->take($count)->get();
    }
```

Takes a directory and the count of the products you want to be displayed, and returns the latest visible products (which are **available** to be sold) of that directory.
You can activate the product visibility from the admin panel in `shop > products` section.

Example:

```php
<h2>Latest visible products for directory: {{$directory->title}}</h2>
<ul>
    @foreach(get_visible_product_leaves($directory, 5) as $product)
        <li><a href="{{$product->getFrontUrl()}}">{{$product->title}}</a></li>
    @endforeach
</ul>
```

Output:

```html
<h2>Latest visible products for directory: <the-directory-title> </h2>

<ul>
     <li> directory a</li>
     <li> directory b</li>
     <li> directory c</li>
     <li> directory d</li>
     <li> directory e</li>
</ul>
```

---

#### get_directory_product_leaves

```php{1}
function get_directory_product_leaves(Directory $root_directory, int $count, $only_active_items = true): array|Collection {
        $result = $root_directory->leafProducts()->mainModels()->visible();
        $tmp_result = clone $result;
        if ($only_active_items or $tmp_result->isActive()->count() >= $count)
            $result = $result->isActive();
        return $result->orderBy("important_at", "desc")->take($count)->get();
    }
```

This function takes a specific directory, count of considered products, and `only active items` value, and returns products leaves referring to the conditions.

**Note:** If `$only_active_items = true`, the function will return only products that are active and are available to be sold, Otherwise it will show even product leaves with zero stock as the result based on the given product count, but it will sort them by priority of being available.

Example:

```php
<h2>Latest visible products for directory: {{$directory->title}}</h2>
<ul>
    @foreach(get_directory_product_leaves($directory, 5) as $product)
        <li><a href="{{$product->getFrontUrl()}}">{{$product->title}}</a></li>
    @endforeach
</ul>
```

Output:

```html
<h2> Latest visible products for directory: <the-directory-title> </h2>

<ul>
     <li> directory a</li>
     <li> directory b</li>
     <li> directory c</li>
     <li> directory d</li>
     <li> directory e</li>
     <li> directory f</li>

</ul>
```

---

#### latest_products

```php
function latest_products(int $count = 8): array|Collection {
        if ($count > 0) {
            return Product::mainModels()->visible()
                ->orderBy('important_at', 'DESC')
                ->orderBy('updated_at', 'DESC')
                ->where("is_active", true)
                ->take($count)->get();
        }
        return [];
    }
```

Returns the latest or newest products added to the system.

```php
<ul>
    @foreach(latest_products(2) as $product)
        <li><a href="{{$product->getFrontUrl()}}">{{$product->title}}</a></li>
    @endforeach
</ul>
```

The output would be the latest added product names.

Sample:

```html
<ul>
  <li>product x</li>
  <li>product y</li>
  <li>product z</li>
</ul>
```

---

#### rated_products

```php
 function rated_products(int $count = 8): array|Collection {
        if ($count > 0)
            return Product::mainModels()->visible()->popular()->where("is_active", true)->take($count)->get();
        return [];
    }
```

This function returns products at the highest rate.
The function considers the `average rating` and the `rates count` in returning the result.
In the case of multiple products with equal ratings, the product with a higher rate count will be ranked higher in the output.

```php
<h2>Our highest rated products</h2>
<ul>
    @foreach(rated_products(5) as $product)
        <li><a href="{{$product->getFrontUrl()}}">{{$product->title}} [{{$product->average_rating}}
                | {{$product->rates_count}}]</a></li>
    @endforeach
</ul>
```

Output:

```html
<h2>Our highest rated products</h2>
<ul>
  <li>product x [5 | 10]</li>
  <li>product y [5 | 8]</li>
  <li>product z [4 | 9]</li>
  <li>product h [3 | 4]</li>
  <li>product k [2 | 3]</li>
</ul>
```

As you see, the `product x` and `product y` have equal ratings, but `product x` is prior to `y` because of the higher rating count.

---

#### custom_query_products

```php
function custom_query_products(string $identifier): array|Collection {
        try {
            return ProductQuery::findByIdentifier($identifier)->getProducts();
        } catch (Exception $e) {
            return [];
        }
    }
```

![Custom query](/helpers/CustomQuery.png)

This function is built based on the admin panel custom query. As you see an identifier is passed to the function. So the function will return products of the directories related to that custom query and the specific identifier.
For example, if a custom query named `test1` is created for products with a price of +1m, all the products with this identifier will be returned by calling this function. Another example can be about discount products:

Example:

```php
<h2>The result products of custom query named: `<write the identifier here>`</h2>
<ul>
    @foreach(custom_query_products("<identifier name>") as $product)
        <li><a href="{{$product->getFrontUrl()}}">{{$product->title}}
                <strike>{{$product->previous_price}}</strike> {{$product->latest_price}}</a></li>
    @endforeach
</ul>
```

Output:
A list of products which have this query's condition will be displayed with required details here.

```html
<h2> The result products of custom query named: `<identifier name>` </h2>
<ul>
     <li>product x previous_price|latest_price </li>
     <li>product y 620000 558000</li>
     <li>product z 470000 423000</li>
     <li>product h 109000 87200</li>
     <li>product k 215000 150500</li>
</ul>
...

```

---

#### custom_query_product_ids

```php
function custom_query_product_ids(string $identifier): array|Collection {
        try {
            return ProductQuery::findByIdentifier($identifier)->getProductIds();
        } catch (Exception $e) {
            return [];
        }
    }
```

This function returns the product id list based on the custom query and identifier.

Example:

```php
<script>
    const listOfProductIds = {{json_encode(custom_query_product_ids("all_discount_products"))}};
    listOfProductIds.forEach(function (iterId) {
        console.log(iterId);
    });
</script>
```

Output

```html
<ul>
  <li>102</li>
  <li>103</li>
  <li>108</li>
  <li>600</li>
  <li>605</li>
  <li>801</li>
</ul>
```

It can be seen that the id (not the object) of the discounted products is returned in the console.

---

#### get_product_filter

```php
 function get_product_filter(string $identifier): ProductFilter {
        try {

            return ProductFilter::findByIdentifier($identifier);
        } catch (Exception $e) {
            return new ProductFilter();
        }
    }
```

This function takes the identifier and returns the product filter **object**.

---

#### custom_filter_products

```php
function custom_filter_products(string $identifier): array|Collection {
        try {
            return ProductFilter::findByIdentifier($identifier)->getProducts();
        } catch (Exception $e) {
            return [];
        }
    }
```

Once you created a custom filter in admin pannel, you can access to this filter's related products on the front of the website using a `foreach`.
As an example, in the custom filter section of the admin panel, a filter named `my_fav_filter` , filtered based on the X brand, and the discounted products as the custom query have been created. The output of this filter is:

Example:

```php
<h2>The result products of custom filter named: `<filter identifier>`</h2>
<ul>
    @foreach(custom_filter_products("<filter identifier>") as $product)
        <li><a href="{{$product->getFrontUrl()}}">{{$product->title}}</a></li>
    @endforeach
</ul>
```

Output:

```html
<h2>The result products of custom filter named: `<filter identifier>` </h2>
<ul>
    <li>product m</li>
    <li>product n</li>
</ul>

```

---

#### custom_filter_product_ids

```php
function custom_filter_product_ids(string $identifier): array|Collection {
        try {
            return ProductFilter::findByIdentifier($identifier)->getProductIds();
        } catch (Exception $e) {
            return [];
        }
    }
```

This function works just like `custom_filter_products` but with the difference that returns the `ID` of the products in the custom filter, not the object.

```php
<script>
    const listOfProductIds = {{json_encode(custom_filter_product_ids("<filter identifier>"))}};
    listOfProductIds.forEach(function (iterId) {
        console.log(iterId);
    });
</script>
```

Output:

```html
<ul>
  <li>102</li>
</ul>
```

---

#### get_filter_data

```php
 function get_filter_data(array $product_ids): array {
        return App\Utils\CMS\ProductService::getFilterData($product_ids);
    }
```

This function takes product ids and returns the filter data required for a product list by reading from product services.
With this function, you will be able to see the data of specific products and consider some properties as good options for filtering the products to create categories.
Created filters will be displayed in the website's sidebar.

Example:

```php
@php
        $filter_data = get_filter_data(custom_filter_product_ids("my_fav_filter"));
@endphp

<h2>Filter data for the above products could be:</h2>
<h4>price range: {{$filter_data["price_range"]["min"]}} to {{$filter_data["price_range"]["max"]}}</h4>

<h4>Colors:</h4>
<ul>
    @foreach($filter_data["colors"] as $color)
        <li>{{$color->name}} - {{$color->hex_code}}</li>
    @endforeach
</ul>
```

Output:

```html
<h2>Filter data for the above products could be:</h2>
<h4>price range: 115000 to 180000</h4>
<h4>Colors:</h4>
<ul>
  <li>90ee90# سبز پسته ای</li>
</ul>
```

---

#### important_products

```php
function important_products(int $count = 8): array|Collection {
        if ($count > 0) {
            return Product::important()
                ->orderBy('important_at', 'DESC')
                ->where("is_active", true)
                ->mainModels()
                ->visible()
                ->take($count)->get();
        }
        return [];
    }
```

This function returns products sorted based on `important_at`. It includes the products whose `is important` option is active in the admin panel.

```php
@php
     dd(important_products());
@endphp
```

Output:

```html
Illuminate\Database\Eloquent\Collection {#2340 ▼ #items: array:3 [▼ 0 =>
App\Models\Product {#2 ▶} 1 => App\Models\Product {#3 ▶} 2 => App\Models\Product
{#5 ▶} ] #escapeWhenCastingToString: false }
```

---

#### get_customer_addresses

```php
   function get_customer_addresses() {
        return get_customer_user()->addresses;
    }
```

Returns the addresses of the authenticated customers.

```php
<h2>Your addresses:</h2>
<ul>
    @foreach(get_customer_addresses() as $address)
        <li>{{$address->name}} | {{$address->city?->name}} | {{$address->superscription}}</li>
    @endforeach
</ul>
```

Output:

```html
<h2>Your addresses:</h2>
<ul>
  <li>آدرس1|تهران| طالقانی، کوچه 18، پلاک 25</li>
</ul>
```

---

#### get_invoices

```php
function get_invoices() {
        return get_customer_user()->invoices()->orderBy('id', 'DESC')->paginate(Invoice::getFrontPaginationCount());
    }
```

This function by considering logged in user, takes all the customer's invoices and returns them paginated.

```php
<h2>Your invoices:</h2>
<ul>
    @foreach(get_invoices() as $invoice)
            <li>
                <a href="{{lm_route("customer.invoice.show-checkout", $invoice)}}">{{$invoice->id}} | {{$invoice->sum}} | {{$invoice->created_at}}</a>
            </li>
    @endforeach
</ul>
```

Output

```html
<h2>Your invoices:</h2>
<ul>
  <li>[product id] | [price] | [date]</li>
  <li>2 | 180000 | 2023-04-17 14:11:40</li>
  <li>3 | 115000 | 2023-04-17 14:13:30</li>
  <li>4 | 120000 | 2023-04-17 14:18:12</li>
</ul>
```

---

**Note:** The type object will be removed in later versions from all the functions related to blogs, and these functions will only have the count object as input.

#### get_blog_categories

```php
    function get_blog_categories($directory) {
        if (count(is_countable($directory->directories) ? $directory->directories : []) > 0)
            return $directory->directories;
        else if ($directory->directory_id != null)
            return $directory->parentDirectory->directories;
        return [$directory];
    }
```

Returns all the blog type categories of specific blog directories.

---

#### get_popular_blog

```php
 function get_popular_blog($count, $type) {
        return Article::popular()->from($type)->with('directory')->take($count)->get();
    }
```

This function's inputs are the count and type of blogs you want to be displayed.
It seeks between all the blog posts which are article objects for the popular ones and checks whether they are synced with the type passed as input and takes as many blogs with their directories as passed to the input.
The type object will be removed in later versions, and this function will only receive the count object from the input.

---

#### get_latest_blog

```php
function get_latest_blog($type, $count) {
        if (config("wp.enabled")) {
            return WPPost::latest()->take($count)->get();
        }
        return Article::from($type)->latest()->with('directory')->take($count)->get();
    }
```

Returns the latest blog posts with that given count.

---

#### get_suggested_blog

```php
function get_suggested_blog($type, $count) {
        if (config("wp.enabled")) {
            //TODO: this algorithm should be changed for fetching suggested blog.
            return WPPost::latest()->skip(2)->take($count)->get();
        }
        return Article::suggested()->from($type)->with('directory')->take($count)->get();
    }
```

Returns suggested blogs with specified given count.

---

#### get_system_messages

```php
 function get_system_messages() {
        try {
            $messages = SystemMessageService::getMessages();
            SystemMessageService::flushMessages();
            return $messages;
        } catch (Exception $e) {
            return [];
        }
    }
```

This function will be called on all the pages or on `base.blade'`s footer.
Sometimes an error may occur as you send data to the admin controller. Meantime system will generate the error log in message. In order to receive these messages, this function will be called and illustrate the massage to the user.

---

#### has_system_messages

```php
function has_system_messages(): bool {
        return SystemMessageService::hasMessages();
    }
```

Checks whether the system has a message.

---

#### get_months

```php
 function get_months(): array {
        return [
            "فروردین",
            "اردیبهشت",
            "خرداد",
            "تیر",
            "مرداد",
            "شهریور",
            "مهر",
            "آبان",
            "آذر",
            "دی",
            "بهمن",
            "اسفند",
        ];
    }
```

Returns the list of solar months.

---

#### get_years

```php
function get_years(): array {
        $start_year = 1300;
        $end_year = JDateTime::date('Y', time(), false);
        return range($start_year, $end_year);
    }
```

This function returns the list of years you want to use in each form. The year of origin is 1300.

---

#### hide_number

```php
function hide_number($number) {
        for ($i = 3; $i < strlen($number) - 3; $i++)
            $number[$i] = '*';
        return $number;
    }
```

Using this function, you'll be able to hide some parts of a number and use the asterisk character instead.

---

#### hide_text

```php
function hide_text($text): string {
        return substr($text, 0, 4) . "*******" . substr($text, strlen($text) - 4);
    }
```

Using this function, you can hide some parts of a text and use the asterisk character instead.

---

#### get_payment_drivers

```php
function get_payment_drivers() {
        return Provider::getEnabledDrivers(true);
    }
```

This function returns payment gateways a user can pay invoices by.

---

#### is_default_payment_driver

```php
function is_default_payment_driver($driver): bool {
        return Provider::isDefaultDriver($driver);
    }
```

This function sets an active payment gateway as default. The function checks payment drivers and returns active payment gateways.

---

#### get_disabled_setting_appliances

```php
function get_disabled_setting_appliances(): array {
        $disabled_setting_appliances = env('DISABLED_APPLIANCES', '');
        if (strlen($disabled_setting_appliances) == 0)
            return [];
        return explode(',', $disabled_setting_appliances);
    }
```

This function returns the list of inactive admin panel appliances.

---

#### get_configurations

```php
function get_configurations($needsJson = false, $prefix = "") {
    ...
}
```

Returns configurations exist in the `.env` file.

---

#### get_searched_products

```php
 function get_searched_products() {
        return Product::search(request('query'))->mainModels()->visible()->get();
    }
```

Based on the given query, this function will seek between products and return searched products.

---

#### get_digits

```php
 function get_digits($lang) {
        $digits = [
            "fa" => explode(",", "۱,۲,۳,۴,۵,۶,۷,۸,۹,۰"),
            "en" => explode(",", "1,2,3,4,5,6,7,8,9,0")
        ];
        if ($lang != null and key_exists($lang, $digits))
            return $digits[$lang];
        return [];
    }
```

This function returns the digits list of required language given to the input.

---

#### convert_digits

```php
function convert_digits($number, string $from = "en", string $to = "fa"): string {
        $fromList = get_digits($from);
        $toList = get_digits($to);
        $number = "{$number}";
        foreach ($fromList as $index => $fromDigit) {
            $number = str_replace($fromDigit, $toList[$index], $number);
        }
        return $number;
    }
```

This converts digits from English to Persian and vice versa.

---

#### format_price

```php{1,3}
function format_price($price, string $lang = "fa"): string {
        $price = intval($price);
        $separator = $lang == "fa" ? "،" : ",";
        $price = number_format($price, 0, '.', $separator);
        return $lang == "fa" ?
            convert_digits($price, "en", "fa") :
            $price;
    }
```

This function takes the price(integer type) and separates every 3 digits of it and places a comma sign. Persian(`،`) or English(`,`) comma signs will be displayed based on the given language.

---

#### get_product_color_models

```php
function get_product_color_models(Product $product) {
        return Product::models($product, false)
            ->orderBy('id', 'DESC')->groupBy('color_code')->get();
    }
```

This function takes the product and returns available product colors.

---

#### get_product_last_color

```php
function get_product_last_color(Product $product): Color {
        return $product->colors()->orderBy('id', 'DESC')->first();
    }
```

This function extracts all the product colors, sorts them, and returns the last color added for the product.

---

#### get_product_accessories

```php
 function get_product_accessories(Product $product) {
        return $product->accessories()->mainModels()->visible()->get();
    }
```

This function takes the product object and returns the list of all the accessories added to the system and related to that product.

---

#### get_product_related_articles

```php
function get_product_related_articles(Product $product, $type, int $count = 3) {
        $tags = $product->tags()->get()->pluck("id");
        return Article::from($type)->whereHas("tags", function ($query) use ($tags) {
            $query->whereIn("id", $tags);
        })->latest()->take($count)->get();
    }
```

This function takes product, product type, and count of required articles as inputs and Returns all the articles related to the given product.

---

#### get_product_related_products

```php{1}
function get_product_related_products(Product $product, int $count = 5) {
        $directory = $product->directory;
        $leafProducts = new Collection();
        $products = $directory->products()->mainModels()->visible()
            ->where("is_active", true)->latest()->except($product->id)->take($count)->get();
        ...
    }
```

This function takes a product and returns its related products in the given count.

---

#### get_product_similar_products

```php{1}
function get_product_similar_products(Product $product, int $count = 5, int $key_id = 0) {
        if ($key_id === 0) {

```

This function takes the product object, count of similar products you want to be displayed, and a key_id as similar property(for example brand name). Then seeks products with the same specifications but different brands(key_id) and returns similar products.
This function is practical for creating suggestions.

---

#### get_related_products_with_directory_level

```php
function get_related_products_with_directory_level(Product $product, int $count = 5, int $level = 1) {
        $directory = $product->directory;
        if ($level > 1) {
            while ($level != 1) {
                $directory = $directory->parentDirectory;
                $level--;
            }
        }
        return $directory->leafProducts()->mainModels()->visible()->except($product->id)
            ->orderBy("priority", "ASC")->take($count)->get();
    }
```

This function returns the related products within the same category. To maintain similarity, we recommend searching for products in one level higher within the category hierarchy (but not beyond).

---

#### get_product_attributes

```php
function get_product_attributes(Product $product = null) {
        if ($product != null) {
            $attributes = PAttr::getProductAttributes($product);
            return $attributes['attributes'];
        } else {
            return null;
        }
    }
```

This function returns a product's related attributes such as its brand, maker, country, material, and all the product's keys and values.

---

#### get_article_related_products

```php
 function get_article_related_products(Article $article, int $count = 3) {
        $tags = $article->tags()->get()->pluck('id');
        return Product::mainModels()->visible()->whereHas('tags', function ($query) use ($tags) {
            $query->whereIn('id', $tags);
        })->where("is_active", true)->mainModels()->visible()->latest()->take($count)->get();
    }
```

This function considers an article and returns the related products. The articles and products connection method is via an object named `tags`.

**Note:** This is completely different from Seo tags.

---

#### get_article_related_articles

```php
 function get_article_related_articles(Article $article, int $count = 4) {
        return $article->directory->articles()->latest()->except($article->id)->take($count)->get();
    }
```

This function returns the articles related to a given article based on their tags.

---

#### recaptcha_enabled

```php
function recaptcha_enabled(): bool {
        return !str_contains(env("TEMPORARILY_DISABLED_RULES", ""), "g-recaptcha-response");
    }
```

This function determines whether the Recaptcha is enabled on the system or not. It can be disabled to prevent showing recaptcha continuously in development situations.

---

#### get_same_models_products

```php
function get_same_models_products($product): array {
        $products = Product::models($product, false)
            ->with('productStructure', 'images', 'rates')
            ->get();
        return json_decode($products);
    }
```

This function takes a product, considers its model, and returns different types of the same model. e.g different sizes of product A.

---

#### check_cart

```php
function check_cart($product_id): bool {
        $customer = get_customer_user();
        if ($customer !== false) {
            return $customer->cartRows()->where("product_id", $product_id)->count() > 0;
        } else {
            $cart_rows = get_local_cart();
            foreach ($cart_rows as $cart_row) {
                if ($cart_row->product_id === $product_id) {
                    return true;
                }
            }
            return false;
        }
    }
```

This function checks if the given product is in the cart. It is suggested not to use this function due to low efficiency and replace a frontend function to check the cart, but as its functionality is necessary, can't be deprecated.

---

#### get_cart_information

```php
function get_cart_information($product_id) {
        $customer = get_customer_user();
        $selected_row = null;
        if ($customer !== false) {
            ...
        }
    ...
    }
```

This function returns cart-rows data related to a product_id.(Using this function is not suggested!)

---

#### get_cart

```php
function get_cart(): \Illuminate\Database\Eloquent\Collection|array {
        $customer = get_customer_user();
        if ($customer !== false) {
            $cart_rows = $customer->cartRows()->with('product')->orderBy('id', 'DESC')->get();
        } else {
            $cart_rows = get_local_cart(true);
        }
        return $cart_rows;
    }
```

This function returns a collection or an array of cartRows data, which can be local cartRows or database objects.

---

#### get_minimum_purchase_free_shipment

```php
 function get_minimum_purchase_free_shipment() {
        try {
            return ShipmentCostService::getRecord()->getMinimumPurchaseFreeShipment();
        } catch (Exception $e) {
            Log::error('Message : ' . $e->getmessage());
            return 'not set';
        }
    }
```

This function declares the minimum amount of purchase in which the shipment cost would be free.

---

#### product_disable_on_min

```php
 function product_disable_on_min(): ?string {
        return Product::shouldDisableOnMin();
    }
```

This function specifies whether a product should be disabled when it has zero stock, or when it reaches a minimum amount.

---

#### customer_can_edit_profile

```php
 function customer_can_edit_profile(): bool {
        try {
            return strtolower(Setting::getCMSRecord(CMSSettingKey::CUSTOMER_CAN_EDIT_PROFILE)->value) === "true";
        } catch (Exception $e) {
            return true;
        }
    }
```

This function specifies whether the customer is allowed to edit their profile or not.

---

#### get_root_directory_per_directory

```php
 function get_root_directory_per_directory(Directory $directory) {
        foreach ($directory->getParentDirectories() as $dir) {
            if ($dir->directory_id == null)
                return $dir;
        }
        return $directory;
    }
```

This function takes a directory and returns its root node.

**Note**: The root node is the highest node in the tree structure, and has no parent.

---

#### h_view

```php
function h_view($template = null, array $data = []) {
    ...
}
```

This function is an optimized version of the `view` function in laravel. It will be composed in another article.

---

#### get_cms_setting

```php
function get_cms_setting(string $key): string {
        try {
            $setting = Setting::getCMSRecord($key);
            return $setting->value;
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return "";
        }
    }
```

This function takes the key from the input and returns the value set in the database by the administrator of e-commerce.
For example, if you call `get_cms_setting('phone_number')` it will return the value passed for phone_number by the administrator.

---

#### get_template_views

```php
function get_template_views(): array {
        return array_map(function ($blade_name) {
            return str_replace(".blade.php", "", $blade_name);
        }, \App\Utils\CMS\Template\TemplateService::getOriginalBlades(true));
    }
```

This function returns a list of available template original views' names.

---

#### get_current_customer_location

```php
function get_current_customer_location(): string {
        $customer_location = \App\Utils\CMS\Setting\CustomerLocation\CustomerLocationService::getRecord();
        if ($customer_location != null)
            return "{$customer_location->getState()->name}، {$customer_location->getCity()->name}";
        return "لطفا شهر و استان خود را مشخص کنید";
    }
```

There is no explanation for this function.

---

#### get_current_customer_location_data

```php
function get_current_customer_location_data(): ?array {
        $customer_location = \App\Utils\CMS\Setting\CustomerLocation\CustomerLocationService::getRecord("");
        if ($customer_location != null)
            return [
                "state_id" => $customer_location->getState()->id,
                "city_id" => $customer_location->getCity()->id
            ];
        return null;
    }
```

There is no explanation for this function.

---

#### get_customer_meta_categories

```php
function get_customer_meta_categories(): \Illuminate\Database\Eloquent\Collection|array {
        return CustomerMetaCategory::main()->get();
    }
```

This function returns a list of available customer meta categories.

---

#### cmc_get_options

```php
function cmc_get_options($identifier, $customer_meta_category): array {
        try {
            return explode(";", cmc_get_content($identifier, $customer_meta_category));
        } catch (Exception $e) {
            return [];
        }
    }
```

This function returns the applicable options for a specific customer meta category field that is passed to the function and specified by the `$identifier`.

---

#### cmc_get_content

```php
function cmc_get_content($identifier, $customer_meta_category): string {
        try {
            return (Arr::first($customer_meta_category->data_object, function ($iter_item) use ($identifier) {
                return $iter_item->input_identifier === $identifier;
            }))->input_content;
        } catch (Exception $e) {
            return "";
        }
    }
```

This function returns the data of a specific field of any customer meta category that is passed.

---

#### get_shipment_cost

```php
 function get_shipment_cost(Invoice $invoice, $state_id = 0): int {
        if ($state_id !== 0)
            $invoice->state_id = $state_id;
        return $invoice->calculateShipmentCost();
    }
```

This function returns the shipment cost based on the given state_id.

---

#### build_directories_tree

```php
function build_directories_tree(?Directory $root = null, array $conditions = [], array $order = []): array {
        ...
        foreach ($directories as $directory) {
            ...
        }
        return $root == null ? $branch : ($map[$root->id]->directories ?? []);
    }
```

This function does illustrate, eager loads, and returns the root directory tree to the lowest node.

**Note:** Eager load is a process in which a query for one type of object also loads related objects. So you won't need to run separate queries to find related objects!

---

#### clean_cart_cookie

```php
 function clean_cart_cookie() {
        CartProvider::cleanCookie();
    }
```

This function clears the cart cookies.

---

#### get_structure_sort_title

```php
    function get_structure_sort_title($keys) {
        $sort_data_title = false;
        foreach ($keys as $key) {
            if ($key->is_sortable) {
                if ($sort_data_title === false) {
                    $sort_data_title = $key->title;
                } else {
                    return false;
                }
            }
        }
        return $sort_data_title;
    }
```

This function is part of a more prominent feature named ‍‍`Product Sort By Score`.
It returns the name of the specific product structure key by which the products are sorted.

---

#### get_logistics_schedule

```php
 function get_logistics_schedule(bool $contains_disabled = true) {
    ...
    return $data;
    }
```

This function is about Logistics timelines and returns the timetable.

For example, in what time frames can your product be sent?

---

#### day_of_week

```php
 function day_of_week(int $diff) {
        return \App\Utils\Jalali\JDate::forge(\Illuminate\Support\Carbon::now()->addDay($diff))->format("%A");
    }
```

This function consideres current day, adds given days count, returns the calculated day.
Expected values are Persian names of the weekdays like 'شنبه', 'یکشنبه', 'دوشنبه', etc.

---

#### get_current_formal_date

```php
function get_current_formal_date() {
        return \App\Utils\Common\TimeService::getCurrentFormalDate();
    }
```

This function returns the standard Persian current date formatted to show on the website.

---

#### get_current_date

```php
function get_current_date() {
        return \App\Utils\Common\TimeService::getCurrentDate();
    }
```

This function returns the current date(date object).

---

#### get_max_transaction_amount

```php
 function get_max_transaction_amount(): int {
        return \App\Utils\PaymentManager\ConfigProvider::MAX_TRANSACTION;
    }
```

This function specifies the maximum amount of transactions that are allowed to handle by the system. In other words, it tells you the maximum amount of each invoice you create for your clients. This limitation is according to the payment IPGs' policies.

#### get_invoice_tax_heading

```php
function get_invoice_tax_heading(): string {
    $heading = \App\Utils\FinancialManager\ConfigProvider::getInvoiceTaxHeading();
    if (should_show_tax_percentage_in_invoice_heading()) {
        $heading .= " (" . (get_default_tax_percentage() + get_default_toll_percentage()) . "%)";
    }
    return $heading;
}
```

This function provides the invoice tax heading for the theme developer, for example, if the admin changes the
heading of the invoice tax, the theme developer can use this function to get the new heading.
also this function automatically detects the configured tax+toll percentage and shows it in the heading if the
`show_tax_percentage_in_invoice_heading` is set to true in the dashboard.

---

#### should_show_tax_percentage_in_invoice_heading

```php
    function should_show_tax_percentage_in_invoice_heading(): bool {
        return \App\Utils\FinancialManager\ConfigProvider::shouldShowTaxPercentageInInvoiceHeading();
    }
```

This function only returns the value of the `show_tax_percentage_in_invoice_heading` config in the dashboard.

---

## References

_1.<a name="1"> [Know more about parse_url](https://www.php.net/manual/en/function.parse-url.php) </a>_

#### Video sources

---

<iframe src="https://www.aparat.com/video/video/embed/videohash/wHqJR/vt/frame"  height="300" width="700" style="  border: 2px solid #bdc3c7; border-radius: 5px; opacity: 1;" allowFullScreen="true"></iframe>

---

<iframe src="https://www.aparat.com/video/video/embed/videohash/f7cd4/vt/frame"  height="300" width="700" style="  border: 2px solid #bdc3c7; border-radius: 5px; opacity: 1;" allowFullScreen="true"></iframe>

---

<iframe src="https://www.aparat.com/video/video/embed/videohash/cxIZb/vt/frame"  height="300" width="700" style="  border: 2px solid #bdc3c7; border-radius: 5px; opacity: 1;" allowFullScreen="true"></iframe>

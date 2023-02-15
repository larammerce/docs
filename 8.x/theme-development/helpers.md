## Template helper functions

[[toc]]

According to the need of every single content management engine to simplify the process of pulling,
modifying, and displaying changes for template creators, some special functions called **Helpers** are defined. 
Larammerce engine is no exception.
Therefor, for a better understanding, this document is provided for you, explaining the use of helper functions.

To reach all the helpers, direct to the path: `app/Utils/CMS/Template/helpers.php`.

NOTE: Check for updates in the helpers file, due to any changes in functions.

<br/>

------------------------------------------------------------

####get_identity

```php
function get_identity(): array
```

This function is to display the Larammerce project supporter identification. Currently, the Hinza identification is displayed on Larammerce projects. Enter the following code to display identification.
```php
@php

get_identity();

@endphp
```

Output
```
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
<br/>

------------------------------------------------------------



####shorten_text
```php
function shorten_text($text, $wordsCount = 75)
```
This function's usage is to appoint the length of displayed descriptions at first sight including 2 different input types, text and integer.
The integer input is to consider how many words are allowed to be shown before `etc` sign ( ... ).

Attention to the sample below:

```php
@php
$text= "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
@endphp

<p> {{shorten_text($text,10)}}</p>
```
Output
```
Lorem Ipsum is simply dummy text of the printing and...
```
<br/>

-------------------------------------------------


####parse and unparse_url 

`URL` details such as `scheme`, `user`. `pass`, `host`, `port`,`path`, `query`, `fragment` and others can be determined by `parse` function. <br/><br/>
To do so follow description below:


```php
@php

$url= "https://google.com/salam/donya?test=sample";
parse_url($url);

@endphp
```
Output
``` 
array:4 [▼
  "scheme" => "https"
  "host" => "google.com"
  "path" => "/salam/donya"
  "query" => "test=sample"
]
```

Following structure can be used in order to `unparse` the `URL`.
```php
unparse_url(array $parsed_url, array $ommit = []): string
```



<br/>
Attention to the `unpars_url` function sample. <br/>
unparse the URL after you defined the query as an empty value and see the result:

```php
@php

$url= "https://google.com/salam/donya?test=sample";
$parsed_url = parse_url($url);

$parsed_url["query"] = " ";
$new_url = unparse_url($parsed_url);

@endphp

<p> the changed url : {{ $new_url }}</p>
```
Output
``` 
"https://google.com/salam/donya? "
```

NOTE: `unparse` function merge all detail to unified URL.
___________




#### get_product_all_extras_percentage
  

```php
function get_product_all_extras_percentage()
```
`get_product_all_extras_percentage()` is a function used to return summation of `getTaxpercentage` and `getToolpercentage` values.

```php
<p>Product all extra percentages  {{ get_product_all_extras_percentage() }}</p>
```
Output
``` 
Product all extra percentages 9
```
_____________





### `locale_url`
```php
function locale_url(string $normal_url): string
```

If a URL is passed to this function. Adds a locale to the first part of the URL, for example, fa or en.

First, the ability to be multilingual must be activated. So, in the admin panel settings, in addition to enabling the Persian language, activate another language, for example, English . and then set a locale as in the code below.

```php
@php

$url= "https://google.com/salam/donya?test=sample";
app()->setLocale("fa");

@endphp

<p> {{ locale_url($url) }}</p>
```
Output
```
https://google.com/fa/salam/donya?test=sample
```
_______________




### `lm_route`
```php
function lm_route($name, $parameters = [], $absolute = true): string
```

This function takes Laravel's route from the input and gives it to `local_url`, which is enhanced for multilingual mode.
_______________





### `lm_url`
```php
function lm_url($path = null, $parameters = [], $secure = null): string
```

This function calls `locale_url`. And it is enhanced for Laravel URLs.

______________________


### `get_gallery`
```php
function get_gallery(string $galleryName)
```
`get_gallery` function is used in the Larammerce Template Engine structure and cannot be used. This function returns the identifir given in the blade file to the desired gallery. In the following code, the content of `index_banner1` gallery can be seen.

```php
@php

get_gallery("index_banner1");

@endphp
```
Output
```
App\Models\Gallery {#2490 ▼
  #table: "galleries"
  #hidden: array:1 [▶]
  #fillable: array:2 [▶]
  -galleryFields: []
  #guarded: []
  #show_list_types: array:2 [▶]
  #connection: "mysql"
  #primaryKey: "id"
  #keyType: "int"
  +incrementing: true
  #with: []
  #withCount: []
  +preventsLazyLoading: false
  #perPage: 15
  +exists: true
  +wasRecentlyCreated: false
  #escapeWhenCastingToString: false
  #attributes: array:5 [▼
    "id" => 8
    "identifier" => "index_banner1"
    "fields" => "a:2:{s:12:"banner_title";C:43:"App\Utils\CMS\Template\Gallery\GalleryField":81:{{"id":"banner_title","title":"\u0639\u0646\u0648\u0627\u0646 \u0628\u0646\u0631" ▶"
    "created_at" => "2020-01-13 14:27:45"
    "updated_at" => "2020-01-13 14:27:45"
  ]
  #original: array:5 [▼
    "id" => 8
    "identifier" => "index_banner1"
    "fields" => "a:2:{s:12:"banner_title";C:43:"App\Utils\CMS\Template\Gallery\GalleryField":81:{{"id":"banner_title","title":"\u0639\u0646\u0648\u0627\u0646 \u0628\u0646\u0631" ▶"
    "created_at" => "2020-01-13 14:27:45"
    "updated_at" => "2020-01-13 14:27:45"
  ]
  #changes: []
  #casts: []
  #classCastCache: []
  #attributeCastCache: []
  #dates: []
  #dateFormat: null
  #appends: []
  #dispatchesEvents: []
  #observables: []
  #relations: []
  #touches: []
  +timestamps: true
  #visible: []
}
```
A gallery object returned from the gallery model whose table name is galleries. this fields:  `identifier`, `fields`, `created_at`, and `updated_at`displayed in `attributes` and `original`.
____________________


### `get_gallery_items`
```php
function get_gallery_items(string $gallery_name, int $count = -1, bool $random_select = false)
```
`get_gallery_items` function takes the name of the gallery and the number of items from the input, and whether random select is true or false.
```php
@php

get_gallery_items("faqs");

@endphp
```
Output
```
Illuminate\Database\Eloquent\Collection {#2506 ▼
  #items: array:8 [▼
    0 => App\Models\GalleryItem {#2505 ▼
      #table: "gallery_items"
      #hidden: array:1 [▶]
      #appends: array:1 [▶]
      #fillable: array:5 [▶]
      -fields: []
      #guarded: []
      #show_list_types: array:2 [▶]
      #connection: "mysql"
      #primaryKey: "id"
      #keyType: "int"
      +incrementing: true
      #with: []
      #withCount: []
      +preventsLazyLoading: false
      #perPage: 15
      +exists: true
      +wasRecentlyCreated: false
      #escapeWhenCastingToString: false
      #attributes: array:8 [▶]
      #original: array:8 [▶]
      #changes: []
      #casts: []
      #classCastCache: []
      #attributeCastCache: []
      #dates: []
      #dateFormat: null
      #dispatchesEvents: []
      #observables: []
      #relations: []
      #touches: []
      +timestamps: true
      #visible: []
    }
    1 => App\Models\GalleryItem {#2504 ▶}
    2 => App\Models\GalleryItem {#2503 ▶}
    3 => App\Models\GalleryItem {#2502 ▶}
    4 => App\Models\GalleryItem {#2501 ▶}
    5 => App\Models\GalleryItem {#2500 ▶}
    6 => App\Models\GalleryItem {#2499 ▶}
    7 => App\Models\GalleryItem {#2498 ▶}
  ]
  #escapeWhenCastingToString: false
}
```
This function can not be used as usual. To learn more about this function, refer to the gallery definition section.
____________________


### `get_locale`
```php
function get_locale(): string
```
This function returns the current system language .

```php
@php
   app () -> getLocale ();
@endphp
```

Output
```
"fa"
```
_______________________



### `get_user`
```php
function get_user(string $guard = null): bool|Authenticatable|null
```
Returns the logged in user and if the user is not logged in returns false. For example, in the following code, the user who is logged in is displayed.
‍‍‍‍
```php
@if(get_user() !== false)
    <h5> The current user logged in is : {{get_user()->full_name}}</h5>
@endif
```
Output
```
The current user logged in is : آرش خواجه لو
```
______________________


### `get_customer_user`
```php
function get_customer_user(string $guard = null): bool|CustomerUser
```
This function returns a logged in customer user.
‍‍‍‍
```php
@if(get_customer_user() !== false)
    <h5> The current customer user logged in is : {{get_customer_user()->user->full_name}}</h5>
@endif
```
Output
```
The current customer user logged in is : آرش خواجه لو
```
To access customer information, you must connect to the `user`.
________________________



### `get_customer_legal_info`
```php
function get_customer_legal_info(): bool|CustomerUserLegalInfo
```
Returns the legal information of the logged in customer user.
```php
@if(get_customer_legal_info() !== false)
    <h5> The current legal info of customer user logged in is : {{get_customer_legal_info()-> customerUser->user->full_name}}</h5>
@endif
```

Output 
```
The current customer user logged in is : آرش خواجه لو
```
Also, in this function, to access the customer information, you must connect to the ‍`user` and the `customerUser`.
__________________________


### `customer_need_list_exist`
```php
function customer_need_list_exist(Product $product): bool
```
If the customer is logged in, the function checks if the given product is in the needlist. If the customer is not logged in, false returns.
 

```php
  <p>this customer {{customer_need_list_exist(\App\Models\Product::find(100)) ? "has":"has not"}} the product with id '100' in his need list.</p>
```
Output 
```
this customer has the product with id 100 in his need list.
```
__________________________


### `customer_cart_count`
```php
function customer_cart_count(): int
```
This function returns the number of products in the customer's shopping cart that is logged in.
The following code displays the number of products in the shopping cart of the logged in customer.

```php
<p>this customer has {{customer_cart_count()}} product in his basket.</p>
```

Output
```
This customer has 3 product in his basket.
```
_____________________________



### `pending_invoices_count`
```php
function pending_invoices_count(): bool|int
```

This function returns the number of pending invoices. If the customer is not logged in, it returns false.
```php
<p>this customer has {{pending_invoices_count()?? "0" }} pending invoices in his resume</p>
```

Output
```
this customer has 0 pending invoices in his resume.
```
_____________________________


### `get_local_cart`
```php
function get_local_cart(bool $full_data = false): array
```
This function returns local shopping cart data. Before the user logs in, the data is stored in a cookie, so if the customer is not logged in, the shopping cart data is returned via `get-local-cart`.

With the following code, you can see the products in the shopping cart.

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

Output
```
this customer has 1 product in his basket.

شیر كشویی فلنجدار چدنی زبانه لاستیكی میراب 50،"2 ،PN10(31) => 2 :sum (2440000)
```
With foreach, the characteristics of each product can be displayed in each line. With `product_id`, the product id is shown, with `count` the number of that product, and by passing true boolean, the product object can also be displayed, and the `count` is multiplied by the `latest price` to calculate the product price.
______________________________


### `get_system_user`
```php
function get_system_user(string $guard = null): ?SystemUser
```
The structure of Larammerce user management is done according to the user object.
There are two users in the system: 

1- System User  

2- Customer user

This function returns system users who are admins in this system.
______________________________



### `get_system_users`
```php
function get_system_users(string $guard = null)
```
This function returns a list of system users. all system users will be displayed with the following code:

```php
<ul>
    @foreach(get_system_users() as $system_user)
        <li>{{$system_user->user->full_name }}</li>
    @endforeach
</ul>
```

Output
```
آرش خواجه لو
```
To access the system user name, must connect to the `user`.
_____________________________



### `is_customer`
```php
function is_customer(string $guard = null): bool
```
`is_customer` function checks that the logged in user is the customer user or the system user.

```php
<p> The current user logged in {{ is_customer() ? "is" : "is not" }} customer user .</p>
```

Output
```
The current user logged in is customer user .
```
_____________________________


### `app_navbar_directories`
```php
function app_navbar_directories(array $conditions = [])
```
Returns the list of directories displayed in the application navigation bar.
There is a property in the function called show that specifies whether these menus will be displayed in the mobile or desktop application if the application is connected to the Larammerce Template Engine.

```php
<ul>
    @foreach(app_navbar_directories() as $directory)
        <li>{{$directory->title }}</li>
    @endforeach
</ul>
```

Output
```
درباره ما
تماس با ما
```
These directories are display in the mobile app.
_____________________________



### `navbar_directories`
```php
function navbar_directories(array $conditions = []): array
```
Returns the directories displayed in the navigation bar of the website.

```php
<ul>
    @foreach(navbar_directories() as $directory)
        <li>{{$directory->title }}</li>
    @endforeach
</ul>
```

Output
```
صفحه اصلی
محصولات
قوانین و مقررات
خدمات پس از فروش
حریم خصوصی
پرسش‌های متداول
روش‌های ارسال و پرداخت
راهنمای خرید
تست
```
These directories are only active for the header.
_____________________________



### `footer_directories`
```php
function footer_directories(array $conditions = []): array
```
Returns the directories displayed in the footer of the website.

```php
<ul>
    @foreach(footer_directories() as $directory)
        <li>{{$directory->title }}</li>
    @endforeach
</ul>
```

Output
```
درباره ما
تماس با ما
باشگاه مشتریان
```
These directories are active for the footer.
_____________________________



### `only_footer_directories`
```php
function only_footer_directories(array $conditions = []): array
```
Returns the directories only displayed in the footer of the website.

```php
<ul>
    @foreach(only_footer_directories() as $directory)
        <li>{{$directory->title }}</li>
    @endforeach
</ul>
```

Output
```
درباره ما
تماس با ما
باشگاه مشتریان
```
These directories are only active for the footer and inactive for the header.
_____________________________




### `is_directory_group_manual`
```php
function is_directory_group_manual(): bool
```
This function checks whether the category management of different groups of directories in the website menu is manual or automatic.

```php
@php
   is_directory_group_manual();
@endphp

```

Output
```
true
```
It will be true or false in the output. True is displayed here, which shows that it is manual.
_____________________________



### `directory_make_children_groups`
```php
function directory_make_children_groups(?Directory $directory, int $column_count): array
```
This function takes the parent directory and the number of columns you want to insert the subdirectory into.

```php
@php
    directory_make_children_groups(\App\Models\Directory::find(2),5);
@endphp

```

Output
```
array:5 [▼
  0 => array:3 [▼
    0 => App\Models\Directory {#2992 ▶}
    1 => App\Models\Directory {#3192 ▶}
    2 => App\Models\Directory {#3217 ▶}
  ]
  1 => array:2 [▼
    0 => App\Models\Directory {#3123 ▶}
    1 => App\Models\Directory {#3197 ▶}
  ]
  2 => array:3 [▼
    0 => App\Models\Directory {#3144 ▶}
    1 => App\Models\Directory {#3207 ▶}
    2 => App\Models\Directory {#3225 ▶}
  ]
  3 => array:3 [▼
    0 => App\Models\Directory {#3162 ▶}
    1 => App\Models\Directory {#3212 ▶}
    2 => App\Models\Directory {#3227 ▶}
  ]
  4 => array:2 [▶]
]
```
The system must categorize each menu branch and arrange the menu. If it is manual, it will be arranged based on priority, but if it is automatic, it will be set according to the number of sub-directories based on its algorithm. For example, in the above code, five columns are created for directory number 2.
____________________________



### `get_product_root`
```php
function get_product_root()
```
The `get_product_root` function returns the first root of the products. This function will be deprecated and will not be used in future versions.

```php
@php
    directory_make_children_groups(get_product_root(),5);
@endphp
```

Output 
```
- 

 - ظروف سرو رومیزی
متال
سنگی، چوبی و چدنی
ملامین و پلی کربنات
بلور
چینی
سفالی و سرامیک
- لوازم کافه و باریستا
لوازم باریستا
سرو نوشیدنی
لوازم قهوه دمی
قهوه جوش
فیلتر
لوازم کیک و شیرینی
آبمیوه گیری
- لوازم شستشو و نظافت
لوازم ضدعفونی
فرچه تمیز کننده
لوازم نظافت
کفپوش
سبد ظرفشویی
مواد شوینده
شیرآلات
- لوازم پخت برگر و استیک
وزنه و درب پخت
کاردک
غلتک کره
زغال مصنوعی

-

- لوازم آشپزخانه
لوازم آماده سازی
بن ماری
سس ریز
لوازم بسته بندی
تابه و قابلمه
تخته کار
چاقوها
آشپزخانه ایرانی
- حمل و دلیوری
باکس موتور
کیف حمل
- لوازم پخت پیتزا
پارو و فرچه پیتزا
قالب پیتزا
لوازم جانبی پیتزا
- پشت کانتر و سالن
لوازم روکانتری
علائم و دستورالعمل ها
رگال
ترولی
- پوشاک رستورانی
آشپز و سرآشپز
بار و باریستا
فست فودی
گارسون
اکسسوری
- کتاب و مجله تخصصی
کتاب قهوه، نوشیدنی، دسر و بستنی
کتاب غذاهای ملل و فست فود
کتاب کیک و قنادی
کتاب آموزش پذیرایی
کتاب مدیریتی رستوران

-

- لوازم پخت مرغ کنتاکی و سرخ کردنی
سبدهای سرخ کن
اسکوپ سیب زمینی
سینی و توری دیسپلی
فیلتر
- لوازم سرو
سینی
قاشق، چنگال و کارد
انبر
چیدمان میز
سلف سرویس
- دکوراتیو
تابلو دکوری
ساعت و تقویم
میز و صندلی
```
The system created three columns in the menu for the first root, where the directories are arranged.
_________________________________

### `get_directory`
```php
function get_directory($directory_id): ?Directory
```
This function takes `directory_id` and returns the directory. If it does not find the directory, the output is null.

```php
<p> The directory with  id `2` has the title of `{{get_directory(2)->title}}`</p>
```
Output 
```
The directory with id `2` has the title of `لوازم کافه و رستوران`
```
________________________________

### `get_important_product_leaves`
```php
function get_important_product_leaves(Directory $root_directory, int $count): array|Collection
```
Takes the directory and sorts the specified number of `product_leaves` by `important_at`.

```php
@php
    $directory = get_directory(137);
@endphp
<h2>Latest important products for directory: {{$directory->title}}</h2>
<ul>
    @foreach(get_important_product_leaves($directory, 10) as $product)
        <li><a href="{{$product->getFrontUrl()}}">{{$product->title}}</a></li>
    @endforeach
</ul>
```

Output
```
Latest important products for directory: ظروف سرو رومیزی
کاسه قطر ۱۶cm کرم بانددار
بشقاب تخت اوال قطر ۲۵cm قرمز بانددار
تخته ظروف سرو چدنی ۲۲×۳۵.۵ سانتیمتر
شات کوکتل ۱۰۰ml مارتینی لیبی
بورج ۳۵۵ml جیبرالتر لیبی
تنگ ۲۰۰ml بایجو لیبی
دیگچه چکشی ۲۰۰۰ml
بشقاب گرد ۲۴ سانتی فیوژن RAK زرد
ظرف سرو قیفی سیب زمینی ۲ تایی مشکی
استند باربیکیو ناندوز به همراه ۶ عدد سیخ
```
________________________________



### `get_visible_product_leaves`
```php
function get_visible_product_leaves(Directory $root_directory, int $count): array|Collection
```
Takes the directory and sorts the specified number of product_leaves that have the visible store feature active.

```php
<h2>Latest visible products for directory: {{$directory->title}}</h2>
<ul>
    @foreach(get_visible_product_leaves($directory, 5) as $product)
        <li><a href="{{$product->getFrontUrl()}}">{{$product->title}}</a></li>
    @endforeach
</ul>
```

Output
```
Latest visible products for directory: ظروف سرو رومیزی
کاسه قطر ۱۶cm کرم بانددار
بشقاب تخت اوال قطر ۲۵cm قرمز بانددار
تخته ظروف سرو چدنی ۲۲×۳۵.۵ سانتیمتر
شات کوکتل ۱۰۰ml مارتینی لیبی
بورج ۳۵۵ml جیبرالتر لیبی
```
________________________________



### `get_directory_product_leaves`
```php
function get_directory_product_leaves(Directory $root_directory, int $count, $only_active_items = true): array|Collection
```
This function takes a directory and the number of products. If `only_active_items is` true, return leafProducts that are active and can be sold.

```php
<h2>Latest visible products for directory: {{$directory->title}}</h2>
<ul>
    @foreach(get_directory_product_leaves($directory, 5) as $product)
        <li><a href="{{$product->getFrontUrl()}}">{{$product->title}}</a></li>
    @endforeach
</ul>
```

Output
```
Latest visible products for directory: ظروف سرو رومیزی
کاسه قطر ۱۶cm کرم بانددار
بشقاب تخت اوال قطر ۲۵cm قرمز بانددار
تخته ظروف سرو چدنی ۲۲×۳۵.۵ سانتیمتر
شات کوکتل ۱۰۰ml مارتینی لیبی
بورج ۳۵۵ml جیبرالتر لیبی
```
_________________________________


### `latest_products`
```php
function latest_products(int $count = 8): array|Collection
```
Returns the latest or newest products added to the system. With the following code, you can see 2 of the latest products that have been added

```php
<ul>
    @foreach(latest_products(2) as $product)
        <li><a href="{{$product->getFrontUrl()}}">{{$product->title}}</a></li>
    @endforeach
</ul>
```

Output
```
فیلتر آب WMF کد 33.2332.2000
بسکت 9 گرمی San marco کد 202119
```
_________________________________


### `rated_products`
```php
function rated_products(int $count = 8): array|Collection
```
Returns products that have the highest rate.

```php
<h2>Our highest rated products</h2>
<ul>
    @foreach(rated_products(5) as $product)
        <li><a href="{{$product->getFrontUrl()}}">{{$product->title}} [{{$product->average_rating}}
                | {{$product->rates_count}}]</a></li>
    @endforeach
</ul>
```

Output
```
Our highest rated products
کلاه نقابدار [5 | 2]
شابلون طراحی ۱۶ تایی [5 | 2]
چاقو جیبی جاسوییچی ۶ سانتی ایسل [5 | 2]
چاقو جیبی ساردین جاسوییچی ۱۰ سانتی ایسل [5 | 2]
چاقو جیبی ساردین جاسوییچی ۶ سانتی ایسل [5 | 2]
```
_________________________________



### `custom_query_products`
```php
function custom_query_products(string $identifier): array|Collection
```
This function is based on custom query built into the admin panel And the specified identifier returns the products. Custom query will be described in a separate section.In the admin panel, there is a section called custom queries. For example, you can create a custom query to display discounted products in this section.

```php
<h2>The result products of custom query named: `all_discount_products`</h2>
<ul>
    @foreach(custom_query_products("all_discount_products") as $product)
        <li><a href="{{$product->getFrontUrl()}}">{{$product->title}}
                <strike>{{$product->previous_price}}</strike> {{$product->latest_price}}</a></li>
    @endforeach
</ul>
```
Output
```
The result products of custom query named: `all_discount_products`
دانه قهوه اتیوپی یرگاچف ۱ کیلویی لِم 600000 540000
دانه قهوه رواندا ۱ کیلویی لِم 620000 558000
دانه قهوه برزیل ۱ کیلویی لِم 470000 423000
بهبود دهنده نانوایی قرمز ۱۰۰۱ نیم کیلویی گلنان پوراتوس 109000 87200
مخلوط قنادی تگرال شیفون ۲.۵ کیلوگرمی گلنان پوراتوس 215000 150500
قهوه ترک لایت ۱ کیلویی پندار 199000 139300
قهوه ترک مدیوم ۱ کیلویی پندار 199000 139300
دانه قهوه ۳۰/۷۰ فرانسه ۱ کیلویی پندار 215000 150500
قهوه ترکیبی ۱۰۰٪ عربیکا فرانسه ۱ کیلویی پندار 290000 203000
قهوه ترکیبی ۱۰۰٪ عربیکا اسپرسو ۱ کیلویی پندار 300000 210000
چای سیاه با طعم نعناع تک نفره ۵۰ عددی رابسین 39200 27440
عسل تیوپی تک نفره ۲۰ گرمی 335000 268000
عسل تیوپی تک نفره ۴۰ گرمی 505000 404000
تی بگ چای سبز لیمو گلستان ۲۵ عددی 12900 9030
قهوه تک خاستگاه کلمبیا ۱ کیلویی بن مانو 639000 511200
پالت ویوافیل پرتقال گلنان پوراتوس 65000 39240
پالت ویوافیل زردآلو گلنان پوراتوس 95000 34335
تاپینگ شاتوت ۱ لیتری گلنان پوراتوس 99000 69300
پالت ویوافیل شاتوت گلنان پوراتوس 89000 60822
دکوفوندانت مشکی ۱ کیلوگرمی گلنان پوراتوس 75000 31337
دکوفوندانت قرمز ۱ کیلوگرمی گلنان پوراتوس 75000 31337
```
_________________________________


### `custom_query_product_ids`
```php
function custom_query_product_ids(string $identifier): array|Collection
```
This function returns the product id list based on the custom query and identifier.

```php
<script>
    const listOfProductIds = {{json_encode(custom_query_product_ids("all_discount_products"))}};
    listOfProductIds.forEach(function (iterId) {
        console.log(iterId);
    });
</script>
```

Output
```
607
1908
2166
2488
3257
3624
3655
5013
5556
6084
6301
6637
```
It can be seen that the id of the discounted products is displayed in the console.
_________________________________


### `get_product_filter`
```php
function get_product_filter(string $identifier): ProductFilter
```
This function takes the identifier and returns the filter product object. product filter will be described in a separate section.
_________________________________



### `custom_filter_products`
```php
function custom_filter_products(string $identifier): array|Collection
```
With custom filter, you can create a filter in the admin panel, which can show products related to that filter by foreach in front.For example, in the custom filter section of the admin panel, a filter named `my_fav_filter` has been created, filtered based on the raees brand, and the custom query of discounted products is selected. The output of this filter can be seen below.

```php
<h2>The result products of custom filter named: `my_fav_fillter`</h2>
<ul>
    @foreach(custom_filter_products("my_fav_fillter") as $product)
        <li><a href="{{$product->getFrontUrl()}}">{{$product->title}}</a></li>
    @endforeach
</ul>
```
Output
```
The result products of custom filter named: `my_fav_fillter`
دانه قهوه هاوس بلند ۱۰۰٪ عربیکا ۱ کیلویی رئیس
```
_________________________________


### `custom_filter_product_ids`
```php
function custom_filter_product_ids(string $identifier): array|Collection
```
This function returns the ID of the products in the custom filter.

```php
<script>
    const listOfProductIds = {{json_encode(custom_filter_product_ids("my_fav_fillter"))}};
    listOfProductIds.forEach(function (iterId) {
        console.log(iterId);
    });
</script>
```

Output
```
3769
```
_________________________________


### `get_filter_data`
```php
function get_filter_data(array $product_ids): array
```
This function of ProductService returns FilterData, which is required for product_ids. For example, the IDs of fifty products are taken from the input. These products include different brands. By selecting the desired brand from the filter section of the website, only the product of the desired brand will be displayed.

```php
@php
        $filter_data = get_filter_data(custom_filter_product_ids("my_fav_fillter"));
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

Output
```
Filter data for the above products could be:
price range: 959000 to 1225000
Colors:
583421# قهوه ای تیره
```
__________________________________

### `important_products`
```php
function important_products(int $count = 8): array|Collection
```
This function returns products sorted based on `important_at`, and the important button of that product is active. Important products can be displayed with the following code.

```php
@php
      important_products();
@endphp
```

Output
```
Illuminate\Database\Eloquent\Collection {#2340 ▼
  #items: array:8 [▼
    0 => App\Models\Product {#2437 ▶}
    1 => App\Models\Product {#2434 ▶}
    2 => App\Models\Product {#2433 ▶}
    3 => App\Models\Product {#2432 ▶}
    4 => App\Models\Product {#2431 ▶}
    5 => App\Models\Product {#2430 ▶}
    6 => App\Models\Product {#2429 ▶}
    7 => App\Models\Product {#2428 ▶}
  ]
  #escapeWhenCastingToString: false
}
```
_______________________________________


### `get_customer_addresses`
```php
function get_customer_addresses()
```
Returns the address of customers who are logged in.

```php
<h2>Your addresses:</h2>
<ul>
    @foreach(get_customer_addresses() as $address)
        <li>{{$address->name}} | {{$address->city?->name}} | {{$address->superscription}}</li>
    @endforeach
</ul>
```

Output
```
آدرس1|تهران| تهرانسر، نفت جنوبی کوچه 32، پلاک 58
```
__________________________________


### `get_invoices`
```php
function get_invoices()
```
This function returns all the customer invoices that are logged in.

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
```
Your invoices:
760 | 540000 | 2018-10-14 18:14:15
355 | 61900 | 2018-08-07 08:52:43
348 | 849200 | 2018-08-06 14:41:42
308 | 788150 | 2018-07-28 23:15:09
```
__________________________


### `get_blog_categories`
```php
   function get_blog_categories($directory)
```
Returns all categories of blog directories.
__________________________



### `get_popular_blog`
```php
function get_popular_blog($count, $type)
```
This function takes the number from the input and returns the popular ones among all the blog posts. The type object will be removed in later versions, and this function will only receive the count object from the input.
__________________________



### `get_latest_blog`
```php
function get_latest_blog($type, $count)
```
Returns the latest blog posts with that specified number. The type object will be removed in later versions, and this function will only receive the count object from the input.
__________________________


### `get_suggested_blog`
```php
function get_suggested_blog($type, $count)
```
Returns suggested_blog with that specified number. The type object will be removed in later versions, and this function will only receive the count object from the input.
__________________________


### `get_system_messages`
```php
function get_system_messages()
```
Sometimes an error occurs when sending data. In order for the system to send a message and be able to receive the message, this function must be placed in the footer of the website.
__________________________

### `has_system_messages`
```php
function has_system_messages(): bool
```
Checks if the system has a message.
__________________________


### `get_months`

Returns the list of months.
__________________________


### `get_years`

Returns the list of years used in the form.
__________________________



### `hide_number`

Using this function, you can hide part of a number and use the star character instead.
__________________________



### `hide_text`

Using this function, you can hide part of a text and use the star character instead.
__________________________



### `get_payment_drivers`

This function is to display the Larammerce project supporter logo. Currently, the Hinza logo is displayed on Larammerce projects.
__________________________



### `is_default_payment_driver`

Returns active payment gateways.
__________________________



### `get_disabled_setting_appliances`

This function returns appliances that are inactive.
__________________________



### `is_selected`

Takes the directory from the input and checks that it is in url part. This function will be deprecated in the next version.
__________________________



### `get_configurations`

Returns configurations in the `env` file.
__________________________



### `get_searched_products`

Searches the product based on the given query.
__________________________



### `get_digits`

Returns the list of digits based on the given language.
__________________________



### `convert_digits`

Converts digits from English to Persian.
__________________________



### `format_price`

This function takes a digit from the input and separates the three digits. If it is Persian, it puts a "," and otherwise, it puts a "," sign.
__________________________



### `is_paste_possible`

This function is for the admin panel and will be explained in the relevant section.
__________________________



### `get_product_color_models`

This function takes the product from the input and returns its colors.
__________________________



### `get_product_last_color`

Sorts and returns the last color for the product.
__________________________



### `get_product_accessories`

This function takes the product and returns the accessories of that product.
__________________________



### `get_product_related_articles`

Returns articles related to a product to the number taken from the input.
__________________________



### `get_product_related_products`

Returns products related to a product to the specified number.
__________________________



### `get_product_similar_products`

The `get_product_similar_products` function declares a similarity key for a product. For example, a car with the BMW brand is considered. This function returns products with the exact specifications as this car but with a different brand.
__________________________




### `get_related_products_with_directory_level`

Returns related products having the same parent in which they are in specific higher levels passed by `$level`.
__________________________



### `get_product_most_privileged_key_attributes`

This function takes a list of all the keys and then returns the validity of that key. This function will be deprecated in the next version.
__________________________



### `get_article_related_products`

This function takes from the input of an article and returns related products.
__________________________



### `get_article_related_articles`

This function takes from the input of an article and returns related articles.
__________________________



### `recaptcha_enabled`

This function determines whether Recaptcha is enabled on the system or not.
__________________________



### `get_same_models_products`

Takes a product from the input and returns same model products. For example: different sizes of a shoe are same model products.
__________________________



### `check_cart`

Checks if the product is in the cart. It is suggested not to use this function due to low efficiency.
__________________________



### `get_cart_information`

This function returns cartRows data related to a product_id.
__________________________




### `get_cart`

This function returns the structured cart of the current customer whether he is logged in or not.
__________________________




### `get_minimum_purchase_free_shipment`

This function specifies how much to buy to make shipping free.
__________________________




### `product_disable_on_min`

This function specifies when a product is disabled, when it is zero, or when it reaches a minimum.
__________________________




### `customer_can_edit_profile`

This function specifies whether the customer is allowed to edit their profile or not.
__________________________



### `get_root_directory_per_directory`

This function takes a directory and returns root node.
__________________________



### `h_view`

This function must move to the common helpers; It's not related to the template engine.
__________________________



### `get_cms_setting`

This function takes the key from the input and returns the value set in the database by the administrator of e-commerce.
For example if you call `get_cms_setting('phone_number')` it will return the value passed for phone_number by the administrator.
__________________________



### `get_template_views`

This function returns a list of available template original views' names.
__________________________



### `get_current_customer_location`

There is no explanation for this function.
__________________________



### `get_current_customer_location_data`

There is no explanation for this function.
__________________________



### `get_customer_meta_categories`

This function returns a list of available customer meta categories.
__________________________



### `cmc_get_options`

This function returns the applicable options for a specific customer meta category field that is passed to the function and specified by the $identifier.
__________________________



### `cmc_get_content`

This function returns the data of a specific field of any customer meta category that is passed.
__________________________



### `get_shipment_cost`

This function takes the state from the input and returns the cost of sending.
__________________________



### `build_directories_tree`

This function takes root and draws the tree to the lowest node and returns it.
__________________________



### `clean_cart_cookie`

This function clears the cart cookie.
__________________________



### `get_structure_sort_title`

This function is a part of a more prominent feature named ‍‍`Product Sort By Score`.
It returns the name of the specific product structure key by which the products are sorted.
__________________________



### `get_logistics_schedule`

Returns the timetable. For example: when a product can be shipped.
__________________________



### `day_of_week`

expected values are Persian names of the weekdays like 'شنبه', 'یکشنبه', 'دوشنبه', etc.
__________________________



### `get_current_formal_date`

This function returns the standard Persian current date formatted to show on the website.
__________________________



### `get_current_date`

This function returns the current date.
__________________________



### `get_max_transaction_amount`

This function specifies the maximum amount of transactions that are allowed to handle by the system. In other words, it tells you the maximum amount of each invoice you create for your clients. This limitation is according to the payment IPGs' policies.



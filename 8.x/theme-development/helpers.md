## Template helper functions

[[toc]]
With every template engine, the content of the website can be managed. In order for the template creators to be able to work with the content more easily, for example: to receive the content, modify it, display the body in different pages of the website, functions called **Helper** are created. These functions are also created in the Larammerce Template Engine.

Let's check the provided helpers one by one:

First, open the helper file: `app/Utils/CMS/Template/helpers.php`.

This file has 1462 code lines. This section describes all the helpers. Some of these helpers are old, some new, and some will be removed in the next version, which are specified as @deprecated in the phpdoc above them.


### unparse_url()
This function unparses the URL. As you know, there is a `pars_url` function in PHP, which works as follows:

```php
@php

$url= "https://google.com/salam/donya?test=sample";
dd(parse_url($url));

@endphp
```
Output
```bash
array:4 [▼
  "scheme" => "https"
  "host" => "google.com"
  "path" => "/salam/donya"
  "query" => "test=sample"
]
```
Each part of the URL that is ‍‍‍`scheme`, `host`, `path` and  `query` is displayed.


Now an example is given to check the `unpars_url` function. Empty the `query` and unparse the URL.

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
```bash
"https://google.com/salam/donya? "
```

It can be seen that the query is removed from the URL.

This function takes an array of parsed URLs from the input and merges these into `scheme`, `user`, `pass`, `host`, `port`, `path`, `query`, `fragment` in the output and transforms them into a unified URL.


### get_product_all_extras_percentage()

This function returns the sum of `getTaxpercentage` and `getToolpercentage` values.

```php
<p>Product all extra percentages  {{ get_product_all_extras_percentage() }}</p>
```
Output
```bash
Product all extra percentages 9
```


### locale_url()
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
```bash
https://google.com/fa/salam/donya?test=sample
```


### lm_route()
This function takes Laravel's root from the input and gives it to `local_url` and this function is enhanced for multilingual mode.

### lm_url()
This function calls `locale_url`. And it is enhanced for Laravel URLs.


### get_identity()
This function is to display the Larammerce project supporter identification. Currently, the Hinza identification is displayed on Larammerce projects. Enter the following code to display identification.
```php
@php

dd(get_identity());

@endphp
```

Output
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


### shorten_text()
This function is a directive. The input of this function is text and number. For example: here it takes the number 75 from the input, which means that it shows only 75 words of this text. And uses "..." at the end.

Below is an explanation for this function:

```php
@php
$text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
@endphp

<p> {{shorten_text($text,10)}}</p>
```
Output
```bash
Lorem Ipsum is simply dummy text of the printing and...
```


### get_gallery()
get_gallery is used in the Larammerce Template Engine structure and cannot be used. This function returns the identifir given in the blade file to the desired gallery. In the following code, the content of index_banner1 gallery can be seen.

```php
@php

dd(get_gallery("index_banner1"));

@endphp
```
Output
```bash
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
A gallery object returned from the gallery model whose table name is galleries. It is displayed in `attributes` and `original`, this fields:  `identifier`, `fields`, `created_at`, and `updated_at`.


### get_gallery_items()
This function takes the name of the gallery and the number of items from the input, and whether random select is true or false.
```php
@php

dd(get_gallery_items("faqs"));

@endphp
```
Output
```bash
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
This function can not be used as usual. To learn more about this function, refer to the gallery definition branch.


### get_locale()
This function returns the current system language with **app () -> getLocale ()**.


### get_user()
Returns the logged in user and if the user is not logged in returns false. For example, in the below code, the user who is logged in is displayed.
‍‍‍‍
```php
@if(get_user() !== false)
    <h5> The current user logged in is : {{get_user()->full_name}}</h5>
@endif
```
Output
```bash
The current user logged in is : آرش خواجه لو
```


### get_customer_user()
This function returns a logged in customer user.
‍‍‍‍
```php
@if(get_customer_user() !== false)
    <h5> The current customer user logged in is : {{get_customer_user()->user->full_name}}</h5>
@endif
```
Output
```bash
The current customer user logged in is : آرش خواجه لو
```
To access customer information, you must connect to the `user`.

### get_customer_legal_info()
Returns the legal information of the logged in customer user.
```php
@if(get_customer_legal_info() !== false)
    <h5> The current legal info of customer user logged in is : {{get_customer_legal_info()-> customerUser->user->full_name}}</h5>
@endif
```

```bash
The current customer user logged in is : آرش خواجه لو
```
Also, in this function, to access the customer information, you must connect to the ‍`user` and the `customerUser`.


### customer_need_list_exist()
If the customer is logged in, the function checks if the given product is in the needlist. If the customer is not logged in, false returns.
 

```php
  <p>this customer {{customer_need_list_exist(\App\Models\Product::find(100)) ? "has":"has not"}} the product with id '100' in his need list.</p>
```

```bash
this customer has the product with id 100 in his need list.
```



### customer_cart_count()
This function returns the number of products in the customer's shopping cart that is logged in.
The following code displays the number of products in the shopping cart of the logged in customer.

```php
<p>this customer has {{customer_cart_count()}} product in his basket.</p>
```

Output
```bash
This customer has 3 product in his basket.
```

### pending_invoices_count()
This function returns the number of pending invoices. If the customer is not logged in, it returns false.
```php
<p>this customer has {{pending_invoices_count()?? "0" }} pending invoices in his resume</p>
```

Output
```bash
this customer has 0 pending invoices in his resume.
```


### get_local_cart()
This function returns local shopping cart data. Before the user logs in, the data is stored in a cookie, so if the customer is not logged in, the shopping cart data is returned via **get-local-cart**.

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
```bash
this customer has 1 product in his basket.

شیر كشویی فلنجدار چدنی زبانه لاستیكی میراب 50،"2 ،PN10(31) => 2 :sum (2440000)
```
With foreach, the characteristics of each product can be displayed in each line. With `product_id`, the product id is shown, with `count` the number of that product, and by passing true boolean, the product object can also be displayed, and the `count` is multiplied by the `latest price` to calculate the product price.


### get_system_user()
The structure of Larammerce user management is done according to the user object.
There are two users in the system: 

1- System User  

2- Customer user

This function returns system users who are admins in this system.


### get_system_users()
This function returns a list of system users. all system users will be displayed with the following code:

```php
<ul>
    @foreach(get_system_users() as $system_user)
        <li>{{$system_user->user->full_name }}</li>
    @endforeach
</ul>
```

Output
```bash
آرش خواجه لو
```
To access the system user name, must connect to the `user`.

### is_customer()
**is_customer** function checks that the logged in user is the customert user or the system user.

```php
<p> The current user logged in {{ is_customer() ? "is" : "is not" }} customer user .</p>
```

Output
```bash
The current user logged in is customer user .
```


### app_navbar_directories()
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
```bash
درباره ما
تماس با ما
```
These directories are display in the mobile app.



### navbar_directories()
Returns the directories displayed in the navigation bar of the website.

```php
<ul>
    @foreach(navbar_directories() as $directory)
        <li>{{$directory->title }}</li>
    @endforeach
</ul>
```

Output
```bash
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

### footer_directories()
Returns the directories displayed in the footer of the website.

```php
<ul>
    @foreach(footer_directories() as $directory)
        <li>{{$directory->title }}</li>
    @endforeach
</ul>
```

Output
```bash
درباره ما
تماس با ما
باشگاه مشتریان
```
These directories are active for the footer.

### only_footer_directories()
Returns the directories only displayed in the footer of the website.

```php
<ul>
    @foreach(only_footer_directories() as $directory)
        <li>{{$directory->title }}</li>
    @endforeach
</ul>
```

Output
```bash
درباره ما
تماس با ما
باشگاه مشتریان
```
These directories are only active for the footer and inactive for the header.


### is_directory_group_manual()
This function checks whether the category management of different groups of directories in the website menu is manual or automatic.

```php
@php
        dd(is_directory_group_manual());
@endphp

```

Output
```bash
true
```
It will be true or false in the output. True is displayed here, which shows that it is manual.


### directory_make_children_groups()
This function takes the parent directory and the number of columns you want to insert the subdirectory into.

```php
@php
        dd(directory_make_children_groups(\App\Models\Directory::find(2),5));
@endphp

```

Output
```bash
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


### get_product_root()
The **get_product_root** function returns the first root of the products. This function will be deprecated and will not be used in future versions.

```php
@php
   dd(directory_make_children_groups(get_product_root(),5));
@endphp
```

Output 
```bash
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




### get_directory()
This function takes directory_id and returns the directory. If it does not find the directory, the output is null.

```php
<p> The directory with  id `2` has the title of `{{get_directory(2)->title}}`</p>
```

```bash
The directory with id `2` has the title of `لوازم کافه و رستوران`
```


### get_important_product_leaves()
Takes the directory and sorts the specified number of product_leaves by priority.


### get_visible_product_leaves()
Takes the directory and sorts the specified number of product_leaves by important_at.


### get_directory_product_leaves()
This function takes a directory and the number of products. If only_active_items is true, return leafProducts that are active and can be sold.

### latest_products()
Returns the latest or newest products added to the system.


### rated_products()
Returns products that have the highest rate.


### custom_query_products()
This function is based on custom query built into the admin panel And the specified identifier returns the products. Custom query will be described in a separate section.


### custom_query_product_ids()
This function returns the product id list based on the custom query and identifier.


### get_product_filter()
This function takes the identifier and returns the filter product object. product filter will be described in a separate section.


### custom_filter_products()
With custom filter, you can create a filter in the admin panel, which can show products related to that filter by foreach in front.


### custom_filter_product_ids()
This function returns the ID of the products in the custom filter.


### get_filter_data()
This function of ProductService returns FilterData, which is required for product_ids. For example, the IDs of fifty products are taken from the input. These products include different brands. By selecting the desired brand from the filter section of the website, only the product of the desired brand will be displayed.

### important_products()
This function returns products that are sorted based on important at and have an important tick.


### get_customer_addresses()
Returned customer addresses are returned.


### get_district()
This function will be deprecated because in the new version of php, the function can be called this way
**address? -> district? -> name** And does not require a helper function.


### get_city()
This function will be deprecated like the previous helper function.


### get_state()
This function will be deprecated like the previous helper function.

### get_state_json_by_id()
Finds the object and converts it to json. This function will be deprecated in the next version.

### get_city_json_by_id()
Finds the object and converts it to json. This function will be deprecated in the next version.


### get_district_json_by_id()
This function is to display the Larammerce project supporter logo. Currently, the Hinza logo is displayed on Larammerce projects.


### get_invoices()
This function returns all the customer invoices that are logged in.


### get_blog_categories()
Returns all categories of blog directories.

### get_popular_blog()
This function takes the number from the input and returns the popular ones among all the blog posts. The type object will be removed in later versions, and this function will only receive the count object from the input.


### get_latest_blog()
Returns the latest blog posts with that specified number. The type object will be removed in later versions, and this function will only receive the count object from the input.


### get_suggested_blog()
Returns suggested_blog with that specified number. The type object will be removed in later versions, and this function will only receive the count object from the input.


### get_system_messages()
Sometimes an error occurs when sending data. In order for the system to send a message and be able to receive the message, this function must be placed in the footer of the website.

### has_system_messages()
Checks if the system has a message.


### get_months()
Returns the list of months.

### get_years()
Returns the list of years used in the form.

### hide_number()
Using this function, you can hide part of a number and use the star character instead.

### hide_text()
Using this function, you can hide part of a text and use the star character instead.

### get_payment_drivers()
This function is to display the Larammerce project supporter logo. Currently, the Hinza logo is displayed on Larammerce projects.


### is_default_payment_driver()
Returns active payment gateways.

### get_disabled_setting_appliances()
This function returns appliances that are inactive.


### is_selected()
Takes the directory from the input and checks that it is in url part. This function will be deprecated in the next version.

### get_configurations()
Returns configurations in the env file.


### get_searched_products()
Searches the product based on the given query.


### get_digits()
Returns the list of digits based on the given language.


### convert_digits()
Converts digits from English to Persian.

### format_price()
This function takes a digit from the input and separates the three digits. If it is Persian, it puts a "," and otherwise, it puts a "," sign.


### is_paste_possible()
This function is for the admin panel and will be explained in the relevant section.


### get_product_color_models()
This function takes the product from the input and returns its colors.


### get_product_last_color()
Sorts and returns the last color for the product.


### get_product_accessories()
This function takes the product and returns the accessories of that product.


### get_product_related_articles()
Returns articles related to a product to the number taken from the input.


### get_product_related_products()
Returns products related to a product to the specified number.


### get_product_similar_products()
The get_product_similar_products function declares a similarity key for a product. For example, a car with the BMW brand is considered. This function returns products with the exact specifications as this car but with a different brand.

### get_related_products_with_directory_level()
Returns related products having the same parent in which they are in specific higher levels passed by $level.


### get_product_most_privileged_key_attributes()
This function takes a list of all the keys and then returns the validity of that key. This function will be deprecated in the next version.


### get_article_related_products()
This function takes from the input of an article and returns related products.


### get_article_related_articles()
This function takes from the input of an article and returns related articles.


### recaptcha_enabled()
This function determines whether Recaptcha is enabled on the system or not.


### get_same_models_products()
Takes a product from the input and returns same model products. For example: Different sizes of a shoe are same model products.

### check_cart()
Checks if the product is in the cart. It is suggested not to use this function due to low efficiency.


### get_cart_information()
This function returns cartRows data related to a product_id.


### get_cart()
This function returns the structured cart of the current customer whether he is logged in or not.


### get_minimum_purchase_free_shipment()
This function specifies how much to buy to make shipping free.


### product_disable_on_min()
This function specifies when a product is disabled, when it is zero, or when it reaches a minimum.


### customer_can_edit_profile()
This function specifies whether the customer is allowed to edit their profile or not.


### get_root_directory_per_directory()
This function takes a directory and returns root node.


### h_view()
This function must move to the common helpers; It's not related to the template engine.


### get_cms_setting()
This function takes the key from the input and returns the value set in the database by the administrator of e-commerce.
For example if you call get_cms_setting('phone_number') it will return the value passed for phone_number by the administrator.


### get_template_views()
This function returns a list of available template original views' names.


### get_current_customer_location()
There is no explanation for this function.


### get_current_customer_location_data()
There is no explanation for this function.


### get_customer_meta_categories()
This function returns a list of available customer meta categories.


### cmc_get_options()
This function returns the applicable options for a specific customer meta category field that is passed to the function and specified by the $identifier.


### cmc_get_content()
This function returns the data of a specific field of any customer meta category that is passed.


### get_shipment_cost()
This function takes the state from the input and returns the cost of sending.


### build_directories_tree()
This function takes root and draws the tree to the lowest node and returns it.


### clean_cart_cookie()
This function clears the cart cookie.


### get_structure_sort_title()
This function is a part of a more prominent feature named Product Sort By Score.
It returns the name of the specific product structure key by which the products are sorted.


### get_logistics_schedule()
Returns the timetable. For example: when a product can be shipped.


### day_of_week()
expected values are Persian names of the weekdays like 'شنبه', 'یکشنبه', 'دوشنبه', etc.


### get_current_formal_date()
This function returns the standard Persian current date formatted to show on the website.


### get_current_date()
This function returns the current date.


### get_max_transaction_amount()
This function specifies the maximum amount of transactions that are allowed to handle by the system. In other words, it tells you the maximum amount of each invoice you create for your clients. This limitation is according to the payment IPGs' policies.



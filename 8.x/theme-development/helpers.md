## Template helper functions

[[toc]]

With some Template Engin, the content of the website can be managed. In order for the template creators to be able to work with the content more easily, for example: to receive the content, modify it, display the body in different pages of the website, functions called **Helper** are created. These functions are also created in the Larammerce Template Engine.

Let's check the Helper:

First, open the helper file: `app/Utils/CMS/Template/helpers.php`.

This file has 1462 code lines. This section describes all the helpers. Some of these helpers are old, some new and some will be removed in the next version.


### get_identity()
This function is to display the Larammerce project supporter logo. Currently, the Hinza logo is displayed on Larammerce projects.

```php
if (!function_exists("get_identity")) {
    function get_identity(): array
    {
        $default = config("cms.identity.default");
        return config("cms.identity.$default", []);
    }
}
```


### role_input()
This function is used for blade directives.

```php
if (!function_exists('role_input')) {
    function role_input(BaseModel $model, $input): string
    {
        return $model->isInputAllowed($input) ? "" : "not-allowed";
    }
}
```

### shorten_text()
This function is a directive. The input of this function is text and number. For example: here it takes the number 75 from the input, which means that it shows only 75 words of this text. And uses "..." at the end.

```php
if (!function_exists('shorten_text')) {
    function shorten_text($text, $wordsCount = 75)
    {
        $textParts = explode(' ', strip_tags($text));
        if (count(is_countable($textParts) ? $textParts : []) <= $wordsCount)
            return $text;
        return join(' ', array_slice($textParts, 0, $wordsCount)) . '...';
    }
}
```


### get_unshared_content()
The get_unshared_content function takes content data from the web page and returns the identifier. This function is used in the Larammerce Template Engine structure and cannot be used.

```php
if (!function_exists('get_unshared_content')) {
    function get_unshared_content(string $identifier, WebPage $web_page): string
    {
        $data = unserialize($web_page->data);
        if ($data != '' and $data != null and isset($data[$identifier]))
            return $data[$identifier]->getContent();
        return '';
    }
}
```

### get_gallery()
get_gallery is used in the Larammerce Template Engine structure and cannot be used. This function returns the identifir given in the blade file to the desired gallery.

```php
if (!function_exists('get_gallery')) {
    /**
     * @param string $galleryName
     * @return bool|Gallery
     */
    function get_gallery(string $galleryName)
    {
        $result = Gallery::where("identifier", $galleryName)->first();
        if ($result != null)
            return $result;
        return false;
    }
}
```


### get_gallery_items()
This function takes the name of the gallery and the number of items from the input, and whether random select is true or false.

```php
if (!function_exists('get_gallery_items')) {
    /**
     * Notice : don't use this function in back because use of isMobile()
     * @param string $gallery_name
     * @param int $count
     * @param bool $random_select
     * @return GalleryItem[]
     */
    function get_gallery_items(string $gallery_name, int $count = -1,
                               bool   $random_select = false)
    {
        $gallery = false;
        if (DetectService::isMobile())
            $gallery = get_gallery($gallery_name . "_mobile");
        if ($gallery === false)
            $gallery = get_gallery($gallery_name);
        if ($gallery !== false) {
            if ($random_select === false) {
                if ($count == -1) {
                    return $gallery->items()->visible()->orderBy('priority', 'ASC')->get();
                }
                return $gallery->items()->visible()->orderBy('priority', 'ASC')->take($count)->get();
            }
            if ($count == -1) {
                return $gallery->items()->visible()->inRandomOrder()->get();
            }
            return $gallery->items()->visible()->inRandomOrder()->take($count)->get();
        }
        return [];
    }
}
```

### get_locale()
This function returns the current system language with **app () -> getLocale ()**.

```php
if (!function_exists('get_locale')) {
    /**
     * this function returns the current locale of application
     * @return string
     */
    function get_locale(): string
    {
        return app()->getLocale();
    }
}
```


### get_user()
Returns the logged in user and if the user is not logged in returns false.

```php
if (!function_exists('get_user')) {
    function get_user(string $guard = null): bool|Authenticatable|null
    {
        if (auth($guard)->check()) {
            if (!auth('web_eloquent')->check()) {
                $user = User::getEloquentObject(auth($guard)->user());
                auth('web_eloquent')->login($user);
            }
            return auth('web_eloquent')->user();
        }
        return false;
    }
}
```

### get_customer_user()
This function returns a logged in customer user.

```php
if (!function_exists('get_customer_user')) {
    function get_customer_user(string $guard = null): bool|CustomerUser
    {
        if (auth($guard)->check() and get_user($guard)?->is_customer_user)
            return get_user($guard)?->customerUser;
        return false;
    }
}
```


### get_customer_legal_info()
Returns the legal information of the logged in customer user.

```php
if (!function_exists('get_customer_legal_info')) {
    function get_customer_legal_info(): bool|CustomerUserLegalInfo
    {
        $customer = get_customer_user();
        if ($customer)
            return $customer->legalInfo;
        return false;
    }
}
```

### customer_need_list_exist()
If the customer is logged in, the function checks if the given product is in the needlist. If the customer is not logged in, false returns.

```php
if (!function_exists('customer_need_list_exists')) {
    function customer_need_list_exist(Product $product): bool
    {
        if (!isset($product->is_in_need_list)) {
            try {
                $product->is_in_need_list = get_customer_user()->needList->contains($product->id);
            } catch (Exception $exception) {
                $product->is_in_need_list = false;
            }

        }
        return $product->is_in_need_list;
    }
}
```


### customer_cart_count()
This function returns the number of products in the customer's shopping cart that is logged in.

```php
if (!function_exists('customer_cart_count')) {
    function customer_cart_count(): int
    {
        $customer = get_customer_user();
        if ($customer !== false) {
            return $customer->cartRows()->count();
        } else {
            return count(get_local_cart());
        }
    }
}
```

### pending_invoices_count()
This function returns the number of pending invoices. If the customer is not logged in, it returns false.

```php
if (!function_exists('pending_invoices_count')) {
    function pending_invoices_count(): bool
    {
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
}
```


### get_local_cart()
This function returns local shopping cart data. Before the user logs in, the data is stored in a cookie, so if the customer is not logged in, the shopping cart data is returned via **get-local-cart**.

```php
if (!function_exists('get_local_cart')) {
    function get_local_cart(bool $full_data = false): array
    {
        $cart_data = [];
        if (key_exists(env("SITE_LOCAL_CART_COOKIE_NAME"), $_COOKIE)) {
            $cart_data = json_decode($_COOKIE[env("SITE_LOCAL_CART_COOKIE_NAME")], true);
        }

        $result = [];

        $product_ids = array_keys($cart_data);
        $products = Product::whereIn("id", $product_ids)->get();
        foreach ($products as $product) {
            $row_data = $cart_data["{$product->id}"];
            $std_row = new stdClass();
            $std_row->count = $row_data["count"];
            $std_row->product_id = $product->id;

            if ($full_data) {
                $std_row->product = $product;
                $std_row->id = $product->id;
            }

            $result[] = $std_row;
        }

        return array_reverse($result);
    }
}
```



### get_system_user()
The structure of Larammerce user management is done according to the user object.
There are two users in the system: 

1- System User  

2- Customer user

This function returns system users who are admins in this system.

```php
if (!function_exists('get_system_user')) {

    function get_system_user(string $guard = null): ?SystemUser
    {
        if (auth($guard)->check() and auth($guard)->user()->is_system_user)
            return SystemUser::where('user_id', auth($guard)->id())->first();
        return null;
    }
}
```


### get_system_users()
This function returns a list of system users.

```php
if (!function_exists('get_system_users')) {

    /**
     * @param string|null $guard
     * @return SystemUser[]|bool
     */
    function get_system_users(string $guard = null)
    {
        if (auth($guard)->check() and auth($guard)->user()->is_system_user)
            return SystemUser::all();
        return false;
    }
}
```


### is_customer()
**is_customer** function checks that the logged in user is the customert user or the system user.

```php
if (!function_exists('is_customer')) {
    /**
     * @param string|null $guard
     * @return bool
     */
    function is_customer(string $guard = null): bool
    {
        return auth($guard)->check() and auth($guard)->user()->is_customer_user;
    }
}
```


### app_navbar_directories()
Returns the list of directories displayed in the application navigation bar.
There is a property in the function called show that specifies whether these menus will be displayed in the mobile or desktop application if the application is connected to the Larammerce Template Engine.

```php
if (!function_exists('app_navbar_directories')) {
    /**
     * @return mixed
     */
    function app_navbar_directories(array $conditions = [])
    {
        $tree = build_directories_tree(conditions: $conditions);
        return array_filter($tree, function ($root_item) {
            return $root_item->show_in_app_navbar;
        });
    }
}
```

### navbar_directories()
Returns the directories displayed in the navigation bar of the website.

```php
if (!function_exists('navbar_directories')) {
    function navbar_directories(array $conditions = []): array
    {
        $tree = build_directories_tree(conditions: $conditions);
        return array_filter($tree, function ($root_item) {
            return $root_item->show_in_navbar;
        });
    }
}
```

### footer_directories()
Returns the directories displayed in the footer of the website.

```php
if (!function_exists('footer_directories')) {
    function footer_directories(array $conditions = []): array
    {
        $tree = build_directories_tree(conditions: $conditions);
        return array_filter($tree, function ($root_item) {
            return $root_item->show_in_footer;
        });
    }
}
```

### only_footer_directories()
Returns the directories only displayed in the footer of the website.

```php
if (!function_exists('only_footer_directories')) {
    function only_footer_directories(array $conditions = []): array
    {
        $tree = build_directories_tree(conditions: $conditions);
        return array_filter($tree, function ($root_item) {
            return !$root_item->show_in_navbar and $root_item->show_in_footer;
        });
    }
}
```


### is_directory_group_manual()
This function checks whether the category management of different groups of directories in the website menu is manual or automatic.
```php
if (!function_exists('is_directory_group_manual')) {
    function is_directory_group_manual(): bool
    {
        $settingVal = null;
        try {
            $settingVal = Setting::getCMSRecord('is_directory_group_manual');
        } catch (Exception $e) {
            return false;
        }
        return $settingVal->value !== "false";
    }
}
```


### directory_make_children_groups()
This function takes the parent directory and the number of columns you want to insert the subdirectory into.

```php
if (!function_exists('directory_make_children_groups')) {
    function directory_make_children_groups(?Directory $directory, int $column_count): array
    {
        if ($directory == null)
            return [];

        $tree = $directory->relationLoaded("directories") ? $directory->directories : build_directories_tree($directory);
        $groups = [];

        if (is_directory_group_manual()) {
            foreach ($tree as $sub_directory) {
                if ($sub_directory->show_in_navbar) {
                    if (!isset($groups[$sub_directory->priority % $column_count]))
                        $groups[$sub_directory->priority % $column_count] = [];
                    $groups[$sub_directory->priority % $column_count][] = $sub_directory;
                }
            }
        } else {
            $groups_length = [];

            for ($i = 0; $i < $column_count; $i++) {
                $groups_length[] = 0;
            }

            foreach ($tree as $sub_directory) {
                if (!$sub_directory->show_in_navbar)
                    continue;

                $index = array_search(min($groups_length), $groups_length);
                $groups_length[$index] += 1.9 + count($sub_directory->directories);
                if (!isset($groups[$index]))
                    $groups[$index] = [];
                $groups[$index][] = $sub_directory;
            }
        }
        return $groups;
    }
}
```



### get_product_root()
The **get_product_root** function returns the first root of the products. This function will be deprecated and will not be used in future versions.

```php
if (!function_exists('get_product_root')) {
    /**
     *@deprecated
     */
    function get_product_root()
    {
        return Directory::roots()->from(DirectoryType::PRODUCT)->first();
    }
}     
```


### get_products_root_list_with_type()
The **get_products_root_list_with_type** function returns products whose type is specified. This function will also be deprecated.

```php
if (!function_exists('get_products_root_list_with_type')) {
    function get_products_root_list_with_type($data_type = null)
    {
        return Directory::roots()->from($data_type)->orderBy('priority', 'ASC')->get();
    }
}
```


### get_directory()
This function takes directory_id and returns the directory. If it does not find the directory, the output is null.

```php
if (!function_exists("get_directory")) {
    function get_directory($directory_id): ?Directory
    {
        return Directory::find($directory_id);
    }
}
```



### get_directory_root()
This function takes data_type and returns the root.

```php
if (!function_exists('get_directory_root')) {
    function get_directory_root($data_type = null)
    {
        return ($data_type != null and is_numeric($data_type)) ?
            Directory::roots()->from(DirectoryType::REAL)->where("data_type", $data_type)->first()
            : Directory::roots()->from(DirectoryType::REAL)->first();
    }
}
```



### get_directory_children_chunk()
The function takes the directory and the chunk from the input. Children returns and creates chunks with the given number of inputs.

```php
if (!function_exists('get_directory_children_chunk')) {
    function get_directory_children_chunk($directory, $chunk)
    {
        return $directory != null ?
            $directory->directories()->where("is_internal_link", "is", false)->with('directories')
                ->orderBy('priority')->get()->chunk($chunk) : null;
    }
}
```


### get_directory_children()
This function returns Children and subdirectories of the specified directory.

```php
if (!function_exists('get_directory_children')) {
    function get_directory_children($directory, $count = null)
    {
        return $directory != null ?
            ($count != null) ? $directory->directories()->with('directories')->orderBy('priority')->take($count)->get()
                : $directory->directories()->with('directories')->orderBy('priority')->get() : null;
    }
}
```


### get_directory_products()
Takes the directory from the input and returns all the subset products. Here, the products function is used, that is, it returns data from the one to many relation. 

```php
if (!function_exists('get_directory_products')) {
    function get_directory_products($directory, $count = null)
    {
        return $count != null ?
            $directory->products()->mainModels()->visible()->orderBy('priority')->take($count)->get() :
            $directory->products()->mainModels()->visible()->orderBy('priority')->get();
    }
}
```


### get_important_product_leaves()
Takes the directory and sorts the specified number of product_leaves by priority.

```php
if (!function_exists('get_important_product_leaves')) {
    /**
     * @param Directory $root_directory
     * @param int $count
     * @return Product[]
     */
    function get_important_product_leaves(Directory $root_directory, int $count)
    {
        return $root_directory->leafProducts()->mainModels()->visible()
            ->where('important_at', '!=', null)
            ->orderBy('important_at', 'DESC')
            ->orderBy('updated_at', 'DESC')
            ->take($count)->get();
    }
}
```


### get_visible_product_leaves()
Takes the directory and sorts the specified number of product_leaves by important_at.

```php
if (!function_exists('get_visible_product_leaves')) {
    /**
     * @param Directory $root_directory
     * @param int $count
     * @return Product[]
     */
    function get_visible_product_leaves(Directory $root_directory, int $count)
    {
        return $root_directory->leafProducts()->mainModels()->visible()->isActive()
            ->orderBy('important_at', 'DESC')
            ->take($count)->get();
    }
}
```


### get_directory_product_leaves()
This function takes a directory and the number of products. If only_active_items is true, return leafProducts that are active and can be sold.

```php
if (!function_exists('get_directory_product_leaves')) {
    function get_directory_product_leaves(Directory $root_directory, int $count, $only_active_items = true)
    {
        $result = $root_directory->leafProducts()->mainModels()->visible();
        $tmp_result = clone $result;
        if ($only_active_items or $tmp_result->isActive()->count() >= $count)
            $result = $result->isActive();
        return $result->orderBy("important_at", "desc")->take($count)->get();
    }
}
```



### latest_products()
Returns the latest or newest products added to the system.

```php
if (!function_exists('latest_products')) {
    /**
     * @param int $count
     * @return Product[]
     */
    function latest_products(int $count = 8)
    {
        if ($count > 0) {
            return Product::mainModels()->visible()
                ->orderBy('important_at', 'DESC')
                ->orderBy('updated_at', 'DESC')
                ->where("is_active", true)
                ->take($count)->get();
        }
        return [];
    }
}
```



### rated_products()
Returns products that have the highest rate.

```php
if (!function_exists('rated_products')) {
    /**
     * @param int $count
     * @return Product[]
     */
    function rated_products(int $count = 8)
    {
        if ($count > 0)
            return Product::mainModels()->visible()->popular()->where("is_active", true)->take($count)->get();
        return [];
    }
}
```


### custom_query_products()
This function is based on custom query built into the admin panel And the specified identifier returns the products. Custom query will be described in a separate section.

```php
if (!function_exists('custom_query_products')) {
    /**
     * @param string $identifier
     * @return Collection|array
     */
    function custom_query_products(string $identifier)
    {
        try {
            return ProductQuery::findByIdentifier($identifier)->getProducts();
        } catch (Exception $e) {
            return [];
        }
    }
}
```


### custom_query_product_ids()
This function returns the product id list based on the custom query and identifier.

```php
if (!function_exists('custom_query_product_ids')) {
    function custom_query_product_ids(string $identifier): array
    {
        try {
            return ProductQuery::findByIdentifier($identifier)->getProductIds();
        } catch (Exception $e) {
            return [];
        }
    }
}
```


### get_product_filter()
This function takes the identifier and returns the filter product object. product filter will be described in a separate section.

```php
if (!function_exists('get_product_filter')) {
    function get_product_filter(string $identifier): ProductFilter
    {
        try {

            return ProductFilter::findByIdentifier($identifier);
        } catch (Exception $e) {
            return new ProductFilter();
        }
    }
}
```


### custom_filter_products()
With custom filter, you can create a filter in the admin panel, which can show products related to that filter by foreach in front.

```php
if (!function_exists('custom_filter_products')) {
    /**
     * @param string $identifier
     * @return Collection|array
     */
    function custom_filter_products(string $identifier)
    {
        try {
            return ProductFilter::findByIdentifier($identifier)->getProducts();
        } catch (Exception $e) {
            return [];
        }
    }
}
```


### custom_filter_product_ids()
This function returns the ID of the products in the custom filter.
```php
if (!function_exists('custom_filter_product_ids')) {
    function custom_filter_product_ids(string $identifier): array
    {
        try {
            return ProductFilter::findByIdentifier($identifier)->getProductIds();
        } catch (Exception $e) {
            return [];
        }
    }
}
```


### get_filter_data()
This function of ProductService returns FilterData, which is required for product_ids. For example, the IDs of fifty products are taken from the input. These products include different brands. By selecting the desired brand from the filter section of the website, only the product of the desired brand will be displayed.

```php
if (!function_exists('get_filter_data')) {
    function get_filter_data(array $product_ids): array
    {
        return App\Utils\CMS\ProductService::getFilterData($product_ids);
    }
}
```

### important_products()
This function returns products that are sorted based on important at and have an important tick.

```php
if (!function_exists('important_products')) {
    /**
     * @param int $count
     * @return Product[]|array
     */
    function important_products(int $count = 8)
    {
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
}
```


### get_customer_addresses()
Returned customer addresses are returned.
```php
if (!function_exists('get_customer_addresses')) {
    function get_customer_addresses()
    {
        return get_customer_user()->addresses;
    }
}
```


### get_district()
This function will be deprecated because in the new version of php, the function can be called this way
**address? -> district? -> name** And does not require a helper function.

```php
if (!function_exists('get_district')) {
    /**
     * @deprecated
     */
    function get_district(CustomerAddress $address): string
    {
        return $address->district ? $address->district->name : '';
    }
}
```


### get_city()
This function will be deprecated like the previous helper function.
```php
if (!function_exists('get_city')) {
    /**
     * @deprecated
     */
    function get_city(CustomerAddress $address): string
    {
        return $address->city ? $address->city->name : '';
    }
}
```


### get_state()
This function will be deprecated like the previous helper function.

```php
if (!function_exists('get_state')) {
    /**
     * @deprecated
     */
    function get_state(CustomerAddress $address): string
    {
        return $address->state ? $address->state->name : '';
    }
}
```


### get_state_json_by_id()
Finds the object and converts it to json. This function will be deprecated in the next version.

```php
if (!function_exists('get_state_json_by_id')) {
      /**
     * @deprecated
     */
    function get_state_json_by_id($id)
    {
        $state = State::find($id);
        return $state ? json_encode($state) : json_encode([]);
    }
}
```


### get_city_json_by_id()
Finds the object and converts it to json. This function will be deprecated in the next version.

```php
if (!function_exists('get_city_json_by_id')) {
      /**
     * @deprecated
     */
    function get_city_json_by_id($id)
    {
        $city = City::find($id);
        return $city ? json_encode($city) : json_encode([]);
    }
}
```


### get_district_json_by_id()
This function is to display the Larammerce project supporter logo. Currently, the Hinza logo is displayed on Larammerce projects.

```php
if (!function_exists('get_district_json_by_id')) {
    function get_district_json_by_id($id)
    {
        $district = District::find($id);
        return $district ? json_encode($district) : json_encode([]);
    }
}
```


### get_invoices()
This function returns all the customer invoices that are logged in.

```php
if (!function_exists('get_invoices')) {
    function get_invoices()
    {
        return get_customer_user()->invoices()->orderBy('id', 'DESC')->paginate(Invoice::getFrontPaginationCount());
    }
}
```


### get_blog_categories()
Returns all categories of blog directories.

```php
if (!function_exists('get_blog_categories')) {
    function get_blog_categories($directory)
    {
        if (count(is_countable($directory->directories) ? $directory->directories : []) > 0)
            return $directory->directories;
        else if ($directory->directory_id != null)
            return $directory->parentDirectory->directories;
        return [$directory];
    }
}
```


### get_popular_blog()
This function takes the number from the input and returns the popular ones among all the blog posts. The type object will be removed in later versions, and this function will only receive the count object from the input.

```php
if (!function_exists('get_popular_blog')) {
    function get_popular_blog($count, $type)
    {
        return Article::popular()->from($type)->with('directory')->take($count)->get();
    }
}
```


### get_latest_blog()
Returns the latest blog posts with that specified number. The type object will be removed in later versions, and this function will only receive the count object from the input.

```php
if (!function_exists('get_latest_blog')) {
    function get_latest_blog($type, $count)
    {
        if (config("wp.enabled")) {
            return WPPost::latest()->take($count)->get();
        }
        return Article::from($type)->latest()->with('directory')->take($count)->get();
    }
}
```


### get_suggested_blog()
Returns suggested_blog with that specified number. The type object will be removed in later versions, and this function will only receive the count object from the input.

```php
if (!function_exists('get_suggested_blog')) {
    function get_suggested_blog($type, $count)
    {
        if (config("wp.enabled")) {
            //TODO: this algorithm should be changed for fetching suggested blog.
            return WPPost::latest()->skip(2)->take($count)->get();
        }
        return Article::suggested()->from($type)->with('directory')->take($count)->get();
    }
}
```


### get_system_messages()
Sometimes an error occurs when sending data. In order for the system to send a message and be able to receive the message, this function must be placed in the footer of the website.

```php
if (!function_exists('get_system_messages')) {
    function get_system_messages()
    {
        try {

            $messages = SystemMessageService::getMessages();
            SystemMessageService::flushMessages();
            return $messages;
        } catch (Exception $e) {
            return [];
        }
    }
}
```


### has_system_messages()
Checks if the system has a message.
```php
if (!function_exists('has_system_messages')) {
    function has_system_messages(): bool
    {
        return SystemMessageService::hasMessages();
    }
}
```


### get_months()
Returns the list of months.

```php
if (!function_exists('get_months')) {
    function get_months(): array
    {
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
}
```


### get_years()
Returns the list of years used in the form.

```php
if (!function_exists('get_years')) {
    function get_years(): array
    {
        $start_year = 1300;
        $end_year = jDateTime::date('Y', time(), false);
        return range($start_year, $end_year);
    }
}
```


### hide_number()
Using this function, you can hide part of a number and use the star character instead.

```php
if (!function_exists('hide_number')) {
    function hide_number($number)
    {
        for ($i = 3; $i < strlen($number) - 3; $i++)
            $number[$i] = '*';
        return $number;
    }
}
```


### hide_text()
Using this function, you can hide part of a text and use the star character instead.

```php
if (!function_exists('hide_text')) {
    function hide_text($text): string
    {
        return substr($text, 0, 4) . "*******" . substr($text, strlen($text) - 4);
    }
}
```


### get_payment_drivers()
This function is to display the Larammerce project supporter logo. Currently, the Hinza logo is displayed on Larammerce projects.

```php
if (!function_exists('get_payment_drivers')) {
    /**
     * @throws \App\Utils\PaymentManager\Exceptions\PaymentInvalidDriverException
     */
    function get_payment_drivers()
    {
        return Provider::getEnabledDrivers(true);
    }
}
```


### is_default_payment_driver()
Returns active payment gateways.

```php
if (!function_exists('is_default_payment_driver')) {
    function is_default_payment_driver($driver): bool
    {
        return Provider::isDefaultDriver($driver);
    }
}
```


### get_disabled_setting_appliances()
This function returns appliances that are inactive.

```php
if (!function_exists('get_disabled_setting_appliances')) {
    function get_disabled_setting_appliances(): array
    {
        $disabled_setting_appliances = env('DISABLED_APPLIANCES', '');
        if (strlen($disabled_setting_appliances) == 0)
            return [];
        return explode(',', $disabled_setting_appliances);
    }
}
```



### is_selected()
Takes the directory from the input and checks that it is in url part. This function will be deprecated in the next version.

```php
if (!function_exists('is_selected')) {
      /**
     * @deprecated
     */
    function is_selected(Directory $directory): bool
    {
        return Request::segment(1) == $directory->url_part;
    }
}
```

### get_configurations()
Returns configurations in the env file.

```php
if (!function_exists('get_configurations')) {
    function get_configurations($needsJson = false, $prefix = "")
    {
        $prefixLength = strlen($prefix);
        $envFileAddress = public_path() . "/../.env";
        $envFile = fopen($envFileAddress, "r");
        $envFileContent = fread($envFile, filesize($envFileAddress));
        fclose($envFile);

        $envFileLines = explode("\n", $envFileContent);
        $result = [];

        foreach ($envFileLines as $line) {
            if (strlen($line) > 0 and ($prefixLength === 0 or
                    substr($line, 0, $prefixLength) === $prefix)) {
                $parts = explode("=", $line);
                if (count(is_countable($parts) ? $parts : []) == 2) {
                    /**
                     * TODO: this way is not efficient
                     * the reason I used env function is to have real type of values, for example $parts[1] is "true"
                     * but I needed the variable to be boolean type true.
                     */
                    $result[$parts[0]] = env($parts[0]);
                }
            }
        }
        return $needsJson ? json_encode($result) : $result;
    }
}
```


### get_searched_products()
Searches the product based on the given query.

```php
if (!function_exists('get_searched_products')) {
    function get_searched_products()
    {
        return Product::search(request('query'))->mainModels()->visible()->get();
    }
}
```


### get_digits()
Returns the list of digits based on the given language.

```php
if (!function_exists('get_digits')) {
    function get_digits($lang)
    {
        $digits = [
            "fa" => explode(",", "۱,۲,۳,۴,۵,۶,۷,۸,۹,۰"),
            "en" => explode(",", "1,2,3,4,5,6,7,8,9,0")
        ];
        if ($lang != null and key_exists($lang, $digits))
            return $digits[$lang];
        return [];
    }
}
```


### convert_digits()
Converts digits from English to Persian.

```php
if (!function_exists('convert_digits')) {
    /**
     * @param int|string $number
     * @param string $from
     * @param string $to
     * @return string
     */
    function convert_digits($number, string $from = "en", string $to = "fa"): string
    {
        $fromList = get_digits($from);
        $toList = get_digits($to);
        $number = "{$number}";
        foreach ($fromList as $index => $fromDigit) {
            $number = str_replace($fromDigit, $toList[$index], $number);
        }
        return $number;
    }
}
```


### format_price()
This function takes a digit from the input and separates the three digits. If it is Persian, it puts a "," and otherwise, it puts a "," sign.

```php
if (!function_exists('format_price')) {
    /**
     * @param integer|string $price
     * @param string $lang
     * @return string
     */
    function format_price($price, string $lang = "fa"): string
    {
        $price = intval($price);
        $separator = $lang == "fa" ? "،" : ",";
        $price = number_format($price, 0, '.', $separator);
        return $lang == "fa" ?
            convert_digits($price, "en", "fa") :
            $price;
    }
}
```


### is_paste_possible()
This function is for the admin panel and will be explained in the relevant section.

```php
if (!function_exists('is_paste_possible')) {
    function is_paste_possible($directory): bool
    {
        try {
            return ClipBoardService::isPastePossible($directory);
        } catch (EmptyClipBoardException|InvalidTypeException $e) {
            return false;
        }
    }
}
```


### get_product_color_models()
This function takes the product from the input and returns its colors.

```php
if (!function_exists('get_product_color_models')) {
    function get_product_color_models(Product $product)
    {
        return Product::models($product, false)
            ->orderBy('id', 'DESC')->groupBy('color_code')->get();
    }
}
```


### get_product_last_color()
Sorts and returns the last color for the product.

```php
if (!function_exists('get_product_last_color')) {
    function get_product_last_color(Product $product): Color
    {
        return $product->colors()->orderBy('id', 'DESC')->first();
    }
}
```


### get_product_accessories()
This function takes the product and returns the accessories of that product.

```php
if (!function_exists('get_product_accessories')) {
    function get_product_accessories(Product $product)
    {
        return $product->accessories()->mainModels()->visible()->get();
    }
}
```


### get_product_related_articles()
Returns articles related to a product to the number taken from the input.

```php
if (!function_exists('get_product_related_articles')) {
    function get_product_related_articles(Product $product, $type, int $count = 3)
    {
        $tags = $product->tags()->get()->pluck("id");
        return Article::from($type)->whereHas("tags", function ($query) use ($tags) {
            $query->whereIn("id", $tags);
        })->latest()->take($count)->get();
    }
}
```


### get_product_related_products()
Returns products related to a product to the specified number.

```php
if (!function_exists('get_product_related_products')) {
    /**
     * @param Product $product
     * @param int $count
     * @return mixed
     */
    function get_product_related_products(Product $product, int $count = 5)
    {
        $directory = $product->directory;
        $leafProducts = new Collection();
        $products = $directory->products()->mainModels()->visible()
            ->where("is_active", true)->latest()->except($product->id)->take($count)->get();
        while ($products->count() < $count and $directory->directory_id != null
            and $leafProducts->count() < $count) {
            $directory = $directory->parentDirectory;
            $leafProducts = $directory->leafProducts()->mainModels()->visible()
                ->where("is_active", true)->latest()->except($product->id)->take($count)->get();
        }
        return $products->merge($leafProducts)->unique()->take($count);
    }
}
```


### get_product_similar_products()
The get_product_similar_products function declares a similarity key for a product. For example, a car with the bmw brand is considered. This function returns products that are similar to this machine but have a different brand.

```php
if (!function_exists('get_product_similar_products')) {
    /**
     * @param Product $product
     * @param int $count
     * @param int $key_id
     * @return Product[]
     */
    function get_product_similar_products(Product $product, int $count = 5, int $key_id = 0)
    {
        if ($key_id === 0) {
            $key_id = $product->attributeKeys()->where("is_sortable", true)
                ->pluck("p_structure_attr_keys.id")->get(0);
        }

        $product_key_values = $product->pAttributes()
            ->where('p_structure_attr_key_id', $key_id)
            ->pluck('p_structure_attr_value_id')->toArray();

        $product_other_keys_attrs = $product->pAttributes()
            ->where('p_structure_attr_key_id', '!=', $key_id)->get();
        $product_other_keys_values = [];
        foreach ($product_other_keys_attrs as $product_key_value) {
            $item['key'] = $product_key_value->p_structure_attr_key_id;
            $item['value'] = $product_key_value->p_structure_attr_value_id;
            array_push($product_other_keys_values, $item);
        }

        $products = [];
        if ($key_id !== 0) {
            $product_structure = $product->productStructure;
            if ($product_structure != null) {
                $products = $product_structure->products()->where('directory_id',
                    $product->directory_id)->mainModels()->visible()->except($product->id)
                    ->whereHas('pAttributes', function ($q1) use ($key_id, $product_key_values) {
                        $q1->where('p_structure_attr_key_id', $key_id)
                            ->whereNotIn('p_structure_attr_value_id', $product_key_values);
                    })->where(function ($q2) use ($key_id, $product_other_keys_values) {
                        foreach ($product_other_keys_values as $item) {
                            $key = $item['key'];
                            $value = $item['value'];
                            $q2->whereHas('pAttributes', function ($q3) use ($key_id, $key, $value) {
                                $q3->where('p_structure_attr_key_id', '!=', $key_id);
                                $q3->where([
                                    'p_structure_attr_key_id' => $key,
                                    'p_structure_attr_value_id' => $value
                                ]);
                            });
                        }
                    })->orderBy("priority", "ASC")->take($count)->get();
            }
        }
        return $products;
    }
}
```


### get_related_products_with_directory_level()
Returns similar products up to level 1 of a directory.

```php
if (!function_exists('get_related_products_with_directory_level')) {
    function get_related_products_with_directory_level(Product $product, int $count = 5, int $level = 1)
    {
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
}
```

### get_product_attributes()
Returns the attributes of a product.

```php
if (!function_exists('get_product_attributes')) {
    function get_product_attributes(Product $product = null)
    {
        if ($product != null) {
            $attributes = ProductAttribute::getProductAttributes($product);
            return $attributes['attributes'];
        } else {
            return null;
        }
    }
}
```


### get_product_most_privileged_key_attributes()
This function takes a list of all the keys and then returns the validity of that key. This function will be deprecated in the next version.

```php
if (!function_exists('get_product_most_privileged_key_attributes')) {
      /**
     * @deprecated
     */
    function get_product_most_privileged_key_attributes(int $count = 9): array
    {
        $id = ProductStructureAttributeKey::orderBy('priority', 'DESC')->pluck('id')->first();
        $attributeValues = ProductStructureAttributeValue::with('key')->where('p_structure_attr_key_id', $id)
            ->inRandomOrder()
            ->paginate($count);
        return $attributeValues->items();
    }
}
```


### get_product_By_id()
This function will be deprecated in the next version.

```php
if (!function_exists('get_product_By_id')) {
      /**
     * @deprecated
     */
    function get_product_By_id($id): ?Product
    {
        return ($id != null) ? Product::find($id) : null;
    }
}
```


### get_article_related_products()
This function takes from the input of an article and returns related products.

```php
if (!function_exists('get_article_related_products')) {
    function get_article_related_products(Article $article, int $count = 3)
    {
        $tags = $article->tags()->get()->pluck('id');
        return Product::mainModels()->visible()->whereHas('tags', function ($query) use ($tags) {
            $query->whereIn('id', $tags);
        })->where("is_active", true)->mainModels()->visible()->latest()->take($count)->get();
    }
}
```


### get_article_related_articles()
This function takes from the input of an article and returns related articles.

```php
if (!function_exists('get_article_related_articles')) {
    function get_article_related_articles(Article $article, int $count = 4)
    {
        return $article->directory->articles()->latest()->except($article->id)->take($count)->get();
    }
}
```


### get_experts()
This function will be deprecated in the next version.

```php
if (!function_exists('get_experts')) {
     /**
     * @deprecated
     */
    function get_experts(int $count = 4)
    {
        return SystemUser::where('is_expert', true)->take($count)->get();
    }
}
```


### recaptcha_enabled()
This function determines whether Recaptcha is enabled on the system.

```php
if (!function_exists('recaptcha_enabled')) {
    /**
     * @return bool
     */
    function recaptcha_enabled(): bool
    {
        return strpos(env("TEMPORARILY_DISABLED_RULES", ""), "g-recaptcha-response") === false;
    }
}
```


### get_same_models_products()
Takes a product from the input and returns similar products. For example: Different sizes of a shoe are similar products.

```php
if (!function_exists('get_same_models_products')) {
    /**
     * @param $product
     * @return array
     */
    function get_same_models_products($product): array
    {
        $products = Product::models($product, false)
            ->with('productStructure', 'images', 'rates')
            ->get();
        return json_decode($products);
    }
}
```


### check_cart()
Checks if the product is in the cart. It is suggested not to use this function.

```php
if (!function_exists('check_cart')) {
    function check_cart($product_id): bool
    {
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
}
```


### get_cart_information()
This function returns cartRows data related to a product_id.

```php
if (!function_exists('get_cart_information')) {
    function get_cart_information($product_id)
    {
        $customer = get_customer_user();
        $selected_row = null;
        if ($customer !== false) {
            $selected_row = $customer->cartRows()->with('product')->where("product_id", $product_id)->first();
        } else {
            $cart_rows = get_local_cart();
            foreach ($cart_rows as $cart_row) {
                if ($cart_row->product_id === $product_id) {
                    $product = Product::find($product_id);
                    $selected_row = $cart_row;
                    $selected_row->product = $product;
                    $selected_row->id = $product->id;
                }
            }
        }
        return $selected_row;
    }
}
```


### get_cart()
-------------------------------------------


```php
if (!function_exists('get_cart')) {
    /**
     * @return \Illuminate\Database\Eloquent\Collection|CartRow[]
     */
    function get_cart(): \Illuminate\Database\Eloquent\Collection|array
    {
        $customer = get_customer_user();
        if ($customer !== false) {
            $cart_rows = $customer->cartRows()->with('product')->orderBy('id', 'DESC')->get();
        } else {
            $cart_rows = get_local_cart(true);
        }
        return $cart_rows;
    }
}
```


### get_breadcrumb()
This function will be deprecated in the next version.

```php
if (!function_exists('get_breadcrumb')) {
      /**
     * @deprecated
     */
    function get_breadcrumb(Directory $directory): string
    {
        if (!(isset($directory->parentDirectory)))
            return '<li class="active">' . $directory->title . '</li>';
        else {
            return "<li><a href=" . $directory->url_full . ">" . $directory->title . "</a></li>"
                . get_breadcrumb($directory->parentDirectory);
        }
    }
}
```


### get_minimum_purchase_free_shipment()
This function specifies how much to buy to make shipping free.

```php
if (!function_exists('get_minimum_purchase_free_shipment')) {
    function get_minimum_purchase_free_shipment()
    {
        try {
            return ShipmentCostService::getRecord()->getMinimumPurchaseFreeShipment();
        } catch (Exception $e) {
            Log::error('Message : ' . $e->getmessage());
            return 'not set';
        }
    }
}
```


### product_disable_on_min()
This function specifies when a product is disabled, when it is zero, or when it reaches a minimum.

```php
if (!function_exists('product_disable_on_min')) {
    function product_disable_on_min(): ?string
    {
        return Product::shouldDisableOnMin();
    }
}
```


### get_state_deactivate_product()
This function will be deprecated in the next version.

```php
if (!function_exists('get_state_deactivate_product')) {
      /**
     * @deprecated
     */
    function get_state_deactivate_product($product)
    {
        return $product->inaccessibility_type;
    }
}
```


### get_inquiry_call_number()
This function will be deprecated in the next version.

```php
if (!function_exists('get_inquiry_call_number')) {
      /**
     * @deprecated
     */
    function get_inquiry_call_number(): string
    {
        try {
            return Setting::getCMSRecord(CMSSettingKey::INQUIRY_CALL_NUMBER)->value;
        } catch (Exception $e) {
            Log::error('Message : ' . $e->getmessage());
            return 'not set';
        }
    }
}
```


### customer_can_edit_profile()
This function specifies whether the customer is allowed to edit their profile.

```php
if (!function_exists('customer_can_edit_profile')) {
    function customer_can_edit_profile(): bool
    {
        try {
            return strtolower(Setting::getCMSRecord(CMSSettingKey::CUSTOMER_CAN_EDIT_PROFILE)->value) === "true";
        } catch (Exception $e) {
            return true;
        }
    }
}
```


### get_root_directory_per_directory()
This function takes a directory and returns root node.

```php
if (!function_exists('get_root_directory_per_directory')) {
    function get_root_directory_per_directory(Directory $directory)
    {
        foreach ($directory->getParentDirectories() as $dir) {
            if ($dir->directory_id == null)
                return $dir;
        }
        return $directory;
    }
}
```


### h_view()
This function is not described in this section.

```php
if (!function_exists('h_view')) {
    /**
     * @param null $template
     * @param array $data
     * @return Factory|Application|View
     */
    function h_view($template = null, array $data = [])
    {
        if (DetectService::isMobile() and view()->exists($template . "_mobile"))
            $template = $template . "_mobile";
        elseif (request()->has("app") and request("app") and view()->exists($template . "_app"))
            $template = $template . "_app";
        return view($template, $data);
    }
}
```


### get_cms_setting()
Takes the inquiry phone number and returns it.

```php
if (!function_exists('get_cms_setting')) {
    function get_cms_setting(string $key): string
    {
        try {
            $setting = Setting::getCMSRecord($key);
            return $setting->value;
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return "";
        }
    }
}
```


### get_template_views()
There is no explanation for this function.

```php
if (!function_exists('get_template_views')) {
    function get_template_views(): array
    {
        return array_map(function ($blade_name) {
            return str_replace(".blade.php", "", $blade_name);
        }, \App\Utils\CMS\Template\TemplateService::getOriginalBlades(true));
    }
}
```


### get_current_customer_location()
There is no explanation for this function.

```php
if (!function_exists("get_current_customer_location")) {
    function get_current_customer_location(): string
    {
        $customer_location = \App\Utils\CMS\Setting\CustomerLocation\CustomerLocationService::getRecord();
        if ($customer_location != null)
            return "{$customer_location->getState()->name}، {$customer_location->getCity()->name}";
        return "لطفا شهر و استان خود را مشخص کنید";
    }
}
```


### get_current_customer_location_data()
There is no explanation for this function.

```php
if (!function_exists("get_current_customer_location_data")) {
    function get_current_customer_location_data(): ?array
    {
        $customer_location = \App\Utils\CMS\Setting\CustomerLocation\CustomerLocationService::getRecord("");
        if ($customer_location != null)
            return [
                "state_id" => $customer_location->getState()->id,
                "city_id" => $customer_location->getCity()->id
            ];
        return null;
    }
}
```


### get_customer_meta_categories()
There is no explanation for this function.

```php
if (!function_exists("get_customer_meta_categories")) {
    function get_customer_meta_categories(): \Illuminate\Database\Eloquent\Collection|array
    {
        return CustomerMetaCategory::main()->get();
    }
}
```


### cmc_get_options()
There is no explanation for this function.

```php
if (!function_exists("cmc_get_options")) {
    function cmc_get_options($identifier, $customer_meta_category): array
    {
        try {
            return explode(";", cmc_get_content($identifier, $customer_meta_category));
        } catch (Exception $e) {
            return [];
        }
    }
}

```


### cmc_get_content()
There is no explanation for this function.

```php
if (!function_exists("cmc_get_content")) {
    function cmc_get_content($identifier, $customer_meta_category): string
    {
        try {
            return (Arr::first($customer_meta_category->data_object, function ($iter_item) use ($identifier) {
                return $iter_item->input_identifier === $identifier;
            }))->input_content;
        } catch (Exception $e) {
            return "";
        }
    }
}
```


### get_shipment_cost()
This function takes the state from the input and returns the cost of sending.

```php
if (!function_exists("get_shipment_cost")) {
    function get_shipment_cost(Invoice $invoice, $state_id = 0): int
    {
        if ($state_id !== 0)
            $invoice->state_id = $state_id;
        return $invoice->calculateShipmentCost();
    }
}
```


### build_directories_tree()
This function takes root and draws the tree to the lowest node and returns it.

```php
if (!function_exists("build_directories_tree")) {
    function build_directories_tree(?Directory $root = null, array $conditions = [], array $order = []): array
    {
        $directories = Directory::permitted()->where($conditions)
            ->orderBy($order["column"] ?? "priority", $order["direction"] ?? "ASC")->get();
        $branch = [];
        $parts = [];
        $map = [];

        foreach ($directories as $directory) {
            $map[$directory->id] = $directory;
            $directory->setRelation("directories", []);
            if (!isset($parts[$directory->directory_id]))
                $parts[$directory->directory_id] = [];
            $parts[$directory->directory_id][] = $directory;
        }

        foreach ($parts as $parent_id => $children) {
            if (isset($map[$parent_id]))
                $map[$parent_id]->setRelation("directories", $children);
            else {
                $branch = array_merge($branch, $children);
            }
        }

        return $root == null ? $branch : ($map[$root->id]->directories ?? []);
    }
}
```


### clean_cart_cookie()
This function clears the cart cookie.

```php
if (!function_exists("clean_cart_cookie")) {
    function clean_cart_cookie()
    {
        CartProvider::cleanCookie();
    }
}
```


### get_structure_sort_title()
This function is not functional.

```php
if (!function_exists("get_structure_sort_title")) {
    /**
     * @param ProductStructureAttributeKey[] $keys
     */
    function get_structure_sort_title($keys)
    {
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
}
```


### get_logistics_schedule()
Returns the timetable. For example: when a product can be shipped.

```php
if (!function_exists("get_logistics_schedule")) {
    function get_logistics_schedule(bool $contains_disabled = true)
    {
        $data = LogisticService::getPublicTableCells();
        if (!$contains_disabled) {
            foreach ($data as $day_index => $day) {
                $is_enabled = false;
                foreach ($day as $period_index => $period) {
                    $is_enabled = ($is_enabled or $period["is_enabled"]);
                }
                if (!$is_enabled)
                    unset($data[$day_index]);
            }
        }
        return $data;
    }
}
```


### day_of_week()
This function takes a number and shows what day of the week.

```php
if (!function_exists("day_of_week")) {
    function day_of_week(int $diff)
    {
        return \App\Utils\Jalali\jDate::forge(\Illuminate\Support\Carbon::now()->addDay($diff))->format("%A");
    }
}
```


### get_current_formal_date()
-------------------------------------------------------------

```php
if (!function_exists("get_current_formal_date")) {
    function get_current_formal_date()
    {
        return \App\Utils\Common\TimeService::getCurrentFormalDate();
    }
}
```


### get_current_date()
This function returns the current date.

```php
if (!function_exists("get_current_date")) {
    function get_current_date()
    {
        return \App\Utils\Common\TimeService::getCurrentDate();
    }
}
```


### get_max_transaction_amount()
This function specifies the transaction amount.

```php
if (!function_exists("get_max_transaction_amount")) {
    function get_max_transaction_amount(): int
    {
        return \App\Utils\PaymentManager\ConfigProvider::MAX_TRANSACTION;
    }
}
```


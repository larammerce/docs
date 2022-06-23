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
This function returns the current system language with **app () -> getLocale ()**

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
Returns the logged in user and if the user is not logged in returns false

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
There are two users in the system: 1- System User  2- Customer user.
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


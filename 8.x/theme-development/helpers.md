## Template helper functions

[[toc]]
With every template engine, the content of the website can be managed. In order for the template creators to be able to work with the content more easily, for example: to receive the content, modify it, display the body in different pages of the website, functions called **Helper** are created. These functions are also created in the Larammerce Template Engine.

Let's check the provided helpers one by one:

First, open the helper file: `app/Utils/CMS/Template/helpers.php`.

This file has 1462 code lines. This section describes all the helpers. Some of these helpers are old, some new, and some will be removed in the next version, which are specified as @deprecated in the phpdoc above them.


### get_identity()
This function is to display the Larammerce project supporter identification. Currently, the Hinza identification is displayed on Larammerce projects.



### role_input()
This function is used for blade directives. And manages the access of each admin user to Model properties; please note that this function doesn't belong to template engine helpers, and it's not in the right place.



### shorten_text()
This function is a directive. The input of this function is text and number. For example: here it takes the number 75 from the input, which means that it shows only 75 words of this text. And uses "..." at the end.


### get_unshared_content()
The get_unshared_content function takes content data from the web page and returns the identifier. This function is used in the Larammerce Template Engine structure and cannot be used.


### get_gallery()
get_gallery is used in the Larammerce Template Engine structure and cannot be used. This function returns the identifir given in the blade file to the desired gallery.


### get_gallery_items()
This function takes the name of the gallery and the number of items from the input, and whether random select is true or false.


### get_locale()
This function returns the current system language with **app () -> getLocale ()**.


### get_user()
Returns the logged in user and if the user is not logged in returns false.


### get_customer_user()
This function returns a logged in customer user.


### get_customer_legal_info()
Returns the legal information of the logged in customer user.


### customer_need_list_exist()
If the customer is logged in, the function checks if the given product is in the needlist. If the customer is not logged in, false returns.


### customer_cart_count()
This function returns the number of products in the customer's shopping cart that is logged in.


### pending_invoices_count()
This function returns the number of pending invoices. If the customer is not logged in, it returns false.


### get_local_cart()
This function returns local shopping cart data. Before the user logs in, the data is stored in a cookie, so if the customer is not logged in, the shopping cart data is returned via **get-local-cart**.


### get_system_user()
The structure of Larammerce user management is done according to the user object.
There are two users in the system: 

1- System User  

2- Customer user

This function returns system users who are admins in this system.


### get_system_users()
This function returns a list of system users.


### is_customer()
**is_customer** function checks that the logged in user is the customert user or the system user.


### app_navbar_directories()
Returns the list of directories displayed in the application navigation bar.
There is a property in the function called show that specifies whether these menus will be displayed in the mobile or desktop application if the application is connected to the Larammerce Template Engine.


### navbar_directories()
Returns the directories displayed in the navigation bar of the website.


### footer_directories()
Returns the directories displayed in the footer of the website.


### only_footer_directories()
Returns the directories only displayed in the footer of the website.


### is_directory_group_manual()
This function checks whether the category management of different groups of directories in the website menu is manual or automatic.


### directory_make_children_groups()
This function takes the parent directory and the number of columns you want to insert the subdirectory into.


### get_product_root()
The **get_product_root** function returns the first root of the products. This function will be deprecated and will not be used in future versions.


### get_products_root_list_with_type()
The **get_products_root_list_with_type** function returns products whose type is specified. This function will also be deprecated.


### get_directory()
This function takes directory_id and returns the directory. If it does not find the directory, the output is null.

### get_directory_root()
This function takes data_type and returns the root.


### get_directory_children_chunk()
The function takes the directory and the chunk from the input. Children returns and creates chunks with the given number of inputs.


### get_directory_children()
This function returns Children and subdirectories of the specified directory.


### get_directory_products()
Takes the directory from the input and returns all the subset products. Here, the products function is used, that is, it returns data from the one to many relation. 


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



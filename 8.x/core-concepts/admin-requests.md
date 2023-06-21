## Admin requests

[[toc]]

This article aims to provide an in-depth analysis of the admin request functionality, covering everything from its inner workings to how you can make modifications to it.

### Request lifecycle in Laravel

If the request passes through all of the matched route's assigned middleware, the route or controller method will be executed and the response returned by the route or controller method will be sent back through the route's chain of middleware.

**Note:** In general, the lifecycle of a request in laravel starts from the client-side and goes through some stages. For more details study *request lifecycle in laravel* *<sup>[1](#1)</sup>* and *middleware* *<sup>[2](#2)</sup>*.


### Request lifecycle in Larammerce

In Larammerce, the first middleware layer has a tool that identifies if an incoming request is intended for the admin panel or other parts of the platform. To check this, it follows a specific path to determine whether the request is being processed within the admin panel or not.

In order to generate responses and create variables, it is crucial for various components of the Larammerce platform to determine whether an incoming request is intended for the admin panel or the client side. This information helps to ensure that the appropriate actions are taken for the request and that responses are generated correctly.

As an example, let's consider a scenario where a request is sent to the `/any-URL` endpoint, which is intended for the client-side, while requests sent to the `/admin/any-URL` endpoint are intended for the server-side (admin). Suppose there is a `Product` class that has an accessor method. Within this method, it can be specified that if the incoming request is from the admin side, the pure price of the product should be returned, but if the request is from the client side (based on the URL), then the discounted price should be returned instead.

To achieve this functionality, a middleware layer is utilized that analyzes the incoming request using a defined detector mechanism. If the authenticated user is an admin, the middleware informs all relevant components of this fact so that they can generate the appropriate response.

:::tip Class Accessor
Accessor is a method or property that provides access to the private members of a class from outside the class. 
:::

### Admin request management functions

To better understand, let's check the functionality of some functions in `AdminRequestMiddleware.php` file.

On the Larammerce project, path to `larammerce/app/Http/Middleware/AdminRequestMiddleware.php` file.

```php
...

$user = get_user($guard);   // Retrieves the authenticated user.
$systemUser = $user -> systemUser;  //  Checks whether the retrieved user is a system user or not.
$action = Action::withRequest($request); // The system takes action to determine what the system user's request is.

// The if statement dentifies the object that is being managed in the admin panel.
if (!$request->has("related_model"))
    $request->merge(["related_model" => app($action->getClassName())?->getModel()]);

...

$this->setOrderAttributes($request);  // Detects the criterion on which sorting should be based.
$this->setLayoutAttributes($request);  // Detects the method for displaying the items, which can either be a list or a grid.
$this->setPaginationAttributes($request); // Detects the current page of the admin panel that is being accessed.
...

ApplianceService::init();  // Pertains to the appliances, which refer to every content on the toolbar or the sub-items of each page. This function manages the arrangement of the appliances and determines which ones should be enabled or disabled based on the administrator's role.

```

In order to determine whether the request is an admin erea or not, all of these functions need to incorporate a detection mechanism. This can be achieved by utilizing two functions, namely `setInAdminArea` and `isInAdminArea`, which are located within the `AdminRequestService.php` file. To access these functions, navigate to the following path: `Larammerce/app/Utils/CMS/AdminRequestService.php`.


```php{5}
// app/Utils/CMS/AdminRequestService.php

 private static string $ADMIN_AREA_KEY = 'in_admin_area';

 public static function setInAdminArea($request = null)
    {
        $searchResult = array_search('admin', explode("/",$request->server('REQUEST_URI')));
        $result = ($searchResult !== false and $searchResult < 2);
        RequestService::setAttr(self::getAdminAreaKey(), $result, $request);
    }

// app/Utils/Common/RequestService.php

     public static function setAttr($key, $value, $request=null){
        $request = self::getRequest($request);
        $request->merge([$key => $value]);
    }
```

This function sets a boolean attribute `in_admin_area` to `true` or `false`, depending on whether the current request is being made in the admin area of the application or not. The function takes in an optional parameter `$request` which represents the `HTTP` request being made.

- The **first line** of the function uses the `explode()` function to split the `REQUEST_URI` server variable into an array using the forward slash `(/)` as the delimiter. The first argument of the `array_search()` function then searches for the string 'admin' within this array and returns the index of the first occurrence of the string. If the string is not found, `array_search()` returns `false`.

- The **second line** of the function checks if the search result is not false (i.e., the string 'admin' was found in the URL) and if the index of the string is less than 2 (i.e., the 'admin' keyword appears in the first or second(0 or 1) segment of the URL). This condition ensures that the function sets the in_admin_area attribute to true only when the request is being made in the admin area.

- Finally, the function calls `RequestService::setAttr()` to set the `in_admin_area` attribute with the boolean value determined in the previous step, using the key returned by the `self::getAdminAreaKey()` method.(You can check this in the `/Larammerce/app/Utils/Common/RequestService.php`)

```php
public static function isInAdminArea($request = null)
    {
        return RequestService::getAttr(self::getAdminAreaKey(), $request);
    }

```
This function is used to check if the current request is in the admin area by accessing some attribute stored in the `$request` object using the key returned by `getAdminAreaKey()`. If the attribute exists and has a non-null value, then the function will return `true`, indicating that the current request is in the admin area. Otherwise, the function will return `false`!

### The usage of admin request functions

Now that you have a clear understanding of the functionality of these functions, let's explore how they are used.

Path to the `/Larammerce/routes/web.php` and create these routes within the file:

```php
Route::get("/start", function(){

    echo ("Hi, This is /start \n <br/>");

    echo \App\Utils\CMS\AdminRequestService::isInAdminArea()? "We are in admin area" : "We are out of admin area"
    
    ;

});

Route::get("/admin/start ",function(){

    echo ("Hi, This is /admin/start \n <br/>");

    echo \App\Utils\CMS\AdminRequestService::isInAdminArea()? "We are in admin area" : "We are out of admin area"

});

```

To view the output, navigate to `localhost:8080/start` and `localhost:8080/admin/start` in your web browser after running the `npm run docs:dev` command.

Now let's test the example of the product price in which when a client accesses the product page, the web application should retrieve the client price and display it. Similarly, when an administrator accesses the same page, the web application should retrieve the administrator price instead.

To do so, add these lines to the code above:

```php{7,8,18,19}
// larammerce-project/routes/web.php/

Route::get("/start", function(){

    echo ("Hi, This is /start \n <br/>");

    $product = product::find(20);
    echo "The product price is:" . product->price . "\n <br/>";

    echo \App\Utils\CMS\AdminRequestService::isInAdminArea()? "We are in admin area" : "We are out of admin area";

});

Route::get("/admin/start ",function(){

    echo ("Hi, This is /admin/start \n <br/>");

    $product = product::find(20);
    echo "The product price is:" . product->price . "\n <br/>";

    echo \App\Utils\CMS\AdminRequestService::isInAdminArea()? "We are in admin area" : "We are out of admin area";

});

```
 Now path to the `/app/Models/Product.php` and write the codes below in the file:

 ```php{4-7}
 ...
 protected static string $TRANSLATION_EDIT_FORM = "admin.page.product.translate";

public function getPriceAttribute(){
    return AdminRequestService::isInAdminArea() ?
    "The admin price" :
    "The customer price";

}
```
This function enables a global check to determine whether the user is in the admin area or not, without requiring access to the `$request` object.

Now if you set the URL to `localhost:8080/start`, the output would be:

```html
Hi, This is /start
The product price is: The customer price
We are out of admin area
```

And if the URL is set to `localhost:8080/admin/start`, the output would be:
```html
Hi, This is admin/start
The product price is: The admin price
We are in admin area
```

### References

*1.<a name="1">[Request lifecycle in the Laravel framework.](https://laravel.com/docs/8.x/lifecycle)</a>*

*2.<a name="2">[Middleware in the Laravel framework.](https://laravel.com/docs/8.x/middleware)</a>*


#### video source
-----
<iframe src="https://www.aparat.com/video/video/embed/videohash/qY9hS/vt/frame"  height="300" width="700" style="  border: 2px solid #bdc3c7; border-radius: 5px; opacity: 1;" allowFullScreen="true"></iframe>

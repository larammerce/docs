## Admin requests

[[toc]]

This article aims to provide an in-depth analysis of the admin request functionality, covering everything from its inner workings to how you can make modifications to it.

### Request path in Larammerce

When a client-side request is sent to the server-side of the Larammerce platform, it undergoes a hierarchical process. The request is initially directed towards the router, where it is then passed through a middleware layer. After this, it is handled by the controller before proceeding through another middleware layer. Finally, the response is generated and returned to the client.

**Note:** In general, the path of a request starts from the client-side and goes through the following stages:

- The request is initiated by the client.
- The request is sent to the server via a network connection.
- The server receives the request and passes it to the appropriate routing mechanism.
- The request is routed to the appropriate middleware layer for processing.
- After being processed by the middleware, the request is passed to the controller for further handling.
- The controller utilizes any necessary services or models to generate an appropriate response.
- The response is passed back through the middleware layer for additional processing (if necessary).
- Finally, the response is returned to the server and sent back to the client over the network connection.

So the path typically involves several steps including client request, routing, authentication, validation, processing and the response as the final step. Also,throughout this process, the platform may make use of middleware, caching, and other techniques to improve performance and security. 

:::warning Middleware And Controllers :

***Middleware*** is software that sits between the client and server, intercepting requests and responses. Middleware can be used to add functionality such as logging, authentication, or caching without modifying the core logic of the application. Middleware can also be used to modify the request or response, for example by adding headers or cookies.

***Controllers***, on the other hand, are responsible for handling requests and generating responses. Controllers typically receive input from middleware and other components, process that input, and generate an appropriate response. For example, in a web application, a controller might handle a request to display a list of products, retrieve the necessary data from a database or other source, and then render an HTML document containing the product list.

Together, middleware and controllers form the backbone of a platform's request processing pipeline, providing essential functionality for handling incoming requests and generating responses.
:::

In Larammerce, the first middleware layer has a tool that identifies if an incoming request is intended for the admin panel or other parts of the platform. To check this, it follows a specific path to determine whether the request is being processed within the admin panel or not.

In order to generate responses and create variables, it is crucial for various components of the Larammerce platform to determine whether an incoming request is intended for the admin panel or the client side. This information helps to ensure that the appropriate actions are taken for the request and that responses are generated correctly.

As an example, let's consider a scenario where a request is sent to the `/anyURL` endpoint, which is intended for the client-side, while requests sent to the `/admin/anyURL` endpoint are intended for the server-side (admin). Suppose there is a `Product` class that has an accessor method. Within this method, it can be specified that if the incoming request is from the admin side, the pure price of the product should be returned, but if the request is from the client side (based on the URL), then the discounted price should be returned instead.

To achieve this functionality, a middleware layer is utilized that analyzes the incoming request using a defined detector mechanism. If the authenticated user is an admin, the middleware notifies all relevant components of this fact so that they can generate the appropriate response.

:::tip Class Accessor
Accessor is a method or property that provides access to the private members of a class from outside the class. 
:::

### Admin request management functions

To better understand, let's check the functionality of some functions in `AdminRequestMiddleware.php` file.

On the Larammerce project, path to `larammerce/App/Http/AdminRequestMiddleware.php` file.

```php
...
// line 48-49-50
$user = get_user($guard);
$systemUser = $user -> systemUser;
$action = Action::withRequest($request);

//line 52-53
if (!$request->has("related_model"))
    $request->merge(["related_model" => app($action->getClassName())?->getModel()]);

...
// line 55-56-57
$this->setOrderAttributes($request);
$this->setLayoutAttributes($request);
$this->setPaginationAttributes($request);
...
// line 59
ApplianceService::init();

```

- In the **third line** of this code block, the `get_user()` function is called to retrieve the authenticated user.
- On the **fourth line**, the code checks whether the retrieved user is a system user or not.
- If the retrieved user is determined to be a system user, on the **fifth line**, the system takes action to determine what the system user's request is.
- On the **eighth line**, the code identifies the object that is being managed in the admin panel, such as the product being edited or the discount code.
- **Line 13** detects the criterion on which sorting should be based.
- **Line 14** detects the method for displaying lists, which can either be a list or a grid.
- **Line 15** detects the current page of the admin panel that is being accessed.
- **Line 18** pertains to the appliances, which refer to every content on the toolbar or the sub-items of each page. This function manages the arrangement of the appliances and determines which ones should be enabled or disabled based on the administrator's role.

The initialization of several functions starts from line 60 of the `AdminRequestMiddleware.php` file and continues until the end. However, a detailed discussion on these functions will be provided in a separate article.

In order to determine whether the user is an admin or not, all of these functions need to incorporate a detection mechanism. This can be achieved by utilizing two functions, namely `setInAdminArea` and `isInAdminArea`, which are located within the `AdminRequestservice.php` file. To access these functions, navigate to the following path: `App/Utils/CMS/AdminRequestservice.php`.


```php{5}
// App/Utils/CMS/AdminRequestservice.php

 private static string $ADMIN_AREA_KEY = 'in_admin_area';

 public static function setInAdminArea($request = null)
    {
        $searchResult = array_search('admin', explode("/", $request->server('REQUEST_URI')));
        $result = ($searchResult !== false and $searchResult < 2);
        RequestService::setAttr(self::getAdminAreaKey(), $result, $request);
    }

// App/Utils/Common/requestService.php

     public static function setAttr($key, $value, $request=null){
        $request = self::getRequest($request);
        $request->merge([$key => $value]);
    }
```

This function sets a boolean attribute `in_admin_area` to `true` or `false`, depending on whether the current request is being made in the admin area of the application or not. The function takes in an optional parameter `$request` which represents the `HTTP` request being made.

- The **first line** of the function uses the `explode()` function to split the `REQUEST_URI` server variable into an array using the forward slash `(/)` as the delimiter. The second argument to the `array_search()` function then searches for the string 'admin' within this array and returns the index of the first occurrence of the string. If the string is not found, `array_search()` returns `false`.

- The **third line** of the function checks if the search result is not false (i.e., the string 'admin' was found in the URL) and if the index of the string is less than 2 (i.e., the 'admin' keyword appears in the first or second(0 or 1) segment of the URL). This condition ensures that the function sets the in_admin_area attribute to true only when the request is being made in the admin area.

- Finally, the function calls `RequestService::setAttr()` to set the `in_admin_area` attribute with the boolean value determined in the previous step, using the key returned by the `self::getAdminAreaKey()` method.(You can check this in the `App/Utils/Common/requestService.php`)

```php
public static function isInAdminArea($request = null)
    {
        return RequestService::getAttr(self::getAdminAreaKey(), $request);
    }

```
This function is used to check if the current request is in the admin area by accessing some attribute stored in the `$request` object using the key returned by `getAdminAreaKey()`. If the attribute exists and has a non-null value, then the function will return `true`, indicating that the current request is in the admin area. Otherwise, the function will return `false`!

### The usage of admin request functions

Now that you have a clear understanding of the functionality of these functions, let's explore how they are used.

Path to the `Larammerce/routes/web.php` and create a route within the file:

```php
Route::get("/salam", function(){

    echo ("Hi, This is /salam \n <br/>");

    echo \App\Utils\CMS\AdminRequestService::isInAdminArea()? "We are in admin area" : "We are out of admin area"
    
    ;

});

Route::get("/admin/salam ",function(){

    echo ("Hi, This is /admin/salam \n <br/>");

    echo \App\Utils\CMS\AdminRequestService::isInAdminArea()? "We are in admin area" : "We are out of admin area"

});

```

To view the output, navigate to `localhost:8080/salam` and `localhost:8080/admin/salam` in your web browser.

Now let's test the example of the product price in which when a client accesses the product page, the web application should retrieve the client price and display it. Similarly, when an administrator accesses the same page, the web application should retrieve the administrator price instead.

To do so, add these lines to the code above:

```php{7,8,18,19}
// path/to/routes/web.php/

Route::get("/salam", function(){

    echo ("Hi, This is /salam \n <br/>");

    $product = product::find(20);
    echo "The product price is:" . product->price . "\n <br/>";

    echo \App\Utils\CMS\AdminRequestService::isInAdminArea()? "We are in admin area" : "We are out of admin area";

});

Route::get("/admin/salam ",function(){

    echo ("Hi, This is /admin/salam \n <br/>");

    $product = product::find(20);
    echo "The product price is:" . product->price . "\n <br/>";

    echo \App\Utils\CMS\AdminRequestService::isInAdminArea()? "We are in admin area" : "We are out of admin area";

});

```
 Now path to the `app/Models/product.php/` and write the code below in the file:

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

Now if you set the URL to `localhost:8080/salam`, the output would be:

```html
Hi, This is /salam
The product price is: The customer price
We are out of admin area
```

And if the URL is set to `localhost:8080/admin/salam`, the output would be:
```html
Hi, This is admin/salam
The product price is: The admin price
We are in admin area
```


#### video source
-----
<iframe src="https://www.aparat.com/video/video/embed/videohash/qY9hS/vt/frame"  height="300" width="700" style="  border: 2px solid #bdc3c7; border-radius: 5px; opacity: 1;" allowFullScreen="true"></iframe>

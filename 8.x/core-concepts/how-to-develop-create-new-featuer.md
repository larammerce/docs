## how to develop/create new featuer

[[toc]]


### Coupon your business for success
Coupons are a great way to offer discounts and rewards to your customers and can help promote sales across your shop.
This document refers to a feature called System Coupon Management

### What Is A Coupon Management System Exactly?

A coupon management system is a software platform that helps businesses create, distribute, and track the performance of their coupon campaigns. The system typically includes features for creating coupon codes, setting up rules for how those codes can be redeemed, and monitoring the usage and effectiveness of each coupon.

With a coupon management system, businesses can create and distribute coupons across a variety of channels, such as email, social media, and mobile apps. They can also set specific rules for how those coupons can be used, such as limiting the number of times a coupon can be redeemed per customer or setting an expiration date.

In addition to creating and distributing coupons, a coupon management system can also provide analytics and reporting features to help businesses track the performance of their campaigns. This includes data on how many coupons were redeemed, which channels were most effective for driving redemptions, and how much revenue was generated as a result of the campaign.

Overall, a coupon management system can help businesses run more effective and efficient coupon campaigns, leading to increased customer engagement, higher sales, and improved customer loyalty.



### What are the features of coupon management?

This feature explains that the administrator in the admin panel can create a coupon for each user with a desired price and expiration date.
The coupon is for that user and the user can use it while shopping, and it will be deducted from the invoice amount.

| Coupon feature       | Condition | type            |
|----------------------|-----------|-----------------|
| **id**               | not null  | Incremental     |
| **customer_user_id** | not null  | unsignedInteger |
| **amount**           | not null  | unsignedInteger |
| **created_at**       | datetime  | date time       |
| **updated_at**       | datetime  | date time       |
| **used_at**          | nullable  | null            |
| **title**            | not null  | String          |
| **expire_at**        | nullable  | null            |


### Create coupon management









```php
public function sth($request){
  $validator = new Validator([
    "name" => "required",
    "family" => "required|max:20",
    "phone_number" => "nullable|numeric|min:max:11"
  ]);
  $validator->validate($request->all());
  if($validator->fails()){
    return redirect()->back()->withData();
  }
  // logic-of-program
  $user = User::create($request->all());
  ...
}

```

In order to avoid the above mentioned problem, the `RuleMiddleware` class is defined in the `/path/to/larammerce-project/app/Http/Middleware/RuleMiddleware.php` file:

```php
<?php

namespace App\Http\Middleware;

use App\Utils\Common\MessageFactory;
use App\Utils\Common\RequestService;
use App\Utils\Reflection\Action;
use App\Utils\Reflection\AnnotationBadKeyException;
use App\Utils\Reflection\AnnotationBadScopeException;
use App\Utils\Reflection\AnnotationNotFoundException;
use App\Utils\Reflection\AnnotationSyntaxException;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use ReflectionException;

class RuleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     * @throws AnnotationBadKeyException
     * @throws AnnotationBadScopeException
     * @throws AnnotationSyntaxException
     * @throws ReflectionException
     */
    public function handle($request, Closure $next)
    {
        $method = Action::withRequest($request)->getMethod();
        try {
            $rules = $method->getAnnotation("rules")->getProperties();
            if (isset($rules["dynamic_rules"])) {
                $dynamicRules = $rules["dynamic_rules"];
                unset($rules["dynamic_rules"]);
                $rules = array_merge($rules, $dynamicRules);
            }
        } catch (AnnotationNotFoundException $e) {
            return $next($request);
        }

        $disabled_rules = explode(",", env("TEMPORARILY_DISABLED_RULES", ""));
        foreach ($disabled_rules as $disabled_rule) {
            if (key_exists($disabled_rule, $rules)) {
                unset($rules[$disabled_rule]);
            }
        }

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            if (RequestService::isRequestAjax($request)) {
                return response()->json(
                    MessageFactory::createWithValidationMessages(
                        $validator->messages()->toArray(),
                        400, [
                        "request_data" => $request->all()
                    ]), 400);
            } else {
                return redirect()->back()->withErrors($validator)->withInput();
            }
        }
        return $next($request);
    }
}
```

The `RuleMiddleware` class is declared in the `/path/to/larammerce-project/app/Http/Kernel.php` file:

```php{7}
<?php
...
class Kernel extends HttpKernel{
    ...
    protected $routeMiddleware = [
        ...
        'rule' => RuleMiddleware::class,
        ...
    ];
    ...
}
```

**NOTE:** The curious reader can refer to the Laravel documentation in order to study more about the Middlewares._<sup>[3](#3)</sup>_

The `RuleMiddleware` class has a method called `handle()` which receives two input parameters: `$request` and `Closure $next`:

```php
// /path/to/larammerce-project/app/Http/Middleware/RuleMiddleware.php

...
public function handle($request, Closure $next)
...
```

The `handle()` method receives the request and with `getMethod()` checks to which method this request wants to go:

```php
// /path/to/larammerce-project/app/Http/Middleware/RuleMiddleware.php

...
$method = Action::withRequest($request)->getMethod();
...
```

Suppose a `POST` request wants to go to the `/admin/article/` address. From the routes defined in `/path/to/larammerce-project/routes/web.php` file, the system recognizes the `store()` method in the `ArticleController.php` file as the destination of this request:

```php
// /path/to/larammerce-project/app/Http/Controllers/Admin/Api/ArticleController.php

...
    /**
     * @rules(directory_id="required|exists:directories,id", title="required", short_content="required",
     *     full_text="required", image="image|max:2048|dimensions:min_width=".get_image_min_width("blog").
     *     ",ratio=".get_image_ratio("blog"))
     * @role(super_user, seo_master, cms_manager)
     */
    public function store(Request $request)
    {
        $request->merge(["system_user_id" => get_system_user()?->id]);
        $article = Article::create($request->all());

        if ($request->hasFile('image'))
            $article->setImagePath();

        $directory = Directory::find($request->get('directory_id'));
        // attaching article recursively to all parent directories
        $article->attachFileTo($directory);
        $article->createReview();

        return redirect()->route('admin.article.index');
    }
...
```

Then `getAnnotation("rules")` returns the `@rules` annotation above the `store()` method:

```php
// /path/to/larammerce-project/app/Http/Middleware/RuleMiddleware.php

...
$rules = $method->getAnnotation("rules")->getProperties();
...

//output:
// directory_id="required|exists:directories,id", title="required", short_content="required",
// full_text="required", image="image|max:2048|dimensions:min_width=".get_image_min_width("blog").
// ",ratio=".get_image_ratio("blog")
```

If there is no `@rules` annotation above the `store()` method, `AnnotationNotFoundException` would permit to pass the request:

```php
// /path/to/larammerce-project/app/Http/Middleware/RuleMiddleware.php

...
catch (AnnotationNotFoundException $e) {
    return $next($request);
}
...
```

If `@rules` annotation exists above the `store()` method, the system checks whether the `dynamic_rules` is inside or not.

:::tip
Normally the `@rules` annotation checks the specified fields of the request, e.g. `name="required"` and `title="required|max:10"`. But with `dynamic_rules` you can change the rules based on the input request. For example, if the input request contains the `name` field, the `dynamic_rules` checks the `family` field, but if the input request contains the `title` field, the `dynamic_rules` checks the `description` field.
:::

If `@rules` annotation contains `dynamic_rules`, the system gets them as `$dynamicRules` and merge the arrays to make `$rules`:

```php
// /path/to/larammerce-project/app/Http/Middleware/RuleMiddleware.php

...
if (isset($rules["dynamic_rules"])) {
    $dynamicRules = $rules["dynamic_rules"];
    unset($rules["dynamic_rules"]);
    $rules = array_merge($rules, $dynamicRules);
}
...
```

If there are some `TEMPORARILY_DISABLED_RULES` into the `environmental variables`, the `handle()` method takes them out of the `$rules`:

```php
// /path/to/larammerce-project/app/Http/Middleware/RuleMiddleware.php

...
$disabled_rules = explode(",", env("TEMPORARILY_DISABLED_RULES", ""));
foreach ($disabled_rules as $disabled_rule) {
    if (key_exists($disabled_rule, $rules)) {
        unset($rules[$disabled_rule]);
    }
}
...
```

Finally if the validation of the request fails based on the `$rules`, the user will be redirected to display the error messages; Otherwise the request will be passed to the next view:

```php
// /path/to/larammerce-project/app/Http/Middleware/RuleMiddleware.php

...
$validator = Validator::make($request->all(), $rules);
if ($validator->fails()) {
    if (RequestService::isRequestAjax($request)) {
        return response()->json(
            MessageFactory::createWithValidationMessages(
                $validator->messages()->toArray(),
                400, [
                "request_data" => $request->all()
            ]), 400);
    } else {
        return redirect()->back()->withErrors($validator)->withInput();
    }
}
return $next($request);
...
```

**EXAMPLE**

Create `ValidationTestController.php` file in the `/path/to/larammerce-project/app/Http/Controllers/` directory and put the codes below inside:

```php
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Admin\BaseController;

class ValidationTestController extends BaseController{

    public function form(){
        return view("validation-test-form");
    }

    /**
     * @rules(name="required|max:8|min:5")
     */
    public function submit(){

    }

    public function getModel(){
        return null;
    }
}
```

Insert these codes in the `/path/to/larammerce-project/routes/web.php` file:

```php{5,6}
<?php

use ...

Route::get("/validation", [\App\Http\Controllers\ValidationTestController::class, "form"]);
Route::post("/validation", [\App\Http\Controllers\ValidationTestController::class, "submit"]);

Auth::routes();

...
```

Create `validation-test-form.blade.php` file in the `/path/to/larammerce-project/resources/views/` directory and put the codes below inside:

```php
<form method="POST">
    {{ csrf_field() }}

    @foreach($errors->getMessages() as $inputName => $messages)
        <ul input-name="{{$inputName}}">
            @foreach($messages as $message)
                <li>{{$message}}</li>
            @endforeach
        </ul>
    @endforeach

    <select name="type" id="type">
        <option value="1" @if(old("type") === "1") selected @endif>
            Type 1
        </option>
        <option value="2" @if(old("type") === "2") selected @endif>
            Type 2
        </option>
        <option value="none" @if(old("type") === "none") selected @endif>
            None
        </option>
    </select>
    <br>
    <input type="text" name="name" value="{{ old('name') }}">
    <br>
    <input type="submit" value="submit">
</form>
```

Run the Larammerce project on `localhost:8080/validation`.

Click on `submit` button:

```
//output:
// فیلد نام الزامی است
```

Write `abcd` into the `name` input:

```
//output:
// نام حداقل باید دارای ۵ کاراکتر باشد
```

Write `abcdefghi` into the `name` input:

```
//output:
// نام حداکثر می تواند دارای ۸ کاراکتر باشد
```

Write `abcdef` into the `name` input:

```
//output:
// passed
```

Now change the codes in `ValidationTestController.php` file to apply the `dynamic rules`:

```php{7,13-26}
<?php
...
class ValidationTestController extends BaseController{
    ...
    /**
     * @rules(name="required|max:8|min:5",
     *      dynamic_rules=App\Http\Controllers\ValidationTestController::submitDynamicRules(request()))
     */
    public function submit(){

    }
    ...
    public static function submitDynamicRules(Request $request){
        if($request->has("type")){
            if($request->get("type") === "1"){
                return[
                    "national_code" => "required|max:10"
                ];
            }else if($request->get("type") === "2"){
                return[
                    "zipcode" => "required|max:10"
                ];
            }
        }
        return [];
    }
}
```

Select `Type 1`:

```
//output:
// فیلد نام الزامی است
// فیلد کد ملی الزامی است
```

Select `Type 2`:

```
//output:
// فیلد نام الزامی است
// فیلد کد پستی الزامی است
```

Select `None`:

```
//output:
// فیلد نام الزامی است
```

#### References

_1. <a name="1">[Validation in the Laravel framework.](https://laravel.com/docs/8.x/validation)</a>_

_2. <a name="2">[Request lifecycle in the Laravel framework.](https://laravel.com/docs/8.x/lifecycle)</a>_

_3. <a name="3">[Middleware in the Laravel framework.](https://laravel.com/docs/8.x/middleware)</a>_

#### Video source

---

<iframe src="https://www.aparat.com/video/video/embed/videohash/Qva2P/vt/frame"  height="300" width="700" style="  border: 2px solid #bdc3c7; border-radius: 5px; opacity: 1;" allowFullScreen="true"></iframe>


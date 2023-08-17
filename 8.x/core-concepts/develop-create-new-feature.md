## Develop/Create new feature

[[toc]]


### What Is A Coupon Management System Exactly?

A coupon management system is a software platform that helps businesses create, distribute, and track the performance of their coupon campaigns. The system typically includes features for creating coupon codes, setting up rules for how those codes can be redeemed, and monitoring the usage and effectiveness of each coupon.

With a coupon management system, businesses can create and distribute coupons across a variety of channels, such as email, social media, and mobile apps. They can also set specific rules for how those coupons can be used, such as limiting the number of times a coupon can be redeemed per customer or setting an expiration date.

In addition to creating and distributing coupons, a coupon management system can also provide analytics and reporting features to help businesses track the performance of their campaigns. This includes data on how many coupons were redeemed, which channels were most effective for driving redemptions, and how much revenue was generated as a result of the campaign.

Overall, a coupon management system can help businesses run more effective and efficient coupon campaigns, leading to increased customer engagement, higher sales, and improved customer loyalty.



### What are the features of coupon management?

This feature explains that the administrator in the admin panel can create a coupon for each user with a desired price and expiration date.
The coupon is for that user and the user can use it while shopping, and it will be deducted from the invoice amount.

| Coupon feature       | Condition | type               |
|----------------------|-----------|--------------------|
| **id**               | not null  | Incremental        |
| **title**            | not null  | String             |
| **customer_user_id** | not null  | unsignedInteger    |
| **amount**           | not null  | unsignedBigInteger |
| **created_at**       | datetime  | date time          |
| **updated_at**       | datetime  | date time          |
| **used_at**          | nullable  | timestamp          |
| **expire_at**        | nullable  | timestamp          |


### Create coupon management

In this step, we need to create a Models named Coupon.

And define properties in `/larammerce-project/app/Models/Coupon.php`:

```php
<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property integer id
 * @property string title
 * @property integer customer_user_id
 * @property integer amount
 * @property Carbon used_at
 * @property integer invoice_id
 * @property Carbon expire_at
 * @property Carbon created_at
 * @property Carbon updated_at
 *
 * @property boolean is_used
 *
 * @property CustomerUser customer
 * @property Invoice invoice
 */

```

And in the ``CustomerUser.php`` file
Add this function:

```php
    public function coupons(): HasMany {
        return $this->hasMany(Coupon::class, "customer_user_id", "id");
    }
```

**NOTE:** This function has a one-to-many relationship. For example, a customer has a database relationship with several coupons.<sup>[1](#1)</sup>

The next step is to put the code in the ```/larammerce/config/cms/appliances.php``` file.
To create coupons in the section
Shop supplies:


```php
   [
       "properties" => [
       "id" => "coupon_management",
       "name" => "general.shop.coupons",
       "icon" => "icon-coupon",
       "route" => "admin.coupon.index"
      ]
   ],
```
Then create a controller file to write the coupon management system functions
And create the functions as follows:

```php
<?php
/**
 */

namespace App\Http\Controllers\Admin;

use App\Models\Coupon;
use App\Models\CustomerUser;
use App\Models\ProductFilter;
use App\Utils\CMS\SystemMessageService;
use App\Utils\Common\History;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * @package App\Http\Controllers\Admin
 * @role(enabled=true)
 */
class CouponController extends BaseController
{

    /**
     * @role(super_user, acc_manager)
     */
    public function index(): Factory|View|Application
    {
        parent::setPageAttribute();
        $coupons = Coupon::with('customer.user')->paginate(Coupon::getPaginationCount());
        return view('admin.pages.coupon.index', compact("coupons"));
    }

    /**
     * @role(super_user, acc_manager)
     */
    public function create(): Factory|View|Application
    {
        return view('admin.pages.coupon.create');
    }

    /**
     * @role(super_user, acc_manager)
     * @rules(title="required", expire_at="date", amount="required|integer", phone_number="required|exists:customer_users,main_phone")
     */
    public function store(Request $request): RedirectResponse
    {
        /** @var CustomerUser $customer_user */
        $customer_user = CustomerUser::where("main_phone", $request->get("phone_number"))->first();
        $request->merge([
            "customer_user_id" => $customer_user->id
        ]);
        $coupon = Coupon::create($request->all());
        SystemMessageService::addSuccessMessage("messages.coupon.created_successfully");
        return redirect()->route('admin.coupon.index');
    }

    /**
     * @role(super_user, acc_manager)
     */
    public function show(Coupon $coupon)
    {
        return "Not implemented yet.";
    }

    /**
     * @role(super_user, acc_manager)
     */
    public function edit(Coupon $coupon)
    {
        return view('admin.pages.coupon.edit', compact("coupon"));
    }

    /**
     * @role(super_user, acc_manager)
     * @rules(title="required")
     */
    public function update(Request $request, Coupon $coupon)
    {
        $coupon->update($request->all());
        SystemMessageService::addSuccessMessage("messages.coupon.updated_successfully");
        return History::redirectBack();
    }

    /**
     * @role(super_user, acc_manager)
     */
    public function destroy(Coupon $coupon)
    {
        $coupon->delete();
        return History::redirectBack();
    }

    public function getModel(): ?string
    {
        return Coupon::class;
    }
}
```


Then go to ``public/views/invoice-payment.blade.php`` file,
And put the following codes inside it:


```php
 ...
 * @property Coupon coupon
 ...
 
 public function coupon(): HasOne {
        return $this->hasOne(Coupon::class, 'invoice_id', "id");
    }
```


And go to the ``app/Http/Controllers/Customer/InvoiceController.php`` file,
And put the following codes inside it:


```php
 $invoice = InvoiceService::getTheNew();
        $coupon = isset($invoice->coupon_id) ? Coupon::find($invoice->coupon_id) : null;
        $invoice->payment_status = PaymentStatus::PENDING;
        $invoice->payment_type = $request->get("payment_type");
        $invoice->shipment_status = ShipmentStatus::WAITING_TO_CONFIRM;
        $invoice->is_active = false;
        $invoice->is_warned = false;
        $invoice->tracking_code = InvoiceService::createTrackingCode();
        $invoice->updateRows();
        $invoice->customPush();

        InvoiceService::forgetTheNew();
        InvoiceService::flush();

        $coupon->update(["invoice_id" => $invoice->id]);
        $invoice->updateRows();
```

```php
 public function checkCoupon(Request $request, Coupon $coupon) {
        $customer_user = get_customer_user();
        $invoice = InvoiceService::getTheNew();
        if ($coupon->customer_user_id !== $customer_user->id) {
            SystemMessageService::addErrorMessage("system_messages.coupon.not_owner");
            return response()->json(
                MessageFactory::create(["system_messages.invoice.coupon.not_owned_by_you"], 400, [])
                , 400);
        }

        if ($coupon->is_used) {
            return response()->json(
                MessageFactory::create(["system_messages.invoice.coupon.is_used"], 400, [])
                , 400);
        }

        $invoice->coupon_id = $coupon->id;
        InvoiceService::setNew($invoice);

        $discount_amount = $coupon->amount;

        return response()->json(
            MessageFactory::create(
                ["system_messages.invoice.discount_card_status.0"],
                200, [
                "discount_amount" => $discount_amount,
                "invoice_sum" => ($invoice->sum - $discount_amount)
            ]), 200);
    }
```

And you need to create coupon system routes.

```php
   //Private customer routes
    Route::post("check-coupon/{coupon}", ["as" => "check-coupon", "uses" => "InvoiceController@checkCoupon"]);
 
    Route::group(["prefix" => "coupon", "as" => "coupon."],
            function () {
                Route::get("/", ["as" => "index", "uses" => "CouponController@index"]);
            });
            
  //Coupon
        Route::group(["prefix" => "coupon", "as" => "admin.coupon."],
            function () {
            }
        );
        Route::resource("coupon", "CouponController", ["as" => "admin"]);
```


At this stage, you should focus on the structure of the blade and create the blade files and design its theme
To create the theme file, go to ``/larammerce-project/resources/views/admin/pages``
Go and create a directory named ``coupon`` and create the theme in this directory.

```
|---coupon/
     |---layout/
          |---list.blade.php   
    |---create.blade.php
    |---edit.blade.php
    |---index.blade.php
```


First, in the ``coupon/layout/list.blade.php`` file
To display the list of coupons
Put the following codes inside it:

```html
@foreach($coupons as $coupon)
    <div
            class="col-lg-offset-1 col-lg-10 col-md-offset-0 col-md-12 col-sm-offset-0 col-sm-12 col-xs-offset-0 col-xs-12 list-row roles">
        <div class="col-lg-1 col-md-1 col-sm-2 col-xs-6 col">
            <div class="label">شناسه</div>
            <div>{{$coupon->id}}#</div>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-4 col-xs-6 col">
            <div class="label">عنوان</div>
            <div>{{$coupon->title}} - ({{$coupon->customer->user->full_name}})</div>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6 col">
            <div class="label">مبلغ</div>
            <div class="price-data">{{$coupon->amount}}</div>
        </div>
        <div class="col-lg-1 col-md-1 col-sm-4 col-xs-6 col">
            <div class="label">تاریخ استفاده</div>
            @if($coupon->is_used)
                <div>{{JDate::forge($coupon->used_at)->format("%Y/%m/%d %H:i")}}</div>
            @else
                <div>-</div>
            @endif
        </div>
        <div class="col-lg-1 col-md-1 col-sm-4 col-xs-6 col">
            <div class="label">تاریخ اتقضا</div>
            <div>{{JDate::forge($coupon->expire_at)->format("%Y/%m/%d %H:i")}}</div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 col">
            <div class="label">عملیات</div>
            <div class="actions-container">
                <a class="btn btn-sm btn-primary" href="{{route('admin.coupon.edit', $coupon)}}">
                    <i class="fa fa-pencil"></i>
                </a>
                <a class="btn btn-sm btn-danger virt-form"
                   data-action="{{ route('admin.coupon.destroy', $coupon) }}"
                   data-method="DELETE" confirm>
                    <i class="fa fa-trash"></i>
                </a>
                <a class="btn btn-sm btn-success" href="{{route('admin.coupon.show', $coupon)}}">
                    <i class="fa fa-eye"></i>
                </a>
            </div>
        </div>
    </div>
@endforeach
```

Enter the following codes on the index page:

```html
@extends('admin.layout')

@section('bread_crumb')
    <li><a href="{{route('admin.coupon.index')}}">کوپن ها</a></li>
    <li class="active"><a href="{{route('admin.coupon.index')}}">لیست کوپن ها</a></li>

@endsection

@section('main_content')
    <div class="inner-container">
        <div class="toolbar">
            <ul>
                @foreach(SortService::getSortableFields('Coupon') as $sortable_field)
                    <li class="btn btn-default {{$sortable_field->is_active ? "active" : ""}}"
                        href="{{route('admin.null')}}?sort_model=Coupon&sort_field={{$sortable_field->field}}&sort_method={{$sortable_field->method}}"
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
                @include('admin.pages.coupon.layout.list')
            </div>
            <div class="fab-container">
                @include('admin.templates.buttons.fab-buttons', ['buttons' => ['create', 'download']])
            </div>
        </div>
        @include('admin.templates.pagination', [
            "modelName" => "Coupon",
            "lastPage" => $coupons->lastPage(),
            "total" => $coupons->total(),
            "count" => $coupons->perPage(),
            "parentId" => $scope ?? null
        ])
    </div>
@endsection
```


And created on the page,
To create a coupon
put the following codes inside it:


```html
@section('form_attributes') action="{{route('admin.coupon.store')}}" method="POST" enctype="multipart/form-data"  @endsection

@section('form_body')
    <div class="input-group group-sm col-lg-12 col-sm-12 col-md-12 col-xs-12">
        <span class="label">عنوان</span>
        <input class="form-control input-sm" name="title" value="{{old('title')}}">
    </div>
    <div class="input-group group-sm col-lg-12 col-sm-12 col-md-12 col-xs-12">
        <span class="label">مبلغ</span>
        <input class="form-control input-sm" act="price" type="text" name="amount" value="{{old('amount')}}">
    </div>
    <div class="input-group group-sm col-lg-12 col-sm-12 col-md-12 col-xs-12">
        <span class="label">تاریخ انقضا</span>
        <input class="form-control input-sm" name="expire_at_datepicker" data-name="expire_at" value="{{old("expire_at")}}">
        <input type="hidden" name="expire_at">
    </div>
    <div class="input-group group-sm col-lg-12 col-sm-12 col-md-12 col-xs-12">
        <span class="label">شماره تماس کاربر</span>
        <input class="form-control input-sm" type="text" name="phone_number" value="{{old('phone_number')}}">
    </div>


@endsection

@section('form_footer')
    <button type="submit" class="btn btn-default btn-sm">ذخیره</button>
```


And on the edit page,
To edit the coupon
Put the following codes inside it:

```html
@section('form_body')
    {{ method_field('PUT') }}
    <div class="input-group group-sm col-lg-12 col-sm-12 col-md-12 col-xs-12">
        <span class="label">عنوان</span>
        <input class="form-control input-sm" name="title" value="{{old('title', $coupon->title)}}">
    </div>
    <div class="input-group group-sm col-lg-12 col-sm-12 col-md-12 col-xs-12">
        <span class="label">مبلغ</span>
        <input class="form-control input-sm" act="price" type="text" name="amount" value="{{old('amount', $coupon->amount)}}">
    </div>
    <div class="input-group group-sm col-lg-12 col-sm-12 col-md-12 col-xs-12">
        <span class="label">تاریخ انقضا</span>
        <input class="form-control input-sm" name="expire_at_datepicker" data-name="expire_at" value="{{old("expire_at", $coupon->expire_at->format("Y-m-d H:i:s"))}}">
        <input type="hidden" name="expire_at">
    </div>
    <div class="input-group group-sm col-lg-12 col-sm-12 col-md-12 col-xs-12">
        <span class="label">شماره تماس کاربر</span>
        <input class="form-control input-sm" type="text" name="phone_number" value="{{old('phone_number', $coupon->customer->main_phone)}}">
    </div>

@endsection
```

::: tip Change data time
To set the time of the desired data<sup>[2](#2)</sup>, you must specify it in the ``format`` section like the code below:


```php
    $coupon->expire_at->format("Y-m-d H:i:s"))}}
```

:::


After designing the theme, go to the source ``/larammerce-project/resources/lang/fa/general.php`` file, Enter the translation in the ``shop`` section like the code below:

```php
   "coupons" => "کوپن ها"
```


And then go to the ``/larammerce-project/resources/lang/fa/structures.php`` file,
And translate like the code below:


```php
   //attributes 
   'expire_at' => 'تاریخ انقضا',
   'used_at' => 'تاریخ استفاده'
   //classes
   'coupon' => 'کوپن ها'
```


And in the  ``/larammerce-project/resources/lang/fa/messages.php`` file,
create a section called Coupon and translate it like the following code:


```php
  "coupon" => [
    "created_successfully" => "کوپن مورد نظر شما با موفقیت ایجاد گردید، در صورت تمایل آن را ویرایش نمایید.",
    "updated_successfully" => "کوپن مورد نظر شما با موفقیت ویرایش گردید."
    ]
```


And go to the ``resources/lang/fa/system_messages.php`` file, And put the following codes inside it:


```php
 'coupon' => [
      "not_owned_by_you" => "این کوپن متعلق به شما نیست.",
      "is_used" => "این کوپن قبلا استفاده شده است."
      ],
```

At this stage, you should create a helper so that if someone wants to design a theme, they can use your helpers.
To create a helper, you need to go to the file ``app/Utils/CMS/Template/helpers.php`` and create the helper like the code below:


```php
if (!function_exists("get_not_used_coupons")) {
    function get_not_used_coupons($guard = null): array|Collection {
        $customer_user = get_customer_user($guard);
        return \App\Services\Coupon\CouponService::getNotUsedCoupons($customer_user);
    }
}
```


And then you need to create a ``service`` file at, ``app/Services/Coupon/CouponService.php`` To write queries,
And enter it like the code below:


```php
<?php

namespace App\Services\Coupon;

use App\Models\Coupon;
use App\Models\CustomerUser;
use Illuminate\Support\Collection;

class CouponService {

    /**
     * @param CustomerUser $customer_user
     * @return Collection|Coupon[]
     */
    public static function getNotUsedCoupons(CustomerUser $customer_user): Collection|array {
        return $customer_user->coupons()->where("used_at", null)
            ->get();
    }
}
```


And then you need to create a controller file in, ``app/Http/Controllers/Customer/CouponController.php``
And enter the following code:


```php
<?php

namespace App\Http\Controllers\Customer;

class CouponController extends BaseController {
    public function index() {
        return h_view('public.coupons',
            [
                "coupons" => get_customer_user()->coupons()->orderBy("used_at", "desc")->get()
            ]);
    }
}
```

After finishing, you should enter the ``Larammerce_base_theme`` project and design the coupon management theme.

:::warning Install Larammerce_base_theme
If you do not have the Larammerce_base_theme project installed, with the help of the [5minute quick start](https://docs.larammerce.com/8.x/theme-development/#_5-minute-quick-start)page
Install and run it.
:::

First, in the ``public/views/base.blade.php`` file,
Create the coupon design like the code below:


```html
  <li>
     <a href="{{route('customer.coupon.index')}}" title="لیست کوپن ها">لیست
       کوپن ها</a>
  </li>
```

Then you need to create a file called ``coupons.blade.php`` and design the coupon theme in it like the code below:

```php
@extends('_base')

@section('title')
    لیست کوپنهای سیستمی
@endsection

@section('main_content')
    <script>window.currentPage = "favorites"</script>
    <div class="container-fluid favorites" id="favorites">

        <div class="section-title">کوپن ها</div>

        <div class="row">
            @foreach($coupons as $coupon)
                <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <div class="card">
                        <h4>{{$coupon->title}}</h4>
                        <p><span class="price-data">{{$coupon->amount}}</span> ریال</p>
                        <p>
                        @if($coupon->is_used)
                            استفاده شده در تاریخ {{JDate::forge($coupon->used_at)->format("%Y/%m/%d")}}
                        @else
                            استفاده نشده، قابل استفاده تا تاریخ {{JDate::forge($coupon->expire_at)->format("%Y/%m/%d")}}
                        @endif
                        </p>
                        <p></p>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
@endsection
```

In the next step, you need to add the coupon on the product payment page.
Go to ``public/views/invoice-payment.blade.php`` file,
And put the following codes inside it:


```php
 <div class="sum-price-coupon" id="coupon-row">
                    <div class="coupon-form">
                        <select type="text" class="form-control" name="coupon_id">
                            @foreach(get_not_used_coupons() as $coupon)
                                <option value="{{$coupon->id}}" >
                                    {{$coupon->title}} - (قابل استفاده تا {{JDate::forge($coupon->expire_at)->format("%Y/%m/%d")}})
                                </option>
                            @endforeach
                        </select>
                        <a href="#" class="btn submit" title="اعمال تخفیف">اعمال کوپن</a>
                        <div class="notes danger-discount">
                            <div class="ttl"></div>
                        </div>
                    </div>
                    <div class="coupon-details coupon">
                        <span>مبلغ کاسته شده از سفارش </span>
                        <span class="double-point">: </span>
                        <span class="text"> تومان</span>
                        <span class="price-data">0</span>
                    </div>

                </div>
```

In this step, the JavaScript code of the coupon must be created,
Go to the ``resources/assets/js/require/page_invoice_payment.js`` file,

And put the following codes inside it:


```javascript
 const couponRow = jQuery('#coupon-row');
        const couponSelect = couponRow.find('.coupon-form select[name="coupon_id"]');
        const couponSubmitButton = couponRow.find('.coupon-form a.btn.submit');
        
couponSubmitButton.on('click', function (_event) {
    _event.preventDefault();
    _event.stopPropagation();

    if (couponSelect.val() === '')
        return false;

    jQuery.ajax({
        url: `/customer/invoice/check-coupon/${couponSelect.val()}`,
        method: 'POST',
        data: {
            _token: window.csrfToken,
        }
    }).done(function (_result) {
        let messages = _result.transmission.messages;
        if (messages.length > 0) {
            noteContainer.removeClass('danger-discount');
            noteContainer.addClass('success-discount');
            noteContainer.find('div.ttl').text(messages[0]);
            LocalCartService.setCouponAmount((_result.data.discount_amount / 10));
        }

    }).fail(function (_result) {
        let messages = _result.responseJSON.transmission.messages;
        if (messages.length > 0) {
            noteContainer.removeClass('success-discount');
            noteContainer.addClass('danger-discount');
            noteContainer.find('div.ttl').text(messages[0]);
        }
    });

    return false;
});
```

Then go to the ``resources/assets/js/define/local_cart_service.js`` file,
And put the following codes inside it:

```javascript
   let couponAmount = 0;
    const couponAmountContainer = jQuery('.invoice-sum-container .coupon .price-data');


beforeDiscountPriceContainer.text(`${finalPriceBeforeDiscount}`);
taxPriceContainer.text(`${parseInt((finalPriceAfterDiscount - (extraDiscountAmount + couponAmount)) * 0.09)}`);
if (window.currentPage === "product-list")
    afterDiscountPriceContainer.text(`${parseInt(finalPriceAfterDiscount - (extraDiscountAmount + couponAmount))}`);
else
    afterDiscountPriceContainer.text(`${parseInt((finalPriceAfterDiscount - (extraDiscountAmount + couponAmount)) * 1.09)}`);
discountPriceContainer.text(`${parseInt(finalPriceBeforeDiscount - finalPriceAfterDiscount + extraDiscountAmount)}`);
couponAmountContainer.text(`${parseInt(couponAmount)}`);


setCouponAmount : function(amount) {
    couponAmount = amount;
    LocalCartService.calculateInvoice();
}
```

Now you have managed to create and use a new feature called coupon management.
#### References

_1. <a name="1">[
What is the one-to-many relationship? ](https://laravel.com/docs/8.x/eloquent-relationships#one-to-many)</a>_

_2. <a name="2">[
What are php time data types? ](https://www.php.net/manual/en/datetime.format.php)</a>_
#### Video source

---


<iframe src="https://www.aparat.com/video/video/embed/videohash/lscVX/vt/frame"  height="300" width="700" style="  border: 2px solid #bdc3c7; border-radius: 5px; opacity: 1;" allowFullScreen="true"></iframe>
<iframe src="https://www.aparat.com/video/video/embed/videohash/ZPiEz/vt/frame"  height="300" width="700" style="  border: 2px solid #bdc3c7; border-radius: 5px; opacity: 1;" allowFullScreen="true"></iframe>



## Template engine basics

[[toc]]

In this tutorial, the basics of the Larammerce Template Engine will be explained. As you know, Larammerce is based on Laravel, and if you check a Larammerce template, you see that Larammerce blade files are the same as Laravel blade files. On the previous page, you learned about the templating system in a nutshell, so if you wanna know more about the system and dive deeper, please continue reading this page and other listed documents in the templating system index.

This document covers the rules and main development concepts of the templating system in Larammerce.

`.blade.php` files are in the following directory `public/views/example.blade.php`.

There are three types of blade files in the template engine as shown below:

```
|---views/
    |---_base.blade.php
    |---_cart-no-active-modal.blade.php
    |---_comparison_item.blade.php
    |---_customers.blade.php
```
```
|---views/
    |---about.blade.php
    |---address-add.blade.php
    |---address-edit.blade.php
    |---auth-email-check.blade.php
```

1- File name starts with underscore (partial files)

2- File name does not start with underscore

NOTE: A partial blade file is a part of a template view that is reusable but can not be used directory, These partial files are the same as partial files in the SCSS lang. It's an easy way to make a part of a template reusable and make the debug process faster.

For example, Using the following piece of code tells the blade template engine to use the **_base.blade.php** file as the current page's layout.
```php
@extends('_base') # Write this code in the about.blade.php file.
```
And to use the  **_meta_tags.blade.php** page on other pages using the following code:
```php
@section('meta_tags')
    @include('_meta_tags', ['obj' => $web_page])
    <meta property="og:type" content="website">
@endsection # Write this code in the index.blade.php file.
```
So to create a layout that extends to all pages, put an underscore at the beginning of the page's name.

3- The end of the file name is **_mobile** or **_app**.

```
|---views/
    |---index_mobile.blade.php
    |---index.blade.php
```

As you know, responsive web design works through CSS, using various settings to different style properties depending on the screen size of the user’s device. Sometimes the design structure of pages on mobile and desktop is different, so create a file with the **_mobile** extension to be displayed on mobile pages with this structure. And for mobile applications, the system provides **_app** pages.

Blade pages are reviewed below. 

## Required blade files
Some files are needed by the system and you have to place them in your project, As below:

**Adress page, Auth page, Blog page, Cart page, Error page, Invoice page, Mail page, Order page, Profile page, Sms page, Product page**.

And other files are not necessary and you can add them on demand in the template, As below:
**About page, Buy guide page, Contact page, Faq page, Index page, Privacy page, Register page, Rules page, Shipping page, Privacy page, Support page, Wish list page, Unreachable page**.

## Address page
```
|---views/
    |---address-add.blade.php
    |---address-edit.blade.php
    |---address-add.blade.php
    |---address-edit.blade.php
```
In these pages, there is a form with post method and inputs: state_id, city_id, superscription, phone_number, zipcode, transferee_name. And be sure to add  **csrf_field** inside the form.

These inputs are required and if one of the inputs is not filled, there is an error when sending to the **customer.address.store** rout. Form information should not be changed if the form design is changed.

## Auth page
```
|---views/
    |---auth-email-check.blade.php
    |---auth-email-register.blade.php
    |---auth-email-show.blade.php
    |---auth-mobile-check.blade.php
    |---auth-mobile-password.blade.php
    |---auth-mobile-register.blade.php
    |---auth-mobile-show.blade.php
```
To authenticate in the system:

First, enter the phone number or email in the **auth-mobile-show.blade.php** or **auth-email-show.blade.php** page.

If a member of the system and the password is set, the **auth-mobile-password.blade.php** page is displayed. And if the password is not set, entering the one-time code in the **auth-mobile-check.blade.php** or **auth-email-check.blade.php** page.

If not a member of the system, entering the one-time code in the **auth-mobile-check.blade.php** or **auth-email-check.blade.php** page. and enter the **auth-email-register.blade.php** or **auth-mobile-register.blade.php** page.

Let's check the authentication files:

1- **auth-mobile-show.blade.php**

In this page, there is an input with **type ="mobile"** and **name ="mobile"** that this email will be sent to the backend with the **customer-auth.do-mobile-auth** route. 

2- **auth-mobile-check.blade.php**

There is an input, enter the one-time code to send to the server.

3- **auth-mobile-password.blade.php**

There is an input with name = "password"  enter the password and then login.

4- **auth-mobile-register.blade.php**

In this page, there is a form with post method and inputs: name, family, email, phone, main_phone, national_code. And be sure to add csrf_field inside the form.

These pages must be created and the inputs inside the pages are mandatory and should not be changed. Only the design of the pages can be changed.If there are changes in the structure of ecommerce, it will be announced in the documents of the next version.

## Blog page
```
|---views/
    |---blog-list.blade.php
    |---blog-single.blade.php
```

On each page of the blog list there is a series of categories after entering one of the them, passing the $article variable from the controller to blade. Then with foreach display these article features: image, title, create_at, short_content.

All system features that can be displayed have a URL. If the URL of a feature was required, for example, the product or article, should be called the **getFrontUrl()** function.

Go to the article model and see the properties of this object. It can display these properties on the pages of the article.
```php
  @property integer id
  @property integer directory_id
  @property integer system_user_id
  @property string title
  @property string short_content
  @property string full_text
  @property string source
  @property string image_path
  @property DateTime created_at
  @property DateTime updated_at
  @property float average_rating
  @property int rates_count
  @property int content_type
  @property mixed seo_description
  @property mixed seo_keywords
  @property boolean is_suggested
```
**blog-single.blade.php** page is optional.

On this page, the **$article** variable is passed from the controller to the blade, and the content of the article can be displayed using this variable.

## Cart page
```
|---views/   
    |---cart_mobile.blade
    |---cart.blade.php
```

On this page, the $cartRows variable is passed from the controller to the blade and product content can be displayed with **foreach**.

**$CartRow** variable properties can be viewed below:
```php
  @property integer $id
  @property integer customer_user_id
  @property integer product_id
  @property integer count
  @property integer cmi_id
  @property DateTime created_at
  @property DateTime updated_at
  @property DateTime customer_notified_at
  @property DateTime customer_viewed_at
  @property Product product
  @property CustomerUser customer
  @property CustomerMetaItem customerMetaItem
```
## Error page
```
|---views/  
    |---error.blade.php
```
On this page, if the system has any errors, such as 500 or 404 with the **$code** variable, can be displayed that error.

## Invoice page
```
|---views/
    |---invoice-checkout-pdf.blade.php
    |---invoice-checkout.blade.php
    |---invoice-payment_mobile.blade.php
    |---invoice-payment.blade.php
    |---invoice-shipment_mobile.blade.php
    |---invoice-shipment.blade.php
```

After the shopping cart step, enter the **invoice-shipment.blade.php** page, add the address and choose the method of sending the product and you can see the name of the person for whom the invoice is created. then enter the **invoice-payment.blade.php** page. and you can see an overview of the products added to the shopping cart. After confirmation, you will enter the payment portal. Finally, you can see the final invoice on the **invoice-checkout.blade.php** page. Each file will be reviewed in separate documents.

## Mail page
```
|---views/
    |---mail-auth-code.blade.php
    |---mail-email-confirmation.blade.php
    |---mail-product-make-disable.blade.php
    |---mail-product-make-enable.blade.php
```
These pages are related to emails and can be edited without changing their structure.

Let's check the mail files:

1- **mail-auth-code.blade.php** To send a one-time code.

2- **mail-email-confirmation.blade.php**  To confirm the email account. 

3- **mail-product-make-disable.blade.php** Missing product will be notified to the admin.

4- **mail-product-make-enable.blade.php** Available products will be notified to the admin.


## Order page
```
|---views/
    |---orders.blade.php
```
On this page, you can see a list of previous orders.
With the **get_invoices** helper function, the list of invoices can be received and displayed to the customer with **foreach**.

## Payment-redirection page
```
|---views/
    |---payment-redirection.blade.php
```
This page is displayed when the customer wants to be redirected to a payment gateway page. And can be customized for any payment gateway.

The user does not do anything on this page. There is no action or button. The transfer to the payment gateway is done by the system script.
## Product page
```
|---views/
    |---product-compare.blade.php
    |---product-filter_mobile.blade.php
    |---product-filter-seo.blade.php
    |---product-filter.blade.php
    |---product-landing.blade.php
    |---product-list.blade.php
    |---product-single_mobile.blade.php
    |---product-single.blade.php
    |---product.blade.php
```

**product-single.blade.php** page to display a single product, **$product** variable is passed from the controller to the blade.The product variable is the most important variable in this system. It has features that will be explored later.

## Profile page
```
|---views/
    |---profile-edit.blade.php
    |---profile.blade.php
```
Customers are redirected to the profile page with the **customer.profile.index** rout to display the profile. This page displays the customer information, and it is possible to edit this information.

In **profile-edit.blade.php** page there is a form with **customer.profile.update** action, post method and inputs: name, family, email, national_code, phone, birth-date, gender. And be sure to add  **csrf_field** inside the form.

## Sms page
```
|---views/
    |---sms-auth-code.blade.php
    |---sms-discount-percent.blade.php
    |---sms-discount-toman.blade.php
    |---sms-invoice-delivered.blade.php
    |---sms-invoice-disabled.blade.php
    |---sms-invoice-exit-tab.blade.php
    |---sms-invoice-sending.blade.php
    |---sms-invoice-submitted.blade.php
    |---sms-need-list-available.blade.php
```
These blades can be used if a full text message is sent with the SMS driver.

Let's check the sms files:

1- **sms-auth-code.blade.php** To send a one-time code to the customer.

2- **sms-discount-percent.blade.php** To send a discount percentage to the customer.

3- **sms-invoice-delivered.blade.php** To inform that the order has been delivered.

4- **sms-invoice-disabled.blade.php** To inform that the invoice has been deactivated and then activate the invoice and pay.

5- **sms-invoice-exit-tab.blade.php** To inform that the exit form has been issued.

6- **sms-invoice-sending.blade.php** To inform that the product has been sent.

7- **sms-invoice-submitted.blade.php** To inform that the product registration in the system and the invoice that must be paid.

8- **sms-need-list-available.blade.php** To inform the customer that a product is available.

## Wish list page
```
|---views/
    |---wish-list.blade.php
```
On this page you can see the list of products that have been added to favorites.

## Unreachable page
```
|---views/
    |---unreachable.blade.php
```
This page can be shown to the customer when the site is unavailable.
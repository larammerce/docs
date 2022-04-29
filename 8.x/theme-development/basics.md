## Template engine basics

[[toc]]

In this tutorial, the basics of the Larammerce Template Engine will be explained. As you know, Larammerce is based on Laravel, and if you check a Larammerce template, you see that Larammerce blade files are the same as Laravel blade files. In the previous tutorial, a blade page was created, but in this tutorial, the general rules will be explained and then the template will be developed.

.blade.php files are in the following directory `public/views/example.blade.php`.

There are three types of blad files in this template engine.

![blade-files](/blade-files-1-2.png)

1- File name starts with underscore (partial files)

2- File name does not start with underscore

NOTE: A blade partial is similar to include or require in PHP. It’s an easy way to include contents of another file inside of a template.

For example,  using the following commands extends the **_base.blade.php** page to other pages:
```php
@extends('_base') # Write this command in the about.blade.php file.
```
And to use the  **_meta_tags.blade.php** page on other pages using the following commands:
```php
@section('meta_tags')
    @include('_meta_tags', ['obj' => $web_page])
    <meta property="og:type" content="website">
@endsection # Write this command in the index.blade.php file.
```
So to create a layout that extends to all pages, put an underscore at the beginning of the page's name.

3- The end of the file name is **_mobile** or **_app**.

![blade-file-3](/blade-file-3.png)

As you know, responsive web design works through CSS, using various settings to different style properties depending on the screen size of the user’s device. Sometimes the design structure of pages on mobile and desktop is different, so create a file with the **_mobile** extension to be displayed on mobile pages with this structure. And for mobile applications, the system provides **_app** pages.

Blade pages are reviewed below. Some pages are required and should be in the template, but some pages are optional.

## About page
![about](/about.png)

This page is optional and you can create this page if needed on the project.

## Address page
![address](/address.png)

These pages must be created and In these pages, there is a form with post method and inputs: state_id, city_id, superscription, phone_number, zipcode, transferee_name. And be sure to add  **csrf_field** inside the form.

These inputs are required and if one of the inputs is not filled, there is an error when sending to the **customer.address.store** rout. Form information should not be changed if the form design is changed.

## Auth page
![auth](/auth.png)

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
![blog](/blog.png)

**blog-list.blade.php** page is required and must be created.

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

## Buy gide page
![buy](/buy.png)

This page is optional and you can create this page if needed on the project.

## Cart page
![cart](/cart.png) 

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

## Cantact page
![contact](/contact.png)

This page is optional and you can create this page if needed on the project.

## Error page
![error](/error.png)

On this page, if the system has any errors, such as 500 or 404 with the **$code** variable, can be displayed that error.

## Faq page
![faq](/faq.png)

This page is optional and you can create this page if needed on the project.

## Index page
![index](/index.png)

This page is optional and you can create this page if needed on the project.

## Invoice page
![invoice](/invoice.png)

After the shopping cart step, enter the **invoice-shipment.blade.php** page, add the address and choose the method of sending the product and you can see the name of the person for whom the invoice is created. then enter the **invoice-payment.blade.php** page. and you can see an overview of the products added to the shopping cart. After confirmation, you will enter the payment portal. Finally, you can see the final invoice on the **invoice-checkout.blade.php** page. Each file will be reviewed in separate documents

## Mail page
![mail](/mail.png)

## Orders page
![orders](/orders.png)

## Product page
![product](/product.png)

## Profile page
![profile](/profile.png)

## Rules page
![rules](/rules.png)

## Shipping page
![shipping](/shipping.png)

## Sms page
![sms](/sms.png)

## Support page
![support](/support.png)

## Wish list page
![wish-list](/wish-list.png)
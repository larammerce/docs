## Product limitation

[[toc]]

In e-commerce platforms, it is sometimes necessary to restrict the shipping of certain products to specific locations for various reasons. For example, perishable items may spoil during transportation or some products may break in transit. To implement such restrictions, follow these steps:

### Admin panel setting

The first step is to access the admin panel and adjust the necessary settings. Follow these steps to implement the shipping limitations:

1. Visit the admin panel by navigating to `localhost:8080/admin/`.
2. Locate the `/directory` endpoint and find your desired category.
3. Right-click the category folder and select the `edit` option.
4. On the resulting form, click the `determining geographical limit` button located on the left-hand side.
5. Click the plus button situated at the bottom-left corner of the page.
6. Complete the new form by selecting the desired province and city that apply to this category's shipping limitations.

:::tip Managing Shipping Restrictions: A Guide

**Note 1:** You are free to add as many shipping limitations as necessary in the admin panel.

**Note 2:** When you apply a limit to a directory, its sub-directories will inherit this limit. However, the parent directories above the directory in question will not be affected by this limit.

:::

Once this limitation is in place, if a user chooses a product from the category and the intended geographical limit is exceeded, an error message will be displayed on the screen after they click the "Continue Shopping" button on the cart page.


### Developing the theme 

Suppose you want to display this error message directly on the cart list instead of waiting for the user to click the "Continue Shopping" button. How can we develop this product feature together?

Three properties relate to product location limitations has been added to the product model:

```php
// larammerce/app/Models/Product.php

@property CustomerLocationModel[] location_limitations // Determines whether the product you have selected can be delivered to your intended location or not. This property is an array containing at least one object, each with properties "state" and "city".
@property bool is_location_limited // Checks whether the product you have chosen has any location limitations or not.
@property bool can_deliver // Determines whether the product you have selected can be delivered to your intended location or not.

```


### Designing the theme

Suppose you want to provide better information to users about location limitations by adding an error message on the cart page for products that have such limits. You can easily accomplish this using the three properties we discussed in the previous section.

To implement this feature, navigate to the `public/views/cart.blade.php` file and locate the product div. Then, add the following code wherever you like. In this example, we added the error section under the product ID:

```html
<!-- larammerce-base-theme/public/views/cart.blade.php -->

<div class="col-lg-8 col-md-8 col-sm-7 col-xs-7">
    ...
    <p class="code">KIT: <span>{{cartRow->product->code}}</span><p>

    @if(!$cartRow->product->can_deliver)
    <p class="notice"> Unfortunately, the desired product cannot be sent to your address.</p>
    @endif
    ...
```

Now run this command to see the result:
```bash
./deploy.sh
```
As a result of implementing the `can_deliver`, `is_location_limited`, and `location_limitations` properties, any items that cannot be delivered based on the user's location will display an error message under their ID on the cart page.

### Creating ribbon on products

To demonstrate this limitation, it is possible to display it on the product listing page. 
Here are the steps to follow: 

1. In the admin panel, navigate to the directory where you previously set the limitations. 
2. Once there, locate the `Larammerce-base-theme/public/views/_underscore_templates.blade.php` file and proceed to the `product box` section. 
3. Create a ribbon that will inform the user about the product limitation.


```html
// larammerce-base-theme/public/views/_underscore_templates.blade.php
<% if(product.can_deliver) { %>
    <div class="ribbon-delivery hidden-xs"> 
     Only 
     <%- product.location_limitations[0].state.name %>,
     <%- product.location_limitations[0].city.name %>

    <i class="fa fa-times"></i>
    </div>
<% } %>
```
Lines 5 and 6 represent the location limitation list.

- Now design the ribbon class:

```stylus
// Larammerce-base-theme/resources/assets/sass/part-product.scss

.ribbon-delivery{
    position: absolute;
    top: 40px;
    right: 15px;
    background: $error-color-1;  // this variable is defined on variable.scss file
    font-size: 11px;
    color: #fff;
    padding: 0 10px;
    line-height: 20px;
    @include border-radius(10px);
    z-index: 2;
}
```

Now run:
```bash
./deploy.sh
```

It is possible to add multiple ribbons as needed by repeating the steps outlined above and updating the message and class accordingly.
Create a new ribbon with a message that indicates the fast delivery option is available for the product. Use the `is_location_limited` property to limit the display of this ribbon to only applicable products.

```html
<!-- larammerce-base-theme/public/views/_underscore_templates.blade.php !-->

<% if(product.is_location_limited) { %>
    <div class="ribbon-right hidden-xs"> 
    <i class="fa fa-truck"></i>
    </div>
<% } %>
```
- Now design the ribbon class:

```stylus
// Larammerce-base-theme/resources/assets/sass/part-product.scss

.ribbon-right{
    position: absolute;
    top: 15px;
    right: px;
    background: $success-color-1;  
    font-size: 11px;
    color: #fff;
    padding: 0 10px;
    line-height: 20px;
    @include border-radius(10px);
    z-index: 2;
}
```
Now run:
```bash
./deploy.sh
```

### Add User location to the header

To add a user location section to the header tab, you can follow these steps: 

1. Navigate to the `Larammerce-base-theme/public/views/_base.blade.php` file.
2. Locate the appropriate section in the header where you would like to add the user location information.
3. Create a conditional `li` tag that will only be displayed if the user has provided their location. This tag should display the user's location information once it is available.


```html
@if(config("cms.general.site.enable_directory_location"))
    <li class="location-link">
        <a data-toggle="modal"
           data-target="{{is_customer() ? '#addresses-modal' : '#location-modal' }}">
           <i class="icon-placeholder"></i>
           <span class="hidden-sm hidden-xs">{{get_current_customer_location_title()}}></span>
        </a>
    </li>
@endif
```
Once a user has selected a location on their system, the location section will be displayed in the header tab.

#### Video source
___

<div style="position:relative; padding-bottom:56.25%; padding-top:0; height:0;">
  <iframe src="https://www.aparat.com/video/video/embed/videohash/XvG5B/vt/frame" frameborder="0" style="position:absolute; top:0; left:0; width:100%; height:100%; border: 2px solid #bdc3c7; border-radius: 5px; opacity: 1;" allowfullscreen="true"></iframe>
</div>




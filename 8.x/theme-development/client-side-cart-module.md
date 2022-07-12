## Client Side cart module

[[toc]]

The Larammerce Template Engine has the **local card module**. In this tutorial, the source code of this module is Reviewed.

**local card module** is in the following directory `resources/assets/js/define/local_cart_service.js`.
It has 437 lines of code and is based on require js but there is no requirement to use require js. To read more about it, refer to this address:[requirejs](https://www.requirejs.org/).

Let's check the local card module:

requirejs has two very important functions called define and require. In this module, there is a define function that takes three inputs:

The first input is the name of the module, the second input is an arraylist of the dependencies of this module
and the third input of the function body module.

```js
define('local_cart_service', ['jquery', 'jq_cookie', 'tools', 'template', 'underscore'],
    function (jQuery, cookie, tools, template, _) {
```

In the next part, there are constants of the module.

**cartCountEl** constant shows the number of products in the cart with the cart-count selector.
```js
 const cartCountEl = jQuery('.cart-count');
```

In the box where the product content is presented and the operations of adding to the shopping cart and removing from the shopping cart are performed, the **product-box** attribute must be given to its HTML tag.
```js
   const productSelector = '[product-box]';
```

This constant is the name of the cookie's key in which the shopping cart information is located.
```js
const cartCookie = window.siteEnv.SITE_LOCAL_CART_COOKIE_NAME;
```

The cookie has a specific capacity and more information cannot be stored in the cookie. In this constant, a limit is defined for the shopping cart.
```js
const cartCountLimit = window.siteEnv.SITE_LOCAL_CART_COUNT_LIMIT;
```

The discount amount applied to all card products.
```js
let extraDiscountAmount = 0;
```

The amount of cost applied to the entire invoice.
```js 
let extraFeeAmount = window.hasOwnProperty("extraFee") ? window.extraFee : 0;
```

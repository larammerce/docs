## Products

[[toc]]

The **product** is a Laravel model and is attached to a table called database **products**, where Larammerce intends to explore its fields and properties with you.

When it comes to displaying product information on a website, you should use the tools and solutions that the Larammerce team explains in this document.

### Product properties table

The product model includes a series of **properties**, which Larammerce presented to you in the tables below, along with its explanation and datatype.

Num   |Property               | Datatype    |Description
------|-----------------------|-------------|-------------
**1** | `id`                  |integer      |Primary key.
**2** | `title`               |string       |Product title.
**3** | `latest_price`        |integer      |The latest product price.
**4** | `latest_special_price`|integer      |The latest special product price.
**5** | `previous_price`      |integer      |Previous product price.
**6** | `tax_amount`          |integer      |Product tax amount.
**7** | `toll_amount`         |integer      |Product toll amount.
**8** | `pure_price`          |integer      |Pure product price.
**9** | `extra_properties`    |string       |General information of a product.
**10**| `description`         |string       |Product description.
**11**| `color_code`          |string       |Product color code.
**12**| `code`                |string       |Product code.
**13**| `directory_id`        |integer      |The parent category of the product.
**14**| `p_structure_id`      |integer      |Product category subject.
**15**| `created_at`          |DateTime     |Product creation date.
**16**| `updated_at`          |DateTime     |Product update date.
**17**| `average_rating`      |float        |Product rating.
**18**| `rates_count`         |int          |Number of product rates.
**19**| `count`               |int          |Number of products in the store warehouse.
**20**| `is_active`           |boolean      |The possibility of selling the product in the store.
**21**| `important_at`        |DateTime     |Determines the importance of a product by the date.
**22**| `is_important`        |boolean      |Checks if it has `important_at` or not.
**23**| `is_accessory`        |boolean      |Checks if it is an accessory or not.
**24**| `min_allowed_count`   |integer      |Minimum authorized product inventory in the store warehouse.
**25**| `max_purchase_count`  |integer      |maximum number of purchases of a product.
**26**| `min_purchase_count`  |integer      |Minimum number of purchases of a product.
**27**| `inaccessibility_type`|integer      |Methods of introducing the non-existence of a product.
**28**| `seo_keywords`        |string       |SEO keywords of a product.
**29**| `seo_description`     |string       |Description of a product SEO.
**30**| `isLiked`             |bool         |Specifies whether the user likes the product or not.
**31**| `model_id`            |int          |Determining whether a product is a model with other products.
**32**| `has_discount`        |bool         |Checks if a discount is set for the product.
**33**| `is_visible`          |bool         |Specifies whether the product is displayed in the store or not.
**34**| `attributes_content`  |json         |Stores attributes related to a product as a JSON file in the system.
**35**| `cmc_id`              |integer      |CMC (Customer Meta Category), Checks whether information should be taken from the customer when buying the product or not purchasing the product. 
**36**| `notice`              |string       |Is a text that you can display in a product.
**37**| `models_count`        |integer      |Specifies that you have several different models of a product (associated with model_id).
**38**| `discount_group_id`   |integer      |Specifies a discount plan for a product.
**39**| `latest_sell_price`   |integer      |It is a method that calculates the sales of a product according to its latest price and special price.
**40**| `is_new`              |boolean      |Checks whether a product is new or old.
**41**| `is_discountable`     |boolean      |Checks if the product is discounted or not.
**42**| `structure_sort_score`|string       |A field can be sorted for a product such as size.
**43**| `package_id`          |integer      |Identifies products that are sold as packages.
**44**| `is_package`          |bool         |Specifies whether the product is a package or not.
**45**| `maximum_allowed_purchase_count`|integer|Calculates the maximum purchase of a product based on inventory and the maximum number of purchases of a product.
**46**| `minimum_allowed_purchase_count`|integer|Calculates the maximum purchase of a product based on inventory and the minimum number of purchases of a product.

**NOTE:** `product` is a Laravel model, extends from Laravel `BaseModel`.

##### SOURCE

```php
class product extends BaseModel implements
```


A product is related to objects, Following, you can see these relationships in the table. 

Num   |Property              | Datatype                         |Description
------|----------------------|----------------------------------|------------------------------------------
**1** | `directory`            |Directory                         |Specifies what category this product is in.
**2** | `directories`          |Directory[]                       |There is a list of parent directories that indicate in which other directories this product is manufactured, or (Short link of goods in other directories).
**3** | `productStructure`     |ProductStructure                  |Displays the overall structure of a product.
**4** | `colors`               |Color[]                           |List of product colors.
**5** | `prices`               |ProductPrice[]                    |List of previous product prices.
**6** | `images`               |ProductImage[]                    |List of product images.
**7** | `attributeKeys`        |ProductStructureAttributeKey[]    |List of keys as product features.
**8** | `attributeValues`      |ProductStructureAttributeValue[]  |Values ​​that each product has recorded for itself for each key.
**9** | `pAttributes`          |ProductAttribute[]                |Holds `attributeKeys` and` attributeValues` assignments as a relation.
**10**| `invoices`             |Invoice[]                         |Specifies what factors the product is used for.
**11**| `wishLists`            |CustomerUser[]                    |The list that the user wants to create in the future.
**12**| `needLists`            |CustomerUser[]                    |List that the user wants to provide the product but is not available.
**13**| `cartRows`             |CartRow[]                         |Specifies in which basket the product is found.
**14**| `tags`                 |Tag[]                             |Product tags.
**15**| `badges`               |Badge[]                           |Badges that are displayed on the product.
**16**| `review`               |Review                            |Product reviews that include text from user reviews as well as the rates they have given to the product.
**17**| `customerMetaCategor`  |CustomerMetaCategory              |Information the customer needs to provide to buy a particular product.
**18**| `discountGroup`        |DiscountGroup                     |Plan of reducing the prices of the products.
**19**| `priority`             |integer                           |Indicates the priority of the product stored within the system.
**20**| `productPackage`       |ProductPackage                    |:question:
**21**| `productPackages`      |ProductPackage[]                  |:question:

### Display product properties

The complete directory structure of the template for this project is shown below. The template directory has two subdirectories, **public**, and **resources**, which are the Boilerplate of this project. For more information on creating a layout and its steps, see [5 minute quick start](https://docs.larammerce.com/8.x/theme-development/).

```bash
|---node_modules/
|---public/
     |---HCMS-assets/
     |---views/
|---resources/
     |---assets/
          |---css
          |---js
          |---sass
|---.envrc
|---.envrc.example
|---.gitignore
|---composer.json
|---deploy.sh
|---mix-manifest.json
|---package.json
|---package-lock.json
|---webpack.mix.js
```

**TIP:** *Boilerplate is any text, documentation, or procedures that can be reused more than once in a new context without any substantial changes to the original.* *<sup>[1](#1)</sup>* 

**TIP:** *The blade is the simple, yet powerful templating engine that is included with Laravel.*  *<sup>[2](#2)</sup>* 

Presently if you enter the product's single page, **how can you show the item properties?**
Larammerce will tell you.

if you click on a product in the store, you will enter a single page with a dedicated URL that displays content from the blade called `product-single.blade.php`. The procedure, in general, is as which if you enter the `product-single.blade.php` file in the `public/views` path of the Boilerplate template, you can display the properties on the single product page by calling the properties.

**NOTE:** The `product-single.blade.php` and `product-single_mobile.blade.php` pages are for displaying single product pages.

**NOTE:** If you go to the `product-single.blade.php` file, you will notice that the file's `@extends (_'base')` was used first, which is because the site's headers and footers pages are similar, and it is not necessary to create a template for this page.

For example, You delete the entire content of the page and write the following command in the terminal:

##### EXAMPLE

```bash
./deploy.sh #to deploy the resources to the backend directory
```
Write the following code snippet:

##### EXAMPLE

```php
<h1>Hello World!</h1>
```

And write again in the terminal:

##### EXAMPLE

```bash
./deploy.sh 
```

Finally, enter the browser and after refreshing, you will see that the changes have been applied and you will see the phrase "Hello World".

Presently that you simply know how it works, the Larammerce group will center on the most theme of this area, which is the show of properties.
So, let's take some steps:

**NOTE:** When you work on the `product-single.blade.php` file, the backend panel gives you a variable called `$product`. You can use it to view fields and product properties.

##### SOURCE

```php
@php
   dd($product); #view fields and product properties
@endphp
```

**TIP:** *As you know, you can also use blade tags.* *<sup>[2](#2)</sup>* 

**TIP:** *Blade's {{ }} echo statements are automatically sent through PHP's `htmlspecialchars` function to prevent XSS attacks.* *<sup>[2](#2)</sup>*

And write in the terminal:

```bash
./deploy.sh 
```
Finally, go to the browser and refresh, you will see a product model and if you open the attributes field all the properties will be available to you. If you are not sure what properties to use, you can use this method.

Now, you can display the product **title**, **product code**, **latest price**, **previous price**, and **Count**:

##### EXAMPLE

```php
<h1>{{$product->title}}</h1> #Displays the title field
<div>
   <ul>
      <li>Product code: {{$product->code}}</li> #Display product code
      <li>Previous price: {{$product->previous_price}} Toman</li> #Displays the previous price
      <li>Product price: {{$product->latest_price}} Toman</li> #Displays the latest price
      <li>Count: {{$product->count}} Number</li> #Displays the Number
   </ul>
</div>
```

And write in the terminal:

```bash
./deploy.sh 
```
When you go to your browser and refresh the page, you can see the product title, previous price, last price, and number.

You can also check if the product has a **discount plan** or not:

##### EXAMPLE

```php
<h1>{{$product->title}}</h1>
<div>
   <ul>
      <li>Product code: {{$product->code}}</li>
      @if($product->has_discount) #Examines the discount plan
        <li>previous price: {{$product->previous_price}} Toman</li>
      @endif
      <li>product price: {{$product->latest_price}} Toman</li>
      <li>count: {{$product->count}} Number</li>
   </ul>
</div>
```

And write in the terminal:

```bash
./deploy.sh 
```

You can specify **product categories**:

##### EXAMPLE

```php
<div>
      <h4>Here you can see that what parent directories there are:</h4>
   <ul>
      @foreach($product->directory->getParentDirectories() as $parent_directory)
         <li>{{$parent_directory->title}}</li> #Displays parent directories
      @endforeach
        <li>{{$product->title}}</li> #Product title
   </ul>
</div>
```

And write in the terminal:

```bash
./deploy.sh 
```

**In the example above**, `getParentDirectories()` in `foreach`, which is part of the `directory`, is considered as `$parent_directory`.
Finally, you asked the `foreach` to print the title of each `$parent_directory`.

You can also show **images** of your product:

##### EXAMPLE

```php
<div>
   <h4>Here you can see what product image there are:</h4>
   <ul>
      @foreach($product->images as $index=>$product_image)
         <li>
            <img src="{{url(ImageService::getImage($product_image, 'preview'))}}" alt="The image number {{$index}}"> #View product image
         </li>
      @endforeach
   </ul>
</div>
```

And write in the terminal:

```bash
./deploy.sh 
```

**In the example above**, `$product->images` in `foreach`, is considered as `$index=>$product_image`.
Finally, you asked the `foreach` to print the title of each `$parent_directory`.

**NOTE:** The `img` tag is used to print the image, which contains the `src` and `alt` attributes.
Note that in `src` you must use a service called `ImageService`, ImageService is defined in the backend of the site, so that you can give it an input and ask it to give you an image.

##### SOURCE

```php
url(ImageService::getImage($product_image, 'preview'))
```

**NOTE:** You can also have different sizes of product images such as previews or full, for this purpose, You can refer to `config/cms/images.php` to find out what sizes are for the product image.

##### SOURCE

```php
    "product" => [
        "ratio" => "1/1",
        "thumb" => ["width" => 350, "height" => 350],
        "preview" => ["width" => 700, "height" => 700],
        "original" => ["width" => 2000, "height" => 2000],
    ],
```

##### EXAMPLE

```php
url(ImageService::getImage($product_image, 'thumb'))
```

**NOTE:** In Laravel, the relationships between objects, if you want to get the list of properties, **just write the name of the relationship**, Otherwise, if you want to create a new query on a relationship, use the "**()**" symbol and then write your query.

##### PATTERN

```php
$properties->relationships
$properties->relationships->new query
```

##### EXAMPLE

```php
$product->directory 
$product->directory->getParentDirectories()
```

Well, you can also put a **description** for the product, which is as follows:

**NOTE:** It is recommended to use the open and closed tags of Laravel "**!!**" use for the description.

##### EXAMPLE

```php
<div>
   <p>{!! $product->description !!}</p> #Show product description
</div>
```

And write in the terminal:

```bash
./deploy.sh 
```

Each product mold contains a set of attributes, for example, valves is a product whose attributes can include brand, size, and body material. To display the **attributes** of a product such as brand and body material, you can proceed as follows:

##### EXAMPLE

```php
<div>
   <hr>
      <ul>
         @foreach($attributes as $key_id => $attribute)
            <li>
               <span>{{$attribute->title}}</span> #Attribute title, body Material
               <span>:</span>
               @foreach($attribute->values as $val_index => $value)
                  <span>{{$value->name}}</span>, #Attribute name, such as Cast iron metal
               @endforeach
            </li>
         @endforeach
      </ul>
   <hr>
<div>
```

And write in the terminal:

```bash
./deploy.sh 
```

Below you can see the full example:

##### EXAMPLE

```php
<h1>{{$product->title}}</h1>
<div>
   <ul>
      <li>Product code: {{$product->code}}</li> #Display product code
      @if($product->has_discount)   #Examines the discount plan
        <li>previous price: {{$product->previous_price}} Toman</li>
      @endif
      <li>product price: {{$product->latest_price}} Toman</li> #Displays the latest price
      <li>count: {{$product->count}} Number</li> #Displays the Number
   </ul>
      <h4>Here you can see that what parent directories there are:</h4>
   <ul>
      @foreach($product->directory->getParentDirectories() as $parent_directory)
         <li>{{$parent_directory->title}}</li> #Displays parent directories
      @endforeach
        <li>{{$product->title}}</li> #Product title
   </ul>
      <h4>Here you can see what product image there are:</h4>
   <ul>
      @foreach($product->images as $index=>$product_image)
         <li>
            <img src="{{url(ImageService::getImage($product_image, 'preview'))}}" alt="The image number {{$index}}"> #View product image
         </li>
      @endforeach
   </ul>
   <hr>
      <ul>
         @foreach($attributes as $key_id => $attribute)
            <li>
               <span>{{$attribute->title}}</span> #Attribute title, body Material
               <span>:</span>
               @foreach($attribute->values as $val_index => $value)
                  <span>{{$value->name}}</span>, #Attribute name, such as Cast iron metal
               @endforeach
            </li>
         @endforeach
      </ul>
   <hr>
      <p>{!! $product->description !!}</p>
</div>
```

With the help of the following command in the terminal, you can return to the default theme and see the following example in the default theme in order:

```bash
git checkout -- public/views/product-single.blade.php
./deploy.sh 
```

**NOTE:** you are free at the front of the site and can use different modules and methods.



 #### Reference
___

*1. <a name="1">[What Is Boilerplate?](https://www.investopedia.com/terms/b/boilerplate.asp)</a>*

*2. <a name="2">[What Is Blade Templates?](https://laravel.com/docs/8.x/blade)</a>*
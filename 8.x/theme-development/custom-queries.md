## Custom product queries

[[toc]]

As it is necessary to have a system to help the website administrator make multiple lists of customized products to make offers for the website visitors, the Larammerce project proposes an approach named 'CustomQueries'. So that to create a query of products and show them on any of the website pages, a 'CustomQuery' must be added, and products would be selected by use of that.
For example, you can use 'ProductQueries' to display best-selling, popular, and most visited products.

This section will discuss the examination and use of 'ProductQueries'.

To manage 'ProductQueries', enter the admin panel and enter on the custom product icon in the store tab.

On the destination page, as seen in the picture below, there is a list of current existing 'CustomQueries' that the administrator can manage. Of course, a button helps the administrator add a new item.

![CustomQueries-1.png](/CustomQueries-1.png)

Custom request settings can be changed if the edit icon is clicked.

As it can be seen, each 'CustomQuery' consists of a 'title' and an 'identifier'.
Also, there is a SQL query builder with a graphical user interface (GUI).

Let's take a look at how the 'CustomQueries' work:

For a description in a nutshell, it is important to mention that each of the 'CustomQueries' are persisted in a table named `product_queries`. The table consists of the fields described below:

The source code below can be seen in the `app/models/productQuery.php` file.

##### SOURCE

```php
protected $fillable = [
  'identifier', 'title', 'data', 'skip_count', 'take_count',
  //these are not table fields, these are form sections that role permission system works with
  'query_data'
];
```

There are two helper functions for managing custom queries, which are defined in the back-end (Larammerce project) of the site.

#### 1. custom_query_products($identifier)

If a 'CustomQuery' identifier is passed to the `custom_query_products($identifier)`‍ function, it returns a list of proper products related to the specified 'ProductQuery' according to the passed `$identifier`.

In the example below, "`home_page_last_views` is the identifier of the `CustomQueries`.

```php
<ul>
@foreach(custom_query_products("home_page_last_views") as $product )
    <li>
        {{$product->title} : {$product->latest_price}} Toman  #Show product title and show latest price
    </li>
@endforeach
</ul>
```

Enter this command:

```bash
./deploy.sh
```

#### 2. custom_query_products_ids($identifier)

There may be a need to return a list of products ID instead than all products, for example, to implement lazy loading of a website. For this purpose, a function called `custom_query_products_id($identifier)` has been defined in the Larammerce project, which returns a list of product IDs.

**TIP:** Lazy loading is the practice of delaying load or initialization of resources or objects until they're actually needed to improve performance and save system resources.

In the example below, the function `custom_query_products_id($identifier)` just returns a list of product IDs without getting all the products.

```php
<ul>
@foreach(custom_query_products_ids("home_page_last_views") as $product_id )
    <li>
        {{$product->id}} #Show product id
    </li>
@endforeach
</ul>
```

Enter this command:

```bash
./deploy.sh
```

So, let's follow a few steps to create 'CustomQueries':

1. First, create a .blade file named: `public/views/event.blade.php`

2. Put the following in the file:

```php
<ul>
@foreach(custom_query_products("event_1481_84") as $product)
    <li>
        <a href="{{$product->getFrontUrl}}">
            <img src="{{ImageService::getImage($product, "thumb")}}" alt="{{$product->title}}">
        </a>
    </li>
@endforeach
</ul>
```

As it can be seen, the `custom_query_products("event_1481_84")‍` function, returns a list of proper products related to the specified 'ProductQuery' according to the passed `event_1481_84`.

3. Open the admin panel in the browser and then create a new folder <img src="/plus-button.png" width="20"> with title 'Event 2' and URL 'evnt-2'. Also, make sure to create a 'CustomQueries' with an 'identifier' and 'title'.

4. And enter this command:

```bash
./deploy.sh
```

To display the number of 'CustomQueries' products, proceed as follows:

1. Put the following in the file:

```php
<ul>
@php
    $selected_products = custom_query_products("event_1401_84"); #Selection of products related to custom query "event_1401_84".
    $count_of_selected_product = count($selected_products); #Returns the number of selected items.
@endphp
<h1>Count of products: {{$count_of_selected_product}}</h1>
@foreach(custom_query_products as $product)
    <li>
        <a href="{{$product->getFrontUrl}}">
            <img src="{{ImageService::getImage($product, "thumb")}}" alt="{{$product->title}}">
            <h5>{{$product->title}}</h5>
        </a>
    </li>
@endforeach
</ul>
```

2. And enter this command:

```bash
./deploy.sh
```
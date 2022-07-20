## Custom product queries

[[toc]]

You can use custom product queries to display selective products on the site, for example, the best-selling products, the most popular brands, and the most visited products. 

This section will discuss the examination and use of custom product queries.

To manage custom product queries, enter the admin panel and click on the custom product icon in the store tab.

![queries-2.png](/queries-2.png)

In the image below, you can see a list of Custom product queries that can be deleted, edited, and added.

![queries-3.png](/queries-3.png)

Custom request settings can be changed if the edit icon is clicked.

![queries-4.png](/queries-4.png)

As you can see, each query includes an identifier code and a custom query title.

**NOTE:** This page is a SQL query builder with a graphical appearance.

Let's take a look at how the custom product queries is made.

**NOTE:** It should be noted here that every query after creation is placed as a database record in the ‍‍`product_queries` table and includes the following fields.

##### SOURCE

```php
protected $fillable = [
  'identifier', 'title', 'data', 'skip_count', 'take_count',
  //these are not table fields, these are form sections that role permission system works with
  'query_data'
];
```

To manage custom queries, two types of helpers are provided to you, which are defined in the back end of the site.

#### 1. custom_query_products()

If a custom product query identifier is passed to the `Custom_Query_Products()`‍ helper, it can return a list of products related to the custom product request as output.

In the example below, "home_page_last_views" is the identifier of the product's custom query.

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

#### 2. custom_query_products_ids()

You can use helper `custom_query_products_ids()` to get a list of product IDs. This feature can be very useful during the lazy loading of the website.

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

Custom product queries give you special features without coding in the back-end site.
## Custom product queries

[[toc]]

As it is necessary to have a system to help the website administrator make multiple lists of customized products to make offers for the website visitors, the Larammerce project proposes an approach named 'CustomQueries'. So that to create a query of products and show them on any of the website pages, a 'CustomQuery' must be added, and products would be selected by use of that.
For example, you can use 'ProductQueries' to display best-selling, popular, and most visited products.

This section will discuss the examination and use of 'ProductQueries'.

To manage 'ProductQueries', enter the admin panel and enter on the custom product icon in the store tab.

On the destination page, as seen in the picture below, there is a list of current existing 'CustomQueries' that the administrator can manage. Of course, a button helps the administrator add a new item.

![queries-3.png](/queries-3.png)

Custom request settings can be changed if the edit icon is clicked.

As it can be seen, each 'CustomQuery' consists of a 'title' and an 'identifier'.
Also, there is a SQL query builder with a graphical user interface (GUI).

Let's take a look at how the 'CustomQueries' work:

For a description in a nutshell, it is important to mention that each of the 'CustomQueries' are persisted in a table named `product_queries`. The table consists of the fields described below:

##### SOURCE

```php
protected $fillable = [
  'identifier', 'title', 'data', 'skip_count', 'take_count',
  //these are not table fields, these are form sections that role permission system works with
  'query_data'
];
```

To manage custom queries, two helper functions are provided to you are provided to you, which are defined in the (Larammerce project).

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

You can use function `custom_query_products_ids($identifier)` to get a list of product IDs. This feature can be very useful during the lazy loading of the website.

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

'CustomQueries' give you special features without coding in the back-end site.


## Directories

[[toc]]

As the essential part, Directories are the system's main body; they represent the structure of dynamic routes and hold the content of related web pages so that everything shown in the e-commerce is a part of one or more directories or placed underneath one. 

Directory is a Laravel model that extends Eloquent BaseModel to manage the content of directories existing in the system. Let's take a shallow look at the properties and relationships of the Directory class.

### Directories properties table

Num   | Property                     | Datatype     | Description
------|------------------------------|--------------|------------
**1** | `id`                         | integer      | Primary key.
**2** | `title`                      | string       | Specifies the title of the directory.
**3** | `url_part`                   | string       | `url_part` is the title or URL style title of a specific directory which is referring just to that directory and not containing it's parents or is children.
**4** | `url_full`                   | string       | `url_full` A title or URL style title is a list that refers to the entire directory and includes its parents or children.
**5** | `url_landing`                | string       | Stores the landing path or landing address of a specific page.
**6** | `is_internal_link`           | boolean      | Specifies that a directory is pointing to an internal link<sup>[1](#1)</sup> or not.
**7** | `is_anonymously_accessible`  | boolean      | It is a boolean that will be visible to the public if its value is "true" and will not be visible to the public if it is "false".
**8** | `has_discount`               | boolean      | Specifies whether the discount is set for directory products.
**9** | `has_web_page`               | boolean      | Specifies if the directory has a viewable web page.
**10**| `priority`                   | integer      | Specifies the priority of a page.
**11**| `content_type`               | integer      | Stores the contents of the directory, which are three types. You can see them at the bottom of the table.
**12**| `directory_id`               | integer      | Specifies the parent of a the directory.
**13**| `created_at`                 | DateTime     | Specifies directory creation date.
**14**| `updated_at`                 | DateTime     | Specifies directory update date.
**15**| `show_in_navbar`             | boolean      | Specifies whether a directory is displayed in the navbar by displaying it if the boolean value is "true" and does not display it if it is "false".
**16**| `show_in_footer`             | boolean      | Specifies whether a directory is displayed in the footer by displaying it if the boolean value is "true" and does not display it if it is "false".
**17**| `show_in_app_navbar`         | boolean      | Specifies whether a directory is displayed in the app navbar by displaying it if the boolean value is "true" and does not display it if it is "false".
**18**| `cover_image_path`           | string       | Specifies the cover image of each directory.
**19**| `is_location_limited`        | boolean      | Specifies the restriction of sales of some products for the provinces.
**20**| `description`                | string       | Specifies the product directory description.
**21**| `cmc_id`                     | integer      | CMC (Customer Meta Category), checks whether information should be taken from the customer when buying the product or not purchasing the product.
**22**| `force_show_landing`         | boolean      | Specifies whether this directory is displayed on the landing page by default or non-landing.
**23**| `inaccessibility_type`       | integer      | Shows the different ways you deal with the non-existence of this directory.
**24**| `notice`                     | string       | Specifies a notification for each product in the directory.

**NOTE:** Example of URL part and URL full:

`directory` is the `url_part` for the directory.
```
/path/to/the/specific/directory
```

`/path/to/the/specific/directory` is the `url_full` for the directory.
```
/path/to/the/specific/directory
```

**NOTE:** `content_type` stores the contents of the directory, which are three types. You can see them below:

```php
namespace App\Models\Enums;


use App\Utils\Common\BaseEnum;

class DirectoryType extends BaseEnum
{
    const REAL=1;
    const BLOG=2;
    const PRODUCT=3;
}
```

### Relationship directory table

A `Directory` has some relationships with other entity types existing in the system as shown below:

Num   | Property              | Datatype              | Description
------|-----------------------|-----------------------|-----------
**1** | `parentDirectory`     | Directory             | Shows the parent directory.
**2** | `directories`         | Directory[]           | Specifies hierarchically all the parents of a directory.
**3** | `leafProducts`        | Product[]             | Specifies product nodes that has a link from its parent node.
**4** | `products`            | Product[]             | Shows products connected to this directory.
**5** | `leafArticles`        | Article[]             | Specifies article nodes that has a link from its parent node.
**6** | `articles`            | Article[]             | Shows articles connected to this directory.
**7** | `tags`                | Tag[]                 | Specifies tags.
**8** | `badges`              | Badge[]               | Specifies badges.
**9** | `customerMetaCategory`| CustomerMetaCategory  | CMC (Customer Meta Category).
**10**| `discountGroup`       | DiscountGroup         | Specifies a price reduction plan for a directory products.

### Show directory properties

`$directory` and `$web_page` variable is passed from the controller to the blade, and the content of the directory can be displayed using this variables.

**NOTE:** If you are considering to show the SEO contents in the web pages, It's important to know that `seo_keywords` and `seo_description` of each web page is stored in the `$web_page` variable. So that if you want to get desired data use `$directory->webPage` or `$web_page` directly.

#### getParentDirectories()
___
This function returns a list of parents to which the current directory belongs. Also, please note that the result list also consists of the current directory.

```php
@foreach($directory->getParentDirectories() as $parentDirectory)
   <li>
      <a href="{{directory_url($parentDirectory)."/?landing=true"}}"
         title="{{$parentDirectory->title}}">{{$parentDirectory->title}}
      </a>
   </li>
@endforeach
```

Below you can see three SEO-related functions that are obtained using the `$web_page` object:

#### getSeoDescription()
___

This function Shows the description related to seo.

```php
<meta name="description" content="{{ $web_page->getSeoDescription() }}">
```

#### getSeoKeywords()
___

This function shows the keywords related to seo.

```php
<meta name="keywords" content="{{ $web_page->getSeoKeywords() }}">
```

#### getSeoTitle()
___

This function shows the title related to seo.

```php
<meta itemprop="name" content="{{ $web_page->getSeoTitle() }}">
```

 #### Reference
___

*1. <a name="1">[What are internal links?](https://yoast.com/internal-linking-for-seo-why-and-how/#:~:text=link%20your%20content-,What%20are%20internal%20links%3F,-An%20internal%20link)</a>*
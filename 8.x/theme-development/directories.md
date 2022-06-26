## Directories

[[toc]]

There are many different parts that come together to make the Larammerce platform work. 
In fact, in the base structure Larammerce, To maintain the class structure of directories in a database, we use the parent method of a tree pointer, a tree in which each object points to a parent. 

### Directory structure
The entire Larammerce philosophy revolves around having directories objects.

The location of these directories classe could be as follows:
```php
.
├── app
│   ├── Models
│   │   ├── Directory.php
```
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
**23**| `inaccessibility_type`       | integer      | Shows the different ways we deal with the non-existence of this directory.
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

**NOTE:** Types `content_type`:

```php
class DirectoryType extends BaseEnum
{
    const REAL=1;
    const BLOG=2;
    const PRODUCT=3;
}
```

### Relationship directory table

A `directorie` has some relationships with other entity types existing in the system as shown below:

Num   | Property              | Datatype              | Description
------|-----------------------|-----------------------|-----------
**1** | `parentDirectory`     | Directory             | Shows the parent directory.
**2** | `directories`         | Directory[]           | Specifies hierarchically all the parents of a directory.
**3** | `leafProducts`        | Product[]             | Specifies products node that has a link from its parent node.
**4** | `products`            | Product[]             | Shows products connected to this directory.
**5** | `leafArticles`        | Article[]             | Specifies articles node that has a link from its parent node.
**6** | `articles`            | Article[]             | Shows articles connected to this directory.
**7** | `tags`                | Tag[]                 | Specifies tags.
**8** | `badges`              | Badge[]               | Specifies badges.
**9** | `customerMetaCategory`| CustomerMetaCategory  | CMC (Customer Meta Category).
**10**| `discountGroup`       | DiscountGroup         | Specifies a price reduction plan for a directory products.


 #### Reference
___

*1. <a name="1">[What are internal links?](https://yoast.com/internal-linking-for-seo-why-and-how/#:~:text=link%20your%20content-,What%20are%20internal%20links%3F,-An%20internal%20link)</a>*
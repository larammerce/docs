## Directories

[[toc]]

There are many different moving parts that come together to make the Larammerce platform work. 
In fact, in a larammerce structure, all system natures are part of directoriest. so, all categories and web pages are directories, otherwise they are objects of the article or product type.

### Directory structure
The entire Larammerce philosophy revolves around having directories objects.

The location of these directories classes could be as follows:
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
**3** | `url_part`                   | string       | `/directories.html`-> The part of the URL that belongs to the current directory.
**4** | `url_full`                   | string       | `theme-development/directories.html`-> Part of the URL that belongs to all directory parents.
**5** | `url_landing`                | string       | Display landing page.
**6** | `is_internal_link`           | boolean      | Display a page via a specified link.
**7** | `is_anonymously_accessible`  | boolean      | Display a page publicly or privately.
**8** | `has_discount`               | boolean      | Checks if a discount is set for the directory.
**9** | `has_web_page`               | boolean      | Checks if the directory has a viewable web page.
**10**| `priority`                   | integer      | Specifies the priority of a page.
**11**| `content_type`               | integer      | There are three content type models
**12**| `directory_id`               | integer      | Specifies the parent category of the directory.
**13**| `created_at`                 | DateTime     | Directory creation date.
**14**| `updated_at`                 | DateTime     | Directory update date.
**15**| `show_in_navbar`             | boolean      | Display the directory in the navbar.
**16**| `show_in_footer`             | boolean      | Display the directory in the footer.
**17**| `show_in_app_navbar`         | boolean      | Display the directory in the app navbar.
**18**| `cover_image_path`           | string       | Specifies the image of each directory.
**19**| `is_location_limited`        | boolean      | Restrict the sale of some products
**20**| `description`                | string       | Specifies the restriction of sales of some products for the provinces.
**21**| `cmc_id`                     | integer      | CMC (Customer Meta Category).
**22**| `force_show_landing`         | boolean      | Clicking on a specific directory will take you to a landing page.
**23**| `inaccessibility_type`       | integer      | It has two non-existent and inquiry modes.
**24**| `notice`                     | string       | Display a notice for a directory.

### Relationship directory table

An `directories` has some relationships with other entity types existing in the system as shown below:

Num   | Property              | Datatype              | Description
------|-----------------------|-----------------------|-----------
**1** | `parentDirectory`     | Directory             | Show parent directory.
**2** | `directories`         | Directory[]           | A list of parent categories indicates which other directories this directory belongs to.
**3** | `leafProducts`        | Product[]             | Displays a product node that has a link from its parent node.
**4** | `products`            | Product[]             | Show products connected to this directory.
**5** | `leafArticles`        | Article[]             | Displays a article node that has a link from its parent node.
**6** | `articles`            | Article[]             | Show article connected to this directory.
**7** | `tags`                | Tag[]                 | Displays tags.
**8** | `badges`              | Badge[]               | Displays badges.
**9** | `customerMetaCategory`| CustomerMetaCategory  | CMC (Customer Meta Category).
**10**| `discountGroup`       | DiscountGroup         | The price reduction plan for a directory.

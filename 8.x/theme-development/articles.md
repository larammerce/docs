## Articles

[[toc]]

On all sites, including store sites, there is a section where the content of the blog is introduced.
The content of a magazine or blog in Larammerce is a separate entity that is defined and stored as an object that you can display in the layout design in different places.

Each blog post or article includes the following:

* Unique link
* separate page
* category
* A set of tags

**NOTE:** Articles are objects to which SEO functionality is attached. As a result, you can set SEO-related meta tags based on an article object on the page where the articles are displayed.

**TIP:** *SEO stands for “search engine optimization.” In simple terms, it means the process of improving your site to increase its visibility when people search for products or services related to your business in Google, Bing, and other search engines.* *<sub>[1](#1)</sub>*

### Article properties table

Articles alone is a system object whose features are shown in the table below:

Num   |Property            | Datatype    |Description
------|--------------------|-------------|-----------
**1** | `id`               |integer      |Primary key.
**2** | `directory_id`     |integer      |The parent category.
**3** | `system_user_id`   |integer      |Specifies which user created the article.
**4** | `title`            |string       |Specifies the title of the article.
**5** | `short_content`    |string       |Specifies the opening description of each article.
**6** | `full_text`        |string       |All the content of the article or blog post is stored in it.
**7** | `source`           |string       |
**8** | `image_path`       |string       |
**9** | `created_at`       |DateTime     |Article creation date.
**10**| `updated_at`       |DateTime     |Article update date
**11**| `average_rating`   |float        |Article rating.
**12**| `rates_count`      |int          |Number of article rates.
**13**| `content_type`     |int          |
**14**| `seo_description`  |mixed        |Description of a article SEO.
**15**| `seo_keywords`     |mixed        |SEO keywords of a article.
**16**| `is_suggested`     |boolean      |Specifies suggested articles.

**NOTE:** `article` is a Laravel model, extends from Laravel `BaseModel`.

##### SOURCE

```php
class Article extends BaseModel implements
```

An article is related to objects, Following, you can see these relationships in the table:

Num  |Property        |Datatype     |Description
-----|----------------|-------------|-----------
**1**| `directory`    |Directory    |Specifies what category this article is in.
**2**| `directories`  |Directory[]  |There is a list of parent directories that indicate in which other directories this article is manufactured, or (Short link of article in other directories).
**3**| `tags`         |Tag[]        |article tags.
**4**| `author`       |SystemUser   |The system user who created this article as the author.

### Display article properties

Well, if you are with Larammerce, you can see how articles are displayed on a theme.

In order for the Laramerce system to be able to create a magazine for you, you must submit three files to the system for the system to work properly, which are as follows:

**1.** List of categories

**2.** List of blog posts

**3.** Single post blog

```php
{{ $paginator->links('view.name') }}

// Passing additional data to the view...
{{ $paginator->links('view.name', ['foo' => 'bar']) }}
```

Num   |Property                                  | Description           
------|------------------------------------------|-----------------------
**1** | `$paginator->count()`                    |Get the number of items for the current page.
**2** | `$paginator->currentPage()`              |Get the current page number.
**3** | `$paginator->firstItem()`                |Get the result number of the first item in the results.
**4** | `$paginator->getOptions()`               |Get the paginator options.
**5** | `$paginator->getUrlRange($start, $end)`  |Create a range of pagination URLs.
**6** | `$paginator->hasPages()`                 |Determine if there are enough items to split into multiple pages.
**7** | `$paginator->hasMorePages()`             |Determine if there are more items in the data store.
**8** | `$paginator->items()`                    |Get the items for the current page.
**9** | `$paginator->lastItem()`                 |Get the result number of the last item in the results.
**10**| `$paginator->lastPage()`                 |Get the page number of the last available page. (Not available when using `simplePaginate`).
**11**| `$paginator->nextPageUrl()`              |Get the URL for the next page.
**12**| `$paginator->onFirstPage()`              |Determine if the paginator is on the first page.
**13**| `$paginator->perPage()`                  |The number of items to be shown per page.
**14**| `$paginator->previousPageUrl()`          |Get the URL for the previous page.
**15**| `$paginator->total()`                    |Determine the total number of matching items in the data store. (Not available when using `simplePaginate`).
**16**| `$paginator->url($page)`                 |Get the URL for a given page number.
**17**| `$paginator->getPageName()`              |Get the query string variable used to store the page.
**18**| `$paginator->setPageName($name)`         |Get the query string variable used to store the page.

 #### Reference
___

*1. <a name="1">[What Is SEO?](https://searchengineland.com/guide/what-is-seo)</a>*

*2. <a name="2">[What Is Blade Templates?](https://laravel.com/docs/8.x/blade)</a>*
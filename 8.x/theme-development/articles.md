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

**TIP:** *SEO stands for “search engine optimization.” In simple terms, it means the process of improving your site to increase its visibility when people search for products or services related to your business in Google, Bing, and other search engines.* *<sup>[1](#1)</sup>*

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

In order for the Larammerce system to be able to create a magazine for you, you must add three files to the system to make the system work properly. The file names are as follows:

**1.** List of categories

**2.** List of blog posts

**3.** Single post blog

In the template directory below you will see that the files `blog-categories.blade.php`, `blog-list.blade.php` and `blog-single.blade.php` are placed.

```
|---node_modules/
|---public/
     |---HCMS-assets/
     |---views/
          |---blog-categories.blade.php
          |---blog-list.blade.php
          |---blog-single.blade.php
```

Now let's display the content of these pages together. 

For example, to display a **list on a category page**, you can do the following:

**NOTE:** There is an important contract here that tells us that any object as a link must use the `getFrontUrl()` function.

##### EXAMPLE

```php
<h1>This is the list of my blog categories.</h1>
<ul>
   @foreach($directory->directories as $category)
      <li>
         <a href="{{$category->getFrontUrl()}}">{{$category->title}}</a>
      </li>
   @endforeach
</ul>
```

And write in the terminal:

```bash
./deploy.sh 
```

**In the example above**, `$directory->directories` in `foreach`, is considered as `$category`.
Note that `directories` are one of the properties of `directory` objects.
Finally, you asked the `foreach` to print the title of each `category`.


You can also display **blog posts** :

**NOTE:** There is an important contract here that tells us that any object as a link must use the `getFrontUrl()` function.

**NOTE:** In `src=""` you have to use a service called `ImageService`, `ImageService` is defined in the backend site so you can input it and ask it to give you an image.

##### EXAMPLE

```php
<ul>
   @foreach($articles as $article)
      <li>
         <a href="{{$article->getFrontUrl()}}">
            <img style="max-width: 100px" src="{{url(ImageService::getImage($article, 'thumb'))}}">
            <h5>{{$article->title}}</h5>
            <p>{{$article->short_content}}</p>
         </a>
      </li>
   @endforeach
</ul>
```

And write in the terminal:

```bash
./deploy.sh 
```

**NOTE:** You can also have different sizes of blog images such as previews or full, for this purpose, You can refer to `config/cms/images.php` to find out what sizes are for the blog image.

##### SOURCE

```php
"blog" => [
      "ratio" => "4/3",
      "thumb" => ["width" => 320, "height" => 240],
      "preview" => ["width" => 640, "height" => 480],
      "original" => ["width" => 1024, "height" => 768],
 ],
 ```

##### EXAMPLE

```php
url(ImageService::getImage($article, 'preview'))
```

You can use **pagination** in the format or design of articles so that the user can click on it to be directed to the next or previous list of blog posts to be able to view them.

So let's create pagination for our article page:

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

For more information, see "[Database: Pagination](https://laravel.com/docs/8.x/pagination)"

 #### Reference
___

*1. <a name="1">[What Is SEO?](https://searchengineland.com/guide/what-is-seo)</a>*

*2. <a name="2">[What Is Blade Templates?](https://laravel.com/docs/8.x/blade)</a>*
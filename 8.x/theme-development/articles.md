## Articles

[[toc]]

On all sites, including store sites, there is a section where the content of the blog is introduced.
The content of a magazine or blog in Larammerce is a separate entity that is defined and stored as an object that you can display in the layout design in different places.

Each blog post or article includes the following:

* Unique link
* separate page
* category
* A set of tags

### Article properties table

The article is a system object in itself and can display properties on the pages of the article.

On each page of the blog list, there is a series of categories after entering one of them, passing the `$article` variable from the controller to the blade. Then with `foreach` display, these article features `image`, `title`, `create_at`, and `short_content`.

If you go to the article model, you can see the properties of this object. The properties of the article are shown in the table below:

Num   | Property           | Datatype     | Description
------|--------------------|--------------|------------
**1** | `id`               | integer      | Primary key.
**2** | `directory_id`     | integer      | The parent category.
**3** | `system_user_id`   | integer      | Specifies which user created the article.
**4** | `title`            | string       | Specifies the title of the article.
**5** | `short_content`    | string       | Specifies the opening description of each article.
**6** | `full_text`        | string       | All the content of the article or blog post is stored in it.
**7** | `source`           | string       | The source is a short string that holds the image path as a big picture.
**8** | `image_path`       | string       | Specifies the path of the image
**9** | `created_at`       | DateTime     | Article creation date.
**10**| `updated_at`       | DateTime     | Article update date
**11**| `average_rating`   | float        | Article rating.
**12**| `rates_count`      | int          | Number of article rates.
**13**| `content_type`     | int          | Specifies the type of article.
**14**| `seo_description`  | mixed        | Description of a article SEO.
**15**| `seo_keywords`     | mixed        | SEO keywords of a article.
**16**| `is_suggested`     | boolean      | Specifies suggested articles.

**NOTE:** In Larammerce there is complete freedom of action so that the administrator can create directories as a tree and put a **product** or an **article** in each directory.

For more information about the products in Larammerce, see "[Products](https://docs.larammerce.com/8.x/theme-development/products.html)".

**NOTE:** `content_type` is currently static, in the future the Larammerce team intends to create it dynamically.

**NOTE:** `article` is a Laravel model, extends from Laravel `BaseModel`.

##### SOURCE

```php
class Article extends BaseModel implements
```

An article is related to objects, following, you can see these relationships in the table:

Num  | Property       | Datatype     | Description
-----|----------------|--------------|-----------
**1**| `directory`    | Directory    | Specifies what category this article is in.
**2**| `directories`  | Directory[]  | There is a list of parent directories that indicate in which other directories this article is manufactured, or (Short link of article in other directories).
**3**| `tags`         | Tag[]        | article tags.
**4**| `author`       | SystemUser   | The system user who created this article is the author.

### Display article properties

Well, if you are with Larammerce, you can see how articles are displayed on a theme.

For the Larammerce system to be able to create a magazine for you, you **must** introduce **three** files to the system to make the system work properly. The files include the following:

**1.** List of categories

**2.** List of blog posts

**3.** Single post blog

For example, **to display a list of article categories**, you must add a `blog-categories.blade.php` file to the system using the `./deploy.sh` command.

In the template directory below you will see the files `blog-categories.blade.php`, `blog-list.blade.php`, and `blog-single.blade.php` are placed.

```
|---node_modules/
|---public/
     |---HCMS-assets/
     |---views/
          |---blog-categories.blade.php
          |---blog-list.blade.php
          |---blog-single.blade.php
```

For more information about template engine basics in Larammerce, see "[Template engine basics](https://docs.larammerce.com/8.x/theme-development/basics.html)".

Now let's display the content of these pages together. 

#### List of categories
___


You can create a list of **article categories** to click on each category to be taken to a page that contains a list of blog posts.

In the following example you can see how to create an article category in the `blog-categories.blade.php` file:

##### EXAMPLE

```php
<h1>This is the list of my blog categories.</h1>
<ul>
   @foreach($directory->directories as $category)
      <li>
         <a href="{{$category->getFrontUrl()}}">{{$category->title}}</a> #Category title as a link.
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

**NOTE:** All system features that can be displayed have a URL. If the URL of a feature was required, for example, the product or article should be called the `getFrontUrl()` function. There is an important clause here that says that every object must use the `getFrontUrl()` function as a link.

#### List of blog posts
___

You can create a list of **blog post** previews to click on each blog post to take to a page that contains unique blog post content.

In the following example you can see how to create a preview of blog posts in the `blog-categories.blade.php` file:


##### EXAMPLE

```php
<ul>
   @foreach($articles as $article)
      <li>
         <a href="{{$article->getFrontUrl()}}"> #Related article link.
            <img style="max-width: 100px" src="{{url(ImageService::getImage($article, 'thumb'))}}"> #Blog post image preview.
            <h5>{{$article->title}}</h5> #the title of the article.
            <p>{{$article->short_content}}</p> #the opening description of each article.
         </a>
      </li>
   @endforeach
</ul>
```

And write in the terminal:

```bash
./deploy.sh 
```

**In the example above**, you can see `<img>`, `<h5>`, `<p>` in "foreach" which contains a link to a blog post that takes you to a unique page. In the fact, `foreach` is asked to display an image, title, and text related to the blog post.

**NOTE:** In `src=""` you have to use a service called `ImageService`, `ImageService` is defined in the backend site so you can input it and ask it to give you an image.

**NOTE:** You can also have different sizes of blog images such as previews or full, for this purpose, you can refer to `config/cms/images.php` to find out what sizes are for the blog image.

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

Now let's give a brief description of the contents of your `blog-list.blade.php` file:

In the default theme of the site, you can see that a service has been used to display the **time**, which is as follows:

##### EXAMPLE

```php
{{TimeService::getFormalDateFrom($article->created_at)}} #Show time in blog post.
```

**NOTE:** `TimeService` is defined in the backend site, if you want to display a part of a historical site, you must use a service called `TimeService`.

**NOTE:** Time in Larammerce system is in **AD**.

For more information about time in Larammerce, see "[Time](https://docs.larammerce.com/8.x/utils/time.html)".


You can use pagination in the format or design of articles so that the user can click on it to be directed to the next or previous list of blog posts to be able to view them.

##### EXAMPLE

```php
$articles->currentPage(), #Get the current page number.
$articles->lastItem(), #Get the result number of the last item in the results.
```

**NOTE:** You can use Laravel pagination in the design of the frontend section of the site, Laravel has provided you with functions for pagination design, and in the table below you can see the complete Laravel pagination functions.


Num   | Method                                   | Description           
------|------------------------------------------|-----------------------
**1** | `$paginator->count()`                    | Get the number of items for the current page.
**2** | `$paginator->currentPage()`              | Get the current page number.
**3** | `$paginator->firstItem()`                | Get the result number of the first item in the results.
**4** | `$paginator->getOptions()`               | Get the paginator options.
**5** | `$paginator->getUrlRange($start, $end)`  | Create a range of pagination URLs.
**6** | `$paginator->hasPages()`                 | Determine if there are enough items to split into multiple pages.
**7** | `$paginator->hasMorePages()`             | Determine if there are more items in the data store.
**8** | `$paginator->items()`                    | Get the items for the current page.
**9** | `$paginator->lastItem()`                 | Get the result number of the last item in the results.
**10**| `$paginator->lastPage()`                 | Get the page number of the last available page. (Not available when using `simplePaginate`).
**11**| `$paginator->nextPageUrl()`              | Get the URL for the next page.
**12**| `$paginator->onFirstPage()`              | Determine if the paginator is on the first page.
**13**| `$paginator->perPage()`                  | The number of items to be shown per page.
**14**| `$paginator->previousPageUrl()`          | Get the URL for the previous page.
**15**| `$paginator->total()`                    | Determine the total number of matching items in the data store. (Not available when using `simplePaginate`).
**16**| `$paginator->url($page)`                 | Get the URL for a given page number.
**17**| `$paginator->getPageName()`              | Get the query string variable used to store the page.
**18**| `$paginator->setPageName($name)`         | Get the query string variable used to store the page.

For more information, see "[Database: Pagination](https://laravel.com/docs/8.x/pagination)"


#### Single post blog

The content of a blog post is placed in a file called `blog-single.blade.php`. Let's look at the content that should be in this file.

Note that you definitely need to put **meta tags** in this file:

##### SOURCE

```php
@section('meta_tags')
   @include('_meta_tags', ['obj' => $article])
   <meta property="og:type" content="article">
@endsection
```

As you can see, the meta tags related to the SEO of the site are included in this file. If you click on the `_meta_tags` file, you will be redirected to the page that contains the meta tags, the source of which you can see below:

##### SOURCE

```php
<link rel="canonical" href="{{ $obj->getFrontUrl() }}">

   <meta name="description" content="{{ $obj->getSeoDescription() }}">
   <meta name="keywords" content="{{ $obj->getSeoKeywords() }}">
   <meta name="category" content="">
   <meta itemprop="name" content="{{ $obj->getSeoTitle() }}  لارامرس -">
   <meta itemprop="description" content="{{ $obj->getSeoDescription() }} ">
   <meta itemprop="image" content="{{ env('APP_URL') . ImageService::getImage($obj, 'preview') }} ">
   <meta property="og:url" content="{{ $obj->getFrontUrl() }} ">
   <meta property="og:tltle" content="{{ $obj->getSeoTitle() }}  لارامرس -">
   <meta property="og:image" content="{{ env('APP_URL') . ImageService::getImage($obj, 'preview') }} ">
   <meta property="og:description" content="{{ $obj->getSeoDescription() }} ">
```

**NOTE:** Articles are objects to which **SEO** functionality is attached. As a result, you can set SEO-related meta tags based on an article object on the page where the articles are displayed.

**TIP:** *SEO stands for “search engine optimization”. In simple terms, it means the process of improving your site to increase its visibility when people search for products or services related to your business in Google, Bing, and other search engines.* *<sup>[1](#1)</sup>*

**TIP:** *Meta tags are snippets of code that tell search engines important information about your web page, such as how they should display it in search results. They also tell web browsers how to display it to visitors.* *<sup>[2](#2)</sup>*

Next, in the main content of the page, with the help of the block code, `$article->directory->getParentDirectories()` you can create the **breadcrumb** of the page:

##### SOURCE

```php
@foreach($article->directory->getParentDirectories() as $parentDirectory)
   <li><a href="{{$parentDirectory->getFrontUrl()}}">{{$parentDirectory->title}}</a></li>
@endforeach
```

To get **branch** or **subcategory categories**, you can use a helper function called `get_blog_categories()`:

##### SOURCE

```php
@foreach(get_blog_categories($article->directory) as $blogCategory)
   <li>
      <a href="{{ $blogCategory->getFrontUrl() }}">
         <i class="fa fa-angle-left"></i>
         <h3 class="title">{{ $blogCategory->title }}</h3>
      </a>
   </li>
@endforeach
```

**NOTE:** If you give the `get_blog_categories()` function the input of a `directory` if it has a directory, it shows the subdirectories, and if it does not have a subdirectory, it shows its rows or similar.

**Tip:** *Helpers, as the name suggests, help you with tasks. Each helper file is simply a collection of functions in a particular category. There are URL Helpers, that assist in creating links, there are Form Helpers that help you create form elements, Text Helpers perform various text formatting routines, Cookie Helpers set and read cookies, File Helpers help you deal with files, etc.* *<sup>[3](#3)</sup>*

You can also add an `hct-gallery`:

For more information about hct gallery, see "[Template galleries](https://docs.larammerce.com/8.x/theme-development/galleries.html)".

##### SOURCE

```php
<div hct-gallery="article_banners" hct-title='بنرها' hct-max-entry="1" hct-random-select>
   <ul class="hidden-xl hidden-lg hidden-md hidden-sm hidden-xs hidden-xxs" hct-gallery-fields>
      <li hct-gallery-field="banner_title" hct-title="عنوان بنر"></li>
      <li hct-gallery-field="banner_link" hct-title="آدرس لینک"></li>
   </ul>
   <div class="side-item" hct-gallery-item>
      <img  hct-attr-src="{%- prop:image_path %}"alt="{%- ex-prop:banner_title %}" class="img-fluid"/>
      <a target="_blank" href="{%- ex-prop:banner_link %}" title="" class="absolute-link"></a>
   </div>
</div>
```

In the content of the article you can put the **title**, **parent category**, **date of creation**, **the original image or full size**, **short content**, and **text content**:

##### SOURCE

```php
<div class="article-content">
   <div class="header">
      <h1 class="title">{{ $article->title }}</h1> #View article title
      <div class="date">
         {{ $article->directory->title }} / {{ TimeService::getDateFrom($article->created_at) }} #Show parent category title and Show article creation date:
      </div>
   </div>
      <div class="pic">
      <img src="{{ ImageService::getImage($article, 'original') }}" alt="{{ $article->title }}" class="img-fluid"> #View full size image
   </div>
   <div class="desc">
      {{ $article->short_content }} #View short article content
   <hr/>
      {!! $article->full_text !!} #View full text content
   </div>
</div>
```

**NOTE:** Because the content of the **text contains** `HTML` tags, instead of the `{{}}` symbol, the `!!` symbol is used.

##### EXAMPLE

```php
{!! $article->full_text !!} #View full text content
```
You can use the helper function `get_article_related_articles()` to **display 4 articles related** to the current article:

```php
@foreach(get_article_related_articles($article, 4) as $relatedArticle)
   <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
      <div class="article-box">
         <div class="pic">
            <img src="{{ ImageService::getImage($relatedArticle, 'thumb') }}"
                 alt="{{ $relatedArticle->title }}"
                 class="img-fluid">
         </div>
         <a href="{{ $relatedArticle->getFrontUrl() }}">
            <h5 class="title">{{ $relatedArticle->title }}</h5>
         </a>
         <div class="date">{{ TimeService::getFormalDateFrom($relatedArticle->created_at) }}</div>
         <div class="short-desc">{{ $relatedArticle->short_content }}</div>
      </div>
   </div>
@endforeach
```

You can use your article information in a **rich snippet** file and put it in the `blog-single.blade.php` file:

```php
@section('extra_js')
    @include('_rich_snippet_article', compact('article'))
@endsection
```

**TIP:** *Rich snippets are snippets that have a higher click-through rate. People just prefer to click on the results that give them more information. If the click-through rate of a snippet increases, you'll get more traffic from that search result*  *<sup>[4](#4)</sup>*

**NOTE:** You should use the `$article` variable and helpers to display and design the blog post page, but note that you are completely free to pick and design objects on the page.

 #### Reference
___

*1. <a name="1">[What Is SEO?](https://searchengineland.com/guide/what-is-seo)</a>*

*2. <a name="2">[What Is meta tags?](https://ahrefs.com/blog/seo-meta-tags/)</a>*

*3. <a name="3">[What Is helper?](https://codeigniter.com/userguide3/general/helpers.html)</a>*

*4. <a name="4">[What Is Rich snippets?](https://yoast.com/what-are-rich-snippets/)</a>*
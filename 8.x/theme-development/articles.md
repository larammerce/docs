## Articles

[[toc]]

On every website, including e-commerce ones, there is a section to manage the blog posts related to the business. So Larammerce also has this too.

The content of a magazine or blog in Larammerce is a separate entity that is defined and stored as an object that you can display in the layout design in different places.

Each blog post or article includes the following:

- Unique link
- Separate page
- Category
- SEO description & tags

Now that you are familiar with the nature of the article, let's look at the properties and how the article is managed in the Larammerce system.

### Article properties table

The article is a system entity(object) itself and can be modified/displayed by its properties on any Template project's pages.

If you go to the article model, you can see the properties of this object. The properties of the article are shown in the table below:

| Num    | Property          | Datatype | Description                                                              |
| ------ | ----------------- | -------- | ------------------------------------------------------------------------ |
| **1**  | `id`              | integer  | Primary key.                                                             |
| **2**  | `directory_id`    | integer  | The parent category.                                                     |
| **3**  | `system_user_id`  | integer  | Specifies which user created the article.                                |
| **4**  | `title`           | string   | Specifies the title of the article.                                      |
| **5**  | `short_content`   | string   | Specifies the opening description of each article.                       |
| **6**  | `full_text`       | string   | All the content of the article or blog post is stored in it.             |
| **7**  | `source`          | string   | The source is a short string that holds the image path as a big picture. |
| **8**  | `image_path`      | string   | Specifies the path of the image                                          |
| **9**  | `created_at`      | DateTime | Article creation date.                                                   |
| **10** | `updated_at`      | DateTime | Article update date                                                      |
| **11** | `average_rating`  | float    | Article rating.                                                          |
| **12** | `rates_count`     | int      | Number of article rates.                                                 |
| **13** | `content_type`    | int      | Specifies the type of article.                                           |
| **14** | `seo_description` | mixed    | Description of a article SEO.                                            |
| **15** | `seo_keywords`    | mixed    | SEO keywords of a article.                                               |
| **16** | `is_suggested`    | boolean  | Specifies suggested articles.                                            |

**NOTE:** In Larammerce there is complete freedom of action so that the administrator can create directories as a tree and put **products** and **article** in each directory.

For more information about the products in Larammerce, see "[Products](https://docs.larammerce.com/8.x/theme-development/products.html)".

**NOTE:** `content_type` is currently static, in the future the Larammerce team intends to create it dynamically.

**NOTE:** `Article` is a child of Laravel `Model`, so you can act and react like a Laravel `Model` with that. Also, it's important to mention that Article has all features existing in Laravel `Model`.

##### SOURCE

```php
class Article extends BaseModel implements
```

An `Article` has some relationships with other entity types existing in the system as shown below:

| Num   | Property      | Datatype    | Description                                                                                                                                             |
| ----- | ------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1** | `directory`   | Directory   | Specifies what category this article belongs to.                                                                                                        |
| **2** | `directories` | Directory[] | A list of parent categories indicates which other directories this article belongs to. (Also there are some symbolic links that are managed similarly.) |
| **3** | `tags`        | Tag[]       | Article tags.                                                                                                                                           |
| **4** | `author`      | SystemUser  | The system user who created this article is the author.                                                                                                 |

### Display article properties

Well, if you are with Larammerce, you can see how articles are displayed on a theme.

For the Larammerce system to be able to create a magazine for you, you **must** put create **three** files to the system to make the system work properly. The files include the following:

```
|---node_modules/
|---public/
     |---HCMS-assets/
     |---views/
          |---blog-categories.blade.php
          |---blog-list.blade.php
          |---blog-single.blade.php
```

For more information about template engine in Larammerce, see "[Template engine basics](https://docs.larammerce.com/8.x/theme-development/basics.html)".

#### List of categories

---

Here, categories are used to organize article in your store.

Let's look at a simple example in the `blog-categories.blade.php` file:

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

**NOTE:** `getFrontUrl()` supports creating new links in the backend.

And write in the terminal:

```bash
./deploy.sh
```

#### List of blog posts

---

You can create a list of **blog post** previews.

Let's look at a example in the `blog-list.blade.php` file:

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

**NOTE:** `ImageService` is defined in the backend site, So it returns the image.

And write in the terminal:

```bash
./deploy.sh
```

**NOTE:** You can also have different sizes of blog images such as previews or full, for this purpose, you can refer to `config/cms/images.php`.

##### SOURCE

```php
"blog" => [
      "ratio" => "4/3",
      "thumb" => ["width" => 320, "height" => 240],
      "preview" => ["width" => 640, "height" => 480],
      "original" => ["width" => 1024, "height" => 768],
 ],
```

#### Single post blog

The content of a blog post is placed in a file called `blog-single.blade.php`. Let's look at the content that should be in this file.

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

**TIP:** _Meta tags are snippets of code that tell search engines important information about your web page, such as how they should display it in search results. They also tell web browsers how to display it to visitors._ _<sup>[1](#1)</sup>_

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

If you want to display the **title**, **parent category**, **date of creation**, **the original image or full size**, **short content**, and **text content** you can do the following:

##### SOURCE

```php
<div class="article-content">
   <div class="header">
      <h1 class="title">{{ $article->title }}</h1> #View article title
      <div class="date">
         {{ $article->directory->title }} / {{ TimeService::getDateFrom($article->created_at) }} #Show parent category title and Show article creation date
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

**NOTE:** You may want to display a time. This can be done using the `TimeService` function. Time in Laramres is AD.
For more information about time in Larammerce, see "[Time](https://docs.larammerce.com/8.x/utils/time.html)".

##### EXAMPLE

```php
{{ TimeService::getDateFrom($article->created_at) }} #Show article creation date
```

**NOTE:** Beware that only instead of the `{{}}` symbol, the `!!` symbol is used, because the content of the **text contains** `HTML` tags.

```php
{!! $article->full_text !!} #View full text content
```

#### Reference

---

_1. <a name="1">[What Is meta tags?](https://ahrefs.com/blog/seo-meta-tags/)</a>_

#### Video source

---

<iframe src="https://www.aparat.com/video/video/embed/videohash/eXJ7I/vt/frame"  height="300" width="700" style="  border: 2px solid #bdc3c7; border-radius: 5px; opacity: 1;" allowFullScreen="true"></iframe>

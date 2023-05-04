## File management

[[toc]]

This documentation is about how to manage the files in larammerce base theme project and its resources structures.

### Larammerce file structure

The coding structure of the Larammerce project for designing pages generally comprises three main parts. It's obvious  that the structure can change or extend based on your requirement.


Section | Contents
-------------|------------|
**Header** | The header includes `meta tags`, `CSS` files generated from an `SCSS` file named `app.scss`, `navigation bar`, and other such elements. The header appears on all pages at the top level and is consistent throughout.
**Body** | The body is a dynamic part that varies on each page. It differs in content, layout, and design depending on the information displayed on that particular page.|
**Footer** | The footer typically features the page footer, JavaScript (`JS`), modal, and template part. `JS` is similar to `CSS` in that it applies to components or pages. For instance, when you write 1000000, `JS` converts the integer into 1,000,000(separates the digits with comma). Another example is when `JS` is applied to a page that contains a condition such as "add to cart." In this case, if the page is a shopping page, the "add to cart" button will appear.|

<br/>

- **app.scss file**:
  
   In the Larammerce project, the `app.scss` file is utilized to manage the `CSS` files and avoid overcrowding. By importing components and page files, this file implements their `CSS` styles throughout the app. This approach permits the importation of `CSS` that is specific to a particular page or component. Furthermore, instead of writing separate `CSS` styles for comparable components with distinct details, parts are created. These parts refer to components that share a general `CSS` style but differ in detail. Finally, these parts can be included on pages. In the app.scss file, there are files that begin with either "page" or "part". The "part" files contain `CSS` specific to a particular component, while the "page" files contain `CSS` specific to a particular page.

- **Template part**: 


  template part refers to a reusable section of code in a web development project. It is typically used to create consistent designs across a website, allowing developers to easily update and maintain the site's appearance. Essentially, a template part is a modular block of code that can be inserted into different pages or sections of a website, providing consistency and efficiency in the development process. To illustrate, let's say we have a `div` element that includes a `class` attribute. This `class` can be used to specify the "title" of a webpage by setting its value accordingly within the div:

  ```html
    <div class="customdiv"><%- title></div>
  ```

  Based on this code block, when someone wants to add a title to a page with a "customdiv" class, they can simply use this codeblock and modify the variable instead of rewriting the entire code. It's worth noting that `view JS` and `ReactJS` have their own template engines and do not require the template part.


The general format of a file can be expressed in multiple ways, depending on your preference and intended purpose.

To make things easier, we can create a blueprint of the desired page layout that we intend to use for future reference and as a guide when creating new pages. This blueprint is available in `_base` file located in the `scss` directory. So when you want to create a page named `index` you can just extend the `index` file from the `_base` file and and customize it to fit your desired structure.

![how to extend from base file](/file-management/base1.png)

When designing a webpage, you can break it down into smaller parts called components. For example, you could have a header, footer, and navigation bar component. Then, you can easily use these components throughout your webpage wherever needed. This is called a component-based approach to web design. The first step is to have a `_base` with your desired sections, the second is to create the components, and as the last step, you can extend the new page from the `_base` file and add your desired components to the newly generated page file.

![how to use components](/file-management/base2.png)

### How to customize a page 

Lets review some contents of `_base.blade.php` file and learn how to add extra reusable sections in the child views.

In Laravel, `@yield` is a blade directive that defines a section of content that can be replaced by child views. The `@yield` directive is typically used in a layout file to define areas of the page that can be customized by other views that extend the layout.

For example, let's say you have a layout file called `_base.blade.php` that includes a `@yield('title')` directive. You can then create a child view called `index.blade.php` that extends the layout and includes its own content within the content section:

```html
// _base.blade.php
<html>
    <head>
        <title>@yield('title') My website</title>
    </head>
    <body>
        ...
    </body>
</html>

// index.blade.php

@extends('_base')

@section('title')
    index page
@endsection
```
When you render the `index.blade.php` view, Laravel will replace the `@yield('content')` directive in the `_base.blade.php` layout with the content defined in the `@section('title')` directive in the child view, resulting in the following HTML output:

```html
<html>
    <head>
        <title>index page My website</title>
    </head>
    <body>
        ...
    </body>
</html>
```

or another example can be :

```html
// _base.blade.php
<html>
    <head>
    ...
    </head>
    <body>
      <header class="@yield('header_class')">
        ....
    </body>
</html>

// index.blade.php

@extends('_base')

@section('header_class')
    Home
@endsection

```
In this example, the parent view `(_base.blade.php)` has a header element with a class attribute whose value is determined by the `@yield("header_class")` directive.
This means that when the child view `(index.blade.php)` is rendered, the `Home` string will be placed in the `@yield("header_class")` section of the parent view, resulting in the header element having a class attribute of "Home".


### How to use components

When you use the `@include` directive, Blade will render the specified view and insert its contents into the parent view at the point where the `@include` directive is used. This allows you to reuse code across multiple views by breaking it up into smaller, reusable components.

Assume you have a file named `_underscore-template.blade.php` and you want to use its component within your page. Using this directive allows you to do so without making it overcrowded.

Example:

```html
@include('_underscore-template')
```

**Note:** Consider that it's reasonable to put all of the repeatable components in the `_base.blade.php` to save the time and ebnergy for designing new pages.


### How to review changes

To review the changes on the files, `/path/to/larammerce-base-theme`, run `npm run watch` command, and after every change, run `./deploy` to see the results.

If you are adding a new file:

 - Firstly, `/path/to/resourses/assets/sass/` and create a file. (for example  `page-index.scss`).
 - Then import the page in the `parts.scss` file.

    ```html
    @import "page-index";
    ```
- Run `npm run watch`
- Run `./deploy`


#### Video sources
___

<iframe src="https://www.aparat.com/video/video/embed/videohash/56pfY/vt/frame"  height="300" width="700" style="  border: 2px solid #bdc3c7; border-radius: 5px; opacity: 1;" allowFullScreen="true"></iframe>

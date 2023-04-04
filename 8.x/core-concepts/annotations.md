## Annotations

[[toc]]

Annotations are the tags declaring metadata for the program source code. They provide additional information about the program to the compiler but are not part of the program itself. These annotations do not affect the execution of the compiled program, but add some new traits to the classes, methods and properties.*<sup>[1](#1)</sup>*

#### Example in java language

```java{1-19}
class Flower {
  public void displayInfo() {
    System.out.println("I am a flower.");
  }
}

class Rose extends Flower {
  @Override
  public void displayInfo() {
    System.out.println("I am a rose.");
  }
}

class Main {
  public static void main(String[] args) {
    Rose r1 = new Rose();
    r1.displayInfo();
  }
}
```
**OUTPUT**

```bash{1}
I am a rose
```

In the above example, both the superclass and subclass include the method displayInfo(). However the method of the subclass is called during the program execution.

## Annotations in php language

Annotations are called `DocBlock` in the php language. A DocBlock is a piece of documentation in the source code that informs about a certain class, method or other structural elements.*<sup>[2](#2)</sup>*

#### Example in php language

```php{1-10}
<?php

/**
 * @param string $myArgument
 * @return void
 */
 function myFunction($myArgument)
 {
    ...
 }
 ```
 
`@param string $myArgument` declares that the parameter $myArgument is of type string.

`@return void` declares that the return value for this method is void, which means that no value will be returned.

## Annotations in larammerce platform

In the larammerce platform, a php `annotation-parser` package is developed based on the PhpDocBlock.*<sup>[3](#3)</sup>* This package helps you to write the codes in the DocBlock and then execute them. Therefore the use of DocBlock in the Larammerce platform goes beyond the annotation in the php language.

#### Example in larammerce platform

```php{1-10}
<?php

/**
 * @role(super_user)
 * @rules(subject="required|min:10")
 */
public function test()
{
    ...
}
```

`@role(super_user)` indicates that only the super_user has access to the test method. Other users will get a 403 error message.

`@rules(subject="required|min:10")` indicates that the input field called subject must be a string with at least 10 characters.

## Steps to work with annotation-parser package

First, install the package:

```bash{1}
composer require larammerce/annotation-parser
```

Now you have access to 2 classes in this package: `ReflectiveClass` and `ReflectiveMethod`.

Construct an instance object from these classes:

```php{1-2}
$reflective_class = new ReflectiveClass($class_name);
//constructs the reflective class
```

```php{1-2}
$reflective_method = new ReflectiveMethod($class_name, $function_name);
//constructs the reflective method
```

These classes provide some useful methods to interact with DocBlock:

```php{1-2}
$reflective_class->getComment();
//returns the phpdoc on top of class
```

```php{1-2}
$reflective_method->getComment();
//returns the phpdoc on top of method
```

```php{1-2}
$reflective_class->getAnnotations();
//returns a list of annotations
```

```php{1-2}
$reflective_class->hasAnnotation("specific_annotation");
//checks if an specific annotation exists
```

```php{1-2}
$reflective_class->getAnnotation(("specific_annotation"));
//returns the specific annotation with passed title
```

#### Examples of the use of annotation-parser package

Make a new command, named `TestAnnotations`:

```bash{1}
php artisan make:command TestAnnotations
```

Now you have the codes below in the path `/larammerce/app/Console/Commands/TestAnnotations.php`:

```php{1-42}
<?php

namespace App\Console\Commands;
use Illuminate\Console\Command;

class TestAnnotations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:name';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        return 0;
    }
}
```

Change this line into the `TestAnnotations class`:

```php{8}
class TestAnnotations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'larammerce:annotation';
    ...
}
```

Insert this code into the `public function handle`:

```php{3}
public function handle()
{
    dd("salam");
}
```

Run the following command into the terminal:

```bash{1}
php artisan larammerce:annotation
```

**OUTPUT**

![handle-salam](/02.png)

In the path `/larammerce/app/Console/Commands/TestAnnotations.php`, construct a `ReflectiveClass` from the `TestAnnotations class` and get the DocBlock above this class:


```php{5,12,13}
<?php

namespace App\Console\Commands;
use Illuminate\Console\Command;
use App\Utils\Reflection\ReflectiveClass;

class TestAnnotations extends Command
{
    ...
    public function handle()
    {
        $testAnnotationsRef = new ReflectiveClass(TestAnnotations::class);
        dd($testAnnotationsRef->getComment());
    }
}
```

**OUTPUT**

![no-docblock](/03.png)

This output indicates that there is no DocBlock above the TestAnnotations class:

```php{1}
//No DocBlock here.
class TestAnnotations extends Command
{
    ...
}
```

Now put this DocBlock above the TestAnnotations class:

```php{1-3}
/**
 * @salam(ali="2")
 */
class TestAnnotations extends Command
{
    ...
}
```

**OUTPUT**

![mere-comment](/04.png)

The output returns a mere comment. In order to get a processed result, change the code in the `public function handle`:

```php{4}
public function handle()
{
    $testAnnotationsRef = new ReflectiveClass(TestAnnotations::class);
    dd($testAnnotationsRef->getAnnotations());
}
```

**OUTPUT**

![processed-comment](/05.png)

As you see, the comment is processed and represented in detail.

Now change the DocBloc above the `TestAnnotations class`:

```php{2}
/**
 * @salam(Ali="2", Test=3)
 */
class TestAnnotations extends Command
{
    ...
}
```

**OUTPUT**

![accurate-result](/06.png)

As you see, the result is accurate. So you can write some descriptions above a class and then use them in your code.

Now make a new method called `testFunction` with its related DocBlock into the `TestAnnotations class`:

```php{9-15}
class TestAnnotations extends Command
{
    ...
        public function __construct()
    {
        parent::__construct();
    }
    
    /**
     * @rules(username="required", password="required|max:20")
     */
    public function testFunction()
    {
        echo "salam";
    }
    ...
}
```

Put the codes below in the path `/larammerce/app/Console/Commands/TestAnnotations.php`:

```php{6,14,15}
<?php

namespace App\Console\Commands;
use Illuminate\Console\Command;
use App\Utils\Reflection\ReflectiveClass;
use App\Utils\Reflection\ReflectiveMethod;

class TestAnnotations extends Command
{
    ...
    public function handle()
    {
        $testAnnotationsRef = new ReflectiveClass(TestAnnotations::class);
        $testFunctionRef = new ReflectiveMethod(TestAnnotations::class, "testFunction");
        dd($testFunctionRef->hasAnnotation("salam"));
    }
}
```

**OUTPUT**

![no-exist-salam](/07.png)

This means that there is no annotation named `salam` above the `testFunction` method.

Now change this line into the `public function handle`:

```php{4}
public function handle()
{
    ...
    dd($testFunctionRef->hasAnnotation("rules"));
}
```

**OUTPUT**

![exist-rules](/08.png)

It declares that an annotation named `rules` exists above the `testFunction` method.

To get this annotation, insert these codes into the `public function handle`:

```php{5-7}
public function handle()
{
    $testAnnotationsRef = new ReflectiveClass(TestAnnotations::class);
    $testFunctionRef = new ReflectiveMethod(TestAnnotations::class, "testFunction");
    if($testFunctionRef->hasAnnotation("rules")){
        dd($testFunctionRef->getAnnotation("rules"));
    }
}
```

**OUTPUT**

![test-function](/09.png)

As you see, the output shows the DocBlock above the `testFunction` method.

You can also do mathematical calculations into the DocBlock.For example, change the DocBlock above the `testFunction` method:

```php{2}
/**
 * @rules(username="required", password="required|max:".(10+12))
 */
public function testFunction()
{
    echo "salam";
}
```

**OUTPUT**

![mathematical-calculation](/10.png)

The output indicates that the mathematical calculation 10+12=22 is done into the DocBlock.

#### Source code

To understand how the annotation-parser package works, you can refer to the *[github](https://github.com/larammerce/annotation-parser/blob/master/src/AnnotationParser.php)* of this project and review the related source code.

#### References

*1. <a name="1">[Annotations in the java language.](https://docs.oracle.com/javase/tutorial/java/annotations/)</a>*

*2. <a name="2">[What is a DocBlock in the php language?](https://docs.phpdoc.org/3.0/guide/getting-started/what-is-a-docblock.html#what-is-a-docblock)</a>*

*3. <a name="3">[Annotation-parser package in the larammerce project.](https://github.com/larammerce/annotation-parser)</a>*

#### Video source
___

<iframe src="https://www.aparat.com/video/video/embed/videohash/Kzhe6/vt/frame"  height="300" width="700" style="  border: 2px solid #bdc3c7; border-radius: 5px; opacity: 1;" allowFullScreen="true"></iframe>

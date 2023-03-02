## Annotations

[[toc]]

Annotations are the tags declaring metadata for the program source code. They provide additional information about the program to the compiler but are not part of the program itself. These annotations do not affect the execution of the compiled program, but add some new traits to the classes, methods and properties.

(1 -> https://docs.oracle.com/javase/tutorial/java/annotations/)

## Example in java language

```java
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

```
I am a rose
```

In the above example, both the superclass and subclass include the method displayInfo(). However the method of the subclass is called during the program execution.

## Annotations in php language

Annotations are called `DocBlock` in the php language. A DocBlock is a piece of documentation in the source code that informs about a certain class, method or other structural elements.

(2 -> https://docs.phpdoc.org/3.0/guide/getting-started/what-is-a-docblock.html#what-is-a-docblock)

## Example in php language

```php
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

In the larammerce platform, a php `annotation-parser` package is developed based on the PhpDocBlock.

(3 -> https://github.com/larammerce/annotation-parser)

This package helps you to write the codes in the DocBlock and then execute them. Therefore the use of DocBlock in the Larammerce platform goes beyond the annotation in the php language.

## Example in larammerce platform

```php
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

```bash
composer require larammerce/annotation-parser
```

Now you have access to 2 classes in this package: `ReflectiveClass` and `ReflectiveMethod`.

Construct an instance object from these classes:

```php
$reflective_class = new ReflectiveClass($class_name);
//constructs the reflective class
```

```php
$reflective_method = new ReflectiveMethod($class_name, $function_name);
//constructs the reflective method
```

These classes provide some useful methods to interact with DocBlock:

```php
$reflective_class->getComment();
//returns the phpdoc on top of class
```

```php
$reflective_method->getComment();
//returns the phpdoc on top of method
```

```php
$reflective_class->getAnnotations();
//returns a list of annotations
```

```php
$reflective_class->hasAnnotation("specific_annotation");
//checks if an specific annotation exists
```

```php
$reflective_class->getAnnotation(("specific_annotation"));
//returns the specific annotation with passed title
```

## Examples of the use of annotation-parser package

Make a new command, named `TestAnnotations`:

```bash
php artisan make:command TestAnnotations
```

Now you have the codes below in the path `/larammerce/app/Console/Commands/TestAnnotations.php`:

```php
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

```php
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

```php
public function handle()
{
    dd("salam");
}
```

Run the following command into the terminal:

```bash
php artisan larammerce:annotation
```

**OUTPUT**

screenshot

Construct a `ReflectiveClass` from the `TestAnnotations class` and get the DocBlock above this class:


```php
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

screenshot

This means that there is no DocBlock above the TestAnnotations class:

```php
//No DocBlock here.
class TestAnnotations extends Command
{
    ...
}
```

Put this DocBlock above the TestAnnotations class:

```php
/**
 * @salam(ali="2")
 */
class TestAnnotations extends Command
{
    ...
}
```

**OUTPUT**

screenshot

This returns a mere comment. In order to get a processed result, change the code in the `public function handle`:

```php
public function handle()
{
    $testAnnotationsRef = new ReflectiveClass(TestAnnotations::class);
    dd($testAnnotationsRef->getAnnotations());
}
```

**OUTPUT**

screenshot

As you see, the comment is processed and represented in detail.

Now change the DocBloc above the `TestAnnotations class`:

```php
/**
 * @salam(Ali="2", Test=3)
 */
class TestAnnotations extends Command
{
    ...
}
```

**OUTPUT**

screenshot

As you see, the result is accurate. So you can write some descriptions above a class and then use them in your code.

Now make a new method called `testFunction` with its related DocBlock into the `TestAnnotations class`:

```php
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

Put the codes below into the public function handle:

```php
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

screenshot

This means that there is not an annotation named `salam` above the `testFunction` method.

Now change this line into the `public function handle`:

```php
public function handle()
{
    ...
    
    dd($testFunctionRef->hasAnnotation("rules"));
}
```

**OUTPUT**

screenshot

It says that an annotation named `rules` exists above the `testFunction` method.

To get this annotation, insert these codes into the `public function handle`:

```php
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

screenshot

As you see, the result shows the DockBlock above the `testFunction` method.

You can also do mathematical calculations into the DocBlock.

Change the DockBlock above the `testFunction` method:

```php
/**
 * @rules(username="required", password="required|max:".(10+12))
 */
public function testFunction()
{
    echo "salam";
}
```

**OUTPUT**

screenshot

The output indicates that the mathematical calculation 10+12=22 is done into the DockBlock.

## Source code

To understand how the annotation-parser package works, you can refer to the github of this project and review the related source code.

(https://github.com/larammerce/annotation-parser/blob/master/src/AnnotationParser.php)

## References

## Video source

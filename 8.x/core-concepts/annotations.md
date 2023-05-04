## Annotations

[[toc]]

Annotations are the tags declaring metadata for the program source code. They provide additional information about the program to the compiler and add some new traits to the classes, methods and properties.

## History

### Annotations in Java language

Historically, annotations were first introduced in Java language.*<sup>[1](#1)</sup>*

#### Example

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

//output: I am a rose
```

In the above example, both the superclass and subclass include the method `displayInfo()`. However the method of the subclass is called during the program execution due to the `@Override` annotation.

### Annotations in PHP language

There were no annotations in the PHP language before version 8.0, so the metadata was written into the `DocBlock`. A DocBlock is a piece of documentation in the source code that provides information about a specific class, method or other structural elements.*<sup>[2](#2)</sup>*

#### Benefits of use

Suppose you write a validation method:

```php
public function sth($request){
  $validator = new Validator([
    "name" => "required",
    "family" => "required|max:20",
    "phone_number" => "nullable|numeric|min:max:11"
  ]);
  $validator->validate($request->all());
  if($validator->fails()){
    return redirect()->back()->withData();
  }
  // logic-of-program
  $user = User::create($request->all());
  ...
}
```

You must repeat these codes for every validation. Instead, the code becomes as belows using the annotations:

```php
/**
 * @rules(name="required", family="required|max:20", phone_number="nullable|numeric|min:max:11")
 */
public function sth($request){
  // logic-of-program
  $user = User::create($request->all());
  ...
 }
```

So the annotations make the codes more concise and clean.

#### Example in PHP language

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
 
`@param string $myArgument` declares that the parameter `$myArgument` is of type string.

`@return void` declares that the return value for this method is void, which means that no value will be returned.

## Annotations in Larammerce platform

In the Larammerce platform, a PHP `annotation-parser` package is developed based on the DocBlock.*<sup>[3](#3)</sup>* This package helps you to write the codes in the DocBlock and then execute them. Therefore the use of DocBlock in the Larammerce platform goes beyond the annotation in the PHP language.

#### Example in Larammerce platform

```php
<?php

class ExampleClass
{
  /**
   * @role(super_user)
   * @rules(subject="required|min:10")
   */
  public function exampleMethod()
  {
      ...
  }
}
```

`@role(super_user)` indicates that only the super_user has access to the example method. Other users will get a 403 error message.

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

#### Examples of the use of annotation-parser package

Assume that we have a class named `TestAnnotations` with a method named `handle()` into this class:

```php
<?php

use App\Utils\Reflection\ReflectiveClass;

class TestAnnotations
{
    public function handle()
    {
        $testAnnotationsRef = new ReflectiveClass(TestAnnotations::class);
    }
}
```

Now put this DocBlock above the TestAnnotations class and use `getComment()` to see the result:

```php{1-3,9-15}
/**
 * @salam(ali="2")
 */
class TestAnnotations
{
    public function handle()
    {
        $testAnnotationsRef = new ReflectiveClass(TestAnnotations::class);
        $testAnnotationsRef->getComment();
        //output:
        //  """
        //  /**\n
        //   * @salam(ali="2")\n
        //   */
        //  """
    }
}
```

The output returns a mere comment. In order to get a processed result, use `getAnnotations()`:

```php{4-13}
public function handle()
{
    $testAnnotationsRef = new ReflectiveClass(TestAnnotations::class);
    $testAnnotationsRef->getAnnotations();
    //output:
    //  array:1 [
    //    "salam" => App\Utils\Reflection\Annotation^ {#2571
    //      -title: "salam"
    //      -properties: array:1 [
    //        "ali" => "2"
    //      ]
    //    }
    //  ]
}
```

As you see, the comment is processed and represented in detail.

Now change the DocBloc above the class:

```php{2,16}
/**
 * @salam(Ali="2", Test=3)
 */
class TestAnnotations
{
    public function handle()
    {
        $testAnnotationsRef = new ReflectiveClass(TestAnnotations::class);
        $testAnnotationsRef->getAnnotations();
        //output:
        //  array:1 [
        //    "salam" => App\Utils\Reflection\Annotation^ {#2571
        //      -title: "salam"
        //      -properties: array:1 [
        //        "ali" => "2"
        //        "Test" => 3
        //      ]
        //    }
        //  ]
    }
}
```

As you see, the result is accurate. So you can write some descriptions above a class and then use them in your code.

Now make a new method called `testFunction` with its related DocBlock and use `hasAnnotation()`:

```php{4,10-17}
<?php

use App\Utils\Reflection\ReflectiveClass;
use App\Utils\Reflection\ReflectiveMethod;

class TestAnnotations
{
    ...

    /**
     * @rules(username="required", password="required|max:20")
     */
    public function testFunction()
    {
        $testFunctionRef = new ReflectiveMethod(TestAnnotations::class, "testFunction");
        $testFunctionRef->hasAnnotation("salam");   //false
    }
}
```

This means that there is no annotation named `salam` above the `testFunction` method.

Now change the keyword:

```php{7}
/**
 * @rules(username="required", password="required|max:20")
 */
public function testFunction()
{
    ...
    $testFunctionRef->hasAnnotation("rules");   //true
}
```

It declares that an annotation named `rules` exists above the method.

To get this annotation, use `getAnnotation()` and see the result:

```php{7-18}
/**
 * @rules(username="required", password="required|max:20")
 */
public function testFunction()
{
    $testFunctionRef = new ReflectiveMethod(TestAnnotations::class, "testFunction");
    if($testFunctionRef->hasAnnotation("rules")){
        print_r($testFunctionRef->getAnnotation("rules"));
    }

    //output:
    //  App\Utils\Reflection\Annotation^ {#2575
    //    -title: "rules"
    //    -properties: array:2 [
    //      "username" => "required"
    //      "password" => "required|max:20"
    //    ]
    //  }
}
```

The output represents the DocBlock above the `testFunction` method.

You can also do mathematical calculations into the DocBlock. For example, change the DocBlock above the method and see the result:

```php{2,16}
/**
 * @rules(username="required", password="required|max:".(10+12))
 */
public function testFunction()
{
    $testFunctionRef = new ReflectiveMethod(TestAnnotations::class, "testFunction");
    if($testFunctionRef->hasAnnotation("rules")){
        print_r($testFunctionRef->getAnnotation("rules"));
    }

    //output:
    //  App\Utils\Reflection\Annotation^ {#2575
    //    -title: "rules"
    //    -properties: array:2 [
    //      "username" => "required"
    //      "password" => "required|max:22"
    //    ]
    //  }
}
```

The output indicates that the mathematical calculation 10+12=22 is done into the DocBlock.

#### Source code

To understand how the annotation-parser package works, you can refer to the *[github](https://github.com/larammerce/annotation-parser/blob/master/src/AnnotationParser.php)* of this project and review the related source code.

#### References

*1. <a name="1">[Annotations in the Java language.](https://docs.oracle.com/javase/tutorial/java/annotations/)</a>*

*2. <a name="2">[What is a DocBlock in the PHP language?](https://docs.phpdoc.org/3.0/guide/getting-started/what-is-a-docblock.html#what-is-a-docblock)</a>*

*3. <a name="3">[Annotation-parser package in the Larammerce project.](https://github.com/larammerce/annotation-parser)</a>*

#### Video source
___

<iframe src="https://www.aparat.com/video/video/embed/videohash/Kzhe6/vt/frame"  height="300" width="700" style="  border: 2px solid #bdc3c7; border-radius: 5px; opacity: 1;" allowFullScreen="true"></iframe>

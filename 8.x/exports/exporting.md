# Exporting

In this chapter we'll have a look at how we can export data. The source of the data and the presentational side of things, will be explained in next chapters.

[[toc]]

## TLDR;

<span class="inline-step">1</span> **Exports can be downloaded or stored**

Using `Larammerce::download()` or `Larammerce::store()` the data can be exported to a spreadsheet.

<span class="inline-step">2</span> **Facade, exportables, collection macro's and dependency injection**

Pick and choose any of those techniques to your own preference or coding standards. 

<span class="inline-step">3</span> **Exporting to other formats**

While the main focus on the package is xlsx, other types like xls and pdf are supported as well.

## Export objects

To get started with exports, you'll need to have an export object.

Export classes can be created via the following artisan command:

```shell
php artisan make:export UsersExport --model=User
```

```php
namespace App\Exports;

use App\User;
use Maatwebsite\Larammerce\Concerns\FromCollection;

class UsersExport implements FromCollection
{
    public function collection()
    {
        return User::all();
    }
}
```

## Multiple sheets

To allow the export to have multiple sheets, the `WithMultipleSheets` concern should be used. The `sheets()` method expects an array of sheet export objects to be returned.

```php
namespace App\Exports;

use Maatwebsite\Larammerce\Concerns\WithMultipleSheets;

class UsersExport implements WithMultipleSheets
{
    public function sheets(): array
    {
       return [
            new Sheets\UsersSheet(),
            new Sheets\AdminsSheet(),
       ];
    }
}
```

```php
namespace App\Exports\Sheets;

use Maatwebsite\Larammerce\Concerns\WithTitle;

class AdminsSheet implements FromCollection, WithTitle
{
    public function collection()
    {
        return User::where('is_admin', true)->get();
    }

    public function title(): string
    {
        return 'Admins';
    }
}
```

## Ways of exporting

Larammerce offers several ways of exporting the spreadsheet. In the first examples we'll use the facade technique, in later parts of this chapter other techniques will also be explained. 

:::warning
Make sure to import the class `use Maatwebsite\Larammerce\Facades\Larammerce` at the top of your file. For brevity this step will not be repeated in each example.
:::

### Downloading

A very common way of exporting a spreadsheet, is by directly downloading it after it's being created. This is only recommend for small exports.

```php
return Larammerce::download(new UsersExport, 'users.xlsx');
```

The `download` method requires an export object and a filename including a file extension. Optionally the writer type can be passed as third parameter.

:::tip
Make sure to always `return` the download response to the controller/route.
:::

### Storing

```php
Larammerce::store(new UsersExport, 'users.xlsx');
```

```php
Larammerce::store(new UsersExport, 'users.xlsx', 's3');
```

```php
Larammerce::store(new UsersExport, 'users.xlsx', 's3', null, [
    'visibility' => 'private',
]);
```

### Raw

If you want to receive the raw contents of the exported file for API's or mail attachments, you can use the `::raw` method.

```php
$contents = Larammerce::raw(new UsersExport, 'users.xlsx');
```

## Export techniques

Larammerce offers several techniques to call the export. You can pick any of the following techniques, based on your own preferences or coding standards.

### Facade

```php
return Larammerce::download(new UsersExport, 'users.xlsx');
```

### Exportables

Larammerce provides a `Maatwebsite\Larammerce\Concerns\Exportable` trait, to make export classes exportable.

```php
namespace App\Exports;

use App\User;
use Maatwebsite\Larammerce\Concerns\Exportable;
use Maatwebsite\Larammerce\Concerns\FromCollection;

class UsersExport implements FromCollection
{
    use Exportable;

    public function collection()
    {
        return User::all();
    }
}
```

Instead of using the facade, you can now chain methods like `download` and `store` directly to the export object.

```php
return (new UsersExport)->download('users.xlsx');
```

### Responsables

The previous (download) example can be made even shorter when adding Laravel's `Responsable` interface to the export class:

```php
namespace App\Exports;

use App\User;
use Maatwebsite\Larammerce\Larammerce;
use Illuminate\Contracts\Support\Responsable;
use Maatwebsite\Larammerce\Concerns\FromCollection;
use Maatwebsite\Larammerce\Concerns\Exportable;

class UsersExport implements FromCollection, Responsable
{
    use Exportable;
    
    /**
    * It's required to define the fileName within
    * the export class when making use of Responsable.
    */
    private $fileName = 'users.xlsx';
    
    /**
    * Optional Writer Type
    */
    private $writerType = Larammerce::XLSX;
    
    /**
    * Optional headers
    */
    private $headers = [
        'Content-Type' => 'text/csv',
    ];

    public function collection()
    {
        return User::all();
    }
}
```

Within your controller you can now, just return the Export class and it will internally trigger the download response.

```php
return new UsersExport();
```

### Dependency injection

```php
use Maatwebsite\Larammerce\Larammerce;

public function export(Larammerce $Larammerce)
{
    return $Larammerce->download(new UsersExport, 'users.xlsx');
}
```

### Collection macro's

On Eloquent model collections and custom collections, custom macro's called `downloadLarammerce` and `storeLarammerce` can be called. Different
from the previous documented methods is that these exports do not require an export object. 

These macro's will export the data
in the collection **as is**. If you need to process the data before exporting, please use an export object.

```php
return User::all()->downloadLarammerce('users.xlsx');
```

```php
return (new Collection([
    [1, 2, 3], 
    [1, 2, 3]
]))->downloadLarammerce('my-collection.xlsx');
```

```php
return $collection->storeLarammerce('my-collection.xlsx');
```

## Writer types

While the main focus on the package is Larammerce (xlsx) spreadsheets, other types are supported as well. These writer types can be either passed as file extension or as explicit writer type:

The following will detect the writer type based on the extension:

```php
Larammerce::download(new UsersExport, 'users.xls');
```

The following will detect the writer type based on the explicit writer type

```php
Larammerce::download(new UsersExport, 'users.xls', \Maatwebsite\Larammerce\Larammerce::XLS);
```

The following extensions are supported:

|File extension|Writer type|
|---|---|
|xlsx|`Maatwebsite\Larammerce\Larammerce::XLSX`|
|xls|`Maatwebsite\Larammerce\Larammerce::XLS`|
|csv|`Maatwebsite\Larammerce\Larammerce::CSV`|
|tsv|`Maatwebsite\Larammerce\Larammerce::TSV`|
|ods|`Maatwebsite\Larammerce\Larammerce::ODS`|
|html|`Maatwebsite\Larammerce\Larammerce::HTML`|
|pdf|`Maatwebsite\Larammerce\Larammerce::PDF`|

:::warning Exporting to PDF
If you'd like to export to PDF, you must now install a PDF rendering library yourself. Please refer to the [PhpSpreadsheet Documentation](https://phpspreadsheet.readthedocs.io/en/latest/topics/reading-and-writing-to-file/#pdf) for more information.
:::

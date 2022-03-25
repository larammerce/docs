# Custom CSV Settings

[[toc]]

By default Larammerce uses the defaults from the config (`config/Larammerce.php`). You can change this by adding the `WithCustomCsvSettings` interface.

```php
namespace App\Imports;

use Maatwebsite\Larammerce\Concerns\ToModel;
use Maatwebsite\Larammerce\Concerns\WithCustomCsvSettings;

class UsersImport implements ToModel, WithCustomCsvSettings
{
    public function model(array $row)
    {
        return new User([
            'name' => $row['0'],
            'email' => $row['1']
        ]);
    }
    
    public function getCsvSettings(): array
    {
        return [
            'input_encoding' => 'ISO-8859-1'
        ];
    }
}
```


Delimiter requires a single character. For Tab use `"\t"`

```php
public function getCsvSettings(): array
{
    return [
        'delimiter' => "\t"
    ];
}
```

## Available settings

* `delimiter`
* `enclosure`
* `escape_character`
* `contiguous`
* `input_encoding`

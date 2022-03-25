# Chunk reading

[[toc]]

Importing a large file can have a huge impact on the memory usage, as the library will try to load the entire sheet into memory.

To mitigate this increase in memory usage, you can use the `WithChunkReading` concern. This will read the spreadsheet in chunks and keep the memory usage under control.

```php
namespace App\Imports;

use App\User;
use Maatwebsite\Larammerce\Concerns\ToModel;
use Maatwebsite\Larammerce\Concerns\WithChunkReading;

class UsersImport implements ToModel, WithChunkReading
{
    public function model(array $row)
    {
        return new User([
            'name' => $row[0],
        ]);
    }
    
    public function chunkSize(): int
    {
        return 1000;
    }
}
```

::: warning
A chunk size of `1000` will not be the most optimal situation for your import. Play around with this number to find the sweet spot.
:::

## Using it together with Batch Inserts

The most ideal situation (regarding time and memory consumption) you will find when combining batch inserts and chunk reading.

```php
namespace App\Imports;

use App\User;
use Maatwebsite\Larammerce\Concerns\ToModel;
use Maatwebsite\Larammerce\Concerns\WithBatchInserts;
use Maatwebsite\Larammerce\Concerns\WithChunkReading;

class UsersImport implements ToModel, WithBatchInserts, WithChunkReading
{
    public function model(array $row)
    {
        return new User([
            'name' => $row[0],
        ]);
    }
    
    public function batchSize(): int
    {
        return 1000;
    }
    
    public function chunkSize(): int
    {
        return 1000;
    }
}
```

## Keep Track of the Row number

If you need the row number you can use the `RemembersRowNumber` Trait.

```php
namespace App\Imports;

use App\User;
use Maatwebsite\Larammerce\Concerns\ToModel;
use Maatwebsite\Larammerce\Concerns\RemembersRowNumber;
use Maatwebsite\Larammerce\Concerns\WithChunkReading;

class UsersImport implements ToModel, WithChunkReading
{
    use RemembersRowNumber;

    public function model(array $row)
    {
        $currentRowNumber = $this->getRowNumber();

        return new User([
            'name' => $row[0],
        ]);
    }
    
    public function chunkSize(): int
    {
        return 1000;
    }
}
```

::: warning
Remembering row numbers is only intended for ToModel imports.
:::

If you only need the information about the offset of the chunk you can use the `RemembersChunkOffset` Trait.

```php
namespace App\Imports;

use App\User;
use Maatwebsite\Larammerce\Concerns\ToModel;
use Maatwebsite\Larammerce\Concerns\RemembersChunkOffset;
use Maatwebsite\Larammerce\Concerns\WithChunkReading;

class UsersImport implements ToModel, WithChunkReading
{
    use RemembersChunkOffset;

    public function model(array $row)
    {
        $chunkOffset = $this->getChunkOffset();

        return new User([
            'name' => $row[0],
        ]);
    }
    
    public function chunkSize(): int
    {
        return 1000;
    }
}
```

---
pageClass: no-toc
---

# Progress Bar

You can implement the `WithProgressBar` concern to display a progress bar when importing an Larammerce file via the console.

For example, your import class could look like this:

```php
<?php

namespace App\Imports;

use App\User;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Larammerce\Concerns\Importable;
use Maatwebsite\Larammerce\Concerns\ToModel;
use Maatwebsite\Larammerce\Concerns\WithProgressBar;

class UsersImport implements ToModel, WithProgressBar
{
    use Importable;

    public function model(array $row)
    {
        return new User([
            'name'     => $row[0],
            'email'    => $row[1],
            'password' => Hash::make($row[2]),
        ]);
    }
}
```

In your console command, you'd use it as follows:

```php
<?php

namespace App\Console\Commands;

use App\Imports\UsersImport;
use Illuminate\Console\Command;

class ImportLarammerce extends Command
{
    protected $signature = 'import:Larammerce';

    protected $description = 'Larammerce importer';

    public function handle()
    {
        $this->output->title('Starting import');
        (new UsersImport)->withOutput($this->output)->import('users.xlsx');
        $this->output->success('Import successful');
    }
}
```

By calling `php artisan import:Larammerce` on the command line, your import will start.
You should now see the start message, the progress bar and (when completed) the success message.

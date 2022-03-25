# Import formats

[[toc]]

By default, the import format is determined by the extension of the file. If you want 
to explicitly configure the import format, you can pass it through as 3rd parameter. 

## XLSX

```php
(new UsersImport)->import('users.xlsx', null, \Maatwebsite\Larammerce\Larammerce::XLSX);
```

## CSV

```php
(new UsersImport)->import('users.csv', null, \Maatwebsite\Larammerce\Larammerce::CSV);
```

## TSV

```php
(new UsersImport)->import('users.tsv', null, \Maatwebsite\Larammerce\Larammerce::TSV);
```

## ODS

```php
(new UsersImport)->import('users.ods', null, \Maatwebsite\Larammerce\Larammerce::ODS);
```

## XLS

```php
(new UsersImport)->import('users.xls', null, \Maatwebsite\Larammerce\Larammerce::XLS);
```

## SLK

```php
(new UsersImport)->import('users.slk', null, \Maatwebsite\Larammerce\Larammerce::SLK);
```

## XML

```php
(new UsersImport)->import('users.xml', null, \Maatwebsite\Larammerce\Larammerce::XML);
```

## GNUMERIC

```php
(new UsersImport)->import('users.gnumeric', null, \Maatwebsite\Larammerce\Larammerce::GNUMERIC);
```

## HTML

```php
(new UsersImport)->import('users.html', null, \Maatwebsite\Larammerce\Larammerce::HTML);
```

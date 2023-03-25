## Representative management

[[toc]]

This article is a guide to "how to work with Larammerce template engine".

## Prerequities

First of all, you need to install Larammerce project on your system.
Prior to work with Larammerce template engine, consider studing documents composed on [installation](https://docs.larammerce.com/8.x/getting-started/installation.html) section on `larammerce.com`.


## Representative management features 

To work with these features, after cloning `larammerce-base-theme` and larammerce` projects, follow instructions below:

- **First,** run `npm run prod` in your powershell to build project resources.
- **Second,** login as admin on `localhost:8080/admin`.
  
Once you loged in, a newly released feature name `representative management` will be displayed as you hit The `shop` section.

As you tap `representative management` section, a form consisting of parts in which you can manage the representative introduction method, will be shown for you.

In order to edit or manage the referee section :

- The first button determines whether this form be active or not.
- The second section determines whether or not the current customers can be considered as a referee(representative).
- The input section represents "selectable items" where you can define the methods which the user has been familiarized with the website, as selectable items(Tv, Social media, etc.).

**Note:** Modifying every form, Don't forget to save changes!

Once you managed this form, to check the change result, open an incognito window on `localhost:8080` and try to register.

Before registering in larammerce, consider changing the type of `verification code sending method` on the `shop` tab. Select the second option named (`save in file`) so to have access to the verification code on your project file. Save changes!



As you registered with a random number, the code will be displayed on the last line of `larammerce/storage/logs/laravel.log`.
Once you verified the number, you will lead to the registration form. From now on the focus will be on customizing this form as a sample:

---

### Managing representative form

To enable referee management section in the form, there is a helper defined on `register-representative.blade.php`. 

```php
// public/views/register-representative.blade.php

@if(representative_is_enabled())
    <div class="col-md-6 col-md-6 col-xs-12">
        <div class="form-group">
            <label for="representative_type">نحوه آشنایی با مجموعه</label>
            <select class="form-control number-control" name="representative_type">
                <option value="">هیج کدام</option>
                <option value="مشتریان فعلی مجموعه" id="manual-representative">مشتریان فعلی مجموعه</option>
                @foreach(representative_get_options() as $option)
                    <option value="{{$option}}">{{$option}}</option>
                @endforeach
            </select>
        </div>
    </div>
```
this helper function has been called on `public/views/auth-mobile-register.blade.php` on line 65:

```php
  @include("_register-representative")
```
So now if you disable the form, and double check the registration form, the referee field will be disapeared. Cause the script will be inclued just if the helper is enabled.


### How to pass list options 

Another helper function used in this form is `representative_get_options` which represents the user's optional choices list.
```php
// public/views/register-representative.blade.php

<select class="form-control number-control" name="representative_type">
     <option value="">هیج کدام</option>
    <option value="مشتریان فعلی مجموعه" id="manual-representative">مشتریان فعلی مجموعه</option>
         @foreach(representative_get_options() as $option)
            <option value="{{$option}}">{{$option}}</option>
        @endforeach
</select>

```

You can replace a radio button instead of a select/option tag.

```php

@foreach(representative_get_options() as $option)
<lable for="">
    {{$option}}
<input type="radio" class="form-control" name="representative_type"
  value="{{$option}}">
 </lable>           
@endforeach

```

Now deploy the project and see the result :
```
.\deploy.sh
```
**Note 1:** Options were already passed in the form manualy.<br>
**Note 2:** Consider not changing the name of button.<br>
**Note 3:** Add a css design to adjust options on the form.<br>

---

### How to set conditional option

The other example is to set the current customers as a referee.
You can build a conditional option to show a specific field when options are selected.
On `register-representative.blade.php`. 

```php
//register-representative.blade.php

@if(representative_is_enabled())
    <div class="col-md-6 col-md-6 col-xs-12">
        <div class="form-group">
            <label for="representative_type">نحوه آشنایی با مجموعه</label>
            <select class="form-control number-control" name="representative_type">
                <option value="">هیج کدام</option>
                @foreach(representative_get_options() as $option)
                    <option value="{{$option}}">{{$option}}</option>
                @endforeach
            </select>
        </div>
    </div>

     #here by adding a condition (if) to a helper function named `representative_is_customer_representative_enabled` you can do so :
    @if(representative_is_customer_representative_enabled())
        <div class="col-md-6 col-sm-6 col-xs-12">
            <div class="form-group">
                <label for="family">شماره تماس معرف در صورت تمایل</label>
                <input type="text" class="form-control number-control" name=representative-username"
                placeholder="شماره تماس معرف" 
                value="{{old('representative-username')}} " > 
            </div>
        </div>
    @endif
 @endif
```
OR you can build a conditional option to show a specific field when a specific options is selected !
For example if you set current customers as referee, you will need a field for that customer information(for example, the phone number). As you notice, the number input will be displayed only when the current customer is selected. Otherwise this input won't be shown. See its step-by-step instruction:

![Conditional option](/conditional-option.png)

- First, create an option and give it a name attribute:

**Note:** this is a manual option and should be written out of loop.
```php
<option value="مشتریان فعلی مجموعه" id="manual-representative">مجموعه فعلی مشتریان<option>
```

- Then add a condition to the options :

```php
 @if(representative_is_customer_representative_enabled())
     <div class="col-md-6 col-sm-6 col-xs-12" id="representative-input-container" style="display: none">
        <div class="form-group">
            <label for="family">شماره تماس معرف در صورت تمایل</label>
                <input type="text" class="form-control number-control" name=representative-username"
                placeholder="شماره تماس معرف" 
                value="{{old('representative-username')}} " > 
        </div>        
     </div>
 @endif
```
The very next step is to write a java script to set the apearance and adjust the display option:

In `larammerce-theme` project, on `resources/js/require` add a new `js` file name `register-auth-require` contain this script:

```php
 //larammerce-theme/resources/js/require/register-auth-require

if (window.currentPage === "auth-register")
    require(["jquery"], function (jQuery) {
        const representativeSelectEl = jQuery("select[name='representative_type']");
        const representativeInputContainerEl = jQuery("#representative-input-container");
        if (representativeSelectEl.length > 0 && representativeInputContainerEl.length > 0) {
            representativeSelectEl.on("change", function (event) {
                const optionSelected = jQuery("option:selected", this);
                const id = optionSelected.attr("id");

                if (id === "manual-representative") {
                    representativeInputContainerEl.fadeIn();
                }else{
                    representativeInputContainerEl.fadeOut();
                }
            });
        }
    });
```


To better undrestand the above script, notice to its step-by-step descriptions in the following:

- Consider the option name on the `register-representative.blade.php` file:

```php
// public/views/register-representative.blade.php

 <select class="form-control number-control" name="representative_type">
 ```

 - Now by using the option name, you can check if the option is selected or not by running script below:
```php
if (window.currentPage === "auth-register")
    require(["jquery"], function (jQuery) {
        const representativeSelectEl = jQuery("select[name='representative_type']"); #take the element
        if (representativeSelectEl.length > 0){#elementname.lengh >0 checks if the element exists or not

        }
```

::: warning Consider checking the results of your changes:

To see the changes result follow these two steps:

- first run the script below:

```bash
npm run watch
```

- Then after changes deploy the project:

```bash
./deploy.sh
```
:::


To get the option element on select change, add condition below to above script:

```php
if (window.currentPage === "auth-register")
    require(["jquery"], function (jQuery) {
        const representativeSelectEl = jQuery("select[name='representative_type']");
        if (representativeSelectEl.length > 0){
            representativeSelectEl.on("change", function (event) {
                const optionSelected = jQuery("option:selected", this);
                const id = valueSelected = this.value;
                console.log(optionSelected.attr("id"));
                console.log(valueSelected);               

            });
        }
    });

```


Run `npm run watch` and  `./deploy.sh` and open your search engine console so to see what will happen when you select an option.
the output will be:

![Console log](/console-log.png)

- Now set the condition in which if the selected option is on, an extra field displayes otherwise it fades out. to do so :

1. Build a container on `_register-representative.blade.php` with an specific `id` and set the default display style as hidden:


```php
 @if(representative_is_customer_representative_enabled())
        <div class="col-md-6 col-sm-6 col-xs-12" id="representative-input-container" style="display: none">
            <div class="form-group">
                <label for="family">شماره تماس معرف در صورت تمایل</label>
                 <input type="text" class="form-control number-control" name="represantative_Username" 
                 placeholder="شماره تماس معرف"
                 value"{{old("represantative_Username")}} >
             </div>
        </div>
    @endif
```

2. Now change the above script as composed below:
```php
if (window.currentPage === "auth-register")
    require(["jquery"], function (jQuery) {
        const representativeSelectEl = jQuery("select[name='representative_type']");
        const representativeInputContainerEl = jQuery("#representative-input-container");
        if (representativeSelectEl.length > 0 && representativeInputContainerEl.length > 0) {
            representativeSelectEl.on("change", function (event) {
                const optionSelected = jQuery("option:selected", this);
                const id = optionSelected.attr("id");

                if (id === "manual-representative") {
                    representativeInputContainerEl.fadeIn();
                }else{
                    representativeInputContainerEl.fadeOut();
                }
            });
        }
    });
```

Run `./deploy.sh`.

Good luck!


#### Video source
___

<iframe src="https://www.aparat.com/video/video/embed/videohash/fZN1d/vt/frame" height="300" width="700" style="  border: 2px solid #bdc3c7;
border-radius: 5px; opacity: 1;" ></iframe>






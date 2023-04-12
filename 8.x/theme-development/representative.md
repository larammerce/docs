## Representative

[[toc]]

This article serves as a comprehensive guide to effectively utilizing the representative management feature within the application. By following the step-by-step instructions provided, you will gain a strong understanding of how to manage representatives, pass list options, and set condition options with ease and efficiency.

## Prerequities

To implement the representative management form in your application, there are a few requirements that need to be met. Firstly, you will need to ensure that you have both the `Larammerce project` and the `Larammerce-base-theme` available on your system. You can fork these projects from [Larammerce github](https://github.com/larammerce). This is a prerequisite for working with the Larammerce template. It is recommended that the [installation](https://docs.larammerce.com/8.x/getting-started/installation.html) documentation available on `Larammerce.com` be carefully reviewed before proceeding with any development work.

## Representative management features 

To work with these features, after cloning `larammerce-base-theme` and `larammerce` projects, follow instructions below:

- **First,** run `npm run prod` in your terminal to build project resources.
- **Second,** login as admin on `localhost:8080/admin`.
  
the application includes multiple parts, including a `shop` section that contains variouse subsections such as `representative management` section, which has recently been released.

![representative section](/representativeSection.png)


The representative management section allows you to access a form where you can manage the introduction method for your representatives through its various parts.

![representative form](/representativeForm.png)

In order to edit or manage the representative section, you can utilize the following options:

- The first button allows you to activate or deactivate the form.
- The second section lets you determine whether current customers can be considered as representative or not.
- In the input section, you can select various methodes through which users may have become familiar with your website.(such as Tv, social media, etc.) and define them as selectable items.

**Note:** Please be reminded to save any modifications made to the form before exiting!

Once you managed this form, check the change result by opening an incognito window on `localhost:8080`. Register to website with a random number.

Prior to registering in larammerce, consider changing `verification code sending method` on the `shop` tab. Opt fot the second option labeled `save in file` to ensure convenient access to the verification code on your project file.
Save changes!

![verification section](/verificationSection.png)

![verification form](/verificationForm.png)

As you registered with a random number, the code will be displayed on the last line of `larammerce/storage/logs/laravel.log`. Here is a sample:

```php{3}
// storage/logs/laravel.log
[2023-04-12 23:34:12] local.INFO: SMS Driver file: send: template sms-auth-code number: 09125***796
{"oneTimeCode":"9139"}  
```

Once you verified the number, you will lead to the registration form. From now on the focus will be on customizing this form as a sample:

---

### Activating representative form

The upcoming lines will feature a discussion on functions that are dedicated to the representative form, which are among the many helper functions available in the Larammerce project.

#### representative_is_enabled()

This function checks whether the representative management section is active/inactive in the admin panel.

```php
// app/Utils/CMS/Template/helpers.php
 function representative_is_enabled(): bool {
        return \App\Utils\CMS\Setting\Representative\RepresentativeSettingService::isEnabled();
    }
```

In the upcoming section, the function "representative_is_enabled()" will be utilized, and an explanation of its workings will be provided.

A directive is used in `larammerce-theme/public/views/auth-mobile-register.blade.php` to include the contents of the `_register-representative.blade.php` file:

```php
  @include("_register-representative") #line 65
```
The included file contains a form field for entering representative information during the registration process using `representative_is_enabled()` helper function.

```php{3}
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
    </div>
    <div class="col-md-6 col-sm-6 col-xs-12">
        <div class="form-gruop">
            <label for="family">شماره تماس معرف در صورت تمایل</label>
            <input type="text" class="form-control number-control" name="representative_username"
                placeholder="شماره تماس معرف"
                value="{{ old('representative_username') }}">
        </div>
    </div>
@endif
```

So now if you activate the representative form from admin pannel, and double check the registration form, the representative sections will be disappeared.

![section is enable](/repIsenable.png)

### How to pass list options 

#### representative_get_options()

Another helper function used in this form is `representative_get_options`. This fnction displays the list of user selectable options with the help of a `@foreach` loop. Here the resulting list is then displayed on the registeration form as a drop-down menu, allowing the user to indicate how they become acquainted with you.

```php{6-8}
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
./deploy.sh
```
![Drop-down](/repDropDown.png)

**Note 1:** Options were already passed in the form manually.

**Note 2:** Consider not changing the "name" attribute.

**Note 3:** You can add CSS to adjust options location on the form.

---

### How to set conditional option

#### representative_is_customer_representative_enabled()

The other function is `representative_is_customer_representative_enabled()`. By using this function you will be able to set a condition in which whether a part should be displayed or not.

The function:
```php
function representative_is_customer_representative_enabled(): bool {
        return \App\Utils\CMS\Setting\Representative\RepresentativeSettingService::isCustomerRepresentativeEnabled();
    }
```

In the upcoming section, focus on understanding how to utilize the function and the output.

```php
//register-representative.blade.php

@if(representative_is_enabled())

    ...

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
 So now if you enable the second option of the representative form in your admin pannel, this part will be displayed in the registration form, otherwise the field will be removed.

![Conditional option1](/repcondition.png)

Another example is to build a conditional option to show a specific field when a specific options is selected.
For example if you set current customers as representative, you will need a field for that customer information(for example, the phone number). So the number input will be displayed only when the current customer is selected. Otherwise this input won't be shown. See its step-by-step instruction:


- First, create an option and give it a name attribute:

```php{7}
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
    </div>
```
**Note:** this is a manual option and should be written out of the foreach loop.


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
The very next step is to add `javaScript` codes to set the apearance and adjust the options elements:

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
Here is the result: in Mode 1, the current customer is selected, so the number input field will be displayed; as you choose another option except for the "current customer" (Mode 2) this field will fade out.

![Conditional option2](/repCondition2.png)


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

:::warning Consider checking the results of your changes:

To see the changes result follow these two steps:

- first run the script below:

```bash
npm run watch
```

- Then after changes, deploy the project:

```bash
./deploy.sh
```
:::


To get the option element on select change, add condition below(line 6 & 7) to above script. Then log the information to the console(line 8 & 9) to see what's going on:

```php{6-9}
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

- Now set the condition in which if the specific option is selected, an extra field displayes otherwise it fades out. to do so :

1. Build a container on `_register-representative.blade.php` with an specific `id` and set the default display style as hidden:


```php{2}
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
border-radius: 5px; opacity: 1;" allowFullScreen="true" ></iframe>






## Representative

[[toc]]

This article serves as a comprehensive guide to effectively utilizing the representative management feature within the application. By following the step-by-step instructions provided, you will gain a strong understanding of how to manage representatives, pass list options, and set conditional options with ease and efficiency.

## Prerequities

To implement the representative management form in your application, there are a few requirements that need to be met. Firstly, you will need to ensure that you have both the `Larammerce project` and the `Larammerce-base-theme` available on your system. You can fork these projects from [Larammerce github](https://github.com/larammerce). This is a prerequisite for working with the Larammerce template. It is recommended that the [installation](https://docs.larammerce.com/8.x/getting-started/installation.html) documentation available on `Larammerce.com` be carefully reviewed before proceeding with any development work.

## Representative management features

To work with these features, after cloning `larammerce-base-theme` and `larammerce` projects, follow instructions below:

- **First,** run `npm run prod` in your terminal to build project resources.
- **Second,** login as admin on `localhost:8080/admin`.

The application includes multiple parts, including a `shop` section that contains variouse subsections such as `representative management` section.

![representative section](/representatives/representativeSection.png)

The representative management section allows you to access a form where you can manage the introduction method for your representatives through its various parts.

![representative form](/representatives/representativeForm.png)

In order to edit or manage the representative section, you can utilize the following options:

- The first button allows you to activate or deactivate the representative section in the form.
- The second section lets you determine whether current customers can be considered as representative or not.
- In the selectable items section, you can define various methods through which users may have become familiar with your website(such as Tv, social media, etc.).

**Note:** Please remember to save any modifications made to the form before exiting!

Once you managed this form, check the change result by opening an incognito window on `localhost:8080`. Register to website with a random number.

Prior to registering in larammerce, consider changing `verification code sending method` on the `shop` tab. Opt for the second option labeled `save in file` to ensure convenient access to the verification code on your project file.
Save changes!

![verification section](/representatives/verificationSection.png)

![verification form](/representatives/verificationForm.png)

Click on the `login/register` icon on top right of the page to go to this address: `localhost:8080/customer-auth/auth/mobile`.
Enter a random mobile number and press `confirm` button.

As you registered with a random number, the code will be displayed on the last line of `larammerce/storage/logs/laravel.log` file. Here is a sample:

```php{3}
// storage/logs/laravel.log
[2023-04-12 23:34:12] local.INFO: SMS Driver file: send: template sms-auth-code number: 0912****796
{"oneTimeCode":"9139"}
```

Once you verified the number, you will lead to the registration form. From now on the focus will be on customizing this form as a sample.

As you see, the items defined in the representative management form, are displayed here in the registration form as the optional items into the field named "How to get familiar with us". Let's see how this happens.

---

### Activating representative form

The upcoming lines will feature a discussion on functions that are dedicated to the representative form, which are among the many helper functions available in the Larammerce project.

#### representative_is_enabled()

This function checks whether the representative management feature is active/inactive in the admin panel.

```php
// app/Utils/CMS/Template/helpers.php
 function representative_is_enabled(): bool {
        return \App\Utils\CMS\Setting\Representative\RepresentativeSettingService::isEnabled();
    }
```

In the upcoming section, the function "representative_is_enabled()" will be utilized, and an explanation of its workings will be provided.

A directive is used in `larammerce-theme/public/views/auth-mobile-register.blade.php` file to include the contents of the `_register-representative.blade.php` file:

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

So now if you deactivate the representative feature from the admin panel, refresh the registration page, and double-check the registration form, you can see the representative field will fade out.

![section is enable](/representatives/repIsenable.png)

### How to pass list options

#### representative_get_options()

Another helper function used in this form is `representative_get_options()`. This function displays the list of user selectable options with the help of a `@foreach` loop. Here, the resulting list is then displayed on the registeration form as a drop-down menu, allowing the users to indicate how they become acquainted with you.

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

Now deploy the larammerce-theme project and refresh the registration page to see the result.

```
./deploy.sh
```

![Drop-down](/representatives/repDropDown.png)

You can even replace the select/option tag with the radio button.

```php

@foreach(representative_get_options() as $option)
<lable for="">
    {{$option}}
<input type="radio" class="form-control" name="representative_type"
  value="{{$option}}">
 </lable>
@endforeach

```

**Note 1:** Options were already passed in the representative management form manually.

**Note 2:** Consider not changing the "name" attribute of `input` tag in the `@foreach` loop.

**Note 3:** You can add CSS styles to adjust the elements position on the registration form.

---

### How to set conditional options

#### representative_is_customer_representative_enabled()

The other function is `representative_is_customer_representative_enabled()`. By using this function you will be able to set a condition in which whether a part should be displayed or not.

The function:

```php
function representative_is_customer_representative_enabled(): bool {
        return \App\Utils\CMS\Setting\Representative\RepresentativeSettingService::isCustomerRepresentativeEnabled();
    }
```

In the upcoming section, focus on understanding how to utilize the function and the output.

Add these codes to the `register-representative.blade.php` file:

```php{7-16}
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

Deploy the larammerce-theme project with `./deploy.sh` and refresh the registration page to see the result.
The second option of the representative management form(i.e. whether current customers can be considered as representatives or not), is now associated with the "representative phone number" field in the registration form.

So now if you enable the second option of the representative form in your admin pannel, this part will be displayed in the registration form, otherwise the field will be removed.

![Conditional option1](/representatives/repcondition.png)

Another example is to build a conditional option to show a specific field when a specific option is selected.

Suppose you add a new item named "current customers" to the "How to get familiar with us" field in the registration form. The idea is to display the representative phone number field in the registration form only when the user selects the "current customer" item. Let's see how to implement this idea.

- First, create an option and give it an `id` attribute:

```php{8}
//register-representative.blade.php
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

**Note:** This is a manual option and should be written out of the `foreach` loop.

- Then set an `id` and a hidden display style for the `representative phone number` field into the registration form:

```php{3}
//register-representative.blade.php
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

:::warning Applying JS Code to Blade Files

There are 2 files that include `_register-representative`:

1. larammerce-theme/public/views/auth-mobile-register.blade.php
2. larammerce-theme/public/views/auth-email-register.blade.php

Find the code below in these files:

```bash
<script>window.currentPage === "mobile-register"</script>    #line 18
```

Replace the above code with this script:

```bash
<script>window.currentPage === "auth-register"</script>    #line 18
```

So you can write one js code which is applied to the both blade files.

:::

The very next step is to add `javaScript` codes to set the appearance and adjust the optional elements. In the path `larammerce-theme/resources/js/require/`, create a new file named `page_auth_register.js` and write the following codes into this file:

```js
//larammerce-theme/resources/js/require/page_auth_register.js

if (window.currentPage === 'auth-register')
  require(['jquery'], function (jQuery) {
    const representativeSelectEl = jQuery("select[name='representative_type']")
    const representativeInputContainerEl = jQuery(
      '#representative-input-container',
    )
    if (
      representativeSelectEl.length > 0 &&
      representativeInputContainerEl.length > 0
    ) {
      representativeSelectEl.on('change', function (event) {
        const optionSelected = jQuery('option:selected', this)
        const id = optionSelected.attr('id')

        if (id === 'manual-representative') {
          representativeInputContainerEl.fadeIn()
        } else {
          representativeInputContainerEl.fadeOut()
        }
      })
    }
  })
```

Now deploy the larammerce-theme project with `./deploy.sh` and refresh the registration page to see the result.

Here is the result: in Mode 1, the current customer is selected, so the number input field will be displayed; as you choose another option except for the "current customer" (Mode 2) this field will fade out.

![Conditional option2](/representatives/repCondition2.png)

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

```js{6-9}
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

Run `npm run watch` and `./deploy.sh` and open your search engine console so to see what will happen when you select an option.
The output will be:

![Console log](/representatives/console-log.png)

- Now set the condition in which if the specific option is selected, an extra field displayes, otherwise it fades out. To do so:

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

---

<iframe src="https://www.aparat.com/video/video/embed/videohash/fZN1d/vt/frame" height="300" width="700" style="  border: 2px solid #bdc3c7;
border-radius: 5px; opacity: 1;" allowFullScreen="true" ></iframe>

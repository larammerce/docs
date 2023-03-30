## representative

[[toc]]

In this tutorial, how the list works and how to manage representatives will be discussed.

In the Larammerce project, a section called representative management has been added,
which can be accessed and activated in the admin panel in the _store tab_ and the _representative management_ branch.
Also, things like how to get to know the system through (social networks, TV, etc.) can be added as items, so that they can be displayed as a multi-mode field on the registration page.


Well, let's take a deep look at how to customize the representative management part of Larammerce, also take a look at the helper functions in the `Larammerce-theme/public/views/auth-mobile-register.blade.php` file and check out some examples.


#### representative_is_enabled()
This function checks whether the representative management section is active/inactive in the admin panel.
If the representative management section in the admin panel is inactive, the field on how to get to know the collection will not be configured on the registration page.

##### SOURCE

```php
    function representative_is_enabled(): bool
    {
        return \App\Utils\CMS\Setting\Representative\RepresentativeSettingService::isEnabled();
    }
```

##### EXAMPLE

```php{1}
@if(representative_is_enabled())
    <div class="col-md-6 col-sm-6 col-xs-12">
        <div class="form-gruop">
            <label for="representative_type">مجموعه آشنایی با مجموعه</label>
            <select class="form-control numver-control" name="representative_type"> 
                <option value="">هیچ کدام</option>
                @foreach(representative_get_options() as $option)
                    <option value="{{$option}}">{{$option}}</option>
                @endforeach
            </select>
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

And enter this command:

```bash
./deploy.sh
```

:::tip NOTE
The `representative_is_enabled()` function checks the activation of the representative management section through the `RepresentativeSettingService` service.
:::

####  representative_get_options()
The `representative_get_options()` function receives all the items that the customer can choose from the drop-down menu during registration
(the menu of how to get to know the collection) and configures it with the help of `foreach`.

##### SOURCE

```php
    function representative_get_options(): array
    {
        return \App\Utils\CMS\Setting\Representative\RepresentativeSettingService::getOptions();
    }
```

In the example below, all the representative items are configured with the help of `foreach`.

##### EXAMPLE

```php{3}
<select class="form-control numver-control" name="representative_type"> 
    <option value="">هیچ کدام</option>
    @foreach(representative_get_options() as $option)
        <option value="{{$option}}">{{$option}}</option>
    @endforeach
</select>
```

And enter this command:

```bash
./deploy.sh
```

#### representative_is_customer_representative_enabled()
The `representative_is_customer_representative_enabled()` function configures the customer representative contact number field on the registration page.
Note that on the representative management page, the customer representative contact number field is enabled by default.

##### SOURCE

```php
    function representative_is_customer_representative_enabled(): bool
    {
        return \App\Utils\CMS\Setting\Representative\RepresentativeSettingService::isCustomerRepresentativeEnabled();
    }
```

This field can be configured conditionally, so see the example below.

##### EXAMPLE

```php{1}
@if(representative_is_customer_representative_enabled())
    <div class="col-md-6 col-sm-6 col-xs-12">
        <div class="form-gruop">
            <label for="family">شماره تماس معرف در صورت تمایل</label>
            <input type="text" class="form-control number-control" name="representative_username" placeholder="شماره تماس معرف"
                value="{{ old('representative_username') }}">
        </div>
    </div>
@endif
```

And enter this command:

```bash
./deploy.sh
```

If the customer representative option is not enabled in the admin panel, this field will not be configured on the registration page.

The (customer contact number) field can be customized so that if the user clicks on one of the (customer representative) field items, the (customer contact number) field will be enabled/disabled.

Let's examine an example:

In the first step, an `option` with the id `manual-representative` should be added outside of the `foreach` command.

##### EXAMPLE

```php{7,15}
@if(representative_is_enabled())
    <div class="col-md-6 col-sm-6 col-xs-12">
        <div class="form-gruop">
            <label for="representative_type">مجموعه آشنایی با مجموعه</label>
            <select class="form-control numver-control" name="representative_type"> 
                <option value="">هیچ کدام</option>
                <option value="مشتریان فعلی مجموعه" id="manual-representative">مشتریان فعلی مجموعه</option>
                @foreach(representative_get_options() as $option)
                    <option value="{{$option}}">{{$option}}</option>
                @endforeach
            </select>
        </div>
    </div>
    @if(representative_is_customer_representative_enabled())
    <div class="col-md-6 col-sm-6 col-xs-12" id="representative_input_container" style="display: none">
        <div class="form-gruop">
            <label for="family">شماره تماس معرف در صورت تمایل</label>
            <input type="text" class="form-control number-control" name="representative_username" placeholder="شماره تماس معرف"
                value="{{ old('representative_username') }}">
        </div>
    </div>
@endif

@endif
```

At this stage, a JavaScript script should be implemented to customize the field. So a file named `page_auth_register.js` in the path `resources/assets/js/require` it must be made.

##### EXAMPLE

```js
if (window.currentPage === "auth-register")
    require(["jquery"], function (jQuery) {
        const representativeSelectEl = jQuery("select[name='representative_type']");
        const representativeInputContainerEl = jQuery("#representative_input_container");
        //A way to check the presence of an element on the page in the jquery framework.
        if(representativeSelectEl.length > 0 && representativeInputContainerEl.length > 0){
            representativeSelectEl.on("change", function(event){
                const optionSelected = jQuery("option:selected", this);
                const id = optionSelected.attr("id");
                
                if (id === "manual-representative"){
                    representativeInputContainerEl.fadeIn();
                }else{
                    representativeInputContainerEl.fadeOut();
                }
            });
        }
    });
```

And enter this command:

```bash
./deploy.sh
```

#### Video source
___

<iframe src="https://www.aparat.com/video/video/embed/videohash/fZN1d/vt/frame"  height="300" width="700" style="  border: 2px solid #bdc3c7; border-radius: 5px; opacity: 1;" allowFullScreen="true"></iframe>

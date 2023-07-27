## Pop ups in larammerce template engine

[[toc]]

Pop-ups are website elements that appear over the page content to display important information or encourage user actions. Let's manage a pop up in the Larammerce platform to see how it works.

### Admin panel setting

To implement a pop-up on your website, firstly, access the administrative panel, then Adjust the required settings in accordance with your pop-up specifications.

1. Access the administration panel by entering `localhost:8080/admin/` into your web browser's address bar.
2. Navigate to the `/directory` endpoint and access its settings.
3. Select the Modals Management section from the available options.
4. Click the plus button located at the bottom-left corner of the page to add a new modal.
5. Fill out the form with the desired title and description, configure the popup size, specify the number of appearances, and select an appropriate image.
6. Save the settings.

7. Customize the action button keys that should be displayed to the user in the pop-up window by specifying their title, color, and type. If you have chosen the link type, ensure that the appropriate hyperlink is set. You may add multiple buttons to the pop-up window as desired.

8. Upon completing the customization of the pop-up window, save the settings to enable its functionality.

9. And here are the revised descriptions for the steps related to setting routes:

- Begin by clicking on the plus button and entering the desired route.
- In the pop-up form, you will see two options: 'Include Path' and 'Include Child Paths'. Selecting the first option will display the pop-up only for the specified path, whereas selecting the second option will display the pop-up for all child routes associated with the specified path. Choose the relevant option based on your requirements.

### Modal blade file setting

Within the Larammerce project, a modal sample file has been defined in `larammerce/resources/view/admin/template/modals/custom_modal.blade.php`. This template can be easily utilized and customized to meet your specific requirements.

To create a blade file named `custom_modal `within the `larammerce-base-theme` project, navigate to `public/views/` and insert the provided code from the modal template into this file.

```html
<div id="modal-global-{{$modal->id}}" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
          style="float: left"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="title">{{ $modal->title }}</h4>
      </div>
      <div class="modal-body">
        <p>{{ $modal->text }}</p>
        @if($modal->hasImage())
        <img src="{{ $modal->image_path }}" alt="image for system message" />
        @endif
      </div>
      <div class="modal-footer">
        @foreach ($modal->getDecodedButtons() as $button) @if($button->type ===
        "data-dismiss")
        <button
          data-dismiss="modal"
          type="button"
          class="{{$button->tag_class}}"
        >
          {{$button->text}}
        </button>
        @else
        <a class="{{$button->tag_class}}" href="{{$button->link}}"
          >{{$button->text}}</a
        >
        @endif @endforeach
      </div>
    </div>
  </div>
</div>
```

To modify the `Modal.php` file within the Larammerce application, navigate to `larammerce/app/models/Modal.php` and insert the following code. This code will set the `$template` variable to `public.custom_modal` if this view exists:

```php

public function html(): string
    {
        $template = "admin.templates.modals.custom_modal";
        if (View::exists("public.custom_modal"))
            $template = "public.custom_modal";
        try {
            return h_view($template)->with(["modal" => $this])->render();
        } catch (\Throwable $e) {
            return '';
        }
    }
```

In addition to using and customizing the `custom_modal` template, the modal object also has several fields, including `title` and `text`, that can be modified or augmented with new fields. To modify these fields, use the following code in the `Modal.php` file:

```php
protected $fillable = [
        'title', 'text', 'repeat_count', 'template', 'size_class', 'buttons'
    ];
```

With this code, you can easily customize the pop-up based on your requirements. For example, to adjust the size of the modal based on its size class (such as sm or lg), insert the following code into the aforementioned code block:

```html
<div
  id="modal-global-{{$modal->id}}"
  class="modal fade {{$modal->size_class}}"
  role="dialog"
></div>
```

This added HTML code will allow for greater customization options when implementing the custom_modal template.

#### Video source

---

<iframe src="https://www.aparat.com/video/video/embed/videohash/VEq3b/vt/frame"  height="300" width="700" style="  border: 2px solid #bdc3c7; border-radius: 5px; opacity: 1;" allowFullScreen="true"></iframe>

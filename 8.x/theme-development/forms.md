## Template web forms

[[toc]]

With every web form, you can get information from the user.
Web form or HTML form on a web page allows a user to enter data that is sent to a server for processing.
For example, the image below is a contact web form that asks the user for information such as (Name, Email, Phone Number, Subject and Text Message).

![contact us](/form.jpeg)

To manage the forms in Larammerce, you can return the form in the site format automatically without writing back-end codes so that every time this form is submitted by each user of the system, a message will be added to the system's messages.

Let's take a look at the schema of web forms in Larammerce.
For example, let's look at the contact form.

First, open the contact file in the project template: `public/views/contact.blade.php`.

Each **form** must have two attributes:

```php
<form hct-form="contact-form" hct-title="Contact Form">
```

#### 1. The hct-form Attribute

---

The `hct-form` attribute defines the form ID.

#### 2. The hct-title Attribute

---

The `hct-title` attribute defines form title in the panel.

Each **form field** (textarea, input, button, etc.) must have two attributes along with its other attributes:

```php
<input hct-form-field type="text" class="form-control" name="name" placeholder="Full Name"
      hct-validation="required" value="{{old('name')}}">
```

#### 1. The hct-form-field Attribute

---

The `hct-form-field` attribute specifies that a field is of its external form.

#### 2. The hct-validation Attribute

---

The `hct-form-field` attribute specifies the validation of each field, in fact, for each submit, it checks the validation principles of each field.

**NOTE:** The `hct-form-field` attribute acts like Laravel validation format.
For more information, see "[Validation](https://laravel.com/docs/9.x/validation)".

**NOTE:** It should be noted that you can also customize the validation of fields.

##### EXAMPLE

```php
hct-validation="required|regex:/0[1-9][0-9]{9}/|max:11
```

#### Video source

---

<iframe src="https://www.aparat.com/video/video/embed/videohash/cRab0/vt/frame"  height="300" width="700" style="  border: 2px solid #bdc3c7; border-radius: 5px; opacity: 1;" allowFullScreen="true"></iframe>

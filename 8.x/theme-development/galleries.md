## Template galleries

[[toc]]

In the Larammerce Template Engine, any section that is repetitive and it's needed to be managed by the website admin to create/update/delete a list of them; Can be implemented by the template engine galleries.

For example, the image below is the faq page. On this page, there is a fixed section of questions and answers but repetitive.
![faq-page.png](/faq-page.png)

Let's take a look at how the gallery is made.

First, one of the Larammerce template projects is reviewed, open the .blade file named: `public/views/faq.blade.php`:

```html
  <div class="top-line-content" hct-gallery="faqs" hct-title='پرسش وپاسخ ها' hct-max-entry="7" hct-random-select>
```
In this tag there are attributes that each of them are described separately:
```html
hct-gallery="faqs"
```
This attribute is to say that there is a gallery called faq. To name this attribute, the rules for variables must be observed.
- A variable name must start with a letter or the underscore character.
- A variable name cannot start with a number.
- A variable name can only contain alpha-numeric characters and underscores (A-z, 0-9, and _ )

```html
hct-title='پرسش وپاسخ ها'
```
**hct-title** show the title of this gallery.

```html
hct-max-entry="7"
```
The gallery shows only seven of the contents created by the website admin.This value can be changed as desired.

```html
hct-random-select
```
This attribute tells the system to sort the gallery items in a random order; if not set, the order would be sorted by the priority of each item.

There is an **ul** tag in the **div** tag, It must have a hidden class using bootstrap or any other frameworks or the display: none style in any implementation.

```html
<ul class="hidden-xl hidden-lg hidden-md hidden-sm hidden-xs" hct-gallery-fields>
                <li hct-gallery-field="question" hct-title="سوال"></li>
                <li hct-gallery-field="description" hct-title="جواب"></li>
            </ul>
```
**hct-gallery-fields** specifies that each gallery item related to the faq gallery has fields called questions and answers.

For example, if it's going to be used to manage a slider of photos on the website, the slider itself would be the gallery and each slide (containing its photo, title, link, etc.) goes to be the gallery item.

The first hct-gallery-field is the question. With the title of the question.

The second hct-gallery-field is the description. With the title of the Answer.

The next section is hct-gallery-item:
```html
<div class="desc" hct-gallery-item>
    <strong class="question">
        <i class="fa fa-angle-left"></i>
            {%- ex-prop:question %}
    </strong>
    <div class="answer">
            {%- ex-prop:description %}
    </div>
</div>
```
This section is repeated in the gallery.

ex-prop and prop can be used when a tag has the hct-gallery-item attribute.

Now let's build a gallery:

Open the admin panel in the browser and go to settings and click on gallery. In the picture below, you can see the pre-created galleries.

![gallery-list.png](/gallery-list.png)

Click the Plus button to create a new gallery called faqs.

![add-gallery.png](/add-gallery.png)

You can see the faq gallery has two question and answer fields.

To add a new field, you must enter the following code in the ul tag:

```html
        <li hct-gallery-field="rating" hct-title="ریت جواب"></li>
```
And add the following code to the gallery item:
```html
        <span>
            {%- ex-prop:rating %}
        </span>
```
After entering the codes, enter this command to deploy the resources to the backend directory:
```bash
./deploy.sh
```
Refresh and open the admin panel to see the rate filld added.

![add-gallery-item.png](/add-gallery-item.png)

Now add a new item to the question, answer, and rate fields:

![add-gallery-item2.png](/add-gallery-item2.png)

To make the order of the items a priority, delete the hct-random-select property. Click the `./deploy.sh` command, enter the admin panel, select the desired item and change the priority level.

![priority.png](/priority.png)

Now add an **image** to the gallery.Click the edit gallery item button to add an image.Then add the following code to the gallery item to display image in gallery:

```html
<img hct-attr-src="{%- prop:description %}"
    alt="{%- ex-prop:main_title %}" class="img-fluid"/>
```
now enter `./deploy.sh` command.Open the admin panel to see the image added.

In order for the **id** to be displayed in the gallery, the content print tag must be used:
```html
<h5>"{%- prop:id %}"</h5>
```
> ex-prop = Properties that you defined.

> prop  = Properties related to the gallery item.

Enter this command:
```bash
./deploy.sh
```
After all you can check to the URL of your web page in a browser and see the page is created with the gallery:
>https://localhot:8080/faq

#### Video source
___

<iframe src="https://www.aparat.com/video/video/embed/videohash/IDN4H/vt/frame"  height="300" width="700" style="  border: 2px solid #bdc3c7; border-radius: 5px; opacity: 1;" allowFullScreen="true"></iframe>

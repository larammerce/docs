## Static Content

[[toc]]

This section explains how to create templates with
Static Content that can be edited through the admin panel.

For example, the image below shows a page of a website created with Larammerce.
![example-template.png](/example-template.png)

The contents of this page are text and photos. In the previous section, creating this content was taught statically. But for the site admin to be able to edit this content, you need to get acquainted with the **content** module.

## Content module
There is a content module in the Larammerce Template Enginee so that the admin can edit the site content. To edit the contents of the html tag, the following three attributes must be added to the tag.
```bash
hct-content="variable name"  # Here is added a variable name.
hct-title='title' # Here is a title that is displayed on the site
hct-content-type="content types" # Here is added one of the content types
```
There are 7 content types in the Larammerce Template Enginee:
- text
- rich_text
- image
- video
- audio
- link
- file

Let's check the content types:
### Text
For texts, the **text** content type should be used.

Create layouts to check the content types:

First, create the following file `public/views/static-content.blade.php` 

Put the following in the file:
```html
<div>
    <h1>This is the title of this page</h1>
    <p>This is the description of this page</p>
</div>
```
And enter this command to deploy the resources to the backend directory:
```bash
./deploy.sh
```
Open the admin panel in the browser and in the list of directories:

Click the Plus button ![Plus button](/plus-button.png), then create a new folder ![new-folder](/new-folder.png).

The new folder settings are as follows:

![static-content-page](/static-content-page.png)

Enter a **title** and **url section** for this page .
>title: Static Contents

>url section: static-contents
 
Activate the **Web page button** to connect the blade page. Then click the **Edit webpage button** and select the **static-contents** blade.

After all, you can check the **localhost/8080/static-contents** URL of your web page in a browser and see the page is created with the desired contents.

See the created page in the image below:
![content-type-text](/content-type-text-1.png)

Now attributes must be added to the tag for the admin to be able to edit the text:
```html
<div>
    <h1 hct-content="page_title"
        hct-content-type="text"
        hct-title='عنوان صفحه'>This is the title of this page</h1>

    <p>This is the description of this page</p>
</div>
```
Enter this command:
```bash
./deploy.sh
```
After refreshing the editing page, an input is created where the text can be edited:

![content-type-text](/content-type-text-2.png)

By changing the text and hitting the save button, the text of the page also changes.

### Rich_text
For rich text, the **rich_text** content type should be used.

Add attributes to the tag to create rich-text:
```html
<div>
    <p hct-content="page_description"
        hct-content-type="rich_text"
        hct-title='متن توضیحات'>This is the description of this page</p>
</div>
```
Enter this command:
```bash
./deploy.sh
```
After refreshing the editing page, rich-text was created:

![content-type-rich-text](/content-type-rich-text.png)

### Image
Add **image** content type to insert image and manage image with admin.

Add **htc** attributes to the **img** tag to create image:
```html
<div>
    <img hct-content="first_banner"
        hct-content-type="image"
        hct-title='اولین بنر صفحه'
            src="/HCMS-assets/img/banner1.jpg" alt="Test"/>
        >
</div>
```
Enter this command:
```bash
./deploy.sh
```
After refreshing the editing page, image was created:

![content-type-image](/content-type-image-1.png)

After creating the image content, the admin can change the image.

Check the URL of your web page in a browser and see the page is created with the desired contents:

![content-type-image](/content-type-image-2.png)

### Video
In order for the video to be added to the web page and for the site admin to edit it, you must add the **htc** attributes to the video tag.
```html
<div>
    <video poster="/HCMS-assets/img/videp-poster.jpg"
        hct-content="video"
        hct-content-type="video"
        hct-title='ویدئو'
        aria-controls="true" controls>
        <source src="/HCMS-assets/video/larammerece.mp4">
            Your browser does not support the video tag.
    </video>>
</div>
```
Enter this command:
```bash
./deploy.sh
```
Refresh the editing web page:

![content-type-image](/content-type-video.png)

**Video** contact has been added and the admin can edit the video.

### Audio
Add **audio** content type as follows:
```html
<div>
    <audio
        hct-content="audio"
        hct-content-type="audio"
        hct-title='صدا'
        aria-controls="true" controls>
        <source src="/HCMS-assets/audio/larammerece.mp3">
            Your browser does not support the audio tag.
    </audio>>
</div>
```
Enter this command:
```bash
./deploy.sh
```
By changing the audio and hitting the save button, the audio can be changed.

### Link
**Link** contact type is used to create an input where the admin can place a link on the web page.
```html
<div>
    <a  hct-content="my_link"
        hct-content-type="link"
        hct-title='لینک مورد نظر'
        href="#" title="Test Link">This is a test link</a>
</div>
```
Enter this command:
```bash
./deploy.sh
```
Refresh the editing web page:

![content-type-image](/content-type-link.png)

 **link** contact type created.

### File
Add the following attributes to create the **file** contact type:

```html
<div>
    <a  hct-content="my_file"
        hct-content-type="file"
        hct-title=' فایل یکم '
        href="#" title="Test">ّFile</a>
</div>
```
Enter this command:
```bash
./deploy.sh
```
After creating the file content type, the admin can change the file.
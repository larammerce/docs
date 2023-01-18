# Documentation (# = h1)

[[toc]] -> (yani az inja be ba'd , tag haye h2 va h3 bayad dar sidebare samte rast neshan dade shavand)

Larammerce is getting documented, as well as developed at high speed. So if you want to be on track, follow the guides.

## Contribute (## = h2)

Please read and understand.

### Important (### = h3)

- docs (- = bullet)
- [docs]() -> (ijade link [kalme]())
- [docs](https://docs.larammerce.com/) -> (adres dehiye link [kalme](adres))

link be site haye digar nabayad dar vasate safhe bashad . balke ya dar ghesmate reference ha minevisim ya masalan dakhele blocke warning gharar midahim.

## how to submit

- use the [pull request](https://github.com/larammerce/larammerce/blob/8.x/.github/PULL_REQUEST_TEMPLATE.md)

## pr requirements

Tests **must** not fail. -> (** ** = bold kardan)

You can run `vendor/bin/phpunit` -> (` ` = highlight kardan. baraye technical words mesle local host)

The PR **must** be located in [https://github.com](https://github.com) repository.

This method is the *most effective* way to this repository. -> (* * = italic kardan)

You should create a solid online reputation.<sup> 1</sup> -> (<sup> </sup> = superscript)

You should create a solid online reputation.*<sup> 1</sup>* -> (*<sup> </sup>* = superscript va italic)

You should create a solid online reputation.[1](#1) -> ([shomare](#shomare) = reference)

You should create a solid online reputation.*<sup>[1](#1)</sup>* -> (*<sup>[shomare](#shomare)</sup>* = reference superscript va italic)

> Every user story consists of one or two sentences written and, more importantly, a series of conversations about optimal performance.

(> = naghle ghol)

> *naghle ghole italic*

(> * * = naghle ghole italic)

**1.** What is your job?

#### ijade jadval

Name | Age | job
-----|-----|-----
amir | 23 | developer
sara | 18 | gamer
arash | 30 | leader

##### ijade code rangi dar bash

(##### = h5 - in tag ra dar sidebare samte rast neshan nemidahad)

```bash
code
```

```bash
git checkout -b
```

##### ijade comment dar code bash

```bash
git checkout -b #in comment hast.
```

##### ijade code siah o sefid

```
code
```

```
git checkout -b
```

##### ijade code php

```php
$a=amir;
...
echo $a;
# output: amir
...
```
se noghte yani dar inja ham code hayi vojud darad ke felan madde nazare ma nist.

##### ijade code css

```stylus
p{color:red}
.stars{align:right}
#name{display:block}
```

##### ijade code json

```json
{
    "keyA": "valueA",
    "keyB": [
        "item1",
        "item2"
    ]
}
```

### gozashtane image

![gozashtane image: image aval](/description.jpg)

##### file image ra dar in adres migozarim:
.vuepress\public\assets

#### faghat dar 3 halat mitavanim az aks dar dakhele file markdown estefade konim:
1. jayi az panele admin ra mikhahim tozih bedahim va ba matn shodani nist.
2. jayi ke yek technical concept ra mikhahim tozih bedahim ke yek aks hast ba meghdare ziadi matn.
3. jayi ke mikhahim yek roadmap ya life cycle ya uml diagram ra neshan bedahim.

#### ijade warning

::: warning
in yek warning ast.
:::

#### ijade danger

::: danger
in yek danger ast.
:::

### namayeshe path va directory

```
|---views/
    |---index.blade.php
    |---css
        |---style.css
```

### namayeshe path va directory rangi

```bash
|---views/
    |---index.blade.php
    |---css
        |---style.css
```

### adres dehi be file hamin proje

Go to the file `/path/to/your/docs/.vuepress/styles/palette.styl` and complete the code:

```stylus
// .vuepress/styles/palette.styl

$accentColor = #ff291b
$MQMobile = 992px
$codeBgColor = #3f3f3f
$navbarHeight=5.5rem
$nprogressColor = #42b983
$sidebarWidth=16rem
```

### link dadan be yek ghesmate khas az yek safheye digar az hamin document

For further study , go to this link [/8.x/getting-started/contributing.html#etiquette](/8.x/getting-started/contributing.html#etiquette)

ruye alamate sharp dar kenare an ghesmat click mikonim va url ra bedune localhost:8081 copy mikonim va be onvane adrese link estefade mikonim.

## gozashtane video

<iframe src="https://www.aparat.com/video/video/embed/videohash/6et8I/vt/frame"  allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>

faghat code iframe ra copy mikonim.
video ra dar payin tarin ghesmate document migozarim.

#### References

(#### = h4 - in tag ra dar sidebare samte rast neshan nemidahad)

___

(3 ta underline = yek khate ofoghi)

*1. <a name="1">[What is pr ?](https://www.google.com/pr)</a>*

(reference nevisi : *<a name="shomare">[kalme](adres)</a>*)
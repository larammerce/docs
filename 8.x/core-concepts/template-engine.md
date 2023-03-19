## Template engine

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


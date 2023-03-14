## installation

[[toc]]

Larammerce is an open-source ecommerce platform that helps business owners to focus on their concerns and just have the whole complete solution for their online market.

It's been built on top of [Laravel framework](https://laravel.com) which is open source and free to use.

This guide is a comprehensive resource for both development and production environment setup. We welcome your contributions to Larammerce!


Note: The instruction of development is based on Linux/Ubuntu22.04, and the instruction of production is based in linux/CentOS7.

---

## Development installation guide

To develop on Larammerce project, sufficient knowledge of `PHP` and `Laravel framework` is vital. Follow requirements and setup instructions demonstrated in this article. 

### Requirements


| Title |  Description |
|-----------|-------------------|
| Operation system | linux |
| Linux distribution | Ubuntu 22.04 |
| Relational database | MySQL5.7 or higher|
| Interpreter | PHP version 8.0 |
| Node.js | Version 16 (Recomended)|
| Package manager | Composer |
| Cache DB| Redis |
 
---

#### Install linux and ubuntu

However `PHP` is already a cross-platform language and doesn't need a unique platform; Still, to extend Larammerce project scripts and develop them, you must be running a *`Linux`* *<sup>[1](#1)</sup>* operation system or a *`WSL`* *<sup>[2](#2)</sup>* (Windows Subsystem for Linux) on your windows due to the lateral scripts involved with this project.

If you are already using linux, please install `Ubuntu` distro, and if using `WSL`, no need to do extra! By default, the installed Linux distribution will be Ubuntu.

**Note:** Rather than other distros,`Ubuntu` is ideal for early adopters, is more reliable and has community support and complete documantation.


Here we assume you have Ubuntu distribution either on your `Linux` or `WSL`.

Once you finalized these installations, open powershell or wsl shell and write the command `lsb_release -a ` just to check your current operating system info.
Also by running ` df -h ` you will be able to see your storage details.

::: warning Administration warning

Consider that if you are in administration mode `(#)` in your powershell you have to really watch out about the commands you commit. For safety, its better to commit as a regular user`($)`.

:::


---

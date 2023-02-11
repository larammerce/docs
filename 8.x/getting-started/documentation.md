## Documentation

[[toc]]

This article is a complete guide to writing documents for the larammarce project.<br/>
Larammerce documentation is composing with *markdown syntax* *<sup>[1](#1)</sup>*.also initial knowledge of *git commands* *<sup>[2](#2)</sup>* is necessary.

### Starting point </br>

If this is your first contribution, follow instructions composed on [`contributing`](https://docs.larammerce.com/8.x/getting-started/contributing.html#contributing) article on [`larammerce.com`](https://larammerce.com/).

### Requirements
| Tool name        | Version(distro)                                                       |
|------------------|-----------------------------------------------------------------------|
| Operating system | Every version of windows,Osx, linux supporting installation of Node.js |
| Node.js           | V16 or higher                                                         |

::: warning NODE version support :

Consider that no errors will be detected using Node.js version 16 for this project.
:::

You can Install [Node.js](https://nodejs.org/en/download/) here.</br>

::: warning In order to use a different Node.js version, install `nvm` or `direnv` following description below: :::

- **_[Install nvm](https://github.com/nvm-sh/nvm)_**  </br>nvm is a tool which gives you the ability to switch between different versions of Node depends on project's requirements. <br/>

OR

- **_[Install direnv](https://direnv.net/docs/installation.html)_** </br>You can set an environment variable to enable **_legacy_** mode by creating a file named `.envrc` on `.gitignore` directory including code below :

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```
### Overall structure

<br/> Each document must consist of the following parts:<br/><br/>

**1) Introduction** :<br/>
Describe the overall view of the page by writing a general illustration of the represented subject. <br/>

**2) Technical description** :<br/>
Write technical details based on markdown structure.<br/>

**2) Sum Up** :<br/>
Make a brief review of the parts above (optional) and write the page references.<br/><br/><br/>

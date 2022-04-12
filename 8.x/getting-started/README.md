---
pageClass: no-toc
---

# Introduction

+ This guide serves as a resource to users needing direction in navigating the Larammerce interface. 
We detail the aspects involved with setting up your store: complete with keeping it up to date to the latest version, meeting the technical requirements, accessing the admin panel, and uninstallation. 
The User Guide covers the essentials tools used for managing your store front through the administration side.
When you are finished reading this guide, you will be comfortable with using the Larammerce interface to set up your online shop and maintain it over time.
# User Story Introduction & Participation in the Larammerce
+ ***Larammerce*** is an open source ***e-commerce*** platform for business owners who need a complete and sustainable solution for their online marketplace. No matter what the scenario is, we can automate it for you.
+ The Larammerce project has a website at [larammerce.com](https://larammerce.com/), which includes a series of descriptions and introductions, as well as a Docs page that houses the project documentation. Also, our project ***gitlab*** is located on ***hinza*** servers at [gitlab.hinzaco.com](https://gitlab.hinzaco.com/), and finally we have an online repository on ***github*** at [github.com/larammerce](https://github.com/larammerce), which includes open source sections, and these are all There are tools we use.
+ Larammerce is based on ***Laravel*** framework, also completely documented and supported by open-source community. so there is no risk about the dependencies on a specific team or future developments and maintainance of the project. 
+ We use a project management tool called ***taiga*** where the project backlog is publicly available. You can see the backlog and the list of user stories at the following address:

> [tree.taiga.io/project/a-khajelou-larammerce/bakelog](https://tree.taiga.io/project/a-khajelou-larammerce/bakelog)

## What is User Story?

+ ***User Story*** is usually a term in software development and management in various fields that will be collected to describe customer needs.. In software development and product management, the user story is an informal, natural language description that describes one or more features of the software system. user story is a tool used in ***Agile*** software development to describe a software feature from an end user perspective. User story users describe what they want and why. user story helps to create a simple description of a need.

It is interesting to know that ***Mike Cohn***, who is one of the main inventors of the ***Scrum*** development method, quotes as follows:
> *Every user story consists of one or two sentences written and, more importantly, a series of conversations about optimal performance.*

## Why User Story?

+ With the user story approach, we are content with "just enough" design instead of large and comprehensive design. user story Reduces the time required to write comprehensive documentation by emphasizing customer-centric conversations. As a result, user story enables teams to deliver quality software faster.
+ User Story method will save time; Because it is modified and improved according to the users. As a result, the quality in the process of software development or other products has increased and the upcoming project will be liked by the customer.


## Working with User Story:

+ The user's story is written in simple language that must pursue a specific purpose and have a specific reason. The user in the story must be real and not a member of the development team. There may be multiple user stories in the system that have the same benefits. This is normal. It's a good idea to start drafting a User Story. The draft must first meet your essential needs. That:

**1. Who is it designed for?**

**2. What are the expectations from the system?**

**3. Why is it important?**

+ However, we must say that the user's story is in fact a process during which needs are discovered and should not be used as a document to analyze needs. In traditional methods, the system analyst usually tried to understand the customer's needs, but in modern methods, the following steps must be followed to identify the User Story:

**1. You need to talk to users.**

**2. User needs are written as a user story. This post should specify what the user needs and what the goal is.**

**3. After writing the needs, we will be faced with a source of user needs that must be fully understood and reviewed by the team.**

## How It Works?

+ Meetings are held in the team structure in which we make decisions and technical discussions about user stories according to the scrum framework, and finally, after completing this procedure, the team enters the execution stage and then produces.
Briefly includes the following:

**1. We specify the generalities.**

**2. We divide the generals into separate sections.**

**3. We create user story for each section.**

**4. We divide user story into smaller sections And then we sort.**

**5. I preferably leave each small user story to one person(programmer) to execute.**

**6. After user stories are created, the person (programmer) is required to create their own tasks. And for this purpose acts as follows.**
> *User story & Task:*
> *User stories are listed in the backlog, but tasks are identified during the programming team planning session and are part of the backlog sprint.*
> *also User stories are usually done by more than one person, but tasks are performed by one person.*

#### How to create a new task?

+ After the user stories are created, the person (programmer) is obliged to create their tasks. For this purpose, we use the taiga tool at [taiga.io](https://www.taiga.io/). To create the task (for example:***task 449***), we enter the desired sprint section. And we do things based on priority, and the order of priority is done for us by the project manager.

+ When we ***first*** clone the project we are on the project banch ***master*** by default, when the user story is left to us to create the code for it we can never make changes to the ***main branch*** of the project, so need Is that we must create a ***sub-branch*** of the main branch of the cloned project.

> *For this purpose, in this section, to better understand you, we will go through the steps of creating a task together:*

**1. In this step we create a sub-branch on our main project:**

   **NOTE**: Here the ***stable*** branch is actually the name of the main branch of our project that we can not modify.

##### Example:

```bash
git chekout stable #We get out of the stable brunch.
git chekout -b feature/docs-boilerplate #We create a sub-branch.
Switched to a new branch 'feature/docs-boilerplate'
```

**2. In this step, we enter the desired code in our project or change it:**

   **NOTE**: We make these changes to the `TEST.php` file.

##### Example:

```php
#this is a test line to create a test commit.
```

**3. Each time you complete a piece of work, you must add the files to a staging environment:**

##### Example:

```bash
git add TEST.php
```

**4. In this step we commit our changes:**

##### Example:

```bash
git commit -a #Execute the commit step with the help of this command.
```
   **NOTE**: Make sure your commit message is concise, and that the commit message should include grammatical verbs.

   **NOTE**: In the third line we can write a brief description of the task performed.

   **NOTE**: In the third line we can have a brief description of the work done. Here is a requirement that we suggest you do:
If in the third line we write and save the command `TG-449 #in-progress` or `TG-449 #ready-for-rest `, when we enter the taiga site in the taskbar in the browser, We will see that our task number ***449*** has been entered from the new section in progress or ready for testing.

   **NOTE:** A very important point in handling tasks that should be mentioned here is that only Only one person named Tester can put the task in close or need info mode.

##### Example:

```bash
Design the pages.

TG-449 #in-progress
```
**OR**

```bash
Design the pages.

TG-449 #ready-for-test 
```
**AND**
```bash
git status #See the changes using the git status command
[feature/docs-boilerplate (root-commit) cc04ebe] Design the pages
 1 file changed, 3 insertions(+)
 create mode 100644 TEST.php

```

**5. We put the file we want in github using the following command:**

##### Example:

```bash
git push --set-upstream origin feature/docs-boilerplate
```

6. **Finally, we enter the merge request stage, which proceeds as follows:**


+ The following is a brief description of how to participate in larammerce:

## Quick Start:

+ Our sprints are now once every ***two weeks***, if you are given a user story you have two weeks to execute the desired user story, but this does not mean that we end user stories at the end To run 30% sprint, ***we have to run a series of user stories every week or weekend.***

+ Currently we have an average of ***8 points*** for the user story to be done.

+ Team members must complete merge requset by the end of each week (8 points).

+ ***Team members must have completed (8 points) merge request by the end of each week***, and this is an important rule in the larammerce team.

+ After doing the user story, the person who tests the user story or in fact your code, if there is no problem in doing the user story, ***will move the user story from the Ready for test column to the Closed column***.That means doing your user story perfectly and flawlessly.

+ Finally, we enter the payment cycle discussion, which determines the payment based on the number of points ***([Fibonacci numbers](https://en.wikipedia.org/wiki/Fibonacci_number))*** performed by the individual.

## Overview:

+ In this document, we tried our best to share a brief introduction of larammerce and also how to participate in it, as well as about user stories and with examples, we tried how to assign a user story and also how to perform tasks. To show you dear friends. 
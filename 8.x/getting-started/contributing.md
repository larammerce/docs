# Contributing

[[toc]]

Please read and understand the contribution guide before creating an issue or pull request.

## Important Links

- [Docs](https://docs.larammerce.com/)
- [Issue tracker](https://github.com/larammerce/larammerce/issues)
- [Support](/8.x/getting-started/support.html)

## Etiquette

This project is an open source project, and as such, the maintainers use their free time to build and maintain it.
The code is freely available and can be used, forked and modified. 

Please be considerate towards maintainers when raising issues or presenting pull requests. 

It's the duty of the maintainer to ensure that all submissions to the project are of sufficient
quality to benefit the project. Many developers have different skill sets, strengths, and weaknesses. Respect the maintainer's decision, and do not be upset or abusive if your submission is not used.

## Viability

When requesting or submitting new features, first consider whether it might be useful to others. Open
source projects are used by many developers, who may have entirely different needs to your own. Think about
whether or not your feature is likely to be used by other users of the project.

## How to submit changes?

- Check the codebase to ensure that your feature doesn't already exist.
- Check the pull requests to ensure that another person hasn't already submitted the feature or fix.
- Use the [pull request template](https://github.com/larammerce/larammerce/blob/8.x/.github/PULL_REQUEST_TEMPLATE.md).

## How to report a bug?

- Attempt to replicate the problem, to ensure that it wasn't a coincidental incident.
- Check to make sure your bug report isn't already present within the project.
- Check the pull requests tab to ensure that the bug doesn't have a fix in progress.
- Check the pull requests tab to ensure that the feature isn't already in progress.
- Use the [issue template](https://github.com/larammerce/larammerce/blob/8.x/.github/ISSUE_TEMPLATE.md).

## PR Requirements
- The PR **must** apply to [PSR-2 Coding Standard](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md). StyleCI help you detect code style issues.
- The PR **must** be as clean as possible. Try to remove all inline TODOs and unneeded comments. They are noise and distraction for the reviewer. Use Github's (inline) comment system to start a discussion about a change.
- The existing tests **must** not fail after your changes. This would indicate that existing functionality is broken and should be addressed before a review is started. You can run the test by running `vendor/bin/phpunit`
- The changes **must** be backed-up with tests. 
- The PR **must** only have one feature. Split up multiple features in multiple PRs, so they can be individually reviewed and merged.
- The PR **must** be accompanied by a PR to the docs in case of new features. Documentation is located in the [https://github.com/larammerce/docs](https://github.com/larammerce/docs) repository.
- The PR should contain meaningful commit messages.

## Project management

Here you can learn about how larammerce manages user stories and features to be developed and released.
We use a project management tool called ***taiga*** where the project backlog is publicly available. You can see the backlog and the list of user stories at the following address:

Taiga project management system is used as the main management tool for the project user stories, Also it should be mentioned that Scrum is chosen as the management methodology for this project.

You can allways access the project's backlog publicly on the address below:

> [tree.taiga.io/project/a-khajelou-larammerce/bakelog](https://tree.taiga.io/project/a-khajelou-larammerce/bakelog)

### A brief about scrum

As mentioned before, Scrum is used as the main methodology, so let's describe it breafly:

#### What is user story?

***User Story*** is usually a term in software development and management in various fields that will be collected to describe customer needs. In software development and product management, the user story is an informal, natural language description that describes one or more features of the software system. user story is a tool used in ***Agile*** software development to describe a software feature from an end user perspective. User story users describe what they want and why. user story helps to create a simple description of a need.

It is interesting to know that ***Mike Cohn***, who is one of the main inventors of the ***Scrum*** development method, quotes as follows:
> *Every user story consists of one or two sentences written and, more importantly, a series of conversations about optimal performance.*

#### Why user story?

With the user story approach, we are content with "just enough" design instead of large and comprehensive design. user story reduces the time required to write comprehensive documentation by emphasizing customer-centric conversations. As a result, user story enables teams to deliver quality software faster.

User story method will save time; Because it is modified and improved according to the users. As a result, the quality in the process of software development or other products has increased and the upcoming project will be liked by the customer.


#### Working with user story:

The user's story is written in simple language that must pursue a specific purpose and have a specific reason. The user in the story must be real and not a member of the development team. There may be multiple user stories in the system that have the same benefits. This is normal. It's a good idea to start drafting a user story. The draft must first meet your essential needs. That:

**1. Who is it designed for?**

**2. What are the expectations from the system?**

**3. Why is it important?**

However, we must say that the user's story is in fact a process during which needs are discovered and should not be used as a document to analyze needs. In traditional methods, the system analyst usually tried to understand the customer's needs, but in modern methods, the following steps must be followed to identify the User Story:

**1. You need to talk to users.**

**2. User needs are written as a user story. This post should specify what the user needs and what the goal is.**

**3. After writing the needs, we will be faced with a source of user needs that must be fully understood and reviewed by the team.**

### Team procedures to manage

Meetings are held in the team structure in which we make decisions and technical discussions about user stories according to the scrum framework, and finally, after completing this procedure, the team enters the execution stage and then produces.
Briefly includes the following:

**1. We specify the generalities.**

**2. We divide the generals into separate sections.**

**3. We create user story for each section.**

**4. We divide user story into smaller sections and then we sort.**

**5. We preferably leave each small user story to one person(programmer) to execute.**

**6. After user stories are created, the person (programmer) is required to create their own tasks. And for this purpose acts as follows.**

> ***User story & task:***
>
>***To explain this difference, here is a quote from mike cohn:***
>
> *User stories are in the product backlog, and tasks are identified during sprint scheduling and become part of the sprint backlog.*
>
> *the better distinction is that stories contain multiple types of work (e.g., programming, testing, database design, user interface design, analysis, etc.) while tasks are restricted to a single type of work.*

#### How to create a new task?

After the user stories are created, the person (programmer) is obliged to create their tasks. For this purpose, we use the taiga tool at [taiga.io](https://www.taiga.io/). To create the task (for example:***task 449***), we enter the desired sprint section. And we do things based on priority, and the order of priority is done for us by the project manager.

When we ***first*** clone the project we are on the project banch ***master*** by default, when the user story is left to us to create the code for it we can never make changes to the ***main branch*** of the project, so need Is that we must create a ***sub-branch*** of the main branch of the cloned project.

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

   **NOTE:** A very important point in handling tasks that should be mentioned here is that only one person named tester can put the task in close or need info mode.

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



### Conclusion:

+ In this document, we tried our best to share a brief introduction of larammerce and also how to participate in it, as well as about user stories and with examples, we tried how to assign a user story and also how to perform tasks. To show you dear friends. 

The following is a brief description of how to participate in larammerce.

+ **the conditions of Laramers team:**

1. Our sprints are now once every ***two weeks***, if you are given a user story you have two weeks to execute the desired user story, but this does not mean that we end user stories at the end To run 30% sprint, ***we have to run a series of user stories every week or weekend.***

2. Currently we have an average of ***8 points*** for the user story to be done.

3. ***Team members must have completed (8 points) merge request by the end of each week***, and this is an important rule in the larammerce team.

4. After doing the user story, the person who tests the user story or in fact your code, if there is no problem in doing the user story, ***will move the user story from the ready for test column to the closed column***. That means doing your user story perfectly and flawlessly.

5. Finally, we enter the payment cycle discussion, which determines the payment based on the number of points ***([Fibonacci numbers](https://en.wikipedia.org/wiki/Fibonacci_number))*** performed by the individual.

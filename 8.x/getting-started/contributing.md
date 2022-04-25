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

**Taiga** is the tool that is used as the project management system, and also larammerce backlog board is publicly visible for people to check. also, it should be mentioned that Scrum is chosen as the management methodology for this project.

> [tree.taiga.io/project/a-khajelou-larammerce/bakelog](https://tree.taiga.io/project/a-khajelou-larammerce/bakelog)

### A brief about scrum

As mentioned before, scrum is used as the main methodology, so let's describe it briefly:

#### What is user story?

**User Story** is usually a term in software development and management in various fields that will be collected to describe customer needs. In software development and product management, the user story is an informal, natural language description that describes one or more features of the software system. a user story is a tool used in **Agile** software development to describe a software feature from an end-user perspective. User story users describe what they want and why. a user story helps to create a simple description of a need.

It is interesting to know that **Mike Cohn**, who is one of the main inventors of the **Scrum** development method, quotes as follows:

> *Every user story consists of one or two sentences written and, more importantly, a series of conversations about optimal performance.*

#### Why user story?

With the user story approach, you are content with **just enough** design instead of a large and comprehensive design. user story reduces the time required to write comprehensive documentation by emphasizing customer-centric conversations. As a result, user story enables teams to deliver quality software faster.

The user story method will save time Because it is modified and improved according to the users. As a result, the quality in the process of software development or other products has increased and the upcoming project will be liked by the customer.

#### Working with user story:

The user's story is written in simple language that must pursue a specific purpose and have a specific reason. The user in the story must be real and not a member of the development team. There may be multiple user stories in the system that have the same benefits. This is normal. It's a good idea to start drafting a user story. The draft must first meet your essential needs. That:

***1.*** Who is it designed for?

***2.*** What are the expectations from the system?

***3.*** Why is it important?

However, the user's story is a process during which needs are discovered and should not be used as a document to analyze needs. In traditional methods, the system analyst usually tried to understand the customer's needs, but in modern methods, the following steps must be followed to identify the User Story:

***1.*** You need to talk to users.

***2.*** User needs are written as a user story. This post should specify what the user needs and what the goal is.

***3.*** After writing the needs, you will be faced with a source of user needs that must be fully understood and reviewed by the team.

### Team procedures to manage

Meetings are held according to the scrum structure in the Larammerce team, which includes grooming and sprint sessions:

**Grooming sessions** | **Sprint sessions**
----------------------|--------------------
***1.*** In this type of meeting, which is held on Saturdays, team Larammerce discusses technical issues.| ***1.*** These meetings are held periodically on Mondays.
***2.*** In these sessions, user stories are created and divided into smaller sections. | ***2.*** In these meetings, teammates make a decision about user stories, make them viable, and then it's time to assign the user stories to specific team members. so every team member is responsible for their own user stories.
***3.*** There are discussions among Larammerce team members about how to better do the user story. | ***3.*** Every user story is discussed one by one and the estimation process begins, so every teammate announces the point of view and finally, a point for the weight of each user story is assigned.
***4.***  And finally, the user story is ready for being estimated in sprint upcoming sessions. | ***4.*** And finally enters the execution cycle.

> *The first thing after every sprint session is that every team member is responsible for writing notes in their own user stories according to what is mentioned in the sessions, and after that, the most necessary thing is that they must create the tasks of each owned user story right after sprint sessions.*

> ***User story & task:***
>
>***To explain this difference, here is a quote from Mike Cohn:***
>
> *User stories are in the product backlog, and tasks are identified during sprint scheduling and become part of the sprint backlog.*
>
> *the better distinction is that stories contain multiple types of work (e.g., programming, testing, database design, user interface design, analysis, etc.) while tasks are restricted to a single type of work.*

> *The user story can be created by anyone and also the person who creates the user story is required to add a brief description.*

#### How to create a new task?

As you know the smallest doable part of a user story is the task, so to create a task you have to enter the current sprint, then click on the specific user story which belongs to you, and after all click on the create task button. so there are new tasks created under the user story section.
Please note that user stories must have at least one task underneath.

**Once the project** is cloned (or you cloned and worked on it before), to begin the process of development or writing code to do the assigned user story, you have to update the project. so after updating your project to the upstream, you can make a new branch from the **main brach** (named master or main) by the commend below:

```bash
git checkout -b feature/the-title-of-the-feature
```

***NOTE***: note that naming the new branch follows the hierarchical naming rules. A user story is about one of the following:

***1.*** Feature

***2.*** Issue

***3.*** Enhance

***4.*** Fix

***5.*** Hotfix

So if you want to name the working branch follow the naming rules.

`prefix/name-of-the-user-story-title`

### Start to code

For this purpose, in this section, to better understand you, The Larammerce team will go through the steps of creating a task with you in this section.

***1.*** In this step, you create a sub-branch on the main project:

   ***NOTE***: Here the **stable** branch is the name of the main branch of the project that you can not modify.

##### Example:

```bash
git chekout stable #you get out of the stable brunch.
git chekout -b feature/docs-boilerplate #you create a sub-branch.
Switched to a new branch 'feature/docs-boilerplate'
```

***2.*** In this step, you can start to code, create/modify/update/delete specific files to achieve the desired goals of the user story:

 For example you can make some modifications on the file `test.php`.

##### Example:

```php
#this is a test line to create a test commit.
```

***3.*** Each time you complete a piece of work, you must add the files to a staging environment:

##### Example:

```bash
git add TEST.php
```

***4.*** After all, you can save your changes to the git tree by committing them:

##### Example:

```bash
git commit -a #Execute the commit step with the help of this command.
```
   ***NOTE***: Make sure that the first line of your commit message is concise and also imperative.

   ***NOTE***: After a brief description, you can pass the notes that are necessary for the taiga platform to detect that you've done the specific task. So please note how it is done:

   Also, you can read the docs provided by the taiga team to know more about this integration feature. [taiga docs](https://docs.taiga.io/integrations-github.html)

   ***NOTE***: In the third line, you can have a brief description of the work done. Here is a requirement that you suggest you do:
If in the third line you write and save the command `TG-449 #in-progress` or `TG-449 #ready-for-rest `when you enter the taiga site in the taskbar in the browser, you will see that task number **449** has been entered from the new section in progress or ready for testing.

   ***NOTE:*** A very important point in handling tasks that should be mentioned here is that only one person named the tester can put the task in close or need info mode.

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

***5.*** you put the desired file in GitHub using the following command:

##### Example:

```bash
git push --set-upstream origin feature/docs-boilerplate
```

***6.*** Here you have to mention that there are differences between GitHub and GitLab projects in this stage:

in GitHub, you create pull requests and in GitLab create merge requests. so let's describe them one by one.

Creating a merger request is just a very simple task, just after each commit you have done, click on the link that GitLab creates for you to enter the GitLab site and create a merge request for the user story.
After clicking on the link provided by GitLab, you will enter the following page on the GitLab site:

![merge request: title & description](https://github.com/Cena313/Hello-world/blob/master/20220419_163618.jpg?raw=true)

In this section, you enter the user story **title** Command, and also in the **description** section, you enter a summary description of the user story. Finally, click on the **Create merge request** button.

![merge request: title & description](https://github.com/Cena313/Hello-world/blob/master/20220419_163546.jpg?raw=true)

After clicking the Create merge request button, you must check to see if there is a **conflict**. If there is no conflict, you are done and you will have to wait for the team experimenter to review the user story done by you.

You can refer to the following link to learn how to pull a request:

> [how to pull a request?](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

### Conclusion

How to contribute to developing or maintaining Larammerce.

The following is a brief description of how to participate in Larammerce.

#### Team rules:

***1.*** Team Larammerce sprints are now once every **two weeks**, if you are given a user story you have two weeks to execute the desired user story, but this does not mean that you end-user stories at the end to run a 30% sprint, **team members have to tell a series of user stories every weekend.**

***2.*** Presently, Larammerce has an average of 8 points for the user history to do.

***3.*** **Team members must have completed (8 pts) merge requests by the end of each week**, and this is an important rule in the Larammerce team.

***4.*** At least one **commit** must be made for each **task**.

***5.*** Team members must have at least one committed by **Friday night** to be tested by the team tester on **Saturday morning**.

***6.*** On the **Saturday morning** before the meeting, team members should review 10 to 15 backlog user stories and prepare their comments and questions for the meeting.

***7.*** After performing the user story, the person testing the user story, or the team members' code, **moves the user story from the ready for test column to the closed column if there is no user story problem.** This means that the user story is complete.

***8.*** Also, after **Monday** sessions, which are in scrum mode, each member of the team is required to add user story-related tasks.

***9.*** Finally, you enter the **payment cycle** discussion where Larammerce pays you based on the number of points **([Fibonacci numbers](https://en.wikipedia.org/wiki/Fibonacci_number))** done.

***10.*** For every document that is written and placed in the **documentation** section of the Larammerce site, **the members of the Larammerce team are obliged to read it.**

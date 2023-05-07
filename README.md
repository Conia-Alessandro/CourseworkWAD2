# COURSEWORK 2 Web Development 2
WebDevelopment 2 Coursework 2 : nodejs website
Refers to session 2022/2023. Alessandro Conia s2042023

## The application
The application is a Express Nodejs application, that serves users in aspects of Healthcare, Fitness and Nutrition.
This is performed by users , as they add goals through the usage of the application.
The application has been made to be responsive on phones and follow a standard in colors / fonts.
A database which stores Goals and Users has been provided to visualize how an in real life application of this scale would act.

## Purpose
the purpose of the application is for user to register easily, log-in, and once logged in permit the following actions:
>the creation of goals and them being visible
>the update of goals
>the deletion of goals
>the completion of goals into Achivements
>the retrival of achivements

in their respective pages, identified as: Dashboard, Goal centre , Add goal, Achivements and About us.

## Dependencies
The application has some dependencies
### NPM
>check if Node Package Manager has been installed, run  `npm version` to check if npm is installed, otherwise, install it by checking this guide: https://phoenixnap.com/kb/install-node-js-npm-on-windows
### NodeJS
>either by checking the link in the step above, or by going to node official website, node can be installed through NodeJS official website: https://nodejs.org/en
### Express
>Once npm and nodeJS are installed, and having navigated to the correct directory of this project, please ensure express is installed as well by running `npm install express`

## Prerequisites after Dependencies
### Npm install
>the command `npm install` or `npm i` checks for a package.json file and loads up its dependencies, ensuring that the website is available to be run.
### run the application
>the command `node index` runs the application, connects to the dbs provided and opens at port 3001 (or alternatively Process.env.PORT), from here, a browser at the address `http://localhost:3001/` is necessary to view the first landing page `/`
## User Scenario

for this application, a user scenario of an expected user would be:

### 1: view the homepage, click the links
>the result of this action would be mostly "login locked" pages, which would prompt the user to register. however, if the user were to go to the "About us" page, he would be please to see information of the application.

### 2: Register
>the blocked pages would prompt the user to register, an username and password is required, so the user registers. Once registerd, the user can login automatically through redirect.

### 3: login
>the user now logs in, it sees the dashboard and is now briefed on the functionality available, an user can now create a goal and view it on the dashboard, or could navigate around the newly unlocked pages

### 4: create a goal
>the user creates a goal , this gets stored, and through a redirect to the dashboard, the user sees the goal being stored

### 5: modify goal
>the user might now modify the goal, and update it to either be completed, or just modified.

### 6: delete a goal / complete a goal
>the user could now delete or complete the goal, depending on what they want to do.

### 7: view an achievement
>assuming that the user has now completed a goal, the achivement page will display it once the user has clicked on it.

### 8: log out
>once satisfied with today, the user clicks to log out and is able to do so. End of user Scenario

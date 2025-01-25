Files for a project management website. This project is from The Net Ninja's Firebase and React course.

Check the project ->

<a href="https://javascript-d1a2d.web.app/">Go to project website</a>

A listing of things that are different from the original version:

Code improvements

* Code is cleaner and drier
* Async functionalities are fixed for adding new projects: redirect waits until the promise is resolved
* Small change for the logout hook: logout doesn't cause a fatal error after redirect to the homepage.
* Dynamic data fetching for components.
* An update component added to routing with a separate page that takes the userparams as arguments
* Document update logic: project updates delete old documents from the projects collection and simultaneously create new ones.

Functional improvements and additions

* A settings button on the bottom left corner that opens the settings window
* Buttons for changing the theme color
* Online status is updated to reflect user actions and it stays in sync between the App and Firestore database using a real-time listener:
   - Online status updates to false when the window is closed
   - Online status updates to true when a user is logged in and opens up the app again after closing it
* Password confirmation for signup
* Password reset form on the login page and a working password reset using email
* Users can delete comments from projects (own comments only)
* Users can update their projects.

Known issues:

* Logout causes an error message on console
* Online status gets updated to the database, but there are instances where irregular behaviour might occur, for example when a user uses two different browsers and same login credentials

Coming soon:

* Dark mode
* Small stylistic improvements and a cancel button on the update project page

Planned future updates:

* Additions to sidebar: a link to workspace where assigned users can collaborate
* Additions to dashboard: a personal to-do list and activity feed where recent actions are listed in a timeline
* Alerts for project deadlines
* Styling improvements and breakpoints for smaller screens
* Users can set alerts for themselves from the settings
* Users can change their profile picture in the settings

Project images:


![projec_management](https://github.com/user-attachments/assets/534301c3-e932-4ce1-8dc4-e99d925f24eb)

  
![1](https://github.com/user-attachments/assets/b47b4269-f304-4868-85cf-e8610d36be9f)



What I've learned during this project:

* The original course material code was not very suitable for creating a system of dynamic data fetching. For example, the additional function for updating projects can be hard to implement because data fetching was hard-coded into the components. With this kind of system it is not possible to update the project info dynamically. I found out that different components can very easily get out of sync when changes are made. So data fetching needs to be as dynamic as possible and that means setting up more hooks. When projects are altered, there are many variables that need to be considered. For example, a change in a project doc can mean that the user comments are altered as well. A change in a project can cause disruptions in other data points. Comments and images need dynamic fetching in order to appear in the right places.
* Two document collections means that the dev needs to be constantly aware of what is stored where and in what form. Async operations with more than one collection get harder to implement because data is scattered in different collections, and you need to do all kinds of operations before you can use the data and send it back to collections in the correct form and format.
* I couldn't get the project update feature work properly with the way data is fetched from two collections so I decided to remove and add a document to projects collection every time a user updates a project. It is easy to fetch the data from previous project document but when there are many properties assigned to each user, it is practical to delete the previous document and replace it with the updated one.
* Adding new features means that some of the props need to be sent all the way from App.js to their destination. It is easier and a better solution to implement new context providers for new features and wrap the App inside them than pass the props across many components.

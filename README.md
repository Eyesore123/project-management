Files for a project management website. This project is from The Net Ninja's Firebase and React course.

Check the project ->

<a href="https://javascript-d1a2d.web.app/">Go to project website</a>

Things that have changed from the original version:

Code improvements

* Code is cleaner and drier
* Async functionalities are fixed for adding new projects: redirect waits until the promise is resolved
* Small change for the logout hook: logout doesn't cause an error after redirect to the homepage.
* Dynamic data fetching for components.

Functional improvements and additions

* A settings button on the bottom left corner that opens the settings window
* Buttons for changing the theme color
* Online status is updated to reflect user actions and it stays in sync between the App and Firestore database using a real-time listener:
   - Online status updates to false when the window is closed
   - Online status updates to true when a user is logged in and opens up the app again after closing it
* Password confirmation for signup
* Password reset form on the login page and a working password reset using email
* Users can delete comments from projects (own comments only)

Known issues:

* Logout causes an error message on console
* Online status gets updated to the database, but there are instances where irregular behaviour might occur, for example when a user uses two different browsers and same login credentials

Coming soon:

* Update projects functionality (button, form, routing etc.)
* Dark mode

Planned future updates:

* Additions to sidebar: a link to the workspace where assigned users can collaborate
* Additions to dashboard: a personal to-do list and activity feed where recent actions are listed in a timeline
* Styling improvements and breakpoints for smaller screens

Project images:

  
![1](https://github.com/user-attachments/assets/b47b4269-f304-4868-85cf-e8610d36be9f)


![4](https://github.com/user-attachments/assets/59412fbc-283f-4ca2-8919-c9b1dad48b65)

What I've learned during this project:

* The original course material and the way data was structured in the database was not very suitable for creating a system of dynamic data fetching.
  For example, the additional function for updating projects can hard to implement because data fetching is hard-coded into the components. Data fetching should be dynamic. When projects are altered, it means that the user comments and user photos are altered as well. A change in a project can cause disruptions in other data points. Comments and photos need dynamic fetching in order to appear in the right places.
* I couldn't get the update feature work properly with the way data is fetched from two collections so I decided to remove and add a document to projects collection every time a user updates a project. It is easy to fetch the data from previous project but when there are many properties assigned to each user, it is practical to delete the previous document and replace it with the updated one.

Files for project management website. This project is from The Net Ninja's Firebase and React course.

Check the project ->

<a href="https://javascript-d1a2d.web.app/">Go to project website</a>

Changes I made:

Code improvements

* Code is cleaner and drier
* Async functionalities are fixed for adding new projects: redirect waits until the promise is resolved
* Small change for the logout hook: logout doesn't cause an error after redirect to the homepage.

Functional improvements and additions

* Online status is updated to reflect user actions and it stays in sync between the App and Firestore database using a real-time listener:
   - Online status updates to false when the window is closed
   - Online status updates to true when a user is logged in and opens up the app again after closing it
* Password confirmation for signup
* Password reset form on the login page and a working password reset using email
* Users can delete comments from projects (own comments only)

Known issues:

* Logout causes an error message on console
* Online status gets updated to the database, but there are instances where irregular behaviour might occur, for example when a user uses two different browsers and same login credentials

  
![1](https://github.com/user-attachments/assets/b47b4269-f304-4868-85cf-e8610d36be9f)

![project_management](https://github.com/user-attachments/assets/0d7e847e-b086-4053-af3b-fa988f378fbf)

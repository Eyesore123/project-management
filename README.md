Files for project management website. This project is from The Net Ninja's Firebase and React course.

Check the project ->

<a href="https://javascript-d1a2d.web.app/">Go to project website</a>

Changes I made:

* Code is cleaner and drier
* Async functionalities are fixed for adding new projects: redirect waits until the promise is resolved
* Online status is updated and keeped in sync between the App and Firestore database with real-time listener:
   - Status updates to false when the window is closed
   - Online status updates to true when a user is logged in and opens up the app again after a closing it
* Password confirmation and alert for signup
* User can delete comments from projects (own comments only)
* Small change for the logout hook: logout doesn't cause an error after redirect to the homepage.

Known issues:

* Logout causes an error message on console
* Online status gets updated to the database, but there are instances where irregular behaviour might occur, for example when a user uses two different browsers and same login credentials

Files for project management website. This project is from The Net Ninja's Firebase and React course.

Deployed to Firebase:

<a href="https://javascript-d1a2d.web.app/">Go to project website</a>

Changes I made when compared to the code in the course material:

* Code is cleaner and drier
* Async functionalities are fixed for adding new projects: redirect waits until the promise is resolved
* Online status is updated and keeped in sync between the App and Firestore database with real-time listener
* Password confirmation and alert for signup
* User can delete comments from projects (own comments only)
* Small change for the logout hook: logout doesn't cause an error after redirect to the homepage.

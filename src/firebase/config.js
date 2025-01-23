import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALHc20OA7iK__EqpPmzmsBH0RtVOitlZk",
  authDomain: "javascript-d1a2d.firebaseapp.com",
  projectId: "javascript-d1a2d",
  storageBucket: "javascript-d1a2d.firebasestorage.app",
  messagingSenderId: "585864704423",
  appId: "1:585864704423:web:8e9669d2ffa12ec03fc682",
  measurementId: "G-58ZQ7X8B3F"

}

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


 // Initiialize services
  const projectAuth = firebase.auth();
  const db = firebase.firestore();
  const projectStorage = firebase.storage();

  // Set up automatic timestamp
  const timestamp = firebase.firestore.Timestamp;

  // For setting auth to none:

  // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
  // .then(() => {
  //   // The user will be signed out when they refresh or navigate away  
  // })
  // .catch((error) => {
  // });


  export { projectAuth, db, timestamp, projectStorage };


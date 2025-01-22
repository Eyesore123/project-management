import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
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


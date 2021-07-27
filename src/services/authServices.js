import dotenv from "dotenv";
import firebase from "firebase/app";
import "firebase/auth";
import "@firebase/storage";
import "@firebase/database";
import "firebase/firestore";
dotenv.config();
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
  });
}
// const db = firebase.firestore();
export const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
var user;
export const signInWithGoogle = () => {
  auth
    .signInWithPopup(provider)
    .then((result) => {
      // var credential = result.credential;
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = credential.accessToken;
      // The signed-in user info.
      user = result.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      // var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      // var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      console.log(errorMessage);
    });
};

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Sign out successfully");
    })
    .catch((error) => {
      console.log("Error Occured While signing out!!");
      console.log(error.message);
    });
};

export const isAdmin = (email) => {
  const adminEmail = [
    "201951038@iiitvadodara.ac.in",
    "201951052@iiitvadodara.ac.in",
    "201951080@iiitvadodara.ac.in",
    "201951107@iiitvadodara.ac.in",
    "201951198@iiitvadodara.ac.in",
  ];
  return adminEmail.some((admin) => admin === email);
};

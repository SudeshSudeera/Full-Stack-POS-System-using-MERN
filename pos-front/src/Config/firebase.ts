import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA7iaVdFc52gb_bP7eqLFbjvadW6g58qUM",
    authDomain: "react-pos-9910d.firebaseapp.com",
    projectId: "react-pos-9910d",
    storageBucket: "react-pos-9910d.appspot.com",
    messagingSenderId: "621513421176",
    appId: "1:621513421176:web:c935114593780a6d5fd88d",
    measurementId: "G-JY6DMKD91H"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  export const storage = firebase.storage();

  export default firebase;
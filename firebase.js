// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4XiL2yZuv3gS9JKsEEdBqsSRWT641lTQ",
  authDomain: "daily-journal-auth.firebaseapp.com",
  projectId: "daily-journal-auth",
  storageBucket: "daily-journal-auth.appspot.com",
  messagingSenderId: "839763165167",
  appId: "1:839763165167:web:18da305b677a67c12f401a"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()
const db = getFireStore(app);

export {auth};
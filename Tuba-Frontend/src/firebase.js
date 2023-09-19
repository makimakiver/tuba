// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt3OPyJ8SzEQ1xbQSrhkdjPX39GT7pvgY",
  authDomain: "tuba-f9686.firebaseapp.com",
  projectId: "tuba-f9686",
  storageBucket: "tuba-f9686.appspot.com",
  messagingSenderId: "644526251537",
  appId: "1:644526251537:web:8f678d9651cdcef3559bb0",
  measurementId: "G-2XMT61VFGC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider }
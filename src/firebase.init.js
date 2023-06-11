// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAePBcyClAxeGwJAj8WiAWOVhkMO1pe82g",
  authDomain: "manufacterer-transporter.firebaseapp.com",
  projectId: "manufacterer-transporter",
  storageBucket: "manufacterer-transporter.appspot.com",
  messagingSenderId: "411336284787",
  appId: "1:411336284787:web:0864493df2982e9727a806"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


export default auth;
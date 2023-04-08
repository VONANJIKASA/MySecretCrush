// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPoONC6msL2pDyq8Jhz1b6pewRX2gP21c",
  authDomain: "my-secret-crush2.firebaseapp.com",
  projectId: "my-secret-crush2",
  storageBucket: "my-secret-crush2.appspot.com",
  messagingSenderId: "88820002505",
  appId: "1:88820002505:web:72a05d89b6f71c1f2de718",
  measurementId: "G-JBE6K8B5Q2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Game from "./Game";
import { FB_APP_ID } from "./config";
import firebase from "firebase/app";
import "firebase/database";

/*global FB*/

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

window.fbAsyncInit = function () {
  FB.init({
    appId: FB_APP_ID,
    cookie: true,
    xfbml: true,
    version: "v12.0",
  });
};

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDPoONC6msL2pDyq8Jhz1b6pewRX2gP21c",
  authDomain: "my-secret-crush2.firebaseapp.com",
  projectId: "my-secret-crush2",
  storageBucket: "my-secret-crush2.appspot.com",
  messagingSenderId: "88820002505",
  appId: "1:88820002505:web:72a05d89b6f71c1f2de718",
  measurementId: "G-JBE6K8B5Q2",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

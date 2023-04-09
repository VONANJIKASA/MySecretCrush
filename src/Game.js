/*global FB*/

import React, { useState, useEffect } from "react";
import { FB_APP_ID } from "./config";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";
import "firebase/auth";

function Game() {
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyDPoONC6msL2pDyq8Jhz1b6pewRX2gP21c",
    authDomain: "my-secret-crush2.firebaseapp.com",
    projectId: "my-secret-crush2",
    storageBucket: "my-secret-crush2.appspot.com",
    messagingSenderId: "88820002505",
    appId: "1:88820002505:web:72a05d89b6f71c1f2de718",
    measurementId: "G-JBE6K8B5Q2",
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const [playerName, setPlayerName] = useState("");
  const [playerCrush, setPlayerCrush] = useState("");
  const [admirers, setAdmirers] = useState([]);
  const [match, setMatch] = useState(null);

  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: FB_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v12.0",
      });

      FB.getLoginStatus(function (response) {
        if (response.status === "connected") {
          // check the below commented code if required
          //setUser(response.authResponse.userID);
        }
      });
    };

    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleChange = (event) => {
    if (event.target.name === "playerName") {
      setPlayerName(event.target.value);
    } else if (event.target.name === "playerCrush") {
      setPlayerCrush(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const db = firebase.firestore();
    const admirersCollectionRef = db.collection("admirers");

    const player = {
      name: playerName,
      crush: playerCrush,
      status: "waiting",
    };

    admirersCollectionRef
      .add(player)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        admirersCollectionRef.doc(docRef.id).onSnapshot((doc) => {
          const matchedAdmirer = doc.data();
          if (matchedAdmirer.status === "matched") {
            setMatch(matchedAdmirer);
          } else {
            setAdmirers(
              admirers
                .filter(
                  (admirer) =>
                    admirer.name !== player.name &&
                    admirer.crush !== player.crush
                )
                .concat([player])
            );
          }
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  useEffect(() => {
    const admirersRef = firebase.database().ref("admirers");

    admirersRef.on("value", (snapshot) => {
      const admirers = snapshot.val();
      setAdmirers(Object.values(admirers));
    });

    return () => admirersRef.off();
  }, []);

  return (
    <div>
      {match ? (
        <p>You have a match with {match.name}!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Your name:
            <input
              type="text"
              name="playerName"
              value={playerName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Your crush's name:
            <input
              type="text"
              name="playerCrush"
              value={playerCrush}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      )}
      {admirers.length > 0 && (
        <div>
          <p>Other admirers:</p>
          <ul>
            {admirers.map((admirer) => (
              <li key={admirer.name + admirer.crush}>
                {admirer.name} likes {admirer.crush}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Game;

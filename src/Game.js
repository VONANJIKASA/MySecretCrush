/*global FB*/

import React, { useState, useEffect } from "react";
import { FB_APP_ID } from "./config";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";
import "firebase/auth";

function Game() {
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
          setUser(response.authResponse.userID);
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

    const gameRef = firebase.database().ref("game");
    const admirersRef = firebase.database().ref("admirers");

    const player = {
      name: playerName,
      crush: playerCrush,
      status: "waiting",
    };

    gameRef.set("waiting");
    admirersRef.push(player);

    admirersRef.on("value", (snapshot) => {
      const admirers = snapshot.val();
      const matchedAdmirer = Object.values(admirers).find(
        (admirer) =>
          admirer.crush === playerName && admirer.name === playerCrush
      );

      if (matchedAdmirer) {
        setMatch(matchedAdmirer);
        admirersRef.off();
      } else {
        setAdmirers(Object.values(admirers));
      }
    });
  };

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

/*global FB*/

import React, { useState, useEffect } from "react";
import { FB_APP_ID } from "./config";

function Game() {
  const [user, setUser] = useState(null);
  const [crush, setCrush] = useState(null);
  const [hasMutualCrush, setHasMutualCrush] = useState(false);

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

  function handleCrushSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const crushName = formData.get("crush");
    // TODO: Implement logic to post to the user's crush's wall
    setCrush(crushName);
  }

  return (
    <div>
      {user && (
        <form onSubmit={handleCrushSubmit}>
          <label htmlFor="crush">Enter the name of your crush:</label>
          <input type="text" id="crush" name="crush" />
          <button type="submit">Submit</button>
        </form>
      )}

      {hasMutualCrush && <p>Congratulations, you have a mutual crush!</p>}
    </div>
  );
}

export default Game;

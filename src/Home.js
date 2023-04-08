import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";

function Home() {
  const [gameStatus, setGameStatus] = useState(null);

  useEffect(() => {
    const gameRef = firebase.database().ref("game");
    gameRef.on("value", (snapshot) => {
      setGameStatus(snapshot.val());
    });
  }, []);

  return (
    <div>
      {gameStatus === null && <p>The game has not started yet.</p>}
      {gameStatus === "waiting" && <p>Waiting for your crush to play.</p>}
      {gameStatus === "playing" && <p>Your crush is playing!</p>}
      {gameStatus === "matched" && <p>You and your crush have a match!</p>}
    </div>
  );
}

export default Home;

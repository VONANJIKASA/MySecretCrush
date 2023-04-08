const express = require("express");
const path = require("path");
const http = require("http");
const WebSocket = require("ws");
const helmet = require("helmet");

const app = express();

// Set Content Security Policy using the helmet middleware
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "'unsafe-inline'", "data:", "gap:", "blob:"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        "https://connect.facebook.net",
      ],
      imgSrc: ["'self'"],
    },
  })
);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Create HTTP server by wrapping the express app instance
const server = http.createServer(app);

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

// Listen for WebSocket connections
wss.on("connection", (ws) => {
  console.log("Client connected");

  // Send a message to the client
  ws.send(JSON.stringify({ message: "Hello, client!" }));
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Import express library
// require() means: bring this package into this file
const express = require("express");

// Create an Express application
// Think of 'app' as your backend server
const app = express();


// -----------------------------
// CREATE A SIMPLE ROUTE
// -----------------------------

// app.get() means:
// When someone visits this URL using GET method,
// run this function

app.get("/", (req, res) => {
  // req = request (data coming from client)
  // res = response (what we send back)

  // Send a simple message back to browser
  res.send("DTI Backend is running 🚀");
});


// -----------------------------
// START THE SERVER
// -----------------------------

// app.listen() starts the server
// 5000 is the port number (like a door number)

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
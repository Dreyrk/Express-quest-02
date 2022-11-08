const express = require("express");
const db = require("./database");

const app = express();

const port = 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

app.get("/api/users", db.getUsers);
app.get("/api/users/:id", db.getUserById);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

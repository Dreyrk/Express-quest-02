const express = require("express");
const handler = require("./movieHandlers");
const database = require("./database");

const app = express();
app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

//connect db
database
  .getConnection()
  .then(() => {
    console.log("Can reach database");
  })
  .catch((err) => {
    console.error(err);
  });

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

//Routes

app.get("/", welcome);

app.get("/api/users", handler.getUsers);
app.get("/api/users/:id", handler.getUserById);

app.post("/api/users", handler.postUser);

app.put("/api/users/:id", handler.updateUser);

app.delete("/api/users/:id", handler.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

require("dotenv").config();
const mysql = require("mysql2/promise");
const database = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
//connect db
database
  .getConnection()
  .then(() => {
    console.log("Can reach database");
  })
  .catch((err) => {
    console.error(err);
  });

//query users db
const getUsers = (req, res) => {
  database
    .query("SELECT * FROM users")
    .then(([results]) => {
      if (results[0] !== null) {
        res.send(res.json(results[0]));
        res.status(200);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query(`SELECT * FROM users WHERE id=${id}`)
    .then(([results]) => {
      if (results[0] != null) {
        if (results[0].id === id) {
          res.send(res.json(results[0]));
          res.status(200);
        }
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  getUsers,
  getUserById,
};

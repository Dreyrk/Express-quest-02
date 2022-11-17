const database = require("./database");

const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    colors: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    colors: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
];

const handler = {
  getMovies: (req, res) => {
    res.json(movies);
  },
  getMovieById: (req, res) => {
    const id = parseInt(req.params.id);

    const movie = movies.find((movie) => movie.id === id);

    if (movie != null) {
      res.json(movie);
    } else {
      res.status(404).send("Not Found");
    }
  },
  getUsers: (req, res) => {
    database
      .query("SELECT * FROM users")
      .then(([results]) => {
        if (results[0] !== null) {
          res.status(200).send(res.json(results));
        } else {
          res.status(404).send("User not found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  },
  getUserById: (req, res) => {
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
  },
  postUser: (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;
    database
      .query(
        "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
        [firstname, lastname, email, city, language]
      )
      .then(([results]) => {
        res.sendStatus(201).location(`/api/users/${results.insertId}`);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error saving users");
      });
  },
  updateUser: (req, res) => {
    const id = req.params.id;
    const { firstname, lastname, email, city, language } = req.body;

    database
      .query(
        "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? WHERE id = ?",
        [firstname, lastname, email, city, language, id]
      )
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error editing users");
      });
  },
  deleteUser: (req, res) => {
    const id = parseInt(req.params.id);

    database
      .query("DELETE FROM users WHERE id = ?", [id])
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error deleting the movie");
      });
  },
};

module.exports = handler;

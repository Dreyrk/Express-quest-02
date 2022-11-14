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
};

module.exports = handler;

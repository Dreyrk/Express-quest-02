const database = require("./database");

const middleware = {
  validateUsers: (req, res, next) => {
    const { firstname, lastname, email, city, language } = req.body;

    if (firstname == null) {
      res.status(422).send("The field 'firstname' is required");
    } else if (lastname == null) {
      res.status(422).send("The field 'lastname' is required");
    } else if (email == null) {
      res.status(422).send("The field 'email' is required");
    } else if (city == null) {
      res.status(422).send("The field 'city' is required");
    } else if (language == null) {
      res.status(422).send("The field 'language' is required");
    } else {
      next();
    }
  },
};

module.exports = middleware;

const argon2 = require("argon2");

const hashPassword = (req, res, next) => {
  const password = req.body.password;

  const hash = argon2.hash(password, {
    type: argon2.argon2d,
    memoryCost: 2 ** 16,
    hashLength: 50,
  });
  hash.then((hashedPassword) => {
    console.log(hashedPassword);
    delete req.body.password;
    req.body.hashedPassword = hashedPassword;

    next();
  });
};

module.exports = {
  hashPassword,
};

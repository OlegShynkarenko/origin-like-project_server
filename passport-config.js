import models from "./models";

const bcrypt = require("bcrypt");

const comparePasswords = async (typedPassword, storedPassword) => {
  try {
    return await bcrypt.compare(typedPassword, storedPassword)
  } catch (e) {
    throw new Error(e)
  }
};

const authenticateUser = (email, password, done) => {
  models.User.findOne({ email: email }, async function (err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!(await comparePasswords(password, user.password))) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  });
};

module.exports = authenticateUser;

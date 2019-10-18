import models from "./models";

const LocalStrategy = require("passport-local").Strategy;
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

const initialize = (passport) => {
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser( (id, done) => {
    models.User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};

module.exports = initialize;

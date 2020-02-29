import "dotenv/config";
import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
const { handleError, ErrorHandler } = require('./error');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client = redis.createClient(process.env.REDIS_URL);
// const redis = require('redis');
// const redisStore = require('connect-redis')(session);
// const client = redis.createClient();
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

import models, { connectDb } from "./models";
import gamesList from "./routes/getGamesList";
import registerUser from "./routes/registerUser";
import logIn  from "./routes/logIn";
import logOut from "./routes/logOut";
import protectedRoute from "./routes/protectedRoute";
import authenticateUser from "./passport-config"

const app = express();
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser( (id, done) => {
  models.User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'name']
    },
    (accessToken, refreshToken, profile, done) => {
      models.User.findOne({ email: profile.id }).then(user => {
        if (user) {
          return done(null, user);
        } else {
          new models.User({ email: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    //store: new redisStore({client}),
    store: new redisStore({url: process.env.REDIS_URL, client}),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10 * 60 * 1000,
      httpOnly: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/games-list", gamesList);
app.use("/api/register", registerUser);
app.use("/api/get-users", registerUser);
app.use("/api/login", logIn);
app.use("/api/logout", logOut);
app.use("/api/auth-required", protectedRoute);

app.use((err, req, res, next) => {
  handleError(err, res);
});

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`App listening on port ${process.env.PORT}!`)
    );
  })
  .catch(e => console.log("Something went wrong...", e));

module.exports = app;

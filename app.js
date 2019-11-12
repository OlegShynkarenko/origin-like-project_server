import "dotenv/config";
import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client = redis.createClient(process.env.REDIS_URL);

import { connectDb } from "./models";
import registerUser from "./routes/registerUser";
import logIn  from "./routes/logIn";
import logOut from "./routes/logOut";
import protectedRoute from "./routes/protectedRoute";
import initializePassport from "./passport-config";

const app = express();
initializePassport(passport);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
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

app.use("/api/register", registerUser);
app.use("/api/get-users", registerUser);
app.use("/api/login", logIn);
app.use("/api/logout", logOut);
app.use("/api/auth-required", protectedRoute);

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`App listening on port ${process.env.PORT}!`)
    );
  })
  .catch(e => console.log("Something went wrong...", e));

module.exports = app;

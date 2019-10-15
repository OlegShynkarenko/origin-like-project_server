import "dotenv/config";
import express from "express";
import cors from "cors";
import passport from "passport";
import flash from "express-flash";
import session from "express-session";
import cookieParser from "cookie-parser";

import { connectDb } from "./models";
import registerUser from "./routes/registerUser";
import logInUser  from "./routes/logInUser"
import initializePassport from "./passport-config";

const app = express();
initializePassport(passport);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/register", registerUser);
app.use("/api/get-users", registerUser);
app.use("/api/login", logInUser);

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`App listening on port ${process.env.PORT}!`)
    );
  })
  .catch(e => console.log("Something went wrong...", e));

module.exports = app;

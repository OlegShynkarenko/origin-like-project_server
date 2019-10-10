import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { connectDb } from "./models";
import registerUser from "./routes/registerUser";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/register-user", registerUser);
app.use("/api/get-users", registerUser);

connectDb().then( () => {
  app.listen(process.env.PORT, () =>
    console.log(`App listening on port ${process.env.PORT}!`)
  );
}).catch((e) => console.log('Something went wrong...', e));

module.exports = app;

import {Router} from "express";
import bcrypt from 'bcrypt';

import models from "../models";
import {ErrorHandler} from "../error";

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const email = req.body.data.email;
    const emailTaken = await models.User.findOne({email: email});
    if (emailTaken) throw new ErrorHandler(400, 'That email is already in use.');

    const hashedPassword = await bcrypt.hash(req.body.data.password, 10);
    await models.User.create({
      firstName: req.body.data.firstName,
      lastName: req.body.data.lastName,
      birthDate: req.body.data.birthDate,
      country: req.body.data.country,
      email: email,
      password: hashedPassword
    });
    res.send('/login')
  } catch(e) {
    next(e)
  }
});

router.get('/', async (req, res) => {

  const users = await models.User.find();
  res.send(users);
});

module.exports = router;

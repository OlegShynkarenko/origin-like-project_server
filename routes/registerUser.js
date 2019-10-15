import {Router} from "express";
import bcrypt from 'bcrypt';

import models from "../models";

const router = Router();

router.post('/', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await models.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      country: req.body.country,
      email: req.body.email,
      password: hashedPassword
    });
    res.send('/login')
  } catch(e) {
    console.log(e);
    res.send('/register')
  }
});

router.get('/', async (req, res) => {

  const users = await models.User.find();
  res.send(users);
});

module.exports = router;

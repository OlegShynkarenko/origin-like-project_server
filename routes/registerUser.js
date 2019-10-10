import {Router} from "express";
import bcrypt from 'bcrypt';

import models from "../models";

const router = Router();

router.post('/', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = models.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    country: req.body.country,
    email: req.body.email,
    password: hashedPassword
  });

  return res.send(user)
});

router.get('/', async (req, res) => {

  const users = await models.User.find();
  res.send(users);
});

module.exports = router;

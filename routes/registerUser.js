import {Router} from "express";

import models from "../models";

const router = Router();

router.post('/', (req, res) => {

  const user = models.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    country: req.body.country,
    email: req.body.email,
    password: req.body.password
  });

  return res.send(user)
});

router.get('/', async (req, res) => {

  const users = await models.User.find();
  res.send(users);
});

module.exports = router;

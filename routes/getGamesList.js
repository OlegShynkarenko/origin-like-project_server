import {Router} from "express";
import {ErrorHandler} from "../error";
import fetch from 'node-fetch'

const router = Router();

router.get('/', async (req, res) => {
  try {
    const req = await fetch('https://embed.gog.com/games/ajax/filtered?mediaType=game&limit=20');
    const data = await req.json();
    res.send(data);
  } catch (e) {
    throw new ErrorHandler(e.statusCode, e.statusText);
  }
});

module.exports = router;

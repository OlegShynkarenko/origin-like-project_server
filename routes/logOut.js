import {Router} from "express";

const router = Router();

router.get('/', (req, res) => {
  req.logout();
  res.send('____________logout_____________');
});

module.exports = router;

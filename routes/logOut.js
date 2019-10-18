import {Router} from "express";

const router = Router();

router.get('/', (req, res) => {
  console.log('logout___________________________', req.user);
  req.logout();
  res.send('____________logout_____________');
});

module.exports = router;
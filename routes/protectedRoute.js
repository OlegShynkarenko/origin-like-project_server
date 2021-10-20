import {Router} from "express";

const router = Router();

router.get('/', (req, res) => {
  if(req.isAuthenticated()) {
    res.send('you hit the authentication endpoint\n')
  } else {
    res.redirect('/')
  }
});

module.exports = router;

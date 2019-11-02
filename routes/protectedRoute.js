import {Router} from "express";

const router = Router();

router.get('/', (req, res) => {
  console.log(req.sessionID)
  console.log('Inside GET /auth-required callback');
  console.log(`User authenticated? ${req.isAuthenticated()}`);
  if(req.isAuthenticated()) {
    res.send('you hit the authentication endpoint\n')
  } else {
    res.redirect('/')
  }
});

module.exports = router;
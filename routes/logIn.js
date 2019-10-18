import {Router} from "express";
import passport from 'passport'

const router = Router();

router.get('/', (req, res) => {
  console.log('Inside GET /login callback function');
  console.log(req.sessionID);
  res.send(`You got the login page!\n`)
})

router.post('/', (req, res, next) => {
  console.log('Inside POST /login callback')
  console.log('Post callback', req.sessionID)
  passport.authenticate('local',{session: true}, (err, user, info) => {
    if(info) {return res.send(info.message)}
    if(err) {return next(err)}
    if(!user) {return res.redirect('/api/login')}
    req.login(user, (err) => {
      console.log(user.firstName)
      if(err) {return next(err)}
      return res.redirect('/api/auth-required');
    })
  })(req, res, next);
});

module.exports = router;

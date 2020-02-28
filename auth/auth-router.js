const router = require('express').Router();
const bcrypt=require('bcryptjs');
const Users=require("../users/users-model");
//register
router.post('/register', (req, res) => {
  const usersInfo = req.body;
  const hash=bcrypt.hashSync(usersInfo.password, 8);
  usersInfo.password=hash;
  Users.insert(usersInfo).then(user=>{
      res.status(201).json(user);
  }).catch(err=>{
      console.log(err);
      res.status(500).json({errorMessage:'Post Failed'})
  })
})




router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.loggedIn = true;
        req.session.username = user.username; 
        res.status(200).json({message:'You\'re logged in!!!'});
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


module.exports = router;

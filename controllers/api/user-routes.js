const router = require('express').Router();
const {User} = require('../../models');

router.post('/', (req, res) => {

    User.create(req.body).then((user) => {
      res.json(user);
    }).catch((err) => {
      console.log(err);
      res.json(err);
  });
});

router.post('/login', async (req,res) => {
  try {        
      const userData = await User.findOne({where: {username: req.body.username}});   
   

  if (!userData){
      res.status(400).json({message: 'Not Correct Username or Password'});
      return;
  }

  const validatePW = await userData.checkpassword(req.body.password);

  console.log(validatePW);

  if (!validatePW) {
      res.status(400).json({message: 'Not Correct Username or Password'});
      return;
  }

  req.session.save(() => {
      req.session.userid = userData.id;
      req.session.username = userData.username;
      req.session.log_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
  })
    
  } catch (error) {
      console.log(error);
      res.status(400).json(error);
    
}
})

router.post('/logout', (req,res) => {
  if (req.session.log_in){
    req.session.destroy(()=> {
        res.status(200).end();
    });

  } else{

    res.status(400).end();
  }
})

module.exports = router;
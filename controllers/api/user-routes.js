const router = require('express').Router();
const {User} = require('../../models');

router.post('/', (req, res) => {

    User.create(req.body).then((user) => {
      return res.json(user);
    }).catch((err) => {
      console.log(err);
      res.json(err);
  });
});

router.post('/login', async (req,res) => {
  try {        
    console.log(req.body,"login")
      const userData = await User.findOne({where: {username: req.body.username}});   
   console.log(userData)

  if (!userData){
      res.status(400).json({message: 'Not Correct Username or Password'});
      return;
  }

  const validatePW = userData.checkpassword(req.body.password);

  console.log(validatePW);

  if (!validatePW) {
      res.status(400).json({message: 'Not Correct Username or Password'});
      return;
  }
  console.log(req.session,"Login",validatePW);
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
router.get('/dashboard', async (req,res) => {
  const userData = await User.findAll({
      include: [
          {
              model: Post
          },
          
      ],
      where: {id: req.session.userid}
  })
  if (!userData) {
      return res.status(400).json({message: "Unable to find post."})
  }
  console.log(userData)
  return res.render("dashboard",{userData,username:req.session.username,userid:userid})
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
const router = require('express').Router();
const {User,Post} = require('../../models');

router.post('/', (req, res) => {

    User.create(req.body).then((user) => {
      req.session.save(() => {
        req.session.userid = user.id;
        req.session.username = user.username;
        req.session.log_in = true;
  
        res.json({ user: user, message: 'You are now logged in!' });
    })
      
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
  const userData = await Post.findAll({
    include: [
          {
                model: User
            },
        
         ],
        where: {userID: req.session.userid}
      })
      //const user = userData.post.map(post => post.get({ plain: true }))

      console.log("User dashboard",userData)
  //if (!userData) {
  //    return res.status(400).json({message: "Unable to find post."})
  //}
  //console.log(userData,req.session,"Session")
  return res.render("dashboard",{loggedIn:req.session.log_in,userData:userData,username:req.session.username,userid:req.session.userid})
})
router.get('/logout', (req,res) => {
  if (req.session.log_in){
    req.session.destroy(()=> {
      //  res.status(200).end();
      res.redirect("/")
    });

  } else{

    res.status(400).end();
  }
})

module.exports = router;
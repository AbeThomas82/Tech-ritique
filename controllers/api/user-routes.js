const router = require('express').Router();
const {User,Post,Comment} = require('../../models');

router.post('/', (req, res) => {

    User.create(req.body).then((user) => {
      res.json(user);
    }).catch((err) => {
      console.log(err);
      res.json(err);
  });
});

router.post('/login', (req,res) => {

})

router.post('/logout', (req,res) => {

})
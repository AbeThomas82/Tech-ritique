const withAuth = require('../utils/auth');
const router = require('express').Router();
const {User,Post,Comment} = require('../models');

router.get('/', withAuth, async (req,res) => {
    const postData = await Post.findAll({
        include: [User]
    })
    if (!postData) {
        return res.status(400).json({message: 'Failed to find post.'})
    }
    const posts = postData.map((post) => post.get({plain: true}))
    
    res.render('home', {posts,loggedIn:req.session.log_in})
});

router.get('/login', (req, res) => {
    if (req.session.log_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

router.get('/signup', (req, res) => {
    if (req.session.log_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
})

module.exports = router;
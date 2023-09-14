const withAuth = require('../utils/auth');
const router = require('express').Router();
const {User,Post,Comment} = require('../models');

router.get('/', async (req,res) => {
    const postData = await Post.findAll({
        include: [User]
    })
    if (!postData) {
        return res.status(400).json({message: 'Failed to find post.'})
    }
    const posts = postData.map((post) => post.get({plain: true}))
})










module.exports = router;
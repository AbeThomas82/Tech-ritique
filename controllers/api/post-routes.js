const router = require('express').Router();
const {User,Post,Comment} = require('../../models');
// /api/posts
router.get('/', async (req,res) => {
    const postData = await Post.findAll({
        include: [
            {
                model: User
            },
            {
                model: Comment,
                include: {
                    model: User,
                    attributes: ["username"] 
                }
            }
        ]
    })
    if (!postData) {
        return res.status(400).json({message: "Unable to find post."})
    }
    return res.status(200).json(postData)
})

router.get('/:id', async (req,res) => {
    const foundID = await Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User
            },
            {
                model: Comment,
                include: {
                    model: User,
                    attributes: ["username"] 
                }
            }
        ]
    })
    if (!foundID){
        return res.status(400).json({
          message: "Cannot find ID."
        })
      }
      return res.status(200).json(foundID)
});

router.post('/', (req, res) => {
  console.log("create post",req.body)
   let newPost = {...req.body, userID:req.session.userid}
    Post.create(newPost).then((post) => {
      res.json(post);
    }).catch((err) => {
      console.log(err);
      res.json(err);
  });
});

router.put('/:id', (req, res) => {
    // update a category by its `id` value
    Post.update(//references correct model
      req.body,
      {
        where: {
          id: req.params.id,//targets correct ID
        }
      }
    ).then((updatedPost) => {
      res.json(updatedPost);
    }).catch((err) => {
      console.log(err);
      res.json(err);
    });
  });

  router.delete('/:id', (req, res) => {
    //Deleting a category by its `id` value
    Post.destroy({//destroy command targets "where" in work scope
      where: {
        id: req.params.id,
      },
    })
      .then((deletedPost) => {//named variable to express output
        res.json(deletedPost);
      })
      .catch((err) => res.json(err));
  });
module.exports = router;
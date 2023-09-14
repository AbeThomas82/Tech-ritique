const express = require('express');
const router = express.Router();

const commentRoutes = require("./api/comment-routes");
router.use("/api/comments",commentRoutes)

const postRoutes = require("./api/post-routes");
router.use("/api/posts",postRoutes)

const userRoutes = require("./api/user-routes.js");
router.use("/api/users",userRoutes)

const homeRoutes = require("./home-routes");
router.use("/",homeRoutes)

router.get("/sessions",(req,res)=>{
    res.json(req.session)
})

module.exports = router;
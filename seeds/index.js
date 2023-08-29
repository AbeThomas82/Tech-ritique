const sequelize = require("../config/connection")
const {User,Post,Comment} = require("../models")

const users = [
    {
        id: 1,
        username: "Spencer",
        email: "iluvcats@aol.com",
        password: "iamprofessor123"
    },
    {
        id: 2,
        username: "Katherine",
        email: "ihatecats@email.com",
        password: "iamalsoteacher345"
    },
    {
        id: 3,
        username: "Alfred",
        email: "batman4life@juno.com",
        password: "iamjustabutler"
    },
    {
        id: 4,
        username: "Bruce",
        email: "iamnotbatman@yahoo.com",
        password: "reallyNOTbatman"
    },
    {
        id: 5,
        username: "Sherwin",
        email: "notsherman@aol.com",
        password: "classisFUN"
    },

]

const posts = [
    {
        title: "Post 1",
        content: "This project is really hard.",
        dateCreated: 3-12-2023,
        userID: 1
    },
    {
        title: "This is a Better Title",
        content: "I second that notion.",
        dateCreated: 3-13-2023,
        userID: 2
    },
    {
        title: "You're Right",
        content: "I barely learned 'code .' as a command.",
        dateCreated: 3-13-2023,
        userID: 3
    },
    {
        title: "Post 4",
        content: "I couldn't think of a good title either.",
        dateCreated: 3-14-2023,
        userID: 4
    },
    {
        title: "My Thoughts",
        content: "This one is better, I think.",
        dateCreated: 3-14-2023,
        userID: 4
    },
]

const comments = [
    {
        id: 1,
        username: "Bob Jones",
        content: "Superb!",
        dateCreated: 3-12-2023
    },
    {
        id: 2,
        username: "John Jacobs",
        content: "Terrible blog!",
        dateCreated: 3-15-2023
    },
    {
        id: 3,
        username: "Donald Trump",
        content: "I could've done that better",
        dateCreated: 3-16-2023
    },
    {
        id: 4,
        username: "Joe Biden",
        content: "Where am I?",
        dateCreated: 3-17-2023
    },

]

const makingSeeds = async ()=>{
    try{
        await sequelize.sync({force:true})
        await User.bulkCreate(users,{
            individualHooks:true
        });
        await Post.bulkCreate(posts);
        await Comment.bulkCreate(comments);
        console.log("This seems to work.");
        process.exit(0);
    } catch(err){
        console.log("This is an error, I believe.");
        console.log(err);
    }
}

makingSeeds()
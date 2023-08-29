const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, {
  foreignKey: "userID",
  onDelete: "CASCADE"
});

Post.hasMany(Comment, {
  foreignKey: "postID",
  onDelete: "CASCADE"
})

Comment.belongsTo(User, {
  foreignKey: "userID",
  onDelete: "CASCADE"
})

module.exports = {User, Post, Comment};
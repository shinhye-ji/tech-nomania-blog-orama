const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_user_id',
});

User.hasMany(Post, {
  foreignKey: 'post_user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Post, Comment };


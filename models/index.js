const User = require('./User');
const Snippet = require('./Snippet');
const Category = require('./Category');
const Comment = require('./Comment');


User.hasMany(Snippet, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Snippet.belongsTo(User, {
  foreignKey: 'user_id',
});

Snippet.hasMany(Comment, {
  foreignKey: 'snippet_id'
});

Snippet.belongsTo(Category, {
  foreignKey: 'category_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Snippet, {
  foreignKey: 'snippet_id',
});

Category.hasMany(Snippet, {
  foreignKey: 'category_id',
});

module.exports = { User, Snippet, Category, Comment };
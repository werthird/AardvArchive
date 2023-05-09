const sequelize = require('../config/connection');
const { User, Snippet, Comment, Category } = require('../models');

const userData = require('./userData.json');
const snippetData = require('./snippetData.json');
const commentData = require('./commentData.json');
const categoryData = require('./categoryData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const categories = await Category.bulkCreate(categoryData, {
    returning: true,
  });

  const posts = await Snippet.bulkCreate(snippetData, {
    returning: true,
  });

  const comments = await Comment.bulkCreate(commentData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
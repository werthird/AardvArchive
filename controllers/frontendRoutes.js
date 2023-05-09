const express = require('express');
const router = express.Router();
//const {User, Snippet, Comment, Category} = require('../models');

//Get route for homepage
router.get('/', async (req, res) => {
  res.render('homepage');
});

module.exports = router;

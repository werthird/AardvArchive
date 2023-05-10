const express = require('express');
const router = express.Router();
const {User, Snippet, Comment, Category} = require('../models');

//Get route for homepage
router.get('/', async (req, res) => {
  res.render('homepage');
});

//Get route for login page
router.get("/login", (req,res) =>{
  if(req.session.user){
    return res.redirect("/profile")
  }
  res.render("login")
});

//Get route for signup page
router.get("/signup", (req,res) =>{
  res.render("signup")
});

//==========================================================================
// PROFILE PAGE
router.get('/profile', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ 
        model: Snippet,
        model: Comment,
      }],
    });
    const user = userData.get({ plain: true });
    const code = user.snippet;
    res.render('profile', {
      user,
      code,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

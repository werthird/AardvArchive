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
router.get('/profile', (req, res) => {
  if (req.session.user) {
    res.render('profile');
  } else {
    alert('not logged in');
  };
});


module.exports = router;

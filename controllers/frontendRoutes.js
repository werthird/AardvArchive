const express = require('express');
const router = express.Router();
const {User, Snippet, Comment, Category} = require('../models');

//Get route for homepage
router.get('/', async (req, res) => {
  try {
    const snippetData = await Snippet.findAll({
      include: [{
        model: User,
        attributes: ['username']
      }],
    });

    const snippets = snippetData.map((snippet) => snippet.get({ plain: true }));

    res.render('homepage', {
      snippets,
      logged_in: req.session.user
    });
  } catch {
    res.status(500).json(err);
  };
});

//Get route for login page
router.get("/login", (req,res) =>{
  if(req.session.user){
    return res.redirect("/profile");
  } else {
    res.render("login");
  };
});

//Get route for signup page
router.get("/signup", (req,res) =>{
  res.render("signup")
});



//==========================================================================
// PROFILE PAGE
router.get("/profile",(req,res)=>{
  if(!req.session.user) {
      return res.redirect('/login')
  }
  User.findByPk(req.session.user.id, {
      include: [Snippet, Comment]
  }).then(userData => {
      const hbsData = userData.get({plain:true})
      hbsData.logged_in = req.session.user?true:false
      // Render the user dashboard and pass in the user data and whether the user is logged in
      res.render("profile", hbsData);
  })
})


module.exports = router;

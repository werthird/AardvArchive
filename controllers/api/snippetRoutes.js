// Import necessary modules and models
const express = require("express");
const router = express.Router();
const {User, Snippet, Comment} = require("../../models");
const withAuth = require('../../utils/auth.js')

// Get all snippets and associated users, comments, and category
router.get("/", (req, res) => {
    Snippet.findAll({include:[User, Comment]})
      .then(dbSnippets => {
        res.json(dbSnippets);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
  });


//==========================================================================
// SINGLE SNIPPET
// Get one snippet with associated user, comment, and category
router.get("/:id", (req, res) => {
    Snippet.findByPk(req.params.id,
        {include:[ User, Comment ]
      }).then(snippetData => {
        const dbSnippet = snippetData.get({plain:true});
        
        dbSnippet.logged_in = req.session.user?true:false

        // Check if the username of the snippet is the same as the username of the logged-in user
        if (dbSnippet.logged_in && dbSnippet.user.username === req.session.user.username) {
          dbSnippet.is_own_post = true;
        } else {
          dbSnippet.is_own_post = false;
        }

        // console.log(dbSnippet);
        res.render('snippet', dbSnippet);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
});



// Create new Snippet post
router.post("/", (req, res) => {
  // check for logged in user
  // if no user in session, send messsage
    if(!req.session.user){
      return res.status(401).json({msg:"Please login!"})
    }
    // create snippet post with title and content input by user; user id from session data
    Snippet.create({
      title:req.body.title,
      code:req.body.code,
      //category_id: req.body.category,
      user_id:req.session.user.id
    })
    // date is "createdAt"
      .then(newSnippet => {
        res.json(newSnippet);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
});

// Update snippet post 
router.put("/:id", (req, res) => {
  if(!req.session.user){
    return res.status(401).json({msg:"Please login!"})
  }
  Snippet.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(updatedSnippet => {
      res.json(updatedSnippet);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});


//Delete snippet post
router.delete("/:id", (req, res) => {

  if(!req.session.user){
    return res.status(401).json({msg:"Please login!"})
  }
    Snippet.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(delSnippet => {
      res.json(delSnippet);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});
  
module.exports = router;
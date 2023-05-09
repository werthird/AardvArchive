// Import necessary modules and models
const express = require("express");
const router = express.Router();
const {User, Snippet, Comment, Category} = require("../../models");
const withAuth = require('../../utils/auth.js')

// Get all snippets and associated users, comments, and category
router.get("/", (req, res) => {
    Snippet.findAll({include:[User, Comment, Category]})
      .then(dbSnippets => {
        res.json(dbSnippets);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
  });

  // Get one snippet with associated user, comment, and category
router.get("/:id", (req, res) => {
    Snippet.findByPk(req.params.id,{include:[User, Comment, Category]})
      .then(dbSnippets => {
        res.json(dbSnippets);
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
      content:req.body.content,
      userId:req.session.user.id
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
    }).then(delSnippet => {
      res.json(delSnippet);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});
  
module.exports = router;
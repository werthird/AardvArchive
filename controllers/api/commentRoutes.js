// Import necessary packages and models
const express = require("express");
const router = express.Router();
const {User, Snippet, Comment} = require("../../models");
const withAuth = require('../../utils/auth.js')

// Retrieve all comments and associated users and snippets
router.get("/", (req, res) => {
  Comment.findAll({include: [User, Snippet]})
  .then(dbComments => {
    res.json(dbComments);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err});
  });
});

// Retrieve a specific comment by ID, including user and snippet information
router.get("/:id", (req, res) => {
  Comment.findByPk(req.params.id,{include:[User, Snippet]})
    .then(dbComment => {
      res.json(dbComment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err});
    });
});

// Create a new comment and associate it with a user and a snippet
router.post("/", (req, res) => {
  if(!req.session.user){
    return res.status(401).json({msg: "Please login first!"})
  }
    Comment.create({
      comment:req.body.comment,
      user_id:req.session.user.id,
      snippet_id:req.body.snippetId
    })
    .then(newComment => {
      res.json(newComment);
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

// Update an exisiting comment by ID
router.put("/:id", (req, res) => {
  if(!req.session.user){
    return res.status(401).json({msg:"Please login first!"})
  }
  Comment.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedComment => {
    res.json(updatedComment);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err});
  });
});

// Delete a specific comment by ID
router.delete("/:id", (req, res) => {
  if(!req.session.user){
    return res.status(401).json({msg:"Please login first!"})
  }
  Comment.destroy({
    where: {
      id: req.params.id
    }
  }).then(delComment => {
    res.json(delComment);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err});
  });
});

module.exports = router;
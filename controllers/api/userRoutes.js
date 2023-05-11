//Import necessary modules and models.
const express = require("express");
const router = express.Router();
const {User, Snippet, Comment} = require("../../models/");
const bcrypt  = require("bcrypt");

//Route to get all users and their associated snippets, comments, and categories from the database.
router.get("/", (req, res) => {
    User.findAll({
      include:[Snippet, Comment, ]
    })
      .then(dbUsers => {
        res.json(dbUsers);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
  });

// Route to log out the current user by destroying their session and redirecting them to the home page.
router.get("/logout", async (req, res) => {
  try {
    await req.session.destroy();
    res.redirect('/');
  } catch (error) {
    // Handle any errors that occur during session destruction
    console.error("Error occurred during logout:", error);
    res.status(500).send("An error occurred during logout.");
  }
});

//Route to get a specific user and their associated snippets and comments from the database by their ID.
router.get("/:id", (req, res) => {
    User.findByPk(req.params.id,{include:[Snippet, Comment, ]})
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
});

// Route to create a new user in the database and create a session for them.
router.post("/", (req, res) => {
  // run hooks to hash and salt password; create user
    User.create(req.body, {individualHooks: true} )
      .then(newUser => {
        req.session.user = {
          id:newUser.id,
          username:newUser.username
        }
        res.json(newUser);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
});

// Route to authenticate a user and create a session for them if they are authenticated.
router.post("/login", (req, res) => {
    // find username name that matches request
    User.findOne({
      where:{
      username:req.body.username
    }
  }).then(foundUser=>{
      // if username is not found, send message
      if(!foundUser){
        return res.status(400).json({msg:"wrong login credentials"})
      }
      // compare password with saved hash
      if(bcrypt.compareSync(req.body.password,foundUser.password)){
        // if pw matches, create session for user 
        req.session.user = {
          id: foundUser.id,
          username: foundUser.username
        }

        return res.json(foundUser);
        // redirect page
      } else {
        return res.status(400).json({msg:"wrong login credentials"})
      }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
});
  
// Route to update a user's information in the database.
router.put("/:id", (req, res) => {
    User.update(req.body, {
      where: {
        id: req.params.id
      },
      individualHooks: true
    }).then(updatedUser => {
      res.json(updatedUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});
  
//Route to delete a user from the database.
router.delete("/:id", (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    }).then(delUser => {
      res.json(delUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
  });

module.exports = router;
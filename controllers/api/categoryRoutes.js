// Import necessary packages and models
// const express = require("express");
// const router = express.Router();
// const {User, Snippet, Comment, Category} = require("../../models");
// const withAuth = require('../../utils/auth.js')

// Retrieve all categories and associated snippets
// router.get("/", (req, res) => {
//   Category.findAll({include: [Snippet]})
//   .then(dbCategories => {
//     res.json(dbCategories);
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json({ msg: "an error occured", err});
//   });
// });

// Retrieve a specific category by ID with snippet information
// router.get("/:id", (req, res) => {
//   Category.findByPk(req.params.id,{include:[Snippet]})
//     .then(dbCategory => {
//       res.json(dbCategory);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ msg: "an error occured", err});
//     });
// });

// Create a new category and associate it with a snippet
// router.post("/", (req, res) => {
//   if(!req.session.user){
//     return res.status(401).json({msg: "Please login first!"})
//   }
//     Category.create({
//       body:req.body.body,
//       user_Id:req.session.user.id,
//       snippet_Id:req.body.snippet_Id
//     })
//     .then(newCategory => {
//       res.json(newCategory);
//     })
//     .catch(err =>{
//       console.log(err);
//       res.status(500).json({ msg: "an error occured", err });
//     });
// });

// Update an exisiting category by ID
// router.put("/:id", (req, res) => {
//   if(!req.session.user){
//     return res.status(401).json({msg:"Please login first!"})
//   }
//   Category.update(req.body, {
//     where: {
//       id: req.params.id
//     }
//   }).then(updatedCategory => {
//     res.json(updatedCategory);
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json({ msg: "an error occured", err});
//   });
// });

// Delete a specific category by ID
// router.delete("/:id", (req, res) => {
//   if(!req.session.user){
//     return res.status(401).json({msg:"Please login first!"})
//   }
//   Category.destroy({
//     where: {
//       id: req.params.id
//     }
//   }).then(delCategory => {
//     res.json(delCategory);
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json({ msg: "an error occured", err});
//   });
// });

// module.exports = router;
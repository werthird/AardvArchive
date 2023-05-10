const express = require('express');
const router = express.Router();

const frontendRoutes = require("./frontendRoutes");
router.use("/",frontendRoutes)

const userRoutes = require("./api/userRoutes.js");
router.use("/api/users",userRoutes)

const snippetRoutes = require("./api/snippetRoutes.js")
router.use("/api/snippets",snippetRoutes)

const commentRoutes = require("./api/commentRoutes.js")
router.use("/api/comments", commentRoutes)

const categoryRoutes = require("./api/categoryRoutes")
router.use("/api/categorys", categoryRoutes)

module.exports = router;
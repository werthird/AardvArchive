const express = require('express');
const router = express.Router();

const userRoutes = require("./api/userRoutes.js");
router.use("/api/users",userRoutes)

module.exports = router;
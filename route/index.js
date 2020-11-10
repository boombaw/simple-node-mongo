const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verify-token');

// loaad route
const post = require('./post');
const user = require('./user');

router.use("/post", verifyToken, post);
router.use('/', user)

module.exports = router;
const express = require('express');
const post = express.Router();

const listPost = require('../action/post/list');
const createPost = require('../action/post/create');
const detailPost = require('../action/post/detail');

post.use("/", listPost);
post.use("/", createPost);
post.use("/", detailPost);

module.exports = post;
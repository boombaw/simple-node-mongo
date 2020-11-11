const express = require('express');
const detail = express.Router();

// import model 
const Post = require("../../domain/models/post");

var httpResponse = require("../../http/response");

detail.get('/:id',  async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        httpResponse.code = 200;
        httpResponse.message = "Success";
        httpResponse.data = post;
        delete httpResponse.error;

        return res.status(httpResponse.code).json(httpResponse);
    } catch (err) {
        httpResponse.code = 500;
        httpResponse.error = err.message;
        httpResponse.data = {};
        httpResponse.message =""
    }
})

module.exports = detail;
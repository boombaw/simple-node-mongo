const express = require('express');
const create = express.Router();

// import models
const Post = require('../../domain/models/post');

var httpResponse = require('../../http/response');

create.post("/", async (req, res) => {
    
    const post = new Post({
      user_id: req.body.user_id,
      post: req.body.post,
      image: req.body.image,
      hashtag: req.body.hashtag,
      category: req.body.category,
      like: req.body.like,
      share: req.body.share,
    });

    try {
        const newPost = await post.save();
        
        httpResponse.code = 201;
        httpResponse.message = "Post was created succesfully";
        httpResponse.data = newPost;

        return res.status(httpResponse.code).json(httpResponse);
    } catch (err) {
        httpResponse.code = 400;
        httpResponse.error = err.message
        httpResponse.data ={}

        return res.status(httpResponse.code).json(httpResponse);
    }
});

module.exports = create;
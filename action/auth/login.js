const express = require('express');
const login = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// import models
const User = require('../../domain/models/user');
// import middlwares validation
const {loginValidation} = require("../../middlewares/validation");

var httpResponse = require('../../http/response');

login.post("/", async (req, res) =>{

    const { error } = loginValidation(req.body);

    if (error) {
      httpResponse.code = 400;
      httpResponse.error = error.details[0].message;

      return res.status(httpResponse.code).json(httpResponse);
    }

    const user = await User.findOne({phone: req.body.phone});
    if(!user) {
        httpResponse.code = 400;
        httpResponse.error = "Account with " + req.body.phone + " not found";
        return res.status(httpResponse.code).json(httpResponse);
    }

    const pwd = await bcrypt.compare(req.body.password, user.password);
    if (!pwd) {
        httpResponse.code = 400;
        httpResponse.error = "Please check your valid password";
        return res.status(httpResponse.code).json(httpResponse);
    }

    // generate token
    console.log(process.env.JWT_TIME);
    const token = jwt.sign({_id: user.id}, process.env.JWT_KEY, {expiresIn: process.env.JWT_TIME});

    httpResponse.code = 200;
    httpResponse.message = "Login successful";
    httpResponse.data = { "token" : token};

    return res.header({ "user-token": token }).json(httpResponse);
});

module.exports = login;
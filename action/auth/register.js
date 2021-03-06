const express = require('express');
const register = express.Router();
const bcrypt = require('bcryptjs');
// import models
const User = require('../../domain/models/user');
// import middlwares validation
const {registerValidation} = require("../../middlewares/validation");

var httpResponse = require('../../http/response');

register.post("/", async (req, res) => {

    const {error } = registerValidation(req.body)

    if (error) {
        httpResponse.code = 400;
        httpResponse.error = error.details[0].message;
        httpResponse.data = {}
        httpResponse.message = "";

        return res.status(httpResponse.code).json(httpResponse);
    }

    // check is exist phone number
    User.countDocuments({ phone: req.body.phone }, (err, count) => {
        if (count > 0) {
            httpResponse.code = 400;
            httpResponse.error = "Phone number is already";
            httpResponse.message = ""
            httpResponse.data = {};

            return res.status(httpResponse.code).json(httpResponse);
        }
    });
    

    // hash password
    const salt = await bcrypt.genSalt(7).catch((e) => {
      console.error(e.message);
    });
    const hashPass = await bcrypt.hash(req.body.password, salt).catch((e) => {
      console.error(e.message);
    });

    const user = new User({
        name: req.body.name,
        phone: req.body.phone,
        password: hashPass
    });

    try {
        const newUser = await user.save();

        httpResponse.code = 201;
        httpResponse.message = "User was created";
        httpResponse.data = newUser
        httpResponse.error = ""
        delete httpResponse.error;
        
        return res.status(httpResponse.code).json(httpResponse);
    } catch (err) {
        httpResponse.code = 500;
        httpResponse.error = err.message
        httpResponse.data ={}
        httpResponse.message = ""
    }

});

module.exports = register;
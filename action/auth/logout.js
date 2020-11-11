const express = require("express");
const logout = express.Router();
const Blacklist = require("../../domain/models/blacklist");

const verifyToken = require("../../middlewares/verify-token");

var httpResponse = require("../../http/response");

logout.post('/', verifyToken, async (req, res) => {
    const blacklistToken = new Blacklist({token: req.headers["user-token"]});

    try {
        await blacklistToken.save();

        httpResponse.code = 200;
        httpResponse.message = "Logout successfully";

        return res.status(httpResponse.code).json(httpResponse);
    } catch (err) {
        httpResponse.code = 500;
        httpResponse.error = err.message
    }
});

module.exports = logout;
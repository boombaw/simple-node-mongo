const express = require('express');
const user = express.Router();
const register = require('../action/auth/register');
const login = require('../action/auth/login');
const logout = require('../action/auth/logout');

user.use("/register", register)
user.use("/login", login)
user.use("/logout", logout)

module.exports = user;
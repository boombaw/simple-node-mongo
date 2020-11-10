const mongoose = require("mongoose");

const Blacklist = new mongoose.Schema(
  {token: { type: String, required: true,}}
);

module.exports = mongoose.model("BlacklistToken", Blacklist);

"use strict";

var mongoose = require("mongoose");


var userModel = mongoose.Schema({
  nickname: { type: String, required: true, uniqued: true }
});

module.exports = mongoose.model("user", userModel);
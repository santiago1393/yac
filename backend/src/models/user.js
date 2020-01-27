"use strict";

var mongoose = require("mongoose");


var userModel = mongoose.Schema({
  nickname: { type: String, required: true, uniqued: true },
  last_login_date: {type: Date, require: false}
});

module.exports = mongoose.model("user", userModel);
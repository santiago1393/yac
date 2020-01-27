"use strict";

var mongoose = require("mongoose");

var messageModel = mongoose.Schema({
  message: { type: String, required: true },
  date: {type: Date, require: true},
  user: {type: String, require: true}
});

module.exports = mongoose.model("message", messageModel);
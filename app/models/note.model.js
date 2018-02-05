"use strict";
var mongoose = require("mongoose");
var NoteSchema = mongoose.Schema({
  title: String,
  content: String
},
{
  timeStamps: true
});


module.exports = mongoose.model("Note", NoteSchema);

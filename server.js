"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
var dbConfig = require("./config/database.config.js");
var mongoose = require("mongoose");

mongoose.connect(dbConfig.url, {
  useMongoClient: true
});

mongoose.connection.on("error", function(){
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});

mongoose.connection.once("open", function(){
  console.log("Successfully connected to the database");
});

//define a simple route
app.get("/", function(req, res){
  res.json({"message": "Welcome to Easynotes application."});
});

// Require Notes routes
require("./app/routes/note.routes.js")(app);


var port = 8000;
app.listen(port, function(){
  console.log("server running on PORT : " + port);
})

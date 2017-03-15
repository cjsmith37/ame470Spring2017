var express = require("express");
var server = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 8083;

var db = require('mongoskin').db('mongodb://user:pwd@127.0.0.1:28017/picturedb');

server.get("/", function (req, res) {
      res.redirect("/index.html");
});


var picList = [];


server.get("/addPic", function (req, res) {
  db.collection("data").insert(req.query, function(err, result){
      if(err){
        res.send("error"); 
      }
      else{
        db.collection("data").find({}).toArray( function(err1, result1) {
          res.send(JSON.stringify(result1));
        });
      }
  });
});


server.get("/deletePic", function (req, res) {
   var id = req.query.id.toString();
   console.log(id);
   db.collection("data").remove({id: id}, function(err, result){
     console.log(err);
      if(err){
        res.send("error"); 
      }
      else{
        db.collection("data").find({}).toArray( function(err1, result1) {
          res.send(JSON.stringify(result1));
        });
      }
   });
});

server.get("/getPic", function (req, res) {
  db.collection("data").find({}).toArray( function(err, result) {
    res.send(JSON.stringify(result));
  });
});

server.use(methodOverride());
server.use(bodyParser());
server.use(express.static(__dirname + '/public'));
server.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
server.listen(port);
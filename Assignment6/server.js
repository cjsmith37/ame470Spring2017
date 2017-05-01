var fs = require('fs');
var express = require("express");
var server = express();
var bodyParser = require('body-parser');
var multer  = require('multer');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');

server.use(express.static('public'));
server.use(bodyParser.urlencoded({ extended: false }));
var upload = multer({ dest: '/tmp/' });

var hostname = process.env.HOSTNAME || 'localhost';
var port = 8080;

var db = require('mongoskin').db('mongodb://user:pwd@127.0.0.1:27017/tododb');

server.get("/", function (req, res) {
      res.redirect("/index.html");
});

var todoList = [];

server.post('/fileUpload', upload.single('file'), function(req, res) {
  var file = __dirname + '/' + req.file.filename;
  fs.rename(req.file.path, file, function(err) {
    if (err) {
      console.log(err);
      res.send("error");
    } else {
      res.json({
        message: 'File uploaded successfully',
        filename: req.file.filename
      });
    }
  });
});

server.get("/addTodo", function (req, res) {
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


  server.get("/deleteTodo", function (req, res) {
     //var id = parseInt(req.query.id);
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

  server.get("/getTodos", function (req, res) {
  db.collection("data").find({}).toArray( function(err, result) {
    res.send(JSON.stringify(result));
  });
});

server.get("/getTodo", function (req, res) {
  var id = req.query.id.toString();
  db.collection("data").findOne({id:id}, function(err, result) {
    res.send(JSON.stringify(result));
  });
});


  server.use(methodOverride());
  server.use(bodyParser());
  server.use(express.static(__dirname + '/public'));
  server.use(errorHandler());
console.log("Simple static server listening at http://" + hostname + ":" + port);
server.listen(port);

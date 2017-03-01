var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 8081;

var db = require('mongoskin').db('mongodb://user:pwd@127.0.0.1:27017/tododb');

app.get("/", function (req, res) {
      res.redirect("/index.html");
});

var todoList = [];

app.get("/deleteTodo", function(req,res) {
	var index = parseInt(req.query.index);
	todoList.splice(index,1);
	res.send(JSON.stringify(todoList));
});

app.get("/addTodo", function (req, res) {
	//db.data.find()
	//console.log(req.query);
	todoList.push(req.query);
    res.send(JSON.stringify(todoList)); 
}
);

//connection between client and server delete

app.get("/getTodo", function(req,res) {
	db.collection("data").find({}).toArray( function(err, result) {
		res.send(JSON.stringify(todoList));
	});
	//res.send(JSON.stringify(todoList));
})

app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);

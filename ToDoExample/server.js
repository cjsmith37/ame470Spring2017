var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 8081;

app.get("/", function (req, res) {
      res.redirect("/index.html");
});

var todoList = [];

app.get("/addTodo", function (req, res) {
	console.log(req.query);
	todoList.push(req.query);
    res.send(JSON.stringify(todoList)); 
}
);

app.get("/getTodo", function(req,res) {
	res.send(JSON.stringify(todoList));
})

app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);

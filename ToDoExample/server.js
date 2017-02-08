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


var addCallback = function (req, res) {
	console.log(req.query);
    var a = parseFloat(req.query.a);
    var b = parseFloat(req.query.b);
    var result  = a + b;

    res.send(result.toString()); // send response body
}

var subCallback = function (req, res) {
  var a = parseFloat(req.query.a);
  var b = parseFloat(req.query.b);
  var result = a - b;

  res.send(result.toString());
}

var multCallback = function (req, res) {
  var a = parseFloat(req.query.a);
  var b = parseFloat(req.query.b);
  var result = a * b;

  res.send(result.toString());
}
var divCallback = function (req, res) {
  var a = parseFloat(req.query.a);
  var b = parseFloat(req.query.b);
  var result = a / b;

  res.send(result.toString());
}

app.get("/sub", subCallback);
app.get("/mult", multCallback);
app.get("/div", divCallback);

app.get("/addTodo", addCallback);

app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);

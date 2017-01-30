var http = require("http");

function callback (req, res) { // req -> request object; res -> response object
   res.writeHead(200, {'Content-Type': 'text/plain'}); // send response header
   res.end("hello world"); // send response body
}

var server = http.createServer(callback) // create an http server
server.listen(8080, "34.198.35.134"); // make server listen to port 1234
console.log("Server running at: "+ "http://34.198.35.134:8080");

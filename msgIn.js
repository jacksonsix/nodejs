// waiting for input , then log to file
var http = require('http');

//create a server object:
http.createServer(function (req, res) {
  var a =10;
	 debugger;	
	var b = 34;
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(3000); //the server object listens on port 3000

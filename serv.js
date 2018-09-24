// node service

var http = require('http');
var fs = require('fs');

console.log('listen to 3000');
http.createServer(function (req, res) {
  var body='';
  var filename = req.url.slice(1);
  if(filename =='favicon.ico') return;
  
  req.on('data',function(chunk){
	  body += chunk;
  }).on('end',function(){
	  req.postdata = body;
	  if(req.method ==='GET'){
		   console.log('send '+filename);
		  var index = fs.readFileSync('C:\\_script\\github\\nodejs\\picture_data\\' +filename+'.txt');
		  res.writeHead(200, {'Content-Type': 'text/plain',
											"Access-Control-Allow-Origin": "*"
										  });
		  res.write(index);
		  res.end();
	  }else if(req.method ==='POST'){
		  console.log('write '+filename);
		  var seq = new Date().getTime();
		  fs.writeFile('C:\\_script\\github\\nodejs\\picture_data\\' +seq+'.txt',req.postdata,function(err){
			  console.log(err);
		  });
		  res.writeHead(200, {'Content-Type': 'text/plain'	
										  });
		  res.write('ok');
		  res.end();
	  }
  })

  
}).listen(3000);





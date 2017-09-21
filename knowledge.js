// event example
var events = require('events');

var emitter = new events.EventEmitter();

var aud1 =  function aud1(d){
	console.log('aud1');
	console.log(d);
}

emitter.on('msg1',aud1);
//emitter can emit with parameters

emitter.emit('msg1','bigdata');

//The EventEmitter appears to call all listeners using the apply method. 
//Therefore, every listener can expect to receive arguments in the same order passed to the emit function


//javascript does not do whole scope scan
function(){
var a = b +4;
var b =8;
return a;	
}
//will get NaN;

function(){
var b = 8;
var a = b+8;
return a;	
}

//will get 16


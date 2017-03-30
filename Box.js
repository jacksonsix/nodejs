const logger = require('./logger.js');

exports.Wire = function (name){
	this.name = name;
	this.val = 'null';
	this.list = [];
	
	this.add = function(box){ this.list.push(box);};
	
	this.getValue = function() { return this.val; };
	
	this.setValue = function(val){ 
	    if(val === this.val) return;
	    var cmd = 'setvalue ' + this.name + ' ' + val;
	    console.log(cmd);	
	    logger.log(cmd); 	
	    var that = this;	
	    this.val = val;		
		
	    this.list.forEach(function(box){
		        if(box === that) return;
		        console.log('inform ' + box.name);
			box.handleChange(that);
	     })	    
	};
	this.forget = function() {this.val = 'null';};
	console.log('wire ok');
}


exports.Adder = function (name,a,b,c){
	this.name = name;
	this.a = a;
	this.b = b;
	this.c = c;
	
	this.a.add(this);
	this.b.add(this);
	this.c.add(this);
	
	this.handleChange = function(wire){ 
		var source = wire.name;
		console.log('source is ' + source);
		switch(source){
		case this.a.name :
			if(this.b.getValue() ==='null' && this.c.getValue() ==='null') break;
			if(this.b.getValue() ==='null') { b.setValue(this.c.getValue() - this.a.getValue()); break;}
			if(this.c.getValue() ==='null') { c.setValue(this.a.getValue() + this.b.getValue()); break;}
		case this.b.name:
			if(this.a.getValue() ==='null' && this.c.getValue() ==='null') break;
			if(this.a.getValue() ==='null') { a.setValue(this.c.getValue() - this.b.getValue()); break;}
			if(this.c.getValue() ==='null') { c.setValue(this.a.getValue() + this.b.getValue()); break;}
		case  this.c.name:
			if(this.a.getValue() ==='null' && this.b.getValue() ==='null') break;
			if(this.a.getValue() ==='null') { a.setValue(this.c.getValue() - this.b.getValue()); break;}
			if(this.b.getValue() ==='null') { b.setValue(this.c.getValue() - this.a.getValue()); break;}
		default:
		  break;
	    }
		
	}
	console.log('adder ok');
	
}
exports.Mult = function(name,a,b,c){
	this.name = name;
	this.a = a;
	this.b = b;
	this.c = c;
	
	this.a.add(this);
	this.b.add(this);
	this.c.add(this);
	
	this.handleChange = function(wire){ 
		var source = wire.name;
		console.log('mult source is ' + source);
		switch(source){
		case this.a.name :
			if(this.b.getValue() ==='null' && this.c.getValue() ==='null') break;
			if(this.b.getValue() ==='null') { b.setValue(this.c.getValue() / this.a.getValue()); break;}
			if(this.c.getValue() ==='null') { c.setValue(this.a.getValue() * this.b.getValue()); break;}
		case this.b.name:
			if(this.a.getValue() ==='null' && this.c.getValue() ==='null') break;
			if(this.a.getValue() ==='null') { a.setValue(this.c.getValue() / this.b.getValue()); break;}
			if(this.c.getValue() ==='null') { c.setValue(this.a.getValue() * this.b.getValue()); break;}
		case this.c.name:
			if(this.a.getValue() ==='null' && this.b.getValue() ==='null') break;
			if(this.a.getValue() ==='null') { a.setValue(this.c.getValue() / this.b.getValue()); break;}
			if(this.b.getValue() ==='null') { b.setValue(this.c.getValue() / this.a.getValue()); break;}
		default:
		  break;
	    }
		
	}
	console.log('multer ok');
	
}

exports.Const = function (v,wire){
	this.v = v;
	this.wire = wire;
	this.wire.setValue(v);
	// bug, wire can setValue its value
	
	console.log('const ok ' + wire.name);
}


//var a = new Wire('a');
//var b = new Wire('b');
//var c = new Wire('c');

//var box = new Adder(a,b,c);

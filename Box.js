
exports.Wire = function (name){
	this.name = name;
	this.val = 'null';
	this.list = [];
	
	this.add = function(box){ this.list.push(box);};
	
	this.getValue = function() { return this.val; };
	
	this.setValue = function(val){ 
	    if(val === this.val) return;
	    this.val = val;
		this.list.forEach(function(box){
			box.handleChange(this);
		})
	     console.log('set value' + val);	
	};
	this.forget = function() {this.val = 'null';};
	console.log('wire ok');
}


exports.Adder = function (a,b,c){
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
		case 'a' :
			if(this.b.getValue() ==='null' && this.c.getValue() ==='null') break;
			if(this.b.getValue() ==='null') { b.setValue(this.c.getValue() - this.a.getValue()); break;}
			if(this.c.getValue() ==='null') { c.setValue(this.a.getValue() + this.b.getValue()); break;}
		case 'b':
			if(this.a.getValue() ==='null' && this.c.getValue() ==='null') break;
			if(this.a.getValue() ==='null') { a.setValue(this.c.getValue() - this.b.getValue()); break;}
			if(this.c.getValue() ==='null') { c.setValue(this.a.getValue() + this.b.getValue()); break;}
		case 'c':
			if(this.a.getValue() ==='null' && this.b.getValue() ==='null') break;
			if(this.a.getValue() ==='null') { a.setValue(this.c.getValue() - this.b.getValue()); break;}
			if(this.b.getValue() ==='null') { b.setValue(this.c.getValue() - this.a.getValue()); break;}
		default:
		  break;
	    }
		
	}
	console.log('adder ok');
	
}


//var a = new Wire('a');
//var b = new Wire('b');
//var c = new Wire('c');

//var box = new Adder(a,b,c);

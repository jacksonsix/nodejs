
exports.Wire = function (name){
	this.name = name;
	
	this.getValue = function(){ return this.value; }
	this.setValue = function(value) { this.value = value;}
	console.log('wire ' + this.name);
}


exports.Mult = function (a,b,c){
	this.a = a;
	this.b =b;
	this.c =c;
	console.log('mult ');
	
}

function Adder(a,b,c){
	this.a = a;
	this.b - b;
	this.c = c;
	console.log('adder ok');
	
}

exports.Const = function (v,wire){
	this.v = v;
	this.wire = wire;
	this.wire.setValue(v);
	this.getValue = function(){ return this.v;}
	console.log('const ' + wire.name);
}

exports.Mult = function(a,b,c){
	this.a = a;
	this.b = b;
	this.c = c;
	
	this.a.add(this);
	this.b.add(this);
	this.c.add(this);
	
	this.handleChange = function(wire){ 
		let source = wire.name;
		switch(source){
		case 'a' :
			if(this.b.getValue() ==='null' && this.c.getValue() ==='null') break;
			if(this.b.getValue() ==='null') { b.setValue(this.c.getValue() / this.a.getValue()); break;}
			if(this.c.getValue() ==='null') { c.setValue(this.a.getValue() * this.b.getValue()); break;}
		case 'b':
			if(this.a.getValue() ==='null' && this.c.getValue() ==='null') break;
			if(this.a.getValue() ==='null') { a.setValue(this.c.getValue() / this.b.getValue()); break;}
			if(this.c.getValue() ==='null') { c.setValue(this.a.getValue() * this.b.getValue()); break;}
		case 'c':
			if(this.a.getValue() ==='null' && this.b.getValue() ==='null') break;
			if(this.a.getValue() ==='null') { a.setValue(this.c.getValue() / this.b.getValue()); break;}
			if(this.b.getValue() ==='null') { b.setValue(this.c.getValue() / this.a.getValue()); break;}
		default:
		  break;
	    }
		
	}
	console.log('multer ok');
	
}


function CF(c,f){
	this.c = c;
	this.f = f;
	
	this.u = new Wire('u');
	this.v = new Wire('v');
	this.w = new Wire('w');
	this.x = new Wire('x');
	this.y = new Wire('y');
	
	this.multi = new Mult(c,w,u);
	this.multi2 = new Mult(v,x,u);
	this.adder = new Adder(v,y,f);
	this.c1 =  new Const(9,w);
	this.c2 = new Const(5,x);
	this.c3 = new Const(32,y);
	
	console.log('cf ok');

	
}




// Shape - superclass
function Shape() {
  this.x = 0;
  this.y = 0;
}

// superclass method
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// Rectangle - subclass
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// subclass extends superclass
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log('Is rect an instance of Rectangle?',
  rect instanceof Rectangle); // true
console.log('Is rect an instance of Shape?',
  rect instanceof Shape); // true
rect.move(1, 1); // Outputs, 'Shape moved.'

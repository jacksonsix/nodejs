
exports.Wire = function (name){
	this.name = name;
	console.log('wire ok');
}


function Mult(a,b,c){
	this.a = a;
	this.b =b;
	this.c =c;
	console.log('mult ok');
	
}

function Adder(a,b,c){
	this.a = a;
	this.b - b;
	this.c = c;
	console.log('adder ok');
	
}

function Const(v,wire){
	this.v = v;
	this.wire = wire;
	console.log('const ok ' + wire.name);
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

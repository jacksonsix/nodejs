var w = require('./Box.js');
var c = new w.Wire('c');
var f = new w.Wire('f');

var w1 = new w.Wire('w1');
var w2 = new w.Wire('w2');
var w3 = new w.Wire('w3');
var w4 = new w.Wire('w4');
var w5 = new w.Wire('w5');

const c9 = new w.Const(9,w1);
var m1 = new w.Mult('m1',c,w1,w2);


const c5 = new w.Const(5,w3);
var m2 = new w.Mult('m2',w3,w4,w2);

const c32 = new w.Const(32,w5);
var adder = new w.Adder('add1',w4,w5,f);

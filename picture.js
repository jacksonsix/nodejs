// issue: when delete, it might delete overlap line.  
// instroduce layer to solve this.     interface    drawTable  --->  drawLayer, LayerToTable
// default layer =0,  
 
/// frame begins here
function makeFrame(startv,v1,v2){
  var frame ={};
  frame.startv = startv;
  frame.v1 = v1;
  frame.v2 = v2;
  return frame;
}
function orgin(frame){
	return frame.startv;
}
function edge1(frame){
	return frame.v1;
}
function edge2(frame){
	return frame.v2;
}
// same as makePoint?
function makeVector(x,y){
  var v ={};
  v.x = x;
  v.y =y;
  return v;
}
function xcor(v){
  return v.x;
}
function ycor(v){
	return v.y;
}
function makeLine(start,end){
	var line ={};
	line.start = start;
	line.end = end;
	return line;
}
function getstart(line){
	return line.start;
}
function getend(line){
	return line.end;
}
// vector calculation
function addVect(v1,v2){
  return makeVector((v1.x+v2.x), v1.y+ v2.y);
}
function subVect(v1,v2){
  //return addVect(v1,makeVector(-v2.x,-v2.y));
  return makeVector((v1.x - v2.x), v1.y - v2.y);
}
function scaleVect(k,v){
	return makeVector(k*v.x, k* v.y);
}
//

// from 0,10 physical to frame
function frameMap(frame){
  return function(v){
		return  addVect(orgin(frame),
								 addVect( scaleVect(xcor(v), edge1(frame)),
										  scaleVect(ycor(v), edge2(frame))));
  }; 
}


function paintLinesinFrame(lines){
	return function(frame){
	    let map = frameMap(frame);
		lines.forEach(function(line){
			let start = getstart(line);
			let end = getend(line);
			paintTable(pointsToMatrix(linetoPt(map(start),map(end))));
		});
	}
}

function eraseLinesinFrame(lines){
	return function(frame){
	    let map = frameMap(frame);
		lines.forEach(function(line){
			let start = getstart(line);
			let end = getend(line);
			paintTable(pointsToMatrix(linetoPt(map(start),map(end))),true);
		});
	}
}

// graphics system
var dots ={};
dots.width = 20;
dots.height = 20;

function linetoPt(pt1,pt2){
    // rectify, scan by y
	//dots,  grid , 
	function checkAndAdd(pts,pt){
		for(var i=0;i<pts.length;i++){
			//if(pts[i].y == pt.y){
			//	pts[i].x = pt.x;
				//return;
			//} 
		}
		pts.push(pt);		
	}
	if(pt2.y < pt1.y){
	   var t = pt1;
	   pt1 = pt2;
	   pt2 = t;
	}
	var direction =1;
	if(pt2.x < pt1.x){
		direction = -1;
	}
	var x1 = pt1.x;
	var y1 = pt1.y;
	var x2 = pt2.x;
	var y2 = pt2.y;
	
	var len = Math.sqrt(Math.pow((x1 - x2),2) + Math.pow((y1-y2),2));
	var cos = Math.abs(x1 - x2) / len;
	var sin = Math.abs(y1 - y2) / len;
	var pts = [];
	var step = 0.5 /dots.width;
	for(var i=0; i<len;){
		var xx = x1 +  i * cos * direction;
		var yy = y1 +  i * sin;
		var npt ={};
		npt.x = Math.floor(xx * dots.width);
		npt.y = Math.floor(yy * dots.height);
		if(npt.x == dots.width) { npt.x = dots.width -1;}
		if(npt.y == dots.height) { npt.x = dots.height -1;}		
		
		checkAndAdd(pts,npt);
		i += step;
	}	
	return pts;
}
// all non-zero points in a set 
function pointsToMatrix(pts){
  var init = emptyData(dots.width,dots.height);
  pts.forEach(function(pt){
    init[pt.y][pt.x] = 1;
  });
  return init;
}


function initTable() {
    var table = document.getElementById("paint");
	for(var i =0;i<dots.height;i++){
	     var row = table.insertRow(i);
		 for(var j=0;j<dots.width;j++){
			row.insertCell(j);
		 }
	}    
}

function emptyData(width,height){
	var matrix = [];
	for(var i=0;i<dots.height;i++){
		matrix[i] = [];
		for(var j=0;j<dots.width;j++){
			matrix[i][j] = 0;
		}
	}
	return matrix;
}

// picture operations base on frame, imagefn as abstract of image detail
function transform(painter,orgin,edge1,edge2){
	// non-zero data     
    //return a new imagefn for further process
	return function (frame){
		let map = frameMap(frame);
		let norgin = map(orgin);
		return painter(makeFrame(norgin, 
		                         subVect(map(edge1), norgin),
								 subVect(map(edge2), norgin)));
	}	
}

function upsidedown( painter){
	return transform(painter,makeVector(0,1),makeVector(1,1),makeVector(0,0));
}

function rotate90(painter){
	return transform(painter,makeVector(1,0),makeVector(1,1),makeVector(0,0));
}

function shrinkToUpper(painter){
	return transform(painter,makeVector(0.5,0.5),makeVector(1,0.5),makeVector(0.5,1));
}
//helper function

function beside(painter1, painter2){
	let split = makeVector(0.5,0);
    let paint_left = transform(painter1, makeVector(0,0),split,makeVector(0,1));
	let paint_right = transform(painter2, split,makeVector(1,0),makeVector(0.5,1));
	return function(frame){
		paint_left(frame);
		paint_right(frame);
	}
}


function below(painter1,painter2){
	let split = makeVector(0,0.5);
	let paint_up = transform(painter2,split,makeVector(1,0.5),makeVector(0,1));
	let paint_down = transform(painter1,makeVector(0,0),makeVector(1,0),split);
	return function(frame){
		paint_up(frame);
		paint_down(frame);
	}
}
///-> change to layer implementation

function paintTable(data,berase){
  var table = document.getElementById("paint");
  // data as matrix
  if(data ==null) return;
  for(var i =0;i<data.length;i++){
    var row = data[i];
	for(var j=0;j<row.length;j++){
		var cell = row[j];
		if(cell == 1){
			if(berase ){
				 table.rows[i].cells[j].innerText='';
			}else{
				 table.rows[i].cells[j].innerText='X';
			}		 
		}
	}
  }
  
}

///<--

/// read write data a string.
// data as matrix,  seperate by comma, end of line
function readline(line){
	var vect=[];
	var ds = line.split(",");
	ds.forEach(function(d){
		if(d =='0'){
			vect.push(0);
		}
		if(d =='1'){
			vect.push(1);
		}
	});
	return vect;
}
function readstring(str){
	if(str.length > 5000) return -1;
	var data = [];
	var lineno = 0;
	for(var i=0,j=0;i<str.length;i++){
		if(str[i] == '\n'){
			data[lineno++] = readline(str.substring(j,i));
			j = i+1;
		}
	}
	return data;
}


function writestring(data){
  if(data ==null) return;
  var str='';
  for(var i =0;i<data.length;i++){
    var row = data[i];
	var line ='';
	for(var j=0;j<row.length;j++){
		var cell = row[j];
		line += cell;
		if(j < row.length -1)	line += ',';
	}
	line += '\n';
	str += line;
  }
  return str;
}


function readFromService(num)
{
	var d;
    $.ajax({
	  url: "http://localhost:3000/" + num,
	
	}).done(function(data) {
	   var d= readstring(data);
	   paintTable(d);
	   setTimeout(() => {paintTable(d,true);},40);
	});
	
}

function writeToService(pdata)
{
	var d;
    $.ajax({
	  url: "http://localhost:3000/1",
	  type: 'POST',
	  data: pdata
	}).done(function(data) {
	   console.log('post to service');
	});
	
}

// ui click event;
document.getElementById("paint").addEventListener("click", function( event ) {
    // display the current click count inside the clicked div
	if(event.target.localName !=='td' ) return;
	if(event.target.textContent ==='X'){
	  event.target.textContent =' ';
	}else{
	  event.target.textContent = 'X';
	}
    
  }, false);
  
function savepicture(){
	var table = document.getElementById("paint");
  // data as matrix
  var data=[];
  for(var i =0;i<table.rows.length;i++){
     data[i] = [];	 
	for(var j=0;j<table.rows[i].cells.length;j++){
		if(table.rows[i].cells[j].innerText==='X'){
			data[i][j] = 1;
		}else{
			data[i][j] = 0;
		}
	}
  }
  return data;
} 
function savebtn(){
	var data = savepicture();
	var s = writestring(data);
	writeToService(s);
}

//time axis
// define spot 0,1,2,3...
function timing(){
	var result = {};
	var timing =[];
	function executer(timing,index,loop){
		for(var i=0;i<timing.length;i++){
			var evt = timing[i];
			if(evt.proc != null){ 
					var 	delay = evt.num -  timing[0].num;								
					setTimeout(evt.proc,delay*50);			
			}
			console.log(i);	
			if(i == timing.length-1) {
				setTimeout(() =>{executer(timing,0,loop);}, 400);
			}
			}

	}
	
	result.timing =timing;
	result.executer=executer;	
	return result;
} 


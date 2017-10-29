
//b,c f,m,s
var setA=  [1,2,3,4,5];
var setB=  [1,2,3,4,5];
var setC = [1,2,3,4,5];
var setD = [1,2,3,4,5];
var setE = [1,2,3,4,5];
var path=[];


function uninode(suc, fail){
	var init = setA[0];
	suc(init,fail);
}


function sucA(value,fail){
	if(value){
		path.push(value);
		console.log(path);
	}
	else{
		console.log('fail A');
		return;
	}
	// do require here 
	if(testA(value,path)){
		// continue with B here
		var initB = setB[0];
		sucB(initB,failB);
	}
		
	fail();
	
}

function failA(){
	path.pop();
	setA = setA.splice(1);
	var another = setA[0];
	sucA(another,failA);
}

function sucB(value,fail){   
	if(value){	    
	  path.push(value);
	  console.log(path);				
	}
	else{
		console.log('fail B');
		// reset setB here
		setB=[1,2,3,4,5];
		return;
	}
	
	if(testB(value,path)){
	  // go to C level
	  var cvalue = setC[0];
	  sucC(cvalue,failC);
	}
	
	fail();
}

function failB(){
	path.pop();
	setB = setB.splice(1);
	var another = setB[0];
	sucB(another,failB);
}

function sucC(value,fail){
	if(value){
		path.push(value);
		console.log(path);
	}
	else{
		console.log('fail c');
		//reset , undo CSet here
		setC = [1,2,3,4,5];
		return;
	}
	if(testC(value,path)){
	  	// goto D level
	  var dvalue = setD[0];
	  sucD(dvalue,failD);
	}	
	fail();
}

function failC(){
	path.pop();
	setC = setC.splice(1);
	var another = setC[0];
	sucC(another,failC);
}

function sucD(value,fail){
	if(value){
		path.push(value);
		console.log(path);
	}
	else{
		console.log('fail d');
		//reset , undo CSet here
		setD = [1,2,3,4,5];
		return;
	}
	if(testD(value,path)){
	  // goto E level
	  var evalue = setE[0];
	  sucE(evalue,failE);
	}
	
	fail();
}

function failD(){
	path.pop();
	setD = setD.splice(1);
	var another = setD[0];
	sucD(another,failD);
}

function sucE(value,fail){
	if(value){
		path.push(value);
		console.log(path);
	}
	else{
		console.log('fail e');
		//reset , undo CSet here
		setE = [1,2,3,4,5];
		return;
	}	
	
    if(testE(value,path)){
		console.log('scucess');
		console.log(path);
		//return;
	}	
	fail();
}

function failE(){
	path.pop();
	setE = setE.splice(1);
	var another = setE[0];
	sucE(another,failE);
}

//require here
function distintct(value,arr){
	for(var i=0; i< arr.length -1 ; i++){
		 if( value == arr[i]){
			return false;
		 }
	}
	return true;
}

function testA(value,path){
	return (value !== 5);	
}

function testB(value,path){
	return value && value !== 1 && distintct(value,path) ;
}

function testC(value,path){
	return value && value !== 5  && value !== 1 && distintct(value,path) && Math.abs(value - path[1]) != 1;
}

function testD(value,path){
   return value && value > path[1] && distintct(value,path) ;
}

function testE(value,path){
	return Math.abs(value - path[2]) != 1  &&  distintct(value,path);
}

uninode(sucA,failA);

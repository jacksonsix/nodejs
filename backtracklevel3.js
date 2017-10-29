
var setA=[1,2,3,4];
var setB=[4,5,6,7];
var path=[];
var setC = [11,12,13,14];

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
	
	// continue with B here
	var initB = setB[0];
	sucB(initB,failB);	
	//
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
		setB=[4,5,6,7];
		return;
	}
	// go to C level
	var cvalue = setC[0];
	sucC(cvalue,failC);
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
		setC = [11,12,13,14];
		return;
	}
	fail();
}

function failC(){
	path.pop();
	setC = setC.splice(1);
	var another = setC[0];
	sucC(another,failC);
}

uninode(sucA,failA);


var setA=[1,2,3,4];
var setB=[4,5,6,7];
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
	fail();
}

function failB(){
	path.pop();
	setB = setB.splice(1);
	var another = setB[0];
	sucB(another,failB);
}

uninode(sucA,failA);

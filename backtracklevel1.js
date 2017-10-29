var setA=[1,2,3,4];
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
	fail();
}

function failA(){
	path.pop();
	setA = setA.splice(1);
	var another = setA[0];
	sucA(another,failA);

}

uninode(sucA,failA);

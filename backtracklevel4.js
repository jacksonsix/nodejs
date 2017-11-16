//eight queens
var data=[];
var d = [0,1,2,3,4,5,6,7];
var available = [d,d,d,d,d,d,d,d];

function success(val){
	//check available  ; if no available,then reset available,fail to parent
	debugger;
	var element = available[val];
	if(element.length === 0){
		available[val] = d;
		fail(val -1);
	}else{
		var ball = element[0];
		available[val] = available[val].slice(1);
		console.log(available[val]);
		data.push(ball);
	}
	//test & fail to same level
	if(!test(val)){		
		fail(val);
	}
	
	// go ahead to next level
	if(val <7){
	  success(val+1);
	}else{
	 console.log(data);
	 throw 'done';
	}
	
}

function fail(val){
	data.pop();
	success(val);
}



function test(val){
	//check y
	if(!distinct(data)){
		return false;
	}
	// check diagnal
	if(!distinct(diag(data))){
		return false;
	}
	return true;
}

function diag(set){
    var d =[];
	for(var i=0;i< set.length;i++){
		var x = modee(i,set[i]);
		d.push(x);
	}
	return d;
}

function modee(x,y){
	if(x == 0)
	  return y;
	else{
	  return modee(x-1,y-1);
    }	
}

function distinct(set){
    if(set.length ==0 || set.length == 1) return true;
	for(var i=0;i<set.length;i++){
		for(var j=0;j<set.length;j++){
			if(set[i] == set[j]){
				if(i != j) return false;
			}
		}
		
	}
	return true;
}

success(0);

// find log pattern
//define transaction
// construct to neighbour
// first as ordered list by time

const fs = require('fs');


function readlog(){
	
}  
//stat data as bar graph
//stat on some string
function timestat(){
	
}

// find () of a block,  as big as possible
//Longest repeated substring problem
// collapse each record to a symbol, 2d -> 1d

function makeNode(){
	return{
		index:-1,
		chars:'',
		occur:0
	};
}

function getChars(node){
	return node.chars;
}

function getOccur(node){
	return node.occur;
}


function updateOccur(set,str){
	for(var i=0;i<set.length;i++){
		var n = set[i];
		var reg = new RegExp(n.chars,'g');
		if(str.match(reg) && str.match(reg).length > 1){
			n.occur = str.match(reg).length;
		}
	}
}


//get the length, as a bottom check level


function statlist3(charset,n,partial){
	//from length n , the seeds and append it 
	var newp =[];	
	var str = charset;
	if(n ==1){
		for(var i=0;i<charset.length;i++){
			var reg = new RegExp(charset.charAt(i),'g');
			if(str.match(reg) && str.match(reg).length > 1){
				newp.push(i);
		    }
		}
		return statlist3(charset,2,newp);
	}else{
		// start from partial
		var result = partial.slice(0);
		var flag = false;
		while(partial.length>0){
			var prev = partial.pop();
			if(prev+n < charset.length){
				var p1 = charset.slice(prev,prev+n);			
				var reg = new RegExp(p1,'g');
				if(str.match(reg) && str.match(reg).length > 1){
					if(newp.indexOf(prev) == -1) newp.push(prev);
					flag = true;
				}
			}
            if(prev > 0){
				var p2 = charset.slice(prev-1,prev-1+n);
				reg = new RegExp(p2,'g');
				if(str.match(reg) && str.match(reg).length > 1){
					if(newp.indexOf(prev-1) == -1) newp.push(prev-1);
					flag = true;
				}
			}

		}
		if(flag){
			return statlist3(charset,n+1,newp);		
		}else{
			return {len: n-1, index:result};
		}
	}
	
}

debugger;
var test = 'ATCGATCGA';
var result = statlist3(test,1,null);
console.log(result);
//String.fromCharCode(189, 43, 190, 61)
//33-91
//93-126
//256-591

String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function getcharfromhash(){
	var available = [];
	var index =0;
	var tree ={};
	for(var i=33;i<92;i++){
		available.push(i);
	} 
	for(var i=93;i<126;i++){
		available.push(i);
	} 
	for(var i=256;i<591;i++){
		available.push(i);
	} 
	function mychar(hash){
		if(typeof(tree[hash]) === 'undefined'){
		    tree[hash] = String.fromCharCode(available[index++]);	
		}
		return tree[hash];
		
	}
	return mychar;
}
//split each record to op+data
var generateCode = getcharfromhash();
console.log(generateCode(3455));
console.log(generateCode('abc'));


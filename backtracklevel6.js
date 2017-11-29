var nouns =['noun','student','professor','cat','classroom','hat'];
var verbs = ['verb','studies','lectures','eats','sleeps'];
var articles =['article','the','a','an'];
var preps =['prep','in','of','for','to','by','with'];

var unparsed =[];
var parsed =[];
var grammar =[];

function parse_simple_noun_phrase(suc,fail){
	function fail2(){
		console.log('parse simple noun phrase fail');		
	}
	function suc3(val,fail){
	    var noun = parsed.pop();
		var art = parsed.pop();
		var phrase = art +' ' + noun;
		parsed.push(phrase);
		suc(phrase,fail);
	}
	function suc2(val,fail2){		
		parse_word(nouns,suc3,fail2);
	}	
	parse_word(articles,suc2,fail);	
}

function parse_noun_phrase(suc,fail){
    var available = [];    // all branches, as available	
	
	function suc2(val,fail){
	  var noun = parsed.pop();
	  var prep = parsed.pop();	  
	 
	  var phrase = prep +' ' + noun;
	  parsed.push(phrase);
	  available.push(phrase);	  
	  maybe_extend_prep(suc2,fail2);
	}	
	function fail2(){
		console.log('no prep found');
	}
	function maybe_extend_prep(val,fail){	 
	  parse_prep_phrase(suc2,fail);	  
	}  
	function fail3(){
		parse();
	}
	
	function parse(){   
	  if(available.length > 0){
	    var head = available[0];
		console.log('available noun phrase: ' +head);
		available.shift();
		suc(head,fail3);
	  }
	}
	function suc1(val,fail){
		console.log('found simple noun phrase: ' + val);
		available.push(val);
		maybe_extend_prep(val,fail2);
		parse();
		fail();
	}
	parse_simple_noun_phrase(suc1,fail);	
}

function parse_prep_phrase(suc,fail){  
  function fail2(){
	console.log('parse_prep_phrase fail');
	fail();
  }
  function suc2(val,fail){
		
	parse_noun_phrase(suc3,fail2); 
  }
  
  function suc3(val,fail){
	var noun = parsed.pop();
	var prep = parsed.pop();
	var phrase = prep + ' ' + noun;
	parsed.push(phrase);
	console.log('found prep: ' + phrase);
	suc(phrase,fail2)
  }  
  parse_word(preps,suc2,fail);
   
}


function parse_verb_phrase(suc,fail){
    var available = [];    // all branches, as available	
		
	function suc2(val,fail){
	  var noun =parsed.pop();
	  var prep = parsed.pop();	 
	  var phrase = prep +' ' + noun;
	  available.push(phrase);	
	  parsed.push(phrase);
	  maybe_extend_prep(suc2,fail2);
	}	
	function fail3(){	  
	}
	
	function maybe_extend_prep(val,fail){
	  parse_prep_phrase(suc2,fail);	  
	}
	
	function fail2(){
		parse();
	}
	
	function parse(){
	  if(available.length > 0){
	    var head = available[0];
		available.shift();
		suc(head,fail2);
	  }
	}
	
	function suc1(val,fail){
		console.log('found simple verb phrase: ' + val);
		available.push(val);
		maybe_extend_prep(val,fail3);
		parse();
		fail();
	}
	parse_word(verbs,suc1,fail3);	
}

function parse_word(word_list,suc,fail){
	if(unparsed.length ==0){	  
	   return;
	}	
	var found =unparsed[0];
	unparsed = unparsed.slice(1);
	parsed.push(found);	
	
	if(word_list.indexOf(found) != -1){
	    console.log(word_list[0] + ': ' + found);		
		suc(found,fail);
	}else{
		console.log('parse_word error: expect '+word_list[0]);
		unparsed.unshift(found);
		parsed.pop();
        fail();		
	}	
	
}

function parse_sentence(suc,fail){	
	function fail2(){
		console.log('parse verb phrase fail');
		fail();
	}
	
	function suc2(val,fail){
	  console.log('found noun phrase ' + val);
	  parse_verb_phrase(suc, fail2);
	}

	parse_noun_phrase(suc2, fail);	
}


function parse(input){
    debugger;
	unparsed = input.split(' ');
	function parse_success(val,fail){
	  console.log('parse sentence success!');
	  while(parsed.length>0){
		console.log(parsed[0]);
		parsed.shift();
	  }
	  end();
	}
	
	function parse_sentence_fail(){
		console.log('parse sentence fail');
		end();
	}
	
	function end(){
	    console.log('end!');
		throw 'parse end! & jump out of call stack';
	}
	try{
	  parse_sentence(parse_success,parse_sentence_fail);
	}catch(e){
		console.log('I got you ' +e);
	}
	
}


//parse('the cat in the hat eats me');

parse('the professor lectures to the student with the cat');

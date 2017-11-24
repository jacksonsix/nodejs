<html>
<body>
<script type="text/javascript">
var nouns =['noun','student','professor','cat','classroom'];
var verbs = ['verb','studies','lectures','eats','sleeps'];
var articles =['article','the','a','an'];
var preps =['prep','in','of','for','to','by','with'];

var unparsed =[];
var parsed =[];
var grammar =[];

function parse_simple_noun_phrase(suc,fail){
	function fail2(){
		console.log('parse simple noun phrase fail');
		//fail();
	}
	function suc2(val,fail2){
		console.log('parse article ' + val);
		parse_word(nouns,suc,fail2);
	}	
	parse_word(articles,suc2,fail);	
}

function parse_noun_phrase(suc,fail){
    var available = [];    // all branches, as available
	available.push(null);  // no prep appended
	var flag = true;
	
	function add(val,fail){
	  available.push(val);
	  maybe_extend_prep();
	}	
	function fail3(){
		parse();
	}
	function maybe_extend_prep(){	 
	  parse_prep_phrase(add,fail3);	  
	}  
	function fail2(){
		parse();
	}
	
	function parse(){   
	  if(available.length > 0){
	    var head = available[0];
		available.shift();
		suc(head,fail2);
	  }else{
	     fail();
	  }
	}
	function suc2(val,fail3){
		console.log('found simple noun phrase ' + val);
		maybe_extend_prep();
	}
	parse_simple_noun_phrase(suc2,fail);	
	
}

function parse_prep_phrase(suc,fail){  
  function fail2(){
	console.log('parse_prep_phrase fail');
	fail();
  }
  function suc2(val,fail){
	console.log('found prep ' + val);	
	parsed.push(val);
	parse_noun_phrase(suc,fail2); 
  }
  
  parse_word(preps,suc2,fail);
   
}


function parse_verb_phrase(suc,fail){
    var available = [];    // all branches, as available
	available.push(null);  // no prep appended
	var flag = true;
	
	function add(val,fail){
	  available.push(val);
	  maybe_extend_prep(val,fail);
	}
	function fail3(){
	  parse();
	}
	
	function maybe_extend_prep(val,fail){	 
	  parse_prep_phrase(add,fail);	  
	}
	
	function fail2(){
		parse();
	}
	
	function parse(){
	  if(available.length > 0){
	    var head = available[0];
		available.shift();
		suc(head,fail2);
	  }else{
	     fail();
	  }
	}
	parse_word(verbs,maybe_extend_prep,fail3);	
}

function parse_word(word_list,suc,fail){
	if(unparsed.length ==0){
	   fail();
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
	unparsed = input.split(' ');
	function parse_success(val,fail){
	  console.log('parse sentence success!');
	  end();
	}
	
	function parse_sentence_fail(){
		console.log('parse sentence fail');
	}
	
	function end(){
	    console.log('end!');
		throw 'end! & jump out of call stack';
	}
	try{
	  parse_sentence(parse_success,parse_sentence_fail);
	}catch(e){
		console.log('I got you ' +e);
	}
	
}


parse('the cat eats');

</script>
</body>
</html> 

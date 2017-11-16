//bak5

var nouns =['noun','student','professor','cat','classroom'];
var verbs = ['verb','studies','lectures','eats','sleeps'];
var articles =['article','the','a','an'];

var unparsed =[];
var parsed =[];
var grammar =[];

function parse_sentence(){
	var result = true;
	debugger;
	console.log('sentence'); 
	grammar.push('sentence');
	result = parse_noun_phrase();
	if(!result){
		parse_sentence_fail();
		return false;
	}
	result = parse_word(verbs);
	if(!result){
		parse_sentence_fail();
		return false;
	}
	console.log(parsed);
}

function parse_noun_phrase(){
	var result = true;
	console.log('noun_phrase');
	grammar.push('noun_phrase');
	result = parse_word(articles);
	if(!result){
		parse_noun_phrase_fail();
		return false;
	}
	result = parse_word(nouns);
	if(!result){
	    parse_noun_phrase_fail();
		return false;
	}
}

function parse_word(word_list){
	var found =unparsed[0];
	parsed.push(found);
	grammar.push(word_list[0]);
	if(word_list.indexOf(unparsed[0]) != -1){
	    console.log(word_list[0] + ': ' + found);
		unparsed = unparsed.slice(1);
		
	}else{
		console.log('parse_word error: expect '+word_list[0]);
		parse_word_fail();
		return false;
	}
	
}

function parse_word_fail(){
	parsed.pop();	
    grammar.pop();	
}

function parse_noun_phrase_fail(){
	grammar.pop();	
}

function parse_sentence_fail(){
	grammar.pop();
}

function parse(input){
	unparsed = input.split(' ');
	parse_sentence();
}

parse('the cat eats');

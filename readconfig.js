 //read config in xml format. no ambiguity 
 // paren without children  <foo  />  
 // parent with children <foo  ></foo>
 var tokens=['</','/>','<!--','-->','<','>','=','"',' ','word'];
 function lex(){
	 var rawstring ;
	 var current=0;
	 function set(str){
		 rawstring = str;
		 current = 0;
	 }
	 function ifsplit(){
		 var w = rawstring.slice(current,current+2);
		 if(w.length == 2 && tokens.indexOf(w) >-1){
			 current += 2;
			 return w;
		 }else{
			 w = rawstring.slice(current,current+1);
			 if(tokens.indexOf(w) >-1){
				  current += 1;
			      return w;
			 }else{				 
				 return null;
			 }
			
		 }
	 }
	 function getNextToken(){
        if(current == rawstring.length) return null;		
		//read in 2 chars, from current, to determin token.
		 var result = ifsplit();
		
		 if(result == null){
			 //accumulate here
			 var acc ='';
			 while(true){
				 var w = ifsplit();
				 if( w == null){
				   acc += rawstring[current];
				   current += 1; 
				 }else{
					 current -= w.length;
					 break;
				 }				 
			 }			 
			 return acc;
			 
		 }else if(result ===' '){
			 return getNextToken();  // swallow it
		 }else{
			 return result;
		 }
			 
	 }
	 return {
		 set:set,
		 getNextToken:getNextToken
	 }
 }
  
 function parser(){
	 // the basic structure is props+children
	 //parent begin as <name  
	 // props
	 // end as /> no children, >
	 // begin of children 
	 // end of children </name>
	 
 }
 
 function baseObj(){
	 
 }
 
 var test ='<p a="bc" dgg="aaa">addff</p>';
 var le = lex();
 debugger;
 le.set(test);
 var m = le.getNextToken(); 
console.log(m); 
 while(m != null){
	 m = le.getNextToken();
	 console.log(m);
 }
module.exports = {lex:lex}

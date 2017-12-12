
function prettyprint(info){
	var text = info;
	var seprator = ['{','}','[',']',':','"',','];
	function getNextToken(){
		//eat up space	
		while(text[0] ===' ' || text[0] ==='\t'){
			text = text.substring(1);
		}
		if(text.length == 0) return null;
		var ch = text[0];
		if(seprator.indexOf(ch) != -1){
			text = text.substring(1);
			return ch;
		}else{
			var word ='';
			while(seprator.indexOf(ch) == -1){
				word += ch;				
				if(text.length ==0) break;
				text = text.substring(1);
				ch = text[0];
			}
			return word;
		}
	}
	
	function parse(){
		var stack =[];
		var proc =[];
		var level = 0;
		
		var token = getNextToken();
		if(token == null) return;
		do{
			switch(token){
				case '{':
				   flush(proc,level);
				   level += 1;
				   print(token,level);
				break;
				case '[':
				   flush(proc,level);
				   level += 1;
				   print(token,level);
				break;
				case '}':
				   flush(proc,level);				
				   print(token,level);
				   level -= 1;
				break;
				case ']':	
                   flush(proc,level);				
				   print(token,level);
				   level -= 1;
				break;
				case ':','"':
				  proc.push(token);
				break;
				case ',':
				  flush(proc,level);
				break;
				default:  //word
				   proc.push(token);
				break;
		    }
            token = getNextToken();			
			
		}while(token != null);

	}
	
	function print(segment,level){
		if(segment.length ==0) return;
		var space = '';
		for(var i=0; i< level;i++){
			space += '  ';
		}
		console.log(space + segment);
	}
	
	function flush(proc,level){
		var line='';
	    while(proc.length >0){
		  var ch = proc.shift();
		  if(ch ===':' || line[line.length-1] ===':'){
		  	line = line + ' ' +ch;  
		  }else{
		  	line = line  + ch;  
		   }
		  
		  
	    }
		print(line,level);
	}
	
	parse();
	
}



function textparse(){
	var str ='';
	prettyprint(str);
}

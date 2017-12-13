//machine
function make_machine(reg_names){
	var _machine = new Machine_base();
	reg_names.forEach(function(reg){
		_machine.registers[reg] = 'unassigned';
	});	
	return _machine;
}

//
function Machine_base(){
  this.registers = [];
  this.pc = null;
  this.pcindex = 0;
  this.flag = false;
  this.stack = [];
  this.ops = [];
  this.controller_text ='';
  this.libs = [];
  
  this.get_reg = function get_reg(reg){	 
	  return machine.registers[reg];
  }
  
  this.set_reg = function set_reg(reg,value){
	  machine.registers[reg] = value;
  }

  this.start = function start(){
	  console.log('Machine started!');
	  this.pc = ops[this.pcindex];
	  while(this.pc != null){
	    console.log(this.pc); 	
	  }
  }
  
  this.get_stack = function getstack(){ return this.stack;}
  this.get_operations = function getops(){return this.ops;}	
  this.set_flag = function setflag(value){ this.falg = value;}
  this.advance_pc = function advance_pc(machine){
	                              console.log('pc advanced');
								  this.pcindex += 1;
								  this.pc =  ops[this.pcindex];
                             }		
						 
							 
}



// Assembler 
function asseble(controller_text,machine){
	var commands = read_controller_text(controller_text);	
	machine.ops = update_insts(commands, machine);
}


function update_insts(insts,machine){
	//var pc = machine.get_reg('pc');
	var flag = machine.get_reg('flag');
	var stack = machine.get_stack();
	var ops = machine.get_operations();
	
	insts.forEach(function(inst){
		inst.func = make_exe_proc(inst,machine);
	});
	return insts;
}

//basic operation on machine
function make_assign(cmdobj,machine){
	var src = cmdobj.src;	
	var value =  cmdobj.dst;
	if(cmdobj.functionName){
		// have a perform
		
	}
	return function(){
		var treg = machine.get_reg(src);
		console.log('returned function');
	}
}
function make_test(inst,machine,labels){
	var condition = test_condition(inst);
	var operation = make_operation( condition,machine,labels);
	return function(){
		var flag = machine.
		advance_pc();
	};
}
function make_exe_proc(inst,machine){
	var operator = op(inst);
	switch(operator){
		case 'assign':
		   make_assign(inst,machine);
		break;
		case 'test':
		   make_test(inst,machine);
		break;
		case 'branch':
		   make_branch(inst,machine);
		break;
		case 'goto':
		   make_goto(inst,machine);
		break;
		case 'save':
		   make_save(inst,machine);
		break;
		case 'restore':
		   make_restore(inst,machine);
		break;
		case 'perform':
		   make_perform(inst,machine);
		break;		
		default:
		   console.log('cannot find inst ' + inst);
		break;
	}
}

function test_machine(){
	var regs = ['a','b','t'];	
	var controller_text=[];	
	controller_text.push('begin');
	controller_text.push('(assign t (reg b)');
	controller_text.push('(assign t (reg a)');
	controller_text.push('(goto (label begin)');
	controller_text.push(null);
	var m =  make_machine(regs);
	console.log('machine setup!');
	
	asseble(controller_text,machine);
	machine.start();
}


// parser
function read_controller_text(controller_text){
	function make_inst(text){
		var text ={};
		text.type = 'inst';
		return text;
	}

	function make_label(text){
		var text ={};
		text.type ='label';
		return text;
	}	
	var commands = [];
	// assume each command on each line;
	var line ='';
	for(var i=0; i< controller_text.length;i++){
		line = controller_text[i];
		// check is label or inst
		if(line.indexOf('(')!=0){
			var inst = make_inst(line);
			commands.push(inst);
		}else{
			var label = make_label(line);
			commands.push(label);
		}
	}
	return commands;	
}

// generate proc
function gen(info){
	var text = info;
	var seprator = ['(',')'];
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
	function applyv(stk){
		var op =stk.pop();
		var oprand =[];
		while(stk.length>0){
			oprand.push(stk.pop());
		}
        //one instruct -> one no-arg procedure
        //swith by op
        		
	}
	function parse(){
		var stack =[];		
		var token = getNextToken();
		if(token == null) return;
		do{
			switch(token){
				case '(':
				   stack.push(token);
				break;				
				case ')':
				   var proc =[];
				   var out = stack.pop();
				   while(out !=='('){
					   proc.push(out);
					   out = stack.pop();
				   }
				   var result = applyv(proc);
				   stack.push(result);
				break;				
				default:  //word
				   proc.push(token);
				break;
		    }
            token = getNextToken();			
			
		}while(token != null);

	}
	
	parse();	
}


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



function testproc(){
	function add(a,b){
		return a+b;
	}
	var names =[];
	var procs =[];
	procs.push(add);
	
	var oprand =[1,2];
	var p = procs.pop();
	var s  = p.apply(this,oprand);
	
	//Create string representation of function
	var s = "function test(a,b){  return a+b; }";

	//"Register" the function
	eval(s);

	//Call the function
	test();
	
	//using Function
	var func = new Function("a", "b", "return a + b;");
	var ww = func(4,5);
}

function testinsts(){
	var cmd = [];	
	cmd.push(1);
	cmd.push('begin')
	cmd.push(2);
	cmd.push('goto begin');
	cmd.push(null);
	
	
	function advance_pc(){
		var index = cmd.indexOf(pc);
		pc = cmd[index+1];
	}
	function start(){
		var pc = cmd[0];
		while(pc != null){
		  console.log(pc); // if inst execute proceudre, label do nothing and get next inst
		  
		  advance_pc();			
		}

	}
	start();
}


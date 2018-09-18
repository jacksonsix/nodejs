 //
 var root = {name:'root',entry:null,left:null,right:null};
 var n1 ={name:'n1',entry:null,left:null,right:null};
 var n2 ={name:'n2',entry:null,left:null,right:null};
 var n3 ={name:'n3',entry:'N',left:null,right:null};
 var n4 ={name:'n4',entry:null,left:null,right:null};
 var n5 ={name:'n5',entry:'w',left:null,right:null};
 var n6 ={name:'n6',entry:'N',left:null,right:null};
 
 root.left = n1;
 root.right = n4;
 n1.left = n2;
 n1.right = n3;
 n4.left=n5;
 n4.right = n6;
 
 var NOTFOUND = 1;
 var FOUND = 2;

 
  function findone1(root,ch,path){	
     if(root == null) return NOTFOUND; 
	 if(root.entry === ch){		 
		 return path;
	 }
	 path.push(root.left);
	 var l = findone1(root.left,ch,path);
	 if(l == NOTFOUND){
		 path.pop();
		 path.push(root.right);
		 var r = findone1(root.right,ch,path);
		 if(r == NOTFOUND){
			 path.pop();
			 return NOTFOUND;
		 }else{
			 return r;
		 }
	 }else{
		 return l;
	 }	    
 }
 
 function findAll(ch,path,result){
	 if(path.length ==0) return;
	 var root = path[path.length-1];
	 if(root == null) return NOTFOUND; 
	 if(root.entry === ch){	        	 
		 result.push(path.slice());		 
	 }	
	 path.push(root.left);
	 findAll(ch,path,result);
	 path.pop();
	 path.push(root.right);
	 findAll(ch,path,result);
	 path.pop();	 
 }
 
 function findSignal(ch,path){
	  var root = path[path.length-1];
	 if(root == null) return NOTFOUND; 
	 if(root.entry === ch){		 
		 return ;
	 }
	 path.push(root.left);
	 var l = findSignal(ch,path);
	 if(l == NOTFOUND){
		 path.pop();
		 path.push(root.right);
		 var r = findSignal(ch,path);
		 if(r == NOTFOUND){
			 path.pop();
			 return NOTFOUND;
		 }else{
			 return r;
		 }
	 }else{
		 return l;
	 }
 }
 
 function getNextinPath(path){
	 
 }
 
 debugger;
  //var m = findone1(root,'N',[root]);
  //console.log(m);
  
  //var result =[];
  //findAll('N',[root],result);
  //console.log(result);
  
  var path =[root];
  findSignal('N',path);
  //console.log(path);
  path =[root,n4];
  findSignal('N',path);
  console.log(path);

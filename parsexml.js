function extractElem(name,xml){
   var i =0;
   var begin = '<' + name;
   var end = '</' + name+'>';
   var len = begin.length;
   var data = [];
   for(var j=0; j< xml.length;j++){
	  var seg = xml.slice(j,j+len);
	  if(seg.toUpperCase() === begin.toUpperCase() ){
	      i = 1;
		  for(var k=j+1; k<xml.length;k++){
			 if(xml[k] === '<' && xml[k+1] != '/'){
				i += 1;
			 }else if(xml.slice(k,k+2) === '/>'){
				if(i == 1){
					data.push(xml.slice(j,k+2));
					j = k;
					break;
				} 
				i -=1;
			 }
			 else if(xml.slice(k,k+len +3).toUpperCase() === end.toUpperCase()){
			    if(i == 1){
					data.push(xml.slice(j,k+len+3));
					j = k;
					break;
				}
				i -=1;
			 }
		  }
	  }
   }
   return data;
}


function extractAttr(xml,elementName){
  	var attrs = [];
	var begin = '<' + elementName;
	var split = [' ','\t','\r'];
	if(xml.indexOf(begin) != 0){
		return attrs;
	}
	for(var i=elementName.length +1; i<xml.length; i++){
		var att ='';
		var val ='';
		var st  =0;
		
		for(var k=i;k<xml.length;k++){
			if(split.indexOf(xml[i]) != -1 ){
			  i += 1;
		    }else{
				break;
			}
		}		
		if(xml[i] =='>' || xml.slice(i,i+2) =='/>') break;
		for(var k=i; k<xml.length;k++){
			if(xml[i] != '='){
			  att += xml[i];
			  i += 1;
		    }else{
				break;
			}
		}
		i += 2;
		st += 1;
		for(var k=i;k<xml.length;k++){
			if(xml[i] != '\'' && xml[i] !='"'){
				val += xml[i];
				i += 1;
			}else{
				break;
			}			
		}

		var obj  ={
			attr:att,
			value:val
		};
		if(st ==1)
		  attrs.push(obj);
	}
	return attrs;
}



function testxml(){
var xml = ''
var name = 'companydata';

var s = extractElem(name,xml);
var m = extractElem('SBIndustryCode',s[0]);
var mm = extractAttr(m[0],'SBIndustryCode');
}

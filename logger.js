// many users can go to this module. one copy is good now. so it should be sigleton

var table = [];
var init = false;
function db(){
  if(init) return table;
  init = true;
  return table;  
}

exports.log = function(cmd){
  db().push(cmd);
}

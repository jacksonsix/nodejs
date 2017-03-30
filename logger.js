// many users can go to this module. one copy is good now. so it should be sigleton
var fs = require('fs');



var table = [];
var init = false;
function db(){
  if(init) return table;
  init = true;
  return table;  
}

function write(cmd){
 fs.writeFile("/tmp/test", cmd, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
 });
}

exports.log = function(cmd){
  db().push(cmd);
  var l = '';
  db().forEach(function(e) { l = l + e + '\n'; })
  write(l);
}



 

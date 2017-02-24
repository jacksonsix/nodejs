function cons( x, y)
{
   return function(x){
      if( x==='car')
          return x;
      if( x === 'cdr')
         return y;
   }
}

function car(x){
  return x('car');
}

function cdr(x){
  return x('cdr');
}



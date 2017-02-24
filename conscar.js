function cons( x, y)
{
   return function(z){
      if( z==='car')
          return x;
      if( z === 'cdr')
         return y;
   }
}

function car(x){
  return x('car');
}

function cdr(x){
  return x('cdr');
}



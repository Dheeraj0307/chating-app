let nums = [1,2,3,4]

let init  =0 ;

 function fn(accum, curr)  { 
    return accum + curr; 
}
var reduce = function() {
    let val = init;

    nums.forEach((el)=>{ 
       val  = fn(val,el)
       console.log(val)
    })
    // console.log(val)
// [1,2,3,4]=>
    return val
};

reduce()
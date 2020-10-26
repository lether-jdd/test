const compose = (...fns) => (...args) => fns.reduceRight((val, fn) => fn.apply(null, [].concat(val)), args);


function compose(...fns) {
  fns = fns.reverse()
  let args;
  return function (arg) { 
    args = arg
    fns.reduce((rightfn, leftfn) => {
      args = rightfn(leftfn(args))
    }) 
  }
}
function add1(x) { 
  return  x+1
}
function add2(x) {
  return x + 2
}
let composefn = compose(add1, add2)
composefn(1)
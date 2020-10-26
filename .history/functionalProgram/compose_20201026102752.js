const compose = (...fns) => (...args) => fns.reduceRight((val, fn) => fn.apply(null, [].concat(val)), args);


function compose(...fns) {
  fns = fns.reverse()
  let args;
  return function (arg) { 
    args = arg
    fns.reduce((rightfn, leftfn) => {
      args = rightfn(leftfn(arg))
    }) 
  }
}
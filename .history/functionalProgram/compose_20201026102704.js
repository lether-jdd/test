const compose = (...fns) => (...args) => fns.reduceRight((val, fn) => fn.apply(null, [].concat(val)), args);


function compose(...fns) {
  fns = fns.reverse()
  let args;
  return function (...arg) { 
    fns.reduce((rightfn, leftfn) => {
      rightfn(leftfn())
    }) 
  }
}
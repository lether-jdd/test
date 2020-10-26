const compose = (...fns) => (...args) => fns.reduceRight((val, fn) => fn.apply(null, [].concat(val)), args);


function compose(...fns) {
  fns = fns.reverse()
  let args;
  return function (arg) { 
    args = arg
    return fns.reduce((rightfn, leftfn) => {
      args = leftfn(rightfn(args))
      return args
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

function compoe(fn) {
  fn.reduce(function (a, b) { 
    return function (...args) { 
      return a(b(...args))
    }
  })
}
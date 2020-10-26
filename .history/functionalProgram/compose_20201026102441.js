const compose = (...fns) => (...args) => fns.reduceRight((val, fn) => fn.apply(null, [].concat(val)), args);


function compose(fns) {
  fns.reduce((left, right) => { 
    
  })  
}
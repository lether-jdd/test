const status = {
  pengding: 0,
  resolved: 1,
  reject:2
}
function promise(fn) { 
  this.status = status[0]
  function resolve() { 

  }
  function reject() { 

  }
  let res = fn(resolve,reject)
}
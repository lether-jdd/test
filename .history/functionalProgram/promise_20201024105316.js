const status = {
  pengding: 0,
  resolved: 1,
  reject:2
}
function promise(fn) { 
  this.status = status[0]
  function resolve(value) { 

  }
  function reject(error) { 

  }
  let res = fn(resolve,reject)
}
promise.prototype.then = function (resolveCb,rejectCb){ 
  
}
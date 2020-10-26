const status = {
  pengding: 0,
  resolved: 1,
  reject:2
}
function promise(fn) { 
  this.status = status[0]
  function resolve(value) { 
    this.status = status[1]
  }
  function reject(error) { 
    this.status = status[2]
  }
  let res = fn(resolve,reject)
}
promise.prototype.then = function (resolveCb,rejectCb){ 

}
const status = {
  pengding: 0,
  resolved: 1,
  reject:2
}
function promise(fn) { 
  this.status = status[0]
  this.resolveCallbacks = []
  this.rejectCallBacks = []
  function resolve(value) { 
    if (this.status == status[0]) { 
      this.status = status[1]
      // this.resolveCb(value)
      this.resolveCallbacks.forEach(cb => cb())
    }
  }
  function reject(error) { 
    this.status = status[2]
    this.rejectCb(error)
  }
  try {
    let res = fn(resolve, reject)
  } catch (e) {
    throw Error(e)
  }
  
}
promise.prototype.then = function (resolveCb, rejectCb) { 
  this.resolveCb = resolveCb
  this.rejectCb = rejectCb
  return new promise(function () { 

  })
}



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
      this.resolveCallbacks.forEach(cb => cb(value))
    }
  }
  function reject(error) { 
    if (this.status == status[1]) { 
      this.status = status[2]
      this.rejectCallBacks.forEach(cd => cb(error))
    }
  }
  try {
    let res = fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}
promise.prototype.then = function (resolveCb, rejectCb) { 
  if (this.status == status[0]) { 
    this.resolveCallbacks.push(resolveCb)
    this.resolveCallbacks.push(rejectCb)
  }
  return new promise(function () { 

  })
}



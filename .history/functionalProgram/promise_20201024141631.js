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
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}
//但是现在要支持链式调用，就还要返回promise，且返回的应该执行
promise.prototype.then = function (resolveCb, rejectCb) { 
  //对于入参不是函数的情况
  let self = this
  resolveCb = typeof resolveCb == 'function' ? resolveCb : value => value
  rejectCb = typeof rejectCb == 'function' ? rejectCb : value => value
  return new promise(() => { 
    if (this.status == status[0]) { //如果外面的promise 还没有resolve
      this.resolveCallbacks.push(resolveCb)
      this.resolveCallbacks.push(rejectCb)
    } else if (this.status == status[1]) {
      resolveCb()
    } else {
      rejectCb()
    }
  })
}



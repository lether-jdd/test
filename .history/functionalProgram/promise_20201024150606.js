const status = {
  pengding: 0,
  resolved: 1,
  reject:2
}
function promise(fn) { 
  this.status = status[0]
  this.resolveCallbacks = []
  this.rejectCallBacks = []
  this.value = undefined
  this.error = undefined
  function resolve(value) { 
    if (this.status == status[0]) { 
      this.status = status[1]
      this.value = value
      this.resolveCallbacks.forEach(cb => cb(value))
    }
  }
  function reject(error) { 
    if (this.status == status[1]) { 
      this.status = status[2]
      this.error = error
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
  return new promise((resolve,reject) => { 
    if (this.status == status[0]) { //如果外面的promise 还没有resolve
      this.resolveCallbacks.push(() => {
        //模拟微任务
        setTimeout(() => {
          try {
            const res = resolveCb(this.status)
            res instanceof promise ? res.then(resolve, reject) : resolve(res)
          } catch (e) { 
            reject(e)
          }
        }, 0)
      })


      // 为什么不写成,因为是未完成状态，还需要已完成后逐步触发
      setTimeout(() => {
        try {
          const res = resolveCb(this.status)
          let ret = res instanceof promise ? res : new promise((resolve,reject) => { 
            resolve(res)
          })
          return ret
        } catch (e) {
          reject(e)
        }
      }, 0)


      this.resolveCallbacks.push(() => {
        //模拟微任务
        setTimeout(() => {
          try {
            const res = rejectCb(this.status)
            res instanceof promise ? res.then(resolve, reject) : resolve(res)
          } catch (e) {
            reject(e)
          }
        }, 0)
      })
    } else if (this.status == status[1]) {
      resolveCb()
    } else {
      rejectCb()
    }
  })
}



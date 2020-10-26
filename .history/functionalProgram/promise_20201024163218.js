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
            const res = resolveCb(this.value)
            res instanceof promise ? res.then(resolve, reject) : resolve(res)
            //关于这里有争议
            //另外一种是在这里调用
            resolvePromise
          } catch (e) { 
            reject(e)
          }
        }, 0)
      })
      this.rejectCallbacks.push(() => {
        //模拟微任务
        setTimeout(() => {
          try {
            const res = rejectCb(this.error)
            res instanceof promise ? res.then(resolve, reject) : resolve(res)
          } catch (e) {
            reject(e)
          }
        }, 0)
      })
    } else if (this.status == status[1]) {
      setTimeout(() => {
        try {
          const res = resolveCb(this.value)
          res instanceof promise ? res.then(resolve, reject) : resolve(res)
        } catch (e) {
          reject(e)
        }
      }, 0)
    } else {
      setTimeout(() => {
        try {
          const res = rejectCb(this.error)
          res instanceof promise ? res.then(resolve, reject) : resolve(res)
        } catch (e) {
          reject(e)
        }
      }, 0)
    }
  })
}

function resolvePromise(bridgepromise, x, resolve, reject) {
  //2.3.1规范，避免循环引用
  if (bridgepromise === x) {
    return reject(new TypeError('Circular reference'));
  }
  let called = false;
  //这个判断分支其实已经可以删除，用下面那个分支代替，因为promise也是一个thenable对象
  if (x instanceof MyPromise) {
    if (x.status === PENDING) {
      x.then(y => {
        resolvePromise(bridgepromise, y, resolve, reject);
      }, error => {
        reject(error);
      });
    } else {
      x.then(resolve, reject);
    }
    // 2.3.3规范，如果 x 为对象或者函数
  } else if (x != null && ((typeof x === 'object') || (typeof x === 'function'))) {
    try {
      // 是否是thenable对象（具有then方法的对象/函数）
      //2.3.3.1 将 then 赋为 x.then
      let then = x.then;
      if (typeof then === 'function') {
        //2.3.3.3 如果 then 是一个函数，以x为this调用then函数，且第一个参数是resolvePromise，第二个参数是rejectPromise
        then.call(x, y => {
          if (called) return;
          called = true;
          resolvePromise(bridgepromise, y, resolve, reject);
        }, error => {
          if (called) return;
          called = true;
          reject(error);
        })
      } else {
        //2.3.3.4 如果 then不是一个函数，则 以x为值fulfill promise。
        resolve(x);
      }
    } catch (e) {
      //2.3.3.2 如果在取x.then值时抛出了异常，则以这个异常做为原因将promise拒绝。
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

promise.prototype.catch = function (errorcb) { 
  this.then(null, errorcb)
}
promise.resolve = function (value) { 
  if (value instanceof promise) {
    return value
  } else { 
    return new Promise((resolve, reject) => resolve(value));
  }
}
//对应reject

promise.all = function (arr) {
  let length = arr.length
  let count = 0;
  let ret = []
  let hasError = false
  return new Promise((resolve,reject) => { 
    for (let i = 0; i < length; i++) { //注意这里是使用let
      if (hasError) break;
      item = arr[i]
      item.then((value) => {
        ret[i] = value
        count++
        if (count == length) {
          resolve(ret)
        }
      }).catch((e) => {
        hasError = true
        reject(e)
      })
    }
  })
}

promise.race = function (arr) { 
  return new Promise((resolve, reject) => { 
    arr.forEach(i => { 
      i.then(v=>{resolve(v)},)
    })
  })
}

// promise 并行限制
let schedule = {
  max: 3,
  run: 0,
  task: [],
  add: function (p) { 
    this.task.push(p)
  },
  start: function () { 
    if (this.run <= this.max) { 
      let cur = this.task.shift()
      cur().then(() => { 
        this.run = this.run - 1 
      })
    }
  }
}



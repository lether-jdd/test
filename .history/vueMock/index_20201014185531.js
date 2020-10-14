

const callbacks = []
function nextTick(cb) {
  callbacks.push(cb)
  //使用micro或者macro 执行callbacks 中的内容
  Promise.resolve().then(() => {
    callbacks && callbacks.forEach(cb => {
      cb()
    })
  })
}

const queue = []
function queueWatcher(observer) {
  queue.push(observer)
  nextTick(flushSchedulerQueue)
}

function flushSchedulerQueue() {
  queue.forEach(watcher => {
    watcher.run()
  })
}

class vm {
  constructor(opt) {
    this.opt = opt
    this.initData()
  }
  initData() {
    this.reactive()
  }
  reactive() {
    let data = this.opt.data
    Object.keys(data).forEach(key => {
      let val = data[key]
      let deps = new Deps()
      // let watch = new observer(() => { 
      //   console.log('页面更新了。。。。')
      // })
      Object.defineProperty(data, key, {
        get() {
          if (Deps.target) {
            //往obsrver里面添加observer 
            deps.depend()
            //对于children的处理
          }
          // if (observer.target) { 
          //   observer.target.addDep(observer.target)
          // }
          return val
        },
        set(newVal) {
          // deps.notify()
          watch.update()
          val = newVal //注意：这里是通过闭包来实现的
        }
      })
    })
  }
}

class Deps { // 收集依赖
  constructor() { 
    this.subs = []  //存的是observer实例
  }
  addSub(sub) { 
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach(observer => { 
      observer.update()
    })
  }
  depend() { //往dep里面添加observer  为什么不直接添加？
    if (Deps.target) {
      Deps.target.addDep(this)  //将observer添加到subs
    }
  }
}

class observer {  //通知更新
  constructor(cb) { 
    this.cb = cb 
  }
  addDep(dep) { 
    dep.addSub(this)  //将observer添加到deps
  }
  update() { 
    queueWatcher(this)
  }
  run() { 
    this.cb()
  }
}




let instance = new vm({ data: { a: 1,b:2 } })
instance.opt.data.a = '222'
Deps.target = 
// console.log(instance.opt.data.a)
// instance.opt.data.b = '2333'
// console.log(instance.opt.data.b)
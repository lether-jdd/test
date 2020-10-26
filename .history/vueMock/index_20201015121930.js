//响应式模仿
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
function queueWatcher(watcher) {
  queue.push(watcher)
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
    let data = this.opt.data
    this.reactive(data)
  }
  reactive(data) {
    Object.keys(data).forEach(key => {
      let val = data[key]
      this.reactive(val) //监听子属性
      let deps = new Deps()
      // let watch = new watcher(() => { 
      //   console.log('页面更新了。。。。')
      // })
      Object.defineProperty(data, key, {
        get() {
          if (Deps.target) {
            //往obsrver里面添加watcher 
            deps.depend() //为什么不直接deps.addSub(Deps.target)
            //对于children的处理  数组及循环依赖的处理
          }
          // if (watcher.target) { 
          //   watcher.target.addDep(watcher.target)
          // }
          return val
        },
        set(newVal) {
          deps.notify()
          // watch.update()
          val = newVal //注意：这里是通过闭包来实现的
        }
      })
    })
  }
}

class Deps { // 收集依赖
  constructor() { 
    this.subs = []  //存的是watcher实例
  }
  addSub(sub) { 
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach(watcher => { 
      watcher.update()
    })
  }
  depend() { //往dep里面添加watcher  为什么不直接添加？
    if (Deps.target) {
      Deps.target.addDep(this)  //将watcher添加到subs
      console.log(this.subs)
    }
  }
}

class watcher {  //通知更新
  constructor(cb) { 
    this.cb = cb 
  }
  addDep(dep) { 
    dep.addSub(this)  //将watcher添加到deps的subs
  }
  update() { 
    queueWatcher(this)
  }
  run() { 
    this.cb()
  }
}


let instance = new vm({ data: { a: 1, b: 2 } })
Deps.target = new watcher(() => { console.log('更新') })
instance.opt.data.a 
instance.opt.data.a = '222'


//关于编译的部分
//因为遍历解析的过程有多次操作dom节点，为提高性能和效率，会先将vue实例根节点的el转换成文档碎片fragment进行解析编译操作，解析完成，再将fragment添加回原来的真实dom节点中
function Compile(el) {
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);
  if (this.$el) {
    this.$fragment = this.node2Fragment(this.$el);
    this.init();
    this.$el.appendChild(this.$fragment);
  }
}
Compile.prototype = {
  init: function () { this.compileElement(this.$fragment); },
  node2Fragment: function (el) {
    var fragment = document.createDocumentFragment(), child;
    // 将原生节点拷贝到fragment
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }
    return fragment;
  }
};
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
      Object.defineProperty(data, key, {
        get() {
          if (Deps.target) {
            //往obsrver里面添加dep
            deps.depend()
          }
          return val
        },
        set(newVal) {
          val = newVal //注意：这里是通过闭包来实现的
        }
      })
    })
  }
}

class Deps { // 收集依赖
  constructor() { 
    this.subs = []  //存的是watcher
  }
  addSub(sub) { 
    this.subs.push(sub)
  }
  notify() {
    
  }
  depend() { //往observer里面添加dep实例
    if (Deps.target) {
      Deps.target.addDep(this)
    }
  }
}

class observer {  //通知更新
  constructor() { 
    this.deps = []
  }
  addDep(dep) { 
    this.deps.push(dep)
  }
  update() { 

  }
}

let instance = new vm({ data: { a: 1,b:2 } })
instance.opt.data.a = '222'
console.log(instance.opt.data.a)
instance.opt.data.b = '2333'
console.log(instance.opt.data.b)
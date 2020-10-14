class vm  { 
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
      Object.defineProperty(data, key, {
        get() {
          return val  
        },
        set(newVal) { 
          val = newVal //注意：这里是通过闭包来实现的
        }
      })
    })
  }
}
class observer { 
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  notify() {

  }
}
class deps { 
  constructor() { 
    this.subs = []
  }
  addSub(sub) { 
    this.subs.push(sub)
  }
  notify() {
    
  }
}
let instance = new vm({ data: { a: 1 } })
instance.opt.data.a = '222'
console.log(instance.opt.data.a)
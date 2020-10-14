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
          return val  //注意：这里是一个闭包
        },
        set(newVal) { 
          val = newVal //注意：这里是一个闭包
        }
      })
    })
  }
}
let instance = new vm({ data: { a: 1 } })
instance.opt.data.a = '222'
console.log(instance.opt.data.a)
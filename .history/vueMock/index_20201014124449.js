class vm  { 
  constructor(opt) { 
    this.opt = opt
    this.initData()
  }
  initData() { 
    reactive()
  }
  reactive() { 
    let data = this.opt.data
    Object.keys(data).forEach(key => { 
      let val = data[key]
      Object.defineProperty(data, key, {
        get() { 
          console.log(111)
          return val
        },
        set(newVal) { 
          data[key] = newVal
        }
      })
    })
  }
}
let instance = new vm({ data: { a: 1 } })
instance.opt.data

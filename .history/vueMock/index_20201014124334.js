class vm  { 
  constructor(opt) { 
    this.opt = opt
    this.init()
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
          data[key] = newVal
        }
      })
    })
  }
}
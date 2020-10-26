Function.prototype.apply = function (ctx, ...args) { 
  if (typeof this != 'function') { 
    throw new TypeError('type error')
  }
  if(!ctx) ctx = window
  const fnName = Symbol()
  ctx[fnName] = this
  const res = ctx[fnName](...args)
  delete ctx[fnName]
  return res
}
//不使用es6
Function.prototype.apply = function (ctx) { 
  const argsArr = arguments[1]
  let argsStr = ''
  argsArr && argsArr.forEach(i => { 
    argsStr += ''
  })
  const fnName = Symbol()
  ctx[fnName] = this
  const res = ctx[fnName]()
}
Function.prototype.apply = function (ctx, ...args) { 
  if (typeof this != 'function') { 
    throw new TypeError('type error')
  } //关键
  ctx = ctx || window  //关键
  const fnName = Symbol()
  ctx[fnName] = this
  const res = ctx[fnName](...args)
  delete ctx[fnName]
  return res
}
//不使用es6
function mockSymbolForApply(obj) { 
  let unique_flag = "00_" + Math.random()
  if (obj[unique_flag]) {
    unique_flag = mockSymbolForApply(obj)
  } else { 
    return unique_flag
  }
}
Function.prototype.apply = function (ctx) { 
  if (typeof this != 'function') {
    throw new TypeError('type error')
  } //关键
  ctx = ctx || window
  const argsArr = arguments[1]
  const fnName = mockSymbolForApply(ctx)
  ctx[fnName] = this
  // const res = ctx[fnName](argsArr.join(',') //这样是不可以的
  const res = eval('ctx[fnName](' + argsArr.join(',') + ')')
  delete ctx[fnName]
  return res
}


Function.prototype.call = function (ctx) { 
  ctx = ctx || window
  const fnName = Symbol()
}

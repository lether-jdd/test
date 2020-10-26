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
Function.prototype.apply = function (ctx) { 
  const argsArr = arguments[1]
  const fnName = Symbol()
  ctx[fnName] = this
  // const res = ctx[fnName](args.join(',') //这样是不可以的
}
Function.prototype.apply = function (ctx, ...args) { 
  if (typeof this != 'function') { 
    throw Error('type error')
  }
  const fnName = Symbol()
  ctx[fnName] = this
  const res = ctx[fnName](...args)
  delete ctx[fnName]
  return res
}
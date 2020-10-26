Function.prototype.apply = function (ctx,...args) { 
  const fnName = Symbol()
  ctx[fnName] = this
  const res = ctx[fnName](...args)
  delete ctx[fnName]
  return res
}
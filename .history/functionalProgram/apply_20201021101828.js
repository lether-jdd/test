Function.prototype.apply = function (ctx,...args) { 
  let fnName = Symbol()
  ctx[fnName] = this
  let res = ctx[fnName](...args)
  delete ctx.fnName
  return res
}
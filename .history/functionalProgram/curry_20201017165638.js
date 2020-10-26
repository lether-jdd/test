function curry(fn, length = fn.length) { 
  return function curriedfn(...nextargs) { 
    return function (...args1) { 
      let args = nextargs.concat(args1)
      if (args.length >= length) {
        return fn(...args)
      } else { 
        return curriedfn(args)
      }
    }
  }
}
function curry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(nextArg) {
      var args = prevArgs.concat([nextArg]);
      if (args.length >= arity) {
        return fn(...args);
      }
      else {
        return nextCurried(args);
      }
    };
  })([]);
}

function looseCurry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(...nextArgs) {
      var args = prevArgs.concat(nextArgs);
      if (args.length >= arity) {
        return fn(...args);
      }
      else {
        return nextCurried(args);
      }
    };
  })([]);
}
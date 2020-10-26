function partial(fn, hasArgs) {
  return function (nextArgs) { 
    fn(hasArgs, nextArgs)
  }   
}
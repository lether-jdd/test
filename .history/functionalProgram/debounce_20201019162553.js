//非立即执行
function debounce(fn, time) { 
  let timer = null 
  return function () {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this,arguments)
    },time)
  }
}

//立即执行
function debounceMust(fn) {
  let timer = null 
  return function () { 
    if (!timer) { 
      fn.apply(this,arguments)
    } else {
      clearTimeout(timer)
    }

  }
}
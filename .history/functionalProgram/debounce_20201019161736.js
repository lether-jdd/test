//非立即执行
function debounce(fn, time) { 
  let timer = null 
  return function () {
    if (timer) clearTimeout(timer)
  }
}
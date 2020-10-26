/*
 * @Author: your name
 * @Date: 2020-10-19 16:15:46
 * @LastEditTime: 2020-10-21 10:08:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /test/functionalProgram/debounce.js
 */
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
function debounceMust(fn,time) {
  let timer = null 
  return function () { 
    if (!timer) { 
      fn.apply(this,arguments)
    } else {
      clearTimeout(timer)
    }
    timer = setTimeout(() => { 
      timer = null
    },time)
  }
}


const throttle = (fn, time) => {
  let flag = true;
  return function () {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, time);
  }
}
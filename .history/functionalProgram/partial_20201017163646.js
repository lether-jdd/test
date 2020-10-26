/*
 * @Author: your name
 * @Date: 2020-10-17 16:34:44
 * @LastEditTime: 2020-10-17 16:36:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /test/functionalProgram/partial.js
 */
function partial(fn, ...hasArgs) {
  return function (nextArgs) { 
    fn(...hasArgs, ...nextArgs)
  }   
}
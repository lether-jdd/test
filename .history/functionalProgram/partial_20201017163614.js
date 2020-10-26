/*
 * @Author: your name
 * @Date: 2020-10-17 16:34:44
 * @LastEditTime: 2020-10-17 16:36:14
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /test/functionalProgram/partial.js
 */
function partial(fn, hasArgs) {
  return function (nextArgs) { 
    fn(hasArgs, nextArgs)
  }   
}
/*
 * @Author: your name
 * @Date: 2020-10-17 10:42:43
 * @LastEditTime: 2020-10-17 11:45:39
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /test/vueMock/store.js
 */
//dispatch 方法
const dispatch = function (action) { 
  let entry = this.actions[action]
  const result = entry.length > 1
    ? Promise.all(entry.map(handler => handler(payload)))
    : entry[0](payload) //如何保证是promise
  return new Promise((resolve, reject) => {
    result.then(res => {
      resolve(res)
    }, error => {
      try {
        this._actionSubscribers
          .filter(sub => sub.error)
          .forEach(sub => sub.error(action, this.state, error))
      } catch (e) {
        if (__DEV__) {
          console.warn(`[vuex] error in error action subscribers: `)
          console.error(e)
        }
      }
      reject(error)
    })
  })
}
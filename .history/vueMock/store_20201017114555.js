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
      reject(error)
    })
  })
}
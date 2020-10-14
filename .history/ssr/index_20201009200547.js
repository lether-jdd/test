const Vue = require('vue')
const { response, request } = require('express')
const server = require('express')()
const app = new Vue({
  template: `<div>
    <div></div>Hello World11</div>`
})

// 第 2 步：创建一个 renderer
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

// 第 3 步：将 Vue 实例渲染为 HTML
// renderer.renderToString(app, (err, html) => {
//   if (err) throw err
//   console.log(html)
//   // => <div data-server-rendered="true">Hello World</div>
// })
server.get('/', (request, response) => { 
  renderer.renderToString(app).then(html => {
    console.log(html)
    response.end(html)
  }).catch(err => {
    console.error(err)
  })
})
server.listen(1234)
// 在 2.5.0+，如果没有传入回调函数，则会返回 Promise：
// renderer.renderToString(app).then(html => {
//   console.log(html)
// }).catch(err => {
//   console.error(err)
// })
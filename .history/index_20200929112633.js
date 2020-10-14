/*
 * @Author: your name
 * @Date: 2020-09-29 11:25:47
 * @LastEditTime: 2020-09-29 11:26:33
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /test/index.js
 */
var http = require("http");
var http = require('http');

http.createServer(function (request, response) {
  // 发送 HTTP 头部 
  // HTTP 状态值: 200 : OK
  // 内容类型: text/plain
  response.writeHead(200, { 'Content-Type': 'text/plain' });

  // 发送响应数据 "Hello World"
  response.end('Hello World\n');
}).listen(8080);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8080/');
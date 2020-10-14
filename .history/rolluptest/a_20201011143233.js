// import foo from './b.js';
const foo = require('./b.js')
// export default function () {
//   console.log(foo);
// }
module.exports = {
  obj: {
    key: '1',
    foo: foo
  }
}
/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-01-04 11:39:14
 * @Date: 2020-12-30 10:16:41
 */
let Promise = require('./08_promise_js')
// let Promise = require('./Untitled-1')
let promise = new Promise((resolve, reject) => {
    resolve('ok')
})
let promise2 = promise.then((data) => {
    // console.log(data)
    return promise2
})
promise2.then(() => { }, (err) => {
    console.log(err)
})
// 根据x值来解析promise是成功还是失败
// if (x === promise2) {
//     reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
// }

// -------------------------------------
// let obj = {}
// Object.defineProperty(obj, 'then', {
//     get() {
//         // throw new Error('出错')
//     }
// })
// obj.then
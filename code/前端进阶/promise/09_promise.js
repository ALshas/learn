/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-01-04 17:20:56
 * @Date: 2020-12-30 10:16:41
 */
let Promise = require('./09_promise_js')
// let fs = require('fs')
// 解决promise嵌套问题
// new Promise()
// function read(url) {
//     let dfd = Promise.defer()
//     fs.readFile(url, 'utf8', (err, data) => {
//         if (err) {
//             dfd.reject(err)
//         }
//         dfd.resolve(data)
//     })
//     return dfd.promise
// }
// read('./前端进阶/06_name.txt').then(data => {
//     console.log(data)
// }).catch((err) => {
//     console.log(err)
// })

// 默认产生一个成功的promise
// Promise.resolve(1).then(data => {
//     console.log(data)
// })
// 默认产生一个失败的promise
// Promise.reject(2);

Promise.resolve(new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok');
    }, 1000);
})).then(data => {
    console.log(data)
})

// promise.resolve 是具备等待功能  会将promise执行完 在向下执行
// promise.reject是直接将值变成错误结果


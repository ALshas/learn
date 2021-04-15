/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-01-06 09:33:01
 * @Date: 2020-12-30 10:16:41
 */
let Promise = require('./06-07_promise_js')
let fs = require('fs')
// let promise = new Promise((resolve, reject) => {
//     console.log(1)
//     setTimeout(() => { reject('不可以') }, 1000)
// })
// promise.then((val) => {
//     console.log('success', val)
// }, (reason) => {
//     console.log('fail', reason)
// })
// promise.then((val) => {
//     console.log('success', val)
// }, (reason) => {
//     console.log('fail', reason)
// })

// 链式调用 怎么执行(上一次的输出是下一次的输入)
// fs.readFile('./前端进阶/06_name.txt', 'utf8', (err, data) => {
//     console.log(data)
//     fs.readFile(`./前端进阶/${data}`, 'utf8', (err, data) => {
//         console.log(data)
//     })
// })
// 使用promise来写恶魔金字塔
function read(url) {
    return new Promise((resolve, reject) => {
        resolve(100)
        // fs.readFile(url, 'utf8', (err, data) => {
        //     if (err) reject(err)
        //     resolve(data)
        // })
    })
}
// then的使用方式 普通值意味着不是promise
// 1 then中的回调有两个方法 成功或者失败 他们的返回结果（普通值）会传递到下一个then中的data(我在前一个then中的成功或者失败中返回一个值，都能在下一个then中的成功中获取到)
// 2 可以在成功和失败中抛出异常 会走到下一次then的失败中 
// 3 返回的是一个promise 那么会用这个promise的状态来作为结果 会用promise的结果向下传播
// 4 错误处理  默认找自己最近的错误处理，找不到向下查找错误， 找到后就执行。

// then中抛出异常 或者返回一个失败的promise 都会执行错误
read('./前端进阶/06_name.txt').then(data => {
    // return 'hello'
    // throw 'haha'
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve('zheshi')
    //     }, 1000)
    // })
    return 123
})
    .then((data) => {
        console.log('success', data)
    }, err => {
        console.log('err', data)
    })

// 一旦成功不能失败 一旦失败不能成功
// promiseImpl.then的实现原理 通过返回一个新的promise来实现的



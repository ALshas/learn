/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2020-12-30 16:22:10
 * @Date: 2020-12-30 10:16:41
 */
let Promise = require('./05_promise_js')
let promise = new Promise((resolve, reject) => {
    // resolve('可以')
    console.log(1)
    // throw new Error('jjjj')
    setTimeout(() => { reject('不可以') }, 1000)
})
promise.then((val) => {
    console.log('success', val)
}, (reason) => {
    console.log('fail', reason)
})
promise.then((val) => {
    console.log('success', val)
}, (reason) => {
    console.log('fail', reason)
})

// 1 同一个promise可以then多次 （使用发布订阅模式）
// 调用then时 当前状态如果是等待 我需要将成功和失败的回调 分别进行存放（订阅）
// 调用resolve时 将订阅的函数进行执行（发布的过程）
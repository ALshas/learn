/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2020-12-30 11:26:11
 * @Date: 2020-12-30 10:16:41
 */
// 1 executor 执行器 默认会立即执行
// 2 默认promise的状态是等待态 （三个状态 等待 成功 失败)
// 3 当调用resolve时 会变成成功态 调用reject 会变成失败态
// 4 返回的一个实例上有一个then方法，then中需要提供两个参数 分别是成功对应的函数和失败对应的函数
// 5 如果同时调用成功和失败 默认会采取第一次调用的结果
// 6 抛出异常就走失败逻辑
let Promise = require('./04_promise_js')
// const { resolve } = require("path");

// 7 成功时可以传入成功的值 失败时可以传入失败的原因
let promise = new Promise((resolve, reject) => {
    // resolve('可以')
    console.log(1)
    // throw new Error('jjjj')
    // setTimeout(() => { reject('不可以') }, 1000)
})
promise.then((val) => {
    console.log('success', val)
}, (reason) => {
    console.log('fail', reason)
})
console.log(2)
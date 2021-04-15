/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-01-04 17:44:16
 * @Date: 2020-12-30 10:16:41
 */
let Promise = require('./10_promise_js')
// finally 无论传入的函数是失败 还是成功都执行
Promise.prototype.finally = function (callback) {
    return this.then((value) => {
        return Promise.resolve(callback()).then(() => value)
    }, (err) => {
        return Promise.resolve(callback()).then(() => { throw err })
    })
}

Promise.resolve(123).finally(() => {
    // console.log(2344)
    // 如果返回的是成功的promise 会采用上一次的结果
    // 如果返回的是失败的promise 会用失败的结果 传入到catch中
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(12)
        }, 1010);
    })
}).then(data => {
    console.log('succ', data)
}).catch(err => {
    console.log('err', err)
})
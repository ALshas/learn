/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-01-06 15:00:01
 * @Date: 2021-01-05 16:03:28
 */
// 一个数组中的方法，最快的执行后，其他的就不执行了。

function wrap(promise) {
    let abort;
    let newPromise = new Promise((resolve, reject) => {
        abort = reject;
    })
    let p = Promise.race([promise, newPromise])
    p.abort = abort
    return p
}

// 实现一个race原理
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        // 使用for才能同步循环
        for (let i = 0; i < promises.length; i++) {
            let value = promises[i]
            if (value && typeof value.then === 'function') {
                value.then(resolve, reject)
            } else {
                resolve(value)
            }
        }
    })
}

// 或者可以封装终端方法
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功');
    }, 10000)
})

let newPromise = wrap(promise)
setTimeout(() => {
    newPromise.abort('超时了')
}, 3000)
promise.then((data => {
    console.log('成功' + data)
})).catch((err) => {
    console.log('失败' + err)
})
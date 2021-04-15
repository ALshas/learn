/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-01-05 11:35:54
 * @Date: 2020-12-30 10:16:41
 */
// promise.all()
// 解决并发问题 多个异步并发获取最终结果
// 成功中有失败，直接走失败
// 全部成功，输出数组
let Promise = require('./11_promise_js')
Promise.all = function (values) {
    return new Promise((resolve, reject) => {
        let resultArr = [];
        let orderIndex = 0;
        const processResultByKey = (value, index) => {
            resultArr[index] = value;
            if (++orderIndex === values.length) {
                resolve(resultArr)
            }
        }
        for (let i = 0; i < values.length; i++) {
            let value = values[i]
            if (value && typeof value.then === 'function') {
                value.then((value) => {
                    processResultByKey(value, i)
                }, reject)
            } else {
                processResultByKey(value, i)
            }
        }
    })
}


let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(100)
    }, 1000);
})
let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(200)
    }, 1000);
})
Promise.all([1, 2, 3, function haha() { console.log(12345) }, p1, p2]).then(data => {
    console.log('resolve', data)
}).catch(err => {
    console.log('reject', err)
})
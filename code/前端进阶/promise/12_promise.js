/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-01-05 18:09:14
 * @Date: 2021-01-05 16:03:28
 */
const fs = require('fs')
const util = require('util')
let read = util.promisify(fs.readFile)

// promisify对所有函数进行包装 promisifyAll是对所有的进行包装

// 实现read方法 自己进行包装
const promisify = (fn) => {
    return (...args) => {
        return new Promise((resolve, reject) => {
            fn(...args, function (err, data) {
                if (err) return reject(err)
                resolve(data)
            })
        })
    }
}
// read('./前端进阶/name.js', 'utf8').then((data) => {
//     console.log(data)
// })
// -----------------------------------------------------
const promisifyAll = (target) => {
    Reflect.ownKeys(target).forEach(key => {
        if (typeof target[key] === 'function') {
            target[key + 'Async'] = promisify(target[key])
        }
    })
    return target;
}

const bluebird = require('bluebird')
const newFs = bluebird.promisifyAll(fs)
newFs.readFileAsync('./前端进阶/name.js', 'utf8').then(data => {
    console.log(newFs)
})
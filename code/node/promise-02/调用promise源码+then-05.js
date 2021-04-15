const Promise = require('./promise源码+then04');
const { resolve } = require('path');

//如果一个promise then的方法钟返回一个普通纸

let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('hello');
    }, 1000)
})

p.then(data => {
    // return data;
    return 10
    // throw new Error('error')
}).then(data => {
    console.log(data)
}, err => {
    console.log(err)
})
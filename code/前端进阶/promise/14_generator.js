/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-01-06 15:15:14
 * @Date: 2021-01-06 12:58:18
 */
// 通过genarator优化promise promise的缺点是不停的回调 不停的链式调用
const fs = require('fs').promises

function* read() {
    try {
        let content = yield fs.readFile('./前端进阶/06_name.txt', 'utf8')
        let age = yield fs.readFile(`./前端进阶/${content}`, 'utf8')
        return age
    } catch (e) {
        console.log('出错了', e)
    }

}
// let it = read();
// let { value, done } = it.next();
// value.then(data => {
//     let { value, done } = it.next(data);    //赋值给content，且执行yield fs.readFile(`./前端进阶/${content}`, 'utf8')
//     console.log(value)
//     value.then(data => {
//         let { value, done } = it.next(data);  //赋值给age且返回
//         console.log(value)
//     })
// }).catch(err => {
//     it.throw(err)
// })

// 代替上面的代码 用一个co  //安装  npm install co
// const co = require('co')
co(read()).then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})

// 自己实现co
function co(it) {
    return new Promise((resolve, reject) => {
        //   异步迭代需要根据函数来实现
        function next(data) {
            let { value, done } = it.next(data)
            if (done) {
                resolve(value)
            } else {
                // Promise.resolve(value).then(data => {
                //     next(data)
                // }).catch(err => {
                //     reject(err)
                // })
                // 简写
                Promise.resolve(value).then(next, reject)
            }
        }
        next()
    })
}

// ------------------------------------------------------------------
// async+await 就是co+generator的语法糖
// *号编程async   yield变成await
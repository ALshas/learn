// const after = (items, fn) => {
//     return () => {
//         if (--items == 0) {
//             fn()
//         }
//     }
// }
// let newAfter = after(3, () => {
//     console.log('三次调用以后')
// })
// newAfter()
// newAfter()
// newAfter()

// 读取数据node 异步 会等待同步代码都执行完成后在执行
const fs = require('fs')
let school = {}
const after = (times, fn) => () => --times === 0 && fn();
let newAfter = after(2, () => {
    console.log(school);
})
fs.readFile('./name.txt', 'utf8', (err, data) => {
    console.log(1, err, data)
    school['name'] = data;
    newAfter();
})
fs.readFile('./age.txt', 'utf8', (err, data) => {
    school['age'] = data;
    newAfter();
})
//因为调用这name.txt和age.txt这两个文件的时候，data存到school对象里面的时候存得时间不一样
//会是偶尔{ name: undefined, age: undefined }或
//会是偶尔{ age: undefined, name: undefined }
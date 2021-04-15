let fs = require('fs');

// 原生的方法 都说通过函数的第一个参数来控制
// fs.readFile('./name.txt', 'utf8', (err, data) => {
//     if (err) {
//         return console.log(err);
//     }
//     fs.readFile(data, 'utf8', (err, data) => {
//         if (err) {
//             return console.log(err)
//         }
//         console.log(data);
//     })
// })
// 通过promise改造
function readFile(...args) {
    return new Promise((resolve, reject) => {
        fs.readFile(...args, function (err, data) {
            if (err) reject(err);
            resolve(data);
        })
    })
}
readFile('./name.txt', 'utf8').then(data => {
    console.log('s:' + data);
}, err => {
    console.log('s:' + err);
}) 
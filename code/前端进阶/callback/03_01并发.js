/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2020-12-29 17:00:22
 * @Date: 2020-12-29 16:32:17
 */
// 异步的  node中的异步方法 都可以通过回调来获取到最终的结果
const { time } = require('console');
let fs = require('fs');  //fileSystem
let obj = {}
const after = (times, callback)=>()=>{
    --times == 0 && callback()
}
let out = after(2, ()=>{
    console.log(obj)
})
fs.readFile('./前端进阶/name.js', 'utf8', (err, data)=>{
    obj.name = data
    out()
})
fs.readFile('./前端进阶/age.js', 'utf8', (err, data)=>{
    obj.age = data
    out()
})

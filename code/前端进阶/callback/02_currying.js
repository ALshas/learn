/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2020-12-29 14:34:13
 * @Date: 2020-12-28 17:23:22
 */
// 函数柯里化
// 判断一个元素的类型 数组 对象...

//判断类型应该使用哪些方法判断
// 1 typeof 不能区分对象类型 typeof{} typeof []
// 2 constructor 可以判断这个实例是通过谁来构造出来的
// console.log({}.constructor)
// 3 instanceof 区分实例 __proto__
// console.log([].__proto__ === Object.prototype)  //false
// console.log([].__proto__.__proto__ === Object.prototype)  //true
// 4 Object.prototype.toString.call([])  区分具体类型（但是不能区分实例）
// 细化函数功能，让他更具体（柯里化的作用）
// const isType = (typing) => (value) => {
//     return Object.prototype.toString.call(value) == `[object ${typing}]`
// }
// let util = {};
// ['String', 'Number', 'Null', 'Undefined'].forEach((typing) => {
//     util['is' + typing] = isType(typing)
// })
// console.log(util.isString(123))
// 通用的函数柯里化
// function sum(a, b, c, d) {
//     console.log(a, b, c, d)
// }
// const currying = (fn, arr = []) => {  // 记录调用时参数的个数 和 函数个数的关系
//     let len = fn.length;   // 函数的参数个数 
//     console.log(11, len)
//     return (...args) => {
//         let concatArgs = [...arr, ...args];
//         //    获取长度 和值的关系
//         if (concatArgs.length < len) {
//             return currying(fn, concatArgs)
//         } else {
//             console.log(123, ...arr)
//             return fn(...concatArgs)
//         }
//     }
// }
// let newSum = currying(sum)
// newSum(1, 2)(3)(5)
// -----------------------------------------------------------------------
// function sum(a, b, c, d) {
//     console.log(a, b, c, d)
// }
// const currying = (fn, arr = []) => {  // 记录调用时参数的个数 和 函数个数的关系
//     console.log(fn)
//     let len = fn.length;   // 函数的参数个数 
//     return (...args) => {
//         let concatArgs = [...arr, ...args];
//         //    获取长度 和值的关系
//         if (concatArgs.length < len) {
//             return currying(fn, concatArgs)
//         } else {
//             return fn(...concatArgs)
//         }
//     }
// }
// let newSum = currying(sum)
// newSum(1, 2)(3)(5)
// ----------------------------------------------------------------------
function isType(typing, content) {
    console.log(content, typing)
    return Object.prototype.toString.call(content) == `[object ${typing}]`
}
let util = {};
['String', 'Number', 'Null', 'Undefined'].forEach((typing) => {
    util['is' + typing] = currying(isType)(typing)
})

console.log(util.isString('rwere'))

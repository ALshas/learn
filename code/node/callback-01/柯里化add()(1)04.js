// const add = (a, b, c, d, e) => {
//     return a + b + c + d + e;
// }
// const curring = (fn, arr = []) => {
//     let len = fn.length    //a,b,c,d,e 为5
//     return (...args) => {
//         arr = arr.concat(args)
//         if (arr.length < len) {
//             return curring(fn, arr)
//         }
//         return fn(...arr)
//     }
// }
// let r = curring(add)(1)(2)(3, 4, 5);
// console.log(r)
const curring = (fn, arr = []) => {
    let len = fn.length    //a,b,c,d,e 为5
    return (...args) => {   //return 一个函数代表（1）或者（3，4，5）.传一个参数返回一个新的函数
        arr = arr.concat(args)   //args为每一个括号里面的数
        if (arr.length < len) {
            return curring(fn, arr)
        }
        return fn(...arr)
    }
}
const checkType = (type) => {
    return (content) => {
        return Object.prototype.toString.call(content) === `[object ${type}]`
    }
}
let types = ['Number', 'String', 'Boolean'];
let utils = {}
types.forEach(type => {
    utils['is' + type] = curring(checkType)(type)
})
console.log(utils.isString('123'))
// console.log(utils.isNumber('456'))
// const checkType = (content, type) => {
//     return Object.prototype.toString.call(content) === `[object ${type}]`
// }
// const b = checkType(123, 'Number');
// console.log(b)

//修改变成闭包
// const checkType = (type) => {
//     return (content) => {
//         return Object.prototype.toString.call(content) === `[object ${type}]`
//     }
// }
// let isString = checkType('String')
// console.log(isString('123'))

//最终优化
const checkType = (type) => {
    return (content) => {
        return Object.prototype.toString.call(content) === `[object ${type}]`
    }
}
let types = ['Number', 'String', 'Boolean'];
let utils = {}
types.forEach(type => {
    utils['is' + type] = checkType(type)
    console.log(utils, '----', checkType(type))
})
console.log(utils.isString('123'))
console.log(utils.isNumber('456'))
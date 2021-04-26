/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2020-12-28 17:06:20
 * @Date: 2020-12-28 16:20:31
 */
// 核心代码
function say(a, b, c, d, e) {
    console.log('我是核心代码~', a, b, c, d, e)
}

//  扩展方法
// 当前实例都可以调用所属类原型上的方法
Function.prototype.before = function (callback) {
    // this = say
    return (...args) => {   //箭头函数的特点，没有this, 没有arguments 没有prototype 不能New
        callback()
        this(...args)
    }
}

let newSay = say.before(() => {
    console.log('我是次要信息')
})
newSay(1, 2, 3, 4, 6)
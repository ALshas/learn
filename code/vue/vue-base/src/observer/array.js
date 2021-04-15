/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-02-03 17:19:03
 * @Date: 2021-02-02 18:07:12
 */
// 拿到数组原型上的方法（原来的方法）
let oldArrayProtoMethods = Array.prototype;
// 继承一下  相当于 arrayMethods.__proto__ = oldArrayProtoMethods
export let arrayMethods = Object.create(oldArrayProtoMethods);
let methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice'
];
methods.forEach(method => {
    arrayMethods[method] = function (...args) {
        const result = oldArrayProtoMethods[method].apply(this, args);
        const ob = this.__ob__;// 这个this指向value
        // 有可能数组中有对象
        let inserted;
        switch (method) {
            case 'push'://arr.push({a: 1}, {b:2})
            case 'unshift'://这两个方法都是追加的意思 追加的内容可能是对象类型 应该再次进行劫持 
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2)
            default:
                break;
        }
        if (inserted) ob.observeArray(inserted); // 对新增的每一项进行观测
        return result
    }
})
// Symbol 独一无二
// 用作常量
const s1 = Symbol('zf'); // 可以传number或者string类型
const s2 = Symbol('zf');
console.log(s1 === s2);  //输出false

// 属性私有化
let s1 = Symbol.for('zf');
let s2 = Symbol.for('zf');  //  如果symbol已经有值了 就将这个值返回即可
console.log(s1 === s2);   //输出true
console.log(Symbol.keyFor(s2));  //zf
let obj = {
    [s1]: 1 //es6写法 []含义是将S1结果取出来作为Key
}
console.log(obj[s1]);  //不能使用.运算符

// 元编程 可以改变js源代码的功能 改变js原有的功能
//instanceof //可以判断某个人是否是谁的实例
let o = {
    name: 1
}
// Symbol.iterator 在我迭代的时候 默认就会调用此方法
let obj = {
    [Symbol.hasInstance]() {
        return 'name' in o;
    }
}
console.log(o instanceof obj)

let obj = {
    [Symbol.toPrimitive](value) {
        console.log(value); // default  number
        return 'hello'
    },
    a: 1
}
// 先执行valueof  再执行toString
console.log(obj + 1)  // hello1
console.log(obj * 1)   //NaN


// toString
const obj = {
    get [Symbol.toStringTag]() {
        return '123'
    }
}
console.log(obj.toString())

// 衍生对象
class MyArray extends Array {
    constructor(...args) {
        super(...args)
    }
    static get [Symbol.species]() {
        return Array;   //孔子衍生对象的类的构造函数
    }
}
let myArr = new MyArray(1, 2, 3);
let newArr = myArr.map(item => item * 2);
console.log(myArr instanceof MyArray);   //true
console.log(newArr instanceof MyArray);   //false

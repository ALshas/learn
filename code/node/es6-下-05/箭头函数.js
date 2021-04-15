// 箭头函数的特点  没有this arguments prototype
let a = 100;  //let声明的变量不会放到全局上
let obj = {
    a: 1,
    fn() {        //this指向Obj
        setTimeout(function () {       //this指向Window  这一行代码写全叫做 window.setTimeout
            console.log(this.a)         //undefined
        })
    }
}
obj.fn()
// --------------------------------
let a = 100;  //let声明的变量不会放到全局上
let obj = {
    a: 1,
    fn() {        //this指向Obj
        setTimeout(() => {
            console.log(this.a)   //箭头函数 没有this就会向上找 可以找到fn的this,fn的this指向obj    输出1     
        })
    }
}
obj.fn()
// --------------------------
let a = 100;  //let声明的变量不会放到全局上
let obj = {
    a: 1,
    fn: () => {         //没有this
        setTimeout(() => {      //没有this
            console.log(this.a)   //this指向window ，所以输出undefind
        })
    }
}
obj.fn()

function compose(...args) {
    return args.reduce((prev, current) => {
        return function (...values) {
            return prev(current(...values))
        }
    })
}
// 箭头函数
const compose = (...args) => args.reduce((prev, current) => (...values) => prev(current(...values)))
let r = compose(addCurrency, len, sum)('abc', 'bed')

// 实现reduce原理
// 1\反柯里化
// 2\flatten
// 3\Array.prototype.reduce
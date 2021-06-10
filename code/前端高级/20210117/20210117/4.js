/* 
    在函数式编程当中有一个很重要的概念就是函数组合， 实际上就是把处理数据的函数像管道一样连接起来， 然后让数据穿过管道得到最终的结果。 例如：
    const add1 = x => x + 1;
    const mul3 = x => x * 3;
    const div2 = x => x / 2;
    div2(mul3(add1(add1(0)))); //=>3
​
    而这样的写法可读性明显太差了，我们可以构建一个compose函数，它接受任意多个函数作为参数（这些函数都只接受一个参数），然后compose返回的也是一个函数，达到以下的效果：
    const operate = compose(div2, mul3, add1, add1)
    operate(0) //=>相当于div2(mul3(add1(add1(0)))) 
    operate(2) //=>相当于div2(mul3(add1(add1(2))))
​
    简而言之：compose可以把类似于f(g(h(x)))这种写法简化成compose(f, g, h)(x)，请你完成 compose函数的编写 
*/
const add1 = x => x + 1;
const mul3 = x => x * 3;
const div2 = x => x / 2;

function compose(...funcs) {
    let len = funcs.length;
    if (len === 0) return x => x;
    if (len === 1) return funcs[0];
    return function operate(...args) {
        return funcs.reduceRight((result, item) => {
            if (Array.isArray(result)) {
                return item(...result);
            }
            return item(result);
        }, args);
    };
}
let operate = compose(div2, mul3, add1, add1);
console.log(operate(0));

/* function compose(...funcs) {
    // funcs -> [div2, mul3, add1, add1]
    return function operate(x) {
        let len = funcs.length;
        if (len === 0) return x;
        if (len === 1) return funcs[0](x);
        return funcs.reduceRight((result, item) => {
            return item(result);
        }, x);
    };
}
const operate = compose(div2, mul3, add1, add1);
console.log(operate(0)); */

/* function compose(...funcs) {
    if (funcs.length === 0) {
        return x => {
            return x;
        };
    }
    if (funcs.length === 1) {
        return funcs[0];
    }
    // funcs -> [div2, mul3, add1, add1]
    return funcs.reduce((a, b) => {
        // 第一次 每一次迭代，执行回调函数，都产生一个闭包，存储a/b，返回的小函数中后期使用的a/b就是这个闭包中的
        //   a -> div2
        //   b -> mul3
        //   return x=>a(b(x)) @1
        // 第二次
        //   a -> @1
        //   b -> add1
        //   return x=>a(b(x)) @2
        // 第三次
        //   a -> @2
        //   b -> add1
        //   return x=>a(b(x)) @3
        return x => {
            return a(b(x));
        };
    }); //=>return @3; 赋值给外面的operate
}
const operate = compose(div2, mul3, add1, add1);
console.log(operate(0)); */


Array.prototype.reduce = function reduce(callback, initial) {
    let self = this, // this -> arr
        i = 0,
        len = self.length,
        item,
        result;
    if (typeof callback !== "function") throw new TypeError('callback must be an function!');
    if (typeof initial === "undefined") {
        // 初始值不设置，让初始值是数组第一项，并且从数组第二项开始遍历
        initial = self[0];
        i = 1;
    }
    result = initial;

    // 循环数组中的每一项
    for (; i < len; i++) {
        item = self[i];
        result = callback(result, item, i);
    }
    return result;
};

let arr = [10, 20, 30, 40];
console.log(arr.reduce((result, item, index) => {
    return result + item;
}));
console.log(arr.reduce((result, item) => {
    return result + item;
}, 0));
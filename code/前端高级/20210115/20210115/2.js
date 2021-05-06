/*
/!*
 * EC(G)
 *   变量提升:
 *     var test;
 *!/
// test=0x000;
var test = (function (i) {
    /!*
     * EC(AN) 「闭包」
     *   作用域链:<EC(AN),EC(G)> 
     *   形参赋值:i=2 -> 4
     *   变量提升:--
     *!/
    return function () {
        /!* 
         * EC(TEST)
         *   作用域链:<EC(TEST),EC(AN)> 
         *   初始ARGUMENTS: {0:5,length:1} 实参集合
         *   形参赋值:--
         *   变量提升:--
         *!/
        alert(i *= 2); //=>“4”
    }; //return 0x000; [[scope]]:EC(AN)
})(2);
test(5);
*/


/*
/!*
 * EC(G)
 *   变量提升:
 *     var x;  ->4/3/2/1
 *     func=0x000; [[scope]]:EC(G)
 *     var f;  ->0x001
 *!/
var x = 4;
function func() {
    /!*
     * EC(FUNC1) 「闭包」
     *   作用域链:<EC(FUNC1),EC(G)> 
     *   形参赋值:--
     *   变量提升:--
     *   代码执行:
     *     return 0x001; [[scope]]:EC(FUNC1)
     *!/
    return function (y) {
        /!*
         * EC(F1)
         *   作用域链:<EC(F1),EC(FUNC1)> 
         *   形参赋值:y=6
         *   变量提升:--
         *   代码执行:
         *     6 + (--x)   x是EC(G)中的  =>9
         *!/
        /!*
         * EC(F2)
         *   作用域链:<EC(F2),EC(FUNC1)> 
         *   形参赋值:y=9
         *   变量提升:--
         *   代码执行:
         *     9 + (--x)   x是EC(G)中的  =>10
         *!/
        console.log(y + (--x));
    };

    //======第二次执行大函数
    /!*
     * EC(FUNC2)
     *   作用域链:<EC(FUNC2),EC(G)> 
     *   形参赋值:--
     *   变量提升:--
     *   代码执行:
     *     return 0x002; [[scope]]:EC(FUNC2)
     *!/
    return function (y) {
        /!*
         * EC(AN)
         *   作用域链:<EC(AN),EC(FUNC2)> 
         *   形参赋值:y=8
         *   变量提升:--
         *   代码执行:
         *     8 + (--x)   x是EC(G)中的  =>10
         *!/
        console.log(y + (--x));
    };
}
var f = func(5);
f(6);
func(7)(8);
f(9);
console.log(x); //=>1
*/


/*
/!*
 * EC(G)
 *  变量提升:
 *    var x;  ->5/11/10
 *    var y;  ->6
 *    func = 0x000; [[scope]]:EC(G)
 *         = 0x001; 小函数
 *!/
var x = 5,
    y = 6;
function func() {
    /!*
     * EC(FUNC) -> 0x000(4) 「闭包」
     *   作用域链:<EC(FUNC),EC(G)>
     *   形参赋值:--
     *   变量提升:--
     *!/
    x += y; //x=x+y 「x和y都是EC(G)中的」
    func = function (y) { //「func也是EC(G)中的」  小函数:0x001; [[scope]]:EC(FUNC)
        /!*
         * EC(FUNC2) -> 0x001(3)
         *   作用域链:<EC(FUNC2),EC(FUNC)>
         *   形参赋值:y=3
         *   变量提升:--
         *!/
        console.log(y + (--x)); //「y私有的、x是全局的」 =>13
    };
    console.log(x, y);//=>11&6
}
func(4);
func(3);
console.log(x, y); //=>10&6
*/


/* var b = 10;
(function b() {
    // 匿名函数具名化
    //   + 只能在函数内部使用「例如：递归」
    //   + 如果函数内部，这个名字没有被使用其他方式声明过，那么此名字存储的是当前函数「且值不能被修改」
    //   + 但是具名化的优先级最低「一但函数内部基于其他方式声明过这个变量，则按照私有变量处理」
    b = 20;
    console.log(b); //->函数
})();
console.log(b); //->10 */


/* 经典的闭包应用：大函数执行，产生一个闭包，存储了第一次传递的实参信息「闭包保存的特点」；当小函数执行，需要用到第一次存储的这些值，直接基于作用域链的机制获取使用即可；所以我们可以说，闭包起到了一个“预先存储一些值”的作用，供其下级上下文后期调取使用，我们这种预先处理的思想，称之为“柯理化函数”！！ */
/* const fn = function fn(...params) {
    // params是一个数组，存储的是外层函数传递的实参信息「ES6剩余运算符」
    //   + 鸭子函数: params = [].slice.call(arguments)
    return function proxy(...args) {
        // args是一个数组，数组中存储小函数传递的是实参信息
        //  + params:[1,2]
        //  + args:[3] 
        params = params.concat(args);

        // 数组求和1：命令式编程「关注的是过程，自己管控处理的步骤，自己在每一步中想干啥就干啥，优势：灵活，弊端：复杂冗余」
        /!*  let total = 0,
             i = 0,
             len = params.length;
         for (; i < len; i++) {
             total += params[i];
         }
         return total; *!/

        // 数组求和2：函数式编程「关注的是结果，把具体实现的步骤封装成为一个函数，我们后期只需要执行函数即可，没必要自己去实现这个过程，优势：使用简便，弊端：无法灵活掌控具体的操作步骤」  =>推荐使用函数式编程
        /!*  let total = 0;
         params.forEach(function (item, index) {
             total += item;
         });
         return total; *!/

        // 数组求和3:投机取巧
        // return eval(params.join('+'));

        // 数组求和4:reduce
        return params.reduce(function (total, item) {
            return total + item;
        }, 0);
    };
}; */


// ES6+箭头函数没有arguments「我们使用剩余运算符代替」
/* const fn = (...params) => {
    return (...args) => {
        return params.concat(args).reduce((total, item) => {
            return total + item;
        }, 0);
    };
}; */
const fn = (...params) => (...args) => params.concat(args).reduce((total, item) => total + item, 0);
let res = fn(1, 2)(3);
console.log(res); //=>6  1+2+3


// reduce也是要来迭代数组中的每一项的，只不过，他可以把上一次处理的结果，直接传递给下一次处理，实现每一次处理的累积
// let arr = [10, 20, 30, 40];

/* // 第一次：total数组第一项，我们从第二项开始迭代数组
arr.reduce(function (total, item, index) {
    console.log(total, item, index);
    // 10 20 1
    // 30 30 2
    // 60 40 3  
    // 最后整个reduce返回结果是100
    return total + item;  //return的是啥，就把其当做本次处理结果，传递给下一次迭代的total
}); */

/* // 如果reduce传递了第二个值，那么total初始值就是第二个值，数组从第一项开始迭代...
arr.reduce(function (total, item, index) {
    console.log(total, item, index);
    // 0 10 0  -> 10
    // 10 20 1 -> 30
    // 30 30 2 -> 60
    // ...
    // -> 100
    return total + item;
}, 0); */
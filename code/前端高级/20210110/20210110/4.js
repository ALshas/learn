/*
 * 变量提升「预解析」
 *   在“当前上下文”代码自上而下执行“之前”，浏览器会把所有带“var/function”关键字的进行提前的声明或者定义
 *     + 带var的只是提前声明
 *     + 带function的是提前声明+赋值(定义)
 */

/*
 * EC(G) 
 *  变量提升:
 *    var a;
 *    fn1=0x000; [[scope]]:EC(G)
 *    var fn2;
 */
/* 
console.log(a); //->undefined
fn1();
var a = 10;//全局a=10
function fn1(){ //直接跳过「变量提升阶段已经创建了」
    /!*
     * EC(FN1)
     *   作用域链:<EC(FN1),EC(G)> 
     *   形参赋值:--
     *   变量提升:
     *     var a;
     *!/
    console.log('fn1');//->'fn1'
    console.log(a); //->undefined
    var a=20;//私有a=20
    console.log(a);//->20
}
fn2(); //->Uncaught TypeError: fn2 is not a function
var fn2=function(){//函数表达式
    console.log('fn2');
};
fn2(); 

//=>真实项目中推荐大家使用函数表达式的方式去创建函数「规范函数执行的顺序」
const fn=function(){};
fn();

//=>匿名函数具名化「更规范一些」
var fn = function sum() {
    console.log('OK');
    // sum = 100;
    // console.log(sum); //->具名化的名字可以在函数内部的上下文中使用「代表函数本身」；默认情况下，其值是不能被修改的；

    // console.log(sum); //->undefined 虽然具名化的名字会在当前函数的私有上下文中被声明，当做私有变量处理，但是他的优先级是比较低的，一但出现同名的其他声明方式，则以其他方式为主
    // var sum;
};
fn();
// sum(); //->Uncaught ReferenceError: sum is not defined 匿名函数具名化，设置的函数名不能在函数以外使用「因为并没有在当前上下文中声明这个变量」

"use strict"; //->让JS使用严格模式
// 自执行函数
(function anonymous(x) {
    if (x < 0) return;
    console.log(x);
    // 递归调用
    // arguments.callee 函数本身
    // 开启严格模式则会报错 Uncaught TypeError: arguments.calle is not a function
    // arguments.calle(x - 1);

    anonymous(x - 1);
})(10);
*/

/*
 * EC(G)
 *   变量提升:
 *     fn=0x000 [[scope]]:EC(G)
 *    「老版本浏览器中」
 *       sum=0x001 [[scope]]:EC(G)
 *    「新版本浏览器」
 *       sum;
 */
/* console.log(sum, fn); //->undefined   ƒ fn() {}
function fn() {}
if (1 !== 1) {
    function sum() {}
} */
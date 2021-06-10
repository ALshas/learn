/*
 * let / const
 *   + let 声明的变量
 *   + const 声明的也是变量「只不过不允许重定向变量的指针，不能重新赋值」
 */
// 变量 -> 名字：存储值
// 常量 -> 具体值

/* let x = 10;
x = 20;
console.log(x); //->20 */

/* const y = 10;
y = 20; //->Uncaught TypeError: Assignment to constant variable
console.log(x); */

/* const obj = {
    name: '珠峰培训'
};
obj.name = '周老师';
console.log(obj); //->{name:'周老师'} */

//==================

/*
 * var VS let
 *  1.let不存在变量提升
 *  2.let不允许重复声明(在当前上下文中，不论基于什么方式声明了这个变量，再次基于let/const声明都会报重复声明)
 *  3.全局上下文中，基于var声明的变量不是存放到VO(G)中的，而是直接放在了GO(window)中；基于let声明的变量是存放到VO(G)中的；
 *  4.暂时性死区问题
 *  5.块级作用域
 *
 * JS代码执行
 *   + 词法解析（AST）：我们基于HTTP从服务器拉取回来的JS代码其实是一些字符串，浏览器首先会按照 ECMAScript 规则，把字符串变为C++可以识别和解析的一套树结构对象
 *   + 全局上下文
 *     + 变量提升
 *     + 代码执行
 *   .......
 */
//---------------
// 没有ES6(let)之前，作用域只有两种：全局上下文、函数执行的私有上下文；但是有了let之后，产生了第三种：块级作用域「如果在{}（排除函数和对象的大括号）中出现let/const/function，则当前的{}会成为一个块级私有的上下文」
/*
 * EC(G)
 *   GO -> x:10
 *   VO(G) -> y=20
 *   变量提升: var x;
 */
/*
var x = 10;
let y = 20;
if (1 === 1) {
    /!*
     * EC(BLOCK)
     *   VO(BLOCK) -> y=200
     *   作用域链:<EC(BLOCK),EC(G)>
     *   没有THIS:THIS使用其上级上下文中的THIS「类似：箭头函数」
     *   没有ARGUMENTS
     *   没有形参
     *   变量提升:-- 「var是不受块级上下文影响的」
     *!/
    // console.log(x, y); //Uncaught ReferenceError: Cannot access 'y' before initialization
    var x = 100; //操作的就是全局的x，因为在var的世界中，块级上下文就是浮云
    let y = 200; //是属于EC(BLOCK)私有的
    console.log(x, y); //->100 200
}
console.log(x, y); //->100 20
*/


/*
// 只有一个全局的上下文  i都是全局变量
for (var i = 0; i < 5; i++) {
    // ...
}
console.log(i); //->5
*/

/*
// 全局上下文
for (let i = 0; i < 5; i++) {
    // 私有的块级上下文
    // ...
    i++;
}
console.log(i); //Uncaught ReferenceError: i is not defined
*/

/*
// ES6中的正常循环，想要性能更优
let arr = [10, 20, 30];
let i = 0,
    len = arr.length;
for (; i < len; i++) {

}
*/

// 循环绑定事件

/*
// 这样是实现不了的,最后点击输出的结果都是5
var buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
        //事件绑定是异步编程「此时方法不执行，只有后续手动点击才会执行」
        alert(i);
    };
}
// 循环干的事情：循环五次，分别给五个按钮的点击行为绑定五个方法；循环结束，此时全局的i=5；
// 点击的时候，执行绑定的函数「私有上下文」，在上下文中遇到变量i，但是i不是自己私有的，找全局的，也就是5...
*/

// 解决方案1：闭包的机制
/* var buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) {
    (function (i) {
        // 每一轮循环都创建一个私有的上下文
        //   + 私有上下文中有一个私有的变量 i
        //   + i的值 分别是 0/1/2../4
        buttons[i].onclick = function () {
            // 每一轮循环的私有上下文中，创建的小函数被上下文以外的buttons某一个onclick占用，此时产生闭包
            alert(i);
        };
    })(i);
} */

/* var buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = (function (i) {
        return function () {
            alert(i);
        };
    })(i);
} */

/*
// let方案也是闭包处理，只不过是浏览器自己的处理机制，比我们自己写的闭包性能好一些
let buttons = document.querySelectorAll('button');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
        alert(i);
    };
} */

// 解决方案2：自定义属性
/* let buttons = document.querySelectorAll('button'),
    i = 0,
    len = buttons.length;
for (; i < len; i++) {
    buttons[i].index = i; //设置自定义属性index存储按钮的索引
    buttons[i].onclick = function () {
        // this -> 当前点击的元素
        alert(this.index);
    };
} */

/*
// 解决档案3：事件委托  性能提高 40%~60%
document.body.onclick = function (ev) {
    let target = ev.target;
    if (target.tagName === "BUTTON") {
        // 点击的是BUTTON按钮：基于事先写在结构上的自定义属性获取其索引即可
        alert(target.getAttribute('index'));
    }
};
*/

//---------------
// typeof检测一个未被声明的变量是不会报错的，而是返回'undefined'
// console.log(typeof x); //->'undefined'

/* console.log(typeof x); //->Uncaught ReferenceError: Cannot access 'x' before initialization
let x = 10; */

/* if (typeof Symbol !== "undefined") {
    // 兼容Symbol的
    // ...
} else {

} */

//---------------
/* debugger; //设置断点调试
var x = 10; //=>window.x=10
console.log(x); //->10
// 全局上下文查找一个变量：
//   1.先找VO(G)中是否存在，如果存在就用这个全局变量
//   2.如果VO(G)中没有，则再次尝试去GO(window)中找「因为JS中的某些操作是可以省略window」，如果有就是获取某个属性的值
//   3.如果再没有，则直接报错：xxx is not defined
console.log(window.x); //->10
// y = 10; //本身就是window.y=10 */

/*
debugger;
let x = 10;
console.log(x); //->10
console.log(window.x); //->undefined
*/

//---------------
/*
// 词法解析阶段，发现有在相同上下文中，基于let重复声明变量的操作，则直接报错，所有代码都不会执行 Uncaught SyntaxError: Identifier 'y' has already been declared
 var x = 10;
var x = 20;
console.log(x);
let y = 10;
let y = 20;
console.log(y);
*/

//---------------
/*
console.log(x); //->undefined
var x = 10;

console.log(y); //->Uncaught ReferenceError: Cannot access 'y' before initialization
let y = 20;
*/
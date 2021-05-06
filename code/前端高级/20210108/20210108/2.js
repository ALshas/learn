/*
 * JS代码运行的环境
 *   + 浏览器 -> webkit内核（V8）、Trident、Gecko、Blink...
 *   + Node -> webkit内核
 *   + webview「Hybrid混合APP开发」 -> webkit内核
 *   + ...
 */
/* var a = 12;
var b = a;
b = 13;
console.log(a);
*/

/* var a = {
    n: 12
};
var b = a;
b['n'] = 13;
console.log(a.n); */

/*
 * EC(G)全局执行上下文
 *   VO(全局变量对象)
 *      a -> 0x000
 *      b -> 0x001
 */
// var a = { //->堆内存 0x000
//     n: 12
// };
// var b = a;
// b = { //->堆内存 0x001
//     n: 13
// };
// console.log(a.n); //=>12

// console.log({} === {}); //->false 对象和对象比较，看的是内存地址


// var a = 12,
//     b = 12;
// ---->
// var a = 12;
// var b = 12;

// var a = b = 12;
// // --->
// // 1.创建一个值12
// // 2.b=12 「正常顺序：从右到左处理」
// // 3.var a=12

// JS运行是有优先级的 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
//   + 成员访问  obj.xx  优先级很大
//   + 优先级大的会提前处理
// obj.x = b = 12;
// // 1.创建值12
// // 2.obj.x=12
// // 3.b=12

//========================
// 思考题？
/* var a = {
    n: 1
};
var b = a;
a.x = a = {
    n: 2
};
console.log(a.x);
console.log(b); */
/*
 * 函数柯理化：闭包的进阶应用 
 *   核心：“预先处理/预先存储”「利用闭包的保存作用：凡是形成一个闭包，存储一些信息，供其下级上下文调取使用的，都是柯理化思想」
 */
/* const fn = (...params) => {
    // params->[1,2]
    return (...args) => {
        // args->[3]
        return params.concat(args).reduce((total, item) => {
            return total + item;
        });
    };
};
let total = fn(1, 2)(3);
console.log(total); //=>6 */

//=========
// const curring = () => {
//     let arr = [];
//     const add = (...params) => {
//         arr = arr.concat(params);
//         return add;
//     };
//     add.toString = () => {
//         console.log(arr)
//         return arr.reduce((total, item) => {
//             return total + item;
//         });
//     };
//     return add;
// };
// let add = curring();
// let res = add(1)(2)(3);
// console.log(res); //->6

// add = curring();
// res = add(1, 2, 3)(4);
// console.log(res); //->10

// add = curring();
// res = add(1)(2)(3)(4)(5);
// console.log(res); //->15 

//  const curring = n => {
//     let arr = [],
//         index = 0;
//     const add = (...params) => {
//         index++;
//         arr = arr.concat(params);
//         if (index >= n) {
//             return arr.reduce((total, item) => {
//                 return total + item;
//             });
//         }
//         return add;
//     };
//     return add;
// };
// let add = curring(5);
// res = add(1)(2)(3)(4)(5);
// console.log(res); //->15 



function fn() {
    // ...
    let total = 10;
    return total;
}
// toString/valueOf
fn[Symbol.toPrimitive] = function () {
    return 10;
};
alert(fn); //会把fn变为String然后再输出
console.log(fn); //基于console.log也会把fn转换为String处理，只不过和alert输出的结果看起来不一样而已

function haha() { }
haha.toString = function () {
    return 1000
}
console.log(haha)

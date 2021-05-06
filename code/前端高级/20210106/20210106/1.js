/*
 * JS中的数据类型：
 *    + 原始值类型
 *      + number : NaN「不是一个有效数字」、Infinity「无穷大的值」
 *      + string : 基于 单引号/双引号/反引号「模板字符串」 包起来的都是字符串
 *      + boolean : true/false
 *      + null
 *      + undefined
 *      + symbol : 唯一值
 *      + bigint : 大数
 *    + 对象类型 
 *      + 标准普通对象 object
 *      + 标准特殊对象 Array/RegExp/Date/Error/Math/ArrayBuffer/DataView/Set/Map...
 *      + 非标准特殊对象 Number/String/Boolean/Symbol/BigInt... 基于构造函数「或者Object」创在出来的原始值对象类型的格式信息，类型属于对象类型
 *      + 可调用对象「实现了call方法」 function
 */

// 数据类型检测
//  + typeof 运算符
//  + instanceof 「本意：检测实例是否属于某个类」
//  + constructor「本意：获取构造函数」
//  + Object.prototype.toString.call([value]) 检测数据类型的
//  ------
//  + Array.isArray([value]) 检测值是否为数组
// =======
// typeof [value]
//   + 返回[value]所属类型的字符串，例如：'number'/'string'...
//   + 不能检测null   typeof null->'object'
//   + 除可调用对象「函数」会返回'function'「不论是箭头函数、还是构造函数、还是生成器函数、在以及普通函数等，都返回的'function'」，其余的对象数据值返回都是'object'；
//   + 检测一个未被声明的变量不会报错，返回'undefined'
//   -------
//   GetValue(val)「C++内部提供的方法」，按照值存储的二进制进行检测的
//     + 对象 000 -> 实现call，则返回‘function’，没实现call返回‘object’
//     + null 000000
//     + undefined  -2^30
//     + 数字 -> 整数1  浮点数010
//     + 字符串 100
//     + 布尔 110
//     + ......
//   -------
//   typeof 检测数据类型还是很快的，检测原始值类型『除了null』还是很准确的

/* 
// 字面量:原始值
let n = 10;
// 构造函数:对象值
let m = new Number(10);
let x = Object(10);
// new Symbol() Uncaught TypeError:Symbol is not a constructor
// new BigInt() Uncaught TypeError: BigInt is not a constructor 
*/

/* 
// 最大安全数字：9007199254740991，超过这个数字进行运算就不准确了
// console.log(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
// 问题:服务器中有 longInt 长整型这种值，如果把这样的值返回给客户端，则客户端无法进行有效的处理「一般服务都是以字符串返回，但是字符串进行计算还是需要转换为数字才可以，还是不准确」
BigInt('9007199254740992134') -> 9007199254740992134n
9007199254740992134n + 1n
(9007199254740992133n).toString() -> "9007199254740992133" 
*/

/* 
let n = Symbol('AA');
let m = Symbol('AA');
console.log(n === m); //->false 

// 1.对象的唯一属性
let key = Symbol();
let obj = {
    [key]: 100
};
console.log(obj[key]);
let arr = Object.getOwnPropertySymbols(obj);
arr.forEach(item => {
    console.log(obj[item]);
});

// 2.宏观管理标识：保证标志唯一性（vuex/redux）

// 3.底层原理
//   Symbol.hasInstance
//   Symbol.iterator
//   Symbol.toPrimitive
//   Symbol.toStringTag
//   ......
*/

/* 
if (NaN === NaN) {
    // 不相等的：所以不能基于“是否等于NaN”来检测值是否为有效数字
    // isNaN([value])：不论[value]啥类型，默认隐式转换为数字类型「Number([value])」，再校验是否为有效数字，如果是有效数字，返回false，不是有效数字才返回true
    // Object.is(NaN,NaN)：true 「不兼容IE（Edge除外）」
} 
*/
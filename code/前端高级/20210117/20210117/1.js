/*
 * 模块化编程：按模块划分，模块之间是独立的「也能相互调用」
 *   + 单例设计模式
 *   + AMD require.js 
 *   + CMD sea.js 「CommonJS」
 *   + CommonJS Node.js
 *   + ES6Module
 */
// 对象的另外一个作用：把描述同一个事物的属性和方法，归纳到相同的空间中，也起到了防止全局污染的作用
//   + 每一个对象都是Object类的实例
//   + 单例设计模式「思想」
//   + person1不在称之为对象名，而是叫做“命名空间”
/* 
var person1 = {
    name: '玉媛',
    age: 18
};

var person2 = {
    name: '王琪',
    age: 81
};

var name = "玉媛";
var age = 18;

var name = "王琪";
var age = 81; 
*/


// 基于闭包避免全局变量污染
// 想实现各版块之间方法的相互调用：把需要供别人调用的方法暴露到全局
//   + window.xxx=xxx  暴露比较多的情况下，还是会产生全局污染
//   + 基于闭包+单例设计思想 ->高级单例设计模式 「早期的模块化思想」
let searchModule = (function () {
    let wd = "";

    function query() {
        // ...
    }

    function submit() {
        // ...
    }

    return {
        // submit:submit
        submit,
        query
    };
})();


let weatherModule = (function () {
    let city = "";

    function submit() {
        // ...
    }

    return {
        submit
    };
})();


let skinModule = (function () {
    let wd = "";

    function search() {
        // ...
    }

    searchModule.submit();

    return {};
})();
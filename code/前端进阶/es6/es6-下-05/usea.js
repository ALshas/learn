// const fs = require("fs");
// const path = require("path");  //专门处理路径的魔模块

// //判断文件是否存在
// fs.accessSync('./a.js');   //判断文件是否存在 不存在提出异常

// console.log(__dirname)   //当前目录

// // resolve 出来的一定是一个绝对路径
// // join 就是以/拼接 有/只能用Join

// console.log(path.resolve(__dirname, 'a', 'b', '/'));
// console.log(path.join(__dirname, 'a', 'b', '/'))

// console.log(path.extname('main.js'))   //得到.js
// console.log(path.basename('main.js', '.js'))  //得到main

// console.log(path.dirname(__dirname));  //获取父路径

// // commonjs
// let vm = require('vm');
// // new Function  eval vm提供了一个沙箱环境  沙箱环境就是只: 不影响到其他地方
// let b = 100;
// vm.runInThisContext(`console.log(b)`); //报错
// vm.runInThisContext(`console.log('xxx')`);  //输出xxx 


// 原理获取a.js中的内容
// 文件读写 
const path = require('path');
const fs = require('fs');
const vm = require('vm');
function Module(absPath) {
    this.id = absPath;
    this.exports = {};
}
const wrapper = [ // module 和 exports 是什么关系?
    '(function(exports,module,require){',
    '})'
]
Module.prototype.load = function () {
    let script = fs.readFileSync(this.id, 'utf8');   //获取文件内容
    let fnStr = wrapper[0] + script + wrapper[1];
    let fn = vm.runInThisContext(fnStr);  //拥有自己的沙箱环境 让字符串变成Js代码（变成函数）
    console.log(req)
    fn(this.exports, this, req); // 让拼出的函数执行
}
function req(file) { // ./a
    // 1) 把当前这个文件读取出来  把相对路径转化成绝对路径
    let absPath = path.resolve(__dirname, file);
    // 加载一个模块 模块就是要有一个exports属性
    // 2) 创建一个模块
    let module = new Module(absPath); // 创建了一个模块
    // 3) 加载模块
    module.load();
    return module.exports
}

let a = req('./a.js');
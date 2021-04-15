const path = require("path");
const vm = require('vm');
const fs = require("fs");
function Module(id) {
    this.id = id;
    this.exports = {};  //模块的结果
}
Module.extensions = {
    ".js"(module) {
        let script = fs.readFileSync(module.id, "utf8");
        let fnStr = Module.wrapper[0] + script + Module.wrapper[1];
        let fn = vm.runInThisContext(fnStr); // 让字符串变成js代码
        // 第一个参数是改变this指向  module  module.exports
        fn.call(
            module.exports,
            module,
            module.exports,
            req,
            module.id,
            path.dirname(module.id)
        );
        // exports 已经让用户更改了
    }, // js需要将exports 传入给用户 用户自己赋值
    ".json"(module) {
        // 解析后 node默认会赋值
        let script = fs.readFileSync(module.id, "utf8");
        module.exports = JSON.parse(script);
    }
};
Module.resolveFileName = function (filename) {
    // 1)、把相对路径转化成绝对路径 默认会先判断一下是否是绝对路径
    let absPath = path.resolve(__dirname, filename);
    let flag = fs.existsSync(absPath);  // 判断文件是否存在 异步方法被废弃
    let current = absPath;  //默认是当前路径
    if (!flag) {
        let keys = Object.keys(Module.extensions);
        for (let i = 0; i < keys.length; i++) {
            current = absPath + keys[i];  //当前找到的文件路径
            let flag = fs.existsSync(current);
            if (flag) {
                break;
            } else {
                current = null;
            }
        }
    }
    if (!current) {
        throw new Error('文件不存在');
    }
    return current;  //返回文件的路径
}
Module.prototype.load = function () {
    let ext = path.extname(this.id);
    Module.extensions[ext](this);  //根据不同的后缀，  调用不同的处理方法
}
Module.cache = {}
function req(filename) {
    //   自己实现一个require方法
    let current = Module.resolveFileName(filename);
    if (Module.cache[current]) {
        return Module.cache[current].exports;
    }
    let module = new Module(current);   //产生一个module
    Module.cache[current] = module;
    module.load();
    return module.exports;   //默认导出module.exports对象
}
let json = require('./a');
console.log(json)
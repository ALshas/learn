### 1、CommonJS
    是一种使用广泛的JavaScript模块化规范，核心思想是通过require方法来同步的加载依赖的其他模块，通过module.exports导出需要暴露的接口。

1.1 用法
```js
    // 导入
    const someFun= require('./moduleA');
    someFun();

    // 导出
    module.exports = someFunc;
```

1.2 原理
```js
//a.js
let fs = require('fs');
let path = require('path');
let b = req('./b.js');
function req(mod) {
    let filename = path.join(__dirname, mod);
    let content = fs.readFileSync(filename, 'utf8');
    let fn = new Function('exports', 'require', 'module', '__filename', '__dirname', content + '\n return module.exports;');
    let module = {
        exports: {}
    };

    return fn(module.exports, req, module, __filename, __dirname);
}

```

```js
// b.js
console.log('bbb');
exports.name = 'zfpx';
```

### 2、AMD
AMD也是一种javascript模块化规范，与commonJS最大的不同在于她采用异步的方式去加载依赖的模块，AMD规范主要是为了解决针对浏览器环境的模块化问题，最具代表性的实现是requirejs.

优点：
1. 在不转化代码的前提下直接运行
2. 可以加载多个依赖
3. 可以在浏览器和node环境中运行

AMD 的缺点
JavaScript 运行环境没有原生支持 AMD，需要先导入实现了 AMD 的库后才能正常使用。

2.1 用法
```js
// 定义一个模块
define('a', [], function () {
    return 'a';
});
define('b', ['a'], function (a) {
    return a + 'b';
});
// 导入和使用
require(['b'], function (b) {
    console.log(b);
});
```

2.2 原理
```js
let factories = {};
function define(modName, dependencies, factory) {
    factory.dependencies = dependencies;
    factories[modName] = factory;
}
function require(modNames, callback) {
    let loadedModNames = modNames.map(function (modName) {
        let factory = factories[modName];
        let dependencies = factory.dependencies;
        let exports;
        require(dependencies, function (...dependencyMods) {
            exports = factory.apply(null, dependencyMods);
        });
        return exports;
    })
    callback.apply(null, loadedModNames);
}

```

### 3、ES6模块化 
ES6 模块化是ECMA提出的JavaScript模块化规范，它在语言的层面上实现了模块化。浏览器厂商和Node.js 都宣布要原生支持该规范。它将逐渐取代CommonJS和AMD`规范，成为浏览器和服务器通用的模块解决方案。 采用 ES6 模块化导入及导出时的代码如下
```js
// 导入
import { name } from './person.js';
// 导出
export const name = 'zfpx';
```
缺点：ES6模块虽然是终极模块化方案，但它的缺点在于目前无法直接运行在大部分 JavaScript 运行环境下，必须通过工具转换成标准的 ES5 后才能正常运行。


### 4、自动化构建
构建就是做这件事情，把源代码转换成发布到线上的可执行 JavaScrip、CSS、HTML 代码，包括如下内容。

代码转换：ECMASCRIPT6 编译成 ECMASCRIPT5、LESS 编译成 CSS 等。
文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。
代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。
自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。
代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。
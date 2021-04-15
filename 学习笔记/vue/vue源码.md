### 1 使用Rollup搭建开发环境

#####  1.什么是Rollup?

*Rollup* 是一个 JavaScript 模块打包器,可以将小块代码编译成大块复杂的代码， rollup.js更专注于Javascript类库打包 （开发应用时使用Wwebpack，开发库时使用Rollup）

##### 2.环境搭建

###### **安装rollup环境**

```javascript
npm install @babel/preset-env @babel/core rollup rollup-plugin-babel rollup-plugin-serve cross-env -D
```

npm install rollup 打包用的

rollup-plugin-babel 用rollup与babel做关联

babel的使用需要安装babel块

 @babel/core   babel块

prsset-env    babel插件

rollup-plugin-serve  启动本地服务

###### **rollup.config.js文件编写**

```javascript
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
export default {
    input: './src/index.js',
    output: {
        format: 'umd', // 模块化类型
        file: 'dist/umd/vue.js', 
        name: 'Vue', // 打包后的全局变量的名字
        sourcemap: true
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        process.env.ENV === 'development'?serve({
            open: true,
            openPage: '/public/index.html',
            port: 3000,
            contentBase: ''
        }):null
    ]
}
```

###### **配置.babelrc文件**

```json
{
    "presets": [
        "@babel/preset-env"
    ]
}
```

###### **执行脚本配置**

```json
"scripts": {
    "build:dev": "rollup -c",
    "serve": "cross-env ENV=development rollup -c -w"
}
// -c 是使用这个脚本的意思
// -w 每次更新 重新打包  观测变化
```

vue源码第一步：

  new Vue的时候 ，初始化，初始化核心逻辑：初始化状态 属性 数据..... 先考虑数据

数据可能是对象、数组，然后拿到数据挂载到vm._data上，为了方便用户获取值 做了一层代理 便于用户去vm上取值 其实是取vm._data上取值

并且对数据进行观测的原则是 必须是对象 没有被观测的才观测 给每个数据一个观测的实例 叫____ob__

如果是数组的话 对数组中的每一个方法进行重写  不是数组 是对象的话 直接拿key value 用defineReactive方法进行代理

如果值还是还是对象 再去代理  如果改的值也是对象 也要进行代理 如果掉的是数组的方法 就会走到arrayMethods方法中  ，在这里对数组的方法进行重写。

如果新增的数据也是对象类型 通过当前值上的ob属性拿到observeArray再进行代理

---------------------------------------------------------------------------------------------------------------------------------

#### rollup

- Rollup 是一个 JavaScript 模块打包器,可以将小块代码编译成大块复杂的代码， rollup.js更专注于Javascript类库打包 （开发应用时使用Wwebpack，开发库时使用Rollup）
- npm install @babel/preset-env @babel/core rollup rollup-plugin-babel rollup-plugin-serve -D
- @babel/core: babel 核心库
- rollup-plugin-babel： rollup 与 babel 连接桥梁
- @babel/preset-env： es6 -> es5
- rollup-plugin-serve：启动webpack服务

##### rollup 环境配置

- packagejs

```
    "scripts": {
        "dev": "rollup -c -w"
    },
    -c : 读取rollup.config.js
    -w : 观察要打包文件的变动，并且在有变动时重新打包
```

#### vue

- vue 2.0 一个带配置信息参数的构造函数

##### 一、初始化参数

- 将配置信息挂载到vm.$options
- 初始化状态，通过Object.defineProperty 将 vm.$options.data 的 数据挂载到 vm 并进行检测

##### 二、检测数据（数据劫持，重写get、set方法，因此会影响性能）

- 基本类型不进行检测
- 非数组类型的对象检测： Object.defineProperty 重写get set方法，如果对象的key对应的数据也是对象也需要进行检测知道为基本类型
- 数组类型：检测能改变数组长度的方法，push、pop、unshift、shift、splice、reserve、sort

##### 三、获取需要渲染的模板

- 判断是有el 属性没有怎么结束
- options.render 存在，则进行组件挂载 不存在则找 options.template， options.template 不存在则找 document.querySelector(el)

##### 四、将template 转为 render

- 将 html 转成ast树 { tagName: div, attrs: [{name: value, id: 'app'}], type: 1, //1：节点， 3： 文本 parent: null, child: [{ }] }
- 将ast 树转成 可运行 js 脚本(及render) （通过with和new Function） _c('div',{id:'app',a:1,b:'2'}, _v("hello"), _c('div', {style:{color: 'red}}, _c('span',undefined, _v('!' + _s(name) + '!') ) ) )

##### 五、组件挂载

- 默认vue是通过watcher来进行渲染 = 渲染watcher （每一个组件都有一个渲染watcher）
- watcher会执行 一个updateComponet 函数，对模板进行渲染

##### 六、将render 转成虚拟节点

- 执行render 创建虚拟节点
- _c 创建标签节点
- _v 创建文本节点
- _s 将对象转成json 字符串

##### 七、用虚拟节点生成真是dom元素（vm._update）
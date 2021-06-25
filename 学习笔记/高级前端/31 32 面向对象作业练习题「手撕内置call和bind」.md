### bind&call/apply的区别

```js
//都是为了改变函数中this指向
//call/apply立刻执行函数
//Bind: 不是立即把函数执行,只是预先把THIS和后期需要传递的参数存储起来[预处理思想->柯里化函数]
function func(){
  console.log(this, arguments);
}
var obj ={
    name: 'Alibaba'
}
document.body.onclick = func.bind(obj, 100, 200)
//bind的原理，其实就是利用闭包的机制，把要执行的函数外面包括一层函数
document.body.onclick = function proxy(ev){
    //最后的目的: 把func执行, this改为obj, 参数100/200/ev传递给她即可
    func.call(obj, 100, 200, ev)
}
```

### 原理

```js
~ function () {
    const createRandom = () => {
        let ran = Math.random() * new Date();
        return ran.toString(16).replace('.', '');
    };

    /* 内置CALL实现原理 */
    function change(context, ...params) {
        // this->要执行的函数func   context->要改变的函数中的this指向obj  
        // params->未来要传递给函数func的实参信息{数组} [100,200]
        // 临时设置的属性，不能和原始对象冲突，所以我们属性采用唯一值处理
        context == null ? context = window : null;
        if (!/^(object|function)$/.test(typeof context)) context = Object(context);
        let self = this,
            key = Symbol('KEY'),
            result;
        context[key] = self;
        console.log(context[key])
        result = context[key](...params);
        delete context[key];
        return result;
    };

    /* 内置BIND的实现原理 */
    function bind(context, ...params) {
        // this->func  context->obj  params->[100,200]
        let self = this;
        return function proxy(...args) {
            // args->事件触发传递的信息，例如：[ev]
            params = params.concat(args);
            return self.call(context, ...params);
        };
    };

    Function.prototype.bind = bind;
    Function.prototype.change = change;
}();

//调用
let obj = {
    name: 'Alibaba',
    xxx: 100,
    [Symbol('KEY')]: 200
};
// function obj() {
//     console.log('xixiix')
// }
// let obj = 'aaa'
function func(x, y) {
    this.total = x + y;
    return this;
}
let res = func.change(obj, 100, 200);
console.log(res);
//res => {name:'Alibaba',total:300}
```


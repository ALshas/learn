### 关于THIS的几种情况

```js
1 给当前元素的某个事件行为绑定方法，方法种的this是当前元素本身[排除：DOM2在IE6-8种基于attachEvent进行事件绑定,这样的处理方法种this=>window]
2 方法执行，看方法前面是否有'点'，有‘点’，‘点’前面是谁this就是谁，没有点，this就是window【严格模式下是undefined】
  自执行函数中的this一般是window/undefined
  回调函数中的this一般是window/undefined【某些方法中会做一些特殊的处理】
  括号表达式有特殊性
3 构造函数执行，构造函数体中的this是当前类的实例
4 箭头函数中没有this[类似的还有块级上下文]，所以无论怎样去执行，怎样去修改，都没有用，如果函数中出现this,一定是其所在的上级上下文中的this
5 在Function.prototype提供了三个方法，call/apply/bind,这三个方法都是用来强制改变函数中的this指向【每一个函数都是Function的实例】，所以都可以调取这三个方法执行

use strict;
let obj = {
    name: 'shasha',
    fn(){
        let self = this;
        setTimeout(function(){
            console.log(self)
        }, 100)
    }
    setTimeout(()=>{
        console.log(this);
        this是上级上下文中的，也就是obj
    }, 1000)
}
obj.fn()
```

### call/bind/apply三者的区别

```js
"use strict"
window.name = 'window';
const fn = function fn(x, y){
    console.log(this, x+y)
}
let obj = {
    name: 'obj'
}
//fn();  //this指向undefined Uncaught TypeError: Cannot read property 'name' of undefined
//obj.fn(); //Uncaught TypeError: obj.fn is not a function  obj中不存在fn属性,之间没有关联

//需求：把fn函数执行，并且让方法中的this是Obj, 再并且传递10/20分别给x和y形参
//方法1 obj.fn()
//另外方法
//fn首先作为Function的实例，基于_proto_找到Function.prototype.call方法，并且把找到的call方法执行
  //call中的一些情况
    //this指向fn
    //第一个参数context指向obj 未来要改变函数中的this指向
    //剩余的参数params->[10, 20] 储存的是未来要给函数传递的实参
  //call方法执行的作用：帮助我们把fn[this]执行，并且让方法中的this指向Obj[context],顺便把10/20[params]传递给函数
fn.call(obj,10, 20)
fn.call(); //fn中的this指向window/undefind x=undefined y=undefined
fn.call(null/undefined); //this指向window & null/undefined x=undefined y=undefined
fn.call(10, 20);//this指向10 x=20 y=undefined

// apply和call只有一个区别：call方法在设定给函数传递的实参信息的时候，是要求一个个传递实参值；但是apply是要求用户把所有需要传递的实参信息以数组/类数组进行管理的； 虽然要求这样写，但是内部最后处理的时候，和call一样，也是一项项的传递给函数的；
fn.apply(obj, [10, 20]); 

```

### 场景一：求一个数组中的最大值或者最小值

```js
let arr = [10, 14, 23, 34, 20, 13]

1 排序处理 时间复杂度稍微高一些 [sort 内部N^2]
console.log(arr.sort((a, b)=> b-a)[0])

2 假设法
let max = arr[0], i = 1, len = arr.length, item;
for (; i < len; i++) {
    item = arr[i];
    if (item > max) {
        max = item;
    }
}
console.log(max); 

3 Math.max获取最大值 推荐
console.log(Math.max(10, 14, 23, 34, 20,13)) // 34
console.log(Math.max(arr)) //NaN 方法本身是获取一堆数字中的最大值，需要把比较的数字一项项的传递给max方法才可以
let max = Math.max(...arr)
console.log(max) //34
let max = Math.max.apply(null, arr); // 利用apply的机制[虽然传递给apply的是一个数组，但是apply内部会把数组中的每一项分别传递给对应的函数],而且math.max中用不到this, 所以this改成谁无所谓，就是占个位而已；
console.log(max) // =>34
```

场景二：任意求和【不确定实参的个数，所以无法基于设定形参接受】

```js
//剩余运算符 ES6
//arguments ES3
const sum = function sum(...params){
  if(params.length === 0) return 0;
  return params.reduce((total, item)=>total+item, 0)
}

const sum = function sum(){
    let params = arguments;  //params是类数组不能直接使用数组的办法
    if(params.length === 0) return 0;
    //把类数组转换为数组
    params = Array.from(params); ES6+
    params = [...params];  ES6+
    let i = 0,
        len = params.length,
        arr = [];
    for(;i<len;i++){
        arr[arr.length] = params[i]; // <==> arr.push(params[i])
    }
    return arr.reduce((total, item)=>total+item, 0)
}
```

### 重写slice

```js
Array.prototype.slice = function slice() {
  //模拟的方法
  //this -> ary
    let i = 0,
        len = this.length,
        arr = []
    for(;i<len;i++){
        arr[arr.length] = this[i]
    }
    return arr;
}
ary.slice()
ary.slice(0)
//数组的克隆，把原始数组中的每一项都克隆一份给返回的新数组【浅克隆】
```

### 鸭子类型

```js
//方法1
const sum = function sum(){
   let params = arguments;
   if(params.length === 0) return 0;
    //把类数组转换为数组：如果我们能把slice执行，并且让slice中的this是arguments,这样就相当于在迭代arguments中的每一项，把每一项赋值给新得数组集合->也就是把类数组转换为数组
    // 如何让slice执行 Array.prototype.slice() / [].slice().......
    //如何改变slice中的this -> call/apply......
    params = [].slice.call(params);
    //原理：因为类数组的结果和数组非常的相似，所以大部分操作数组的代码，也同样适用于类数组，在这个前提下，我们只需要把实现好的数组方法执行，让方法中的this变为类数组，就相当于类数组在操作这个代码，实现了类数组借用数组方法的目的，就叫做‘鸭子类型’
    return params.reduce((total, item)=>total+item, 0)
}

//方法2
const sum = function sum(){
    let params = arguments;
    if(params.length === 0) return 0;
    //不转换，直接借用即可
    return [].reduce.call(params, (total, item)=> total+item, 0)
}

//方法3
const sum = function sum() {
    let params = arguments;
    // params.__proto__ = Array.prototype; //修改原型链的指向  arguments可以直接使用数组原型上的任何方法
    params.reduce = Array.prototype.reduce;
    if (params.length === 0) return 0;
    return params.reduce((total, item) => total + item, 0);
};

console.log(sum()); // ->0
console.log(sum(10)); //->10
console.log(sum(10, 20)); //->30
console.log(sum(10, 20, 30)); //->60
```


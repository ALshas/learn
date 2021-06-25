### 关于js中this的基本情况分析

##### 题1

```js
console.log(a);  //undefined
var a = 12;
function fn(){
   console.log(a);  // imdefined
   var a = 13;
}
fn();
console.log(a) //12
```

分析:

```javascript
/*
 * EC(G)
 *   变量提升:
 *      var a;
 *      fn=0x000; [[scope]]:EC(G)
 */
console.log(a); //->undefined
var a = 12;
function fn() {
    /*
     * EC(FN)
     *    作用域链:<EC(FN),EC(G)>
     *    形参赋值:-- 
     *    变量提升:var a;
     */
    console.log(a); //->undefined
    var a = 13;
}
fn();
console.log(a); //->12
```



##### 题2

```js
console.log(a)   //undefined
var a = 12;
function fn() {
    console.log(a)   // 12
    a = 13;
}
fn()
console.log(a)  // 13
```

分析:

```js
/*
 * EC(G)
 *   变量提升:
 *      var a;
 *      fn=0x000; [[scope]]:EC(G)
 */
console.log(a); //->undefined
var a = 12;
function fn() {
    /*
     * EC(FN)
     *    作用域链:<EC(FN),EC(G)>
     *    形参赋值:-- 
     *    变量提升:--
     */
    console.log(a); //->不是自己的私有变量,是EC(G)中的全局变量 12
    a = 13;
}
fn();
console.log(a); //->13
```

##### 题3

```javascript
console.log(a)   //->ReferenceError:a is not defined
a = 12;
function fn() {
    console.log(a)   // 12
    a = 13
}
fn()
console.log(a)  //13
```

分析

```javascript
/*
 * EC(G)
 *   变量提升:
 *      fn=0x000; [[scope]]:EC(G)
 */
console.log(a); //->ReferenceError:a is not defined
a = 12;
function fn() {
    console.log(a);
    a = 13;
}
fn();
console.log(a);
```

### this的基本情况分析

##### this 函数执行的主体（谁执行的函数）

​     事件绑定
​     函数执行【普通函数执行、成员访问、匿名函数、回调函数......】
​     构造函数
​     箭头函数【生成器函数generator】
​     基于call/apply/bind强制修改this指向
全局上下文中的this.window
块级上下文中没有自己的this, 所用的this都是继承上级上下文中的this [箭头函数也是]

##### 事件绑定

```javascript
   DOM: xxx.onxxx  = function(){}
   DOM2: 
       xxx.addEventListener('xxx', function(){})
       xxx.attachEvent('onxxx', function(){})
```

给当前元素的某个事件行为绑定方法【此时是创建方法，方法没执行】，当事件行为触发，浏览器会把绑定的函数执行，此时函数中的this=>当前元素对象本身
特殊：基于attachEvent实现事件绑定，方法执行，方法中的this是window

```js
document.body.addEventListener('click', function(){
    console.log(this);  // body
})
```

##### 函数执行

正常的普通函数执行：看函数执行之前是否有‘点’，有，‘点’前面是谁this就是谁， 没有‘点’，this是window【严格模式下是undefined】
匿名函数：
       函数表达式：等同于普通函数或者事件绑定等机制
       自执行函数：this一般都是window/undefined

```js
(function (x){
  console.log(this); //this->windows/undefined
})(10)
```

​       回调函数：一般都是window/undefined, 但是如果另外函数执行中，对回调函数的执行做了特殊处理，以自己处理的为主  

```js
//把一个函数A作为实参，传递给另外一个执行的函数B【在B函数执行中，可以把A执行】
 function fn(callback){
     callback()
 }
fn(function(){
    console.log(this)  // this->windows/undefined
})
```

括号表达式：
       小括号中包含“多项”，这样也只取最后一项，但是this收到影响（一般是window/undefined）

```js
"use strict";  // 开启JS严格模式（默认是非严格模式）
function fn(){
   console.log(this)
}
let obj = {
    name: 'zhufeng',
    fn
}
fn();  //this->windows/undefined
obj.fn()  //this->obj
(10, obj.fn)() //this->windows/undefined
```

##### 题1：

```js
var x = 3,
    obj = {
      x: 5
    }
 obj.fn = (function(){
    this.x *= ++x;
    return function(y){
      this.x *= (++x) + y;
      console.log(x)
    }
 })();
var fn = obj.fn;
obj.fn(6)
fn(4)
console.log(obj.x, x)
```

分析：
![](../..\图片\js高级\this指向.png)


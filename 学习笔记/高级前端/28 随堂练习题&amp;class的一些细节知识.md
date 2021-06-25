```js
function C1(name) {
    if (name) {
        this.name = name;
    }
}
function C2(name) {
    this.name = name;
}

function C3(name) {
    this.name = name || 'join';
}
C1.prototype.name = 'Tom';
C2.prototype.name = 'Tom';
C3.prototype.name = 'Tom';
alert((new C1().name) + (new C2().name) + (new C3().name));
// "Tomundefinedjoin" //new C1()、C2()、c3()的时候没传值，name是undefined
```

题1：

```js
function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
}
Foo.getName = function () {
    console.log(2);
};
Foo.prototype.getName = function () {
    console.log(3);
};
var getName = function () {
    console.log(4);
};
function getName() {
    console.log(5);
}
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
```

![](..\..\图片\js高级\原型05.png)

### 各种函数的一些区别

```js
函数/构造函数
function Fn(name){
  this.x = 100;
  this.name = name;
}
原型【类/实例】
Fn.prototype.y = 200;
Fn.prototype.getX = function(){}
Fn.prototype.getName = function(){}
对象【和前面没有直接关系】
Fn.x = 100;
Fn.getx = function(){}

Fn.getX();
new Fn().getX();
Fn()

--------------------------------------------------------------------------------------
function Sum(){
    if(!(this instanceof Sum)) throw new TypeError('constructor Sum cannot be invoked without new')
    console.log('OK')
}
Sum(); //报错  这里this是windows
new Sum(); //输出OK
```

### classE66的用法

```js
class Fn{
  constructor(name){
     //this  指向创造的实例对象 【this.xxx = xxx设置的私有属性】
      this.x = 100;
      this.name = name;
  }
    x = 100; //等价于构造函数体中的this.x = 100;
    //原型上的内容 【无法直接设置原型上属性值不是函数的公有属性】
       //这样设置的函数是没有prototype的，类似于是：Obj={fu(){}}
    getX(){}
    getName(){}

    //看作普通对象，设置私有属性【静态私有属性和方法】
     static x = 1000; 
     static getX(){}
}
Fn.prototype.y = 200;
let f = new Fn('shasha');

class Fn(){
    //私有的
    x = 100;
    getX1 = ()=>{
        //如果使用的是箭头函数，则箭头函数没有自己的this,所用的是上下文中的this,而此处上下文中的this都是Fn的实例
        //f.getX1()  this指向实例
        //f.getX1.call(10) this指向实例
    }
    //原型
    getX2(){
        //this一般都是当前类的实例 f.getX2()
        //也可能是Fn.prototype    Fn.prototype.getX2()
        //也可能是其余的情况[例如：基于call/apply]等改变函数中的this
        console.log(this)
    }
}
let f = new Fn;
f.getX2();
Fn.prototype.getX2();
f.getX2.call(10);
```


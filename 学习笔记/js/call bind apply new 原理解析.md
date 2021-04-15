#### call

```javascript
function fn1(){
  console.log(1)
}
function fn2(){
  console.log(2)
}
fn1.call()         //fn1()的this指向window
fn1.call('傻傻')    //fn1()的this指向傻傻
fn1.call(fn2); //让fn1的this指向fn2，并且让fn1执行。
               //让fn1的this变成fn2的this
```

原理：xxx.fn1()可以知道fn1()指向xxx,由此，如fn1.call(fn2)时，可以使fn2().fn1()可以推出fn1()指向fn2()

```javascript
Function.prototype.call = function (context) {
  //context为fn2
  context = context? Object(context):window;
  //this是fn1, context.fn为fn1
  context.fn = this;
  let args = []
  for(let i = 1;i<arguments.length;i++){
      args.push('arguments[' + i + ']');
  }    
  //利用数组的toString的特性
  let r = eval('context.fn(' + args + ')')
  delete context.fn;
  return r
}
function fn1(){
    console.log(this ,1, arguments)
  }
function fn2(){
    console.log('222', this, 2)
}
fn1.call.call.call.call(fn2); // 这样会执行fn2 且fn2的this指向window
// 如果 是多个call会让call方法执行，并且把call中的this改编成fn2
```

#### apply

```javascript
Function.prototype.apply = function (context, args) {
  //context为fn2
  context = context? Object(context):window;
  //this是fn1, context.fn为fn1
  context.fn = this;
  if(!args){
      return context.fn();
  }
  //利用数组的toString的特性
  let r = eval('context.fn(' + args + ')')
  delete context.fn;
  return r
}
function fn1(){
    console.log(this ,1, arguments)
  }
function fn2(){
    console.log('222', this, 2)
}
// fn1.call.call.call.call(fn2);
fn1.apply('haha',[1,2,3,4])
// 如果 是多个call会让call方法执行，并且把call中的this改编成fn2
```

#### bind

1） bind方法可以绑定this指向

2)   bind方法返回一个绑定后的函数（高阶函数）

3)   如果绑定的函数被new了 当前函数的this就是当前的实例

```javascript
let obj = {
    name: 'haha'
}
function fn(cut, age) {
    console.log(this)
}
// bind方法可以绑定this指向
// bind方法返回一个绑定后的函数（高阶函数）
Function.prototype.bind = function (context) {
    let that = this
    let bindArgs = Array.prototype.slice.call(arguments, 1); //['猫'] 参数 ，除了第一项其他的都拿到
    function  Fn() {}
    function  fBound() { //this
        let args = Array.prototype.slice.call(arguments)
        return that.apply(this instanceof fBound?this:context, bindArgs.concat(args)) //判断是不是new出来的
    }
    Fn.prototype = this.prototype;
    fBound.prototype = new Fn()
    return fBound
  }
fn.prototype.flag = '哈哈哈哈哈哈哈哈'
 let bindFn = fn.bind(obj, '猫')
 let instance = new bindFn(9)
console.log(instance.flag)
```

#### new

```javascript
function Animal(type) {
    this.type = type
    // 如果当前构造函数返回的是一个 引用类型 需要把这个对象返回
    return {name: 'jw'}
}
Animal.prototype.say = function(){
    console.log('say')
}
function mockNew(){
    let Constructor = [].shift.call(arguments)
    let obj = {}   //返回的结果
    obj.__proto__ = Constructor.prototype;  //原型上的方法
    console.log('obj', obj.__proto__)
    let r = Constructor.apply(obj, arguments)
    // return {name: 'jw'} 因为有这个返回才做这个判断
    return r instanceof Object?r:obj
} 
let animal = mockNew(Animal, '鱼鱼')
console.log(animal)
```


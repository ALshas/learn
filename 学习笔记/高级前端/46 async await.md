### 1 异步编程
- 回调函数实现
- 事件监听
- 发布订阅
- Promise/A+ 和生成器函数
- async/await

### 2 回调
回调就是把任务的第二段单独写在一个函数内，等到执行这个任务的时候，直接调用这个函数

2.1 回调的问题
代码异常的时候try catch是不生效的
```js
let async = function(callback){
  try{
    setTimeout(function(){
      callback();
    },1000)
  }catch(e){
    console.log('捕获错误',e);
  }
}

async(function(){
  console.log(t);
});
//输出 ReferenceError: t is not defined； 如果try catch生效 则执行的是捕获异常 
```
因为这个回调函数被存起来了，直到下一次事件环的时候才会取出，try只能捕获当前循环内的异常，对callback异步没有办法

所以异步方法也要遵循两个原则
- 必须在异步之后调用传入的回调函数
- 如果出错了要向回调函数传入异常供调用者判断

### 3 异步流程解决方案
- 事件发布/订阅模式
- 哨兵变量
- promise/deferred模式
- 生成器Generators/ yield
- Co
- Async/ await
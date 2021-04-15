#### 1、高阶函数

特点： 1、如果有一个函数的参数中有函数，那么当前这个函数就是高阶函数（回调）

​             2、如果一个函数返回了一个函数，那么就是高阶函数



#### 2、before方法

```javascript
// 核心代码
function say(a,b,c,d) { 
    console.log('我是核心代码~', a,b,c,d)
 }
 
//  扩展方法
// 当前实例都可以调用所属类原型上的方法
Function.prototype.before = function (callback) {
    // this = say
    return (...args)=>{   //箭头函数的特点，没有this, 没有arguments 没有prototype 不能New
        callback()  
        this(...args)
    }
}

let newSay = say.before(()=>{
    console.log('我是次要信息')
})
newSay(1,2,3,4, 6)
```


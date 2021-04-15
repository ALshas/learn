#### 柯里化的作用

判断一个元素的类型 数组 对象...

#### 判断类型应该使用哪些方法判断

1 typeof 不能区分对象类型 typeof{} typeof []

2 constructor 可以判断这个实例是通过谁来构造出来的

```javascript
console.log({}.constructor)
```

3 instanceof 区分实例 __proto__

```javascript
// console.log([].__proto__ === Object.prototype)  //false
// console.log([].__proto__.__proto__ === Object.prototype)  //true
```

4 Object.prototype.toString.call([]) 区分具体类型（但是不能区分实例）

```javascript
const isType = (typing)=>(value)=>{
   return Object.prototype.toString.call(value) == `[object ${typing}]`
}
let util = {};
['String', 'Number', 'Null', 'Undefined'].forEach((typing)=>{
    util['is' + typing] = isType(typing)
})
console.log(util.isString(123))
```

5 Symbol.hasInstance

```javascript
let arr = []
console.log(Array[Symbol.hasInstance](arr));  //true
```

#### 通用柯里化函数

```javascript
function sum(a, b,c, d) {
    console.log(a, b,c, d)
}
const currying = (fn,arr = [])=>{  // 记录调用时参数的个数 和 函数个数的关系
   let len = fn.length;   // 函数的参数个数 
   return (...args)=>{   
       let concatArgs = [...arr, ...args];
       // 获取长度 和值的关系
       if(concatArgs.length < len){
           return currying(fn, concatArgs)
       }else{
           console.log(123, ...arr)
           return fn(...concatArgs) 
       }
   }
}
let newSum = currying(sum)
newSum(1,2)(3)(5)
```

#### 判断方法是否是原生

判断一个方法是不是原生的：

方法.toString 

如果返回native code 就代表是原生的 
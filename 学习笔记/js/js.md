#### 数据类型

基本数据类型：string number boolean null undefined Symbol BigInt

引用数据类型：Object和Function

#### 判断数据的类型

1）typeof object Array  只能判断基本数据类型 函数返回函数 引用类型返回object 

2）Object.prototype.toString.call() 判断类型不够准确 不能判断属于哪个实例

3）instanceof  可以判断类型  可以判断是谁的实例

```javascript
[].__proto__ === Array.prototype; //true
[].__protp__.__proto__ === Object.prototype;  //true
```

4）constructor  构造函数

```javascript
//使用
([]).constructor
//输出 f Array() {[native code]}
```

5）Symbol.hasInstance

```javascript
let arr = []
console.log(Array[Symbol.hasInstance](arr));  //true
```

#### 判断方法是否是原生

判断一个方法是不是原生的：

方法.toString 

如果返回native code 就代表是原生的 
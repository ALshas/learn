### 1 、js中的数据类型转化规则

##### 把其他类型【原始值】转化为对象：Object[value]

##### 把其他类型转化为数字

######      Number([value])

1. ###### 一般用于隐式转换[数字运算、isNaN、==比较......]

2. ###### 2 字符串->数字  空字符串变为0 字符串中只要出现有效数字字符结果就是NaN

3. ###### 布尔->数字  true 变为1  false变为0

4. ###### null->0

5. ###### undefined->NaN

6. ###### Symbol->报错

7. ###### BigInt->正常转换

8. ###### 对象遵循Symbol.toPrimitive/valueOf/toString/Number

######     parsetInt/parseFloat([value])

1. ###### 首先会把[value]变为字符串，从字符串左侧第一个字符开始查找， 直到找到 一个非有效数字字符为止，把找到的结果转为数字，一个都没找到，结果就是NaN[parseFloat多识别一个小数点]

##### 把其他类型转换为字符串

######     规则：原始值转换是直接用引号包起来[bigint会去除n]; 除对象转换为字符串是比较特殊的  

1. ######  toString [排除Object.prototype.toString{检测数据类型}]

2. ###### 字符串/模板字符串拼接['+'在Js中除了数学运算还有字符串拼接{但是其他运算符一般都是数学运算}]

##### 把其他类型转换为布尔

###### 规则： 只有'0', NaN null undefined 空字符串会变为false 其余都是转换为true

1. ######  Boolean([value])

2. ###### !![value]

3. ###### ![value]转换为布尔类型取反

4. ###### 条件判断 例如：if(1){}

5. ###### A|| B  A&&B

```javascript
console.log(1+1)  //2
console.log(1+ '1')  // '11'
console.log(1 - 1);   //=>0
//'+'左右两边 有一边出现了 字符串或者部分对象 则都是按照字符串拼接处理的
```

```javascript
//CASE3: 不是所有对象都是字符串拼接
 //规则：
     //先去调用对象的Symbol.toPrimitive对象 如果没有这个属性
     //再去调取对象的valueOf获取原始值，如果不是原始值
     //再去调用对象的 toString 转化为字符串【如果是想转换为数字 则还会调用Number处理】
console.log(10 + [10, 20]) // 1010,20
console.log(10 + new Number(10)); //20  new Number(10).valueOf()有原始值
console.log(+new Date())   // =当前时间搓

//case2: ‘+’有一边出现对象
let n = 10;
{} + n -> 10  //把左侧的{}当作代码块 不参与运算 运算的只有+n
n+{}-> '10[object Object]'  // 字符串拼接

//case1: ‘+’只有一边
let n = '10';
console.log(+n); // 10->转换为数字
console.log(++n); // 11=>转换为数字然后累加1
console.log(n++); //11=>转换为数字然后累加1
//i++ 和 i=i+1 以及 i+=1  三个是否一样？
   //i=i+1 和i+=1是一样的
   //i++一定返回的是数字 但是i+=1就不一定了 有可能是字符串拼接
   // let i = 10;
   // console.log(5 + (++i));  //先i累加1  累加后的结果运算 16  i =>11
   // console.log(5 + (i++));   //先运算 再累加 1   15 i=>11
```

```javascript
let obj = {
x: 10, // obj[Symbol.toPrimitive] && valueof && toString
[Symbol.toPrimitive](hint){
   console.log(hint);  // =>“default” 'string' 'number'
   return this.x;
   }
}
```
























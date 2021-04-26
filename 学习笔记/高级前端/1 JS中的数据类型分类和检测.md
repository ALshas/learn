### 1 、Js中的数据类型
   ##### 原始值类型

1. ###### number: NaN [不是一个有效数字]、 Infinity [无穷大的值]

   ```javascript
   if(NaN === NaN){
      //不相等的：所以不能基于“是否等于NaN”来检测值是否为有效数字
      //isNaN([value]): 不管[value]是啥类型 默认隐式转换为数字类型[number[value]], 再校验是否为有效数字，如果是有效数字，返回false，不是有效数字才返回true
      //Object.is(NaN,NaN): true 不兼容ie  （edeg除外）
   }
   ```

   

2. ###### string:  基于单引号/双引号/反引号【模板字符串 】 包起来的都是字符串

3. ###### boolean: true/false

4. ###### null: 

5. ###### undefined

6. ###### symbol: 唯一值

   ```javascript
   1. 对象的唯一属性
   let key = Symbol();
   let obj = {
      [key]: 100
   }
   console.log(obj[key])
   let arr = Object.getOwnPropertySymbols(obj)
   arr.forEach(item=>{
       console.log(obj[item])
   })
   2. 宏观管理标识：保证标志唯一性（vuex/redux）
   
   3. 底层原理
       Symbol.hasInstance
       Symbol.iterator
       Symbol.toPrimitive
       Symbol.toStringTag
       ......
   ```

7. ###### bigInt: 大数

   ```
   //最大的安全数字：9007199254740991， 超过就运算不准确
   console.log(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
   服务器中有longInt这种长整型值，如果把职责与的值返回给客户端，则客户端无法进行有效的处理[一般服务都是以字符串返回，但是字符串进行计还是需要转换为数字才可以，还是不准确
   BigInt('9007199254740992134') -> 9007199254740992134n
   9007199254740992134n + 1n
   (9007199254740992133n).toString() -> "9007199254740992133"]
   ```

   

##### 对象类型

1. ###### 标准普通对象 object

2. ###### 标准特殊对象 Array/regexp/Date/Error/Math/ArrayBuffer/DateView/Set/Map...

3. ###### 非标准特殊对象 Number/String/Boolean/symbol/BigInt...基于构造函数【或者Object】创造出来的原始值对象类型的格式信息，类型属于对象类型
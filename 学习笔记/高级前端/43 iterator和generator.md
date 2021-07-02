### 遍历器（iterator）

```tex
iterator是一种机制（接口）: 为各种不同的数据结构提供统一的访问机制，任何数据结构只要部署itrerator接口，就可以完成遍历操作【for of循环】 依次处理该数据结构的所有成员
  拥有Next方法用于依次遍历数据结构的成员
  每一次遍历返回的结果是一个对象{done: false, value: xxx}
     done: 记录是否遍历完成
     value: 当前遍历的结果
     
拥有Symbol.iterator属性的数据结构（值），被称为可被遍历的，可以基于for of循环处理
   数组
   部分类数组：arguments/NodeList/htmlCollection......
   String
   Set
   Map
   generator object
   
对象默认不具备Symbol.iterator, 属于不可被遍历的数据结构
```

### 手写iterator

```js
class Iterator{
  constructor(assemblee){
     let self = this;
     self.assemble = assemble;
     self.index = 0;
  }
  next(){
    let self = this,
    assemble = self.assemble
     if (self.index > assemble.length - 1) {
            return {
                done: true,
                value: undefined
            };
        }
        return {
            done: false,
            value: assemble[self.index++]
        };
  }
}
let itor = new Iterator([10, 20, 30, 40]);
console.log(itor.next()); //->{value:10,done:false}
console.log(itor.next()); //->{value:20,done:false}
console.log(itor.next()); //->{value:30,done:false}
console.log(itor.next()); //->{value:40,done:false}
console.log(itor.next()); //->{value:undefined,done:true}
```


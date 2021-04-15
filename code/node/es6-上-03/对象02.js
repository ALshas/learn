// 手写深拷贝
const deepClone = (value, hash = new WeakMap) => {
    if (value == null) return value;
    if (typeof value !== 'object') return value;//这个代码相当于是判断如果不是对象或者数组就返回旧数据
    if (value instanceof RegExp) return new RegExp(value);//如果是正则 就返回一个新的正则
    if (value instanceof Date) return new Date(value);
    let instance = new value.constructor;  //根据当前属性构造一个新的实例:如果value是数组，那么就创建一个新的数组，是对象就创建一个新对象
    // console.log('11', value.constructor) //[Function: Array]
    if(hash.has(value)){  //先去hash中查看一下是否存在过，如果存在过就可以吧以前的拷贝的返回去，就是解决了// let obj = { a: 1 }; // obj.b = obj;调用时，死循环的问题
        return hash.get(value);
    }
    hash.set(value, instance); //没有就走这里 放进去 这是用一个对象来记忆
    for (let key in value) {
        // console.log('22', value.hasOwnProperty(key))
        if (value.hasOwnProperty(key)) {   //hasOwnProperty的意思：返回一个布尔值，指示对象自身属性中是否具有指定的属性（是否具有制定的键）
            instance[key] = deepClone(value[key], hash);
        }
    }
    return instance;
}
let obj = { a: 1 };
obj.b = obj;   //为什么会死循环  因为obj总是给obj赋值 有拷贝原因
let newOld = deepClone(obj)
console.log(newOld)
// let arr = [1, 2, 3, 4, 5, [1, 2, 3]]
// let newOld = deepClone(arr);
// newOld[5][1] = 200
// console.log(newOld, arr)

// let newMap = new Map([[{ a: 1 }, 2], [3, 4]]);  //{ a: 1 }是键， 3是值。2是键， 4是值， key可以是对象
// console.log('11', newMap)  //{ { a: 1 } => 2, 3 => 4 }  
// let obj = {}
// Object.defineProperty(obj, 'a', {
//     configurable: true,  //是否可以删除
//     writable: true,  //是否可写
//     enumerable: true,  //for in 原型的
//     value: 1 //默认不可枚举 就是console.log(obj)不会输出a:1,需要加上enumerable才会输出a:1
// })

// let obj = {}
// let val = '';
// Object.defineProperty(obj, 'a', {
//     configurable: true,  //是否可以删除
//     // writable: true,  //是否可写
//     enumerable: true,  //for in 原型的
//     get(){
//         return val
//     },
//     set(value){
//         val = value
//         console.log(value)
//     }
// })

// VUE  一部分源码  
function observer(obj){  //缺点是不能监控数组的变化
    if(typeof obj !== 'object' || obj === null){
        return;
    }
    for(let key in obj){
        // 因为defineProperty需要一个公共的值去修改
        defineReactive(obj, key, obj[key]);
    }
}
let updateCView = ()=>{
    //更新方法
    console.log('更新');
}
function defineReactive(obj,key, value){
    observer(value);  //递归增加getter和setter
    Object.defineProperty(obj, key, {
        get(){
          return value;
        },
        set(val){
          updateCView();
          value = val;
        }
    })
}
observer(obj)
obj.a = 100;
console.log(obj.a)
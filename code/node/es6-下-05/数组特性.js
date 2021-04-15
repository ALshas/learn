let total = [1,2,3,4,5].reduce((prev, current,index,arr)=>{
   return prev + current
})
console.log(total)

// 收敛
let total = [{price: 10, count: 5}, {price: 10, count: 5},{price: 10, count: 5}].reduce((prev, current, index, arr)=>{
   return prev + current.price * current.count;     //设置第二个参数为0 可以代表prev是0
}, 0) 
console.log(total)

// 数组扁平化 收敛
// console.log([1,[2, [3,[4,[5]]]]]].flat(100))
console.log([1,[2, [3,[4,[5]]]]].flat(100))


// 组合：compose
function sum(a, b){
   return a + b;
}
function len(str){
   return str.length;
}
function addCurrency(val){
   return '￥' + val
}
function compose(...args){
   return function(...values){
      let fn = args.pop();  //先取出最后一项
      console.log(fn)
      return args.reduceRight((prev, currnt)=>{  // prev = abcbed
         return currnt(prev);  //把上一次计算的结果传递给下一个函数
      }, fn(...values));   //abcbed
   }
}

let r = compose(addCurrency, len, sum)('abc', 'bed')
// let r = addCurrency(len(sum('abc', 'bed')))
console.log(r)
//flat原理：
//反柯里化
//数组扁平化
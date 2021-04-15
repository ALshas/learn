// // set 没有key属性 且不能有重复的数据
// let set = new Set([1, 3, 4, 5, 6, 6])
// console.log(set)

// // 两个数组并集、
let a1 = [1, 2, 3, 1, 2, 3]
let a2 = [4, 5, 6, 1, 2, 3]
// let s1 = new Set([...a1, ...a2])
// console.log(...s1)

// 两个数组的交集
let s1 = new Set([...a1]); // 1,2,3
let s2 = new Set([...a2]); // 4, 5, 6, 1, 2, 3
let s3 = [...a2].filter(item => {
    return !s1.has(item)
})
console.log(s3)

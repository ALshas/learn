/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-01-06 11:01:23
 * @Date: 2021-01-06 10:53:13
 */
// generator 可以暂停
// generator生成器  生成迭代器的iterator
// 类数组转化成数组（类数组：有索引 有长度 能遍历）
let likeArray = { '0': 1, '1': '1', '2': '2', length: 3 };
// console.log(Array.from(likeArray)) 
// Symbol中有很多‘元编程’的方法  可以更改Js本身的功能
likeArray[Symbol.iterator] = function () {
    let index = 0
    return {
        next: () => {
            return { value: this[index], done: this.length === index }
        }
    }
}
// 迭代器的作用 没有迭代器的数据 不能被迭代（不能被循环）
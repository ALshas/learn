// primise是一个类
// 1 每次new一个promise 都需要传递一个执行器（executor），执行器是立即执行 的
// 2 执行器函数中有两个参数 resolve, reject
// 3 默认promise有三个状态: pedding =>resolve 表示成功fulfilled， reject 表示失败rejected
// 4 如果一旦成功了 不能变成失败 一旦失败 不能在成功了
// 5 每个promise都有一个then方法
let Promise = require('./promise源码-02')
let p = new Promise((resolve, reject) => {
    resolve('我有钱');
    // reject('我没钱');
    // throw new Error('失败');  //如果抛出异常也会执行失败
});
p.then(data => {
    console.log('成功', data);
}, err => {
    console.log('失败', err); //失败的回调
})
let p = new Promise((resolve, reject) => {
    resolve();
})
// 1)中断promise链 就是返回一个等待的promise
// let p1 = p.then(() => {
//     console.log('ok');
//     return new Promise(() => { })
// }).then(() => {
//     console.log(11)
// })

// finally
// Promise.prototype.finally = function (callback) {
//     return this.then((val) => {
//         // 如果上一个then是成功就将这个成功往下传递
//         return Promise.resolve(callback()).then(() => val)
//     }, (err) => {
//         // 如果上一个then是失败 就将这个失败继续往下抛
//         return Promise.resolve(callback()).then(() => { throw err })
//     })
// }

// Promise.reject().finally(() => {
//     console.log(1);
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             reject();
//         }, 1000)
//     })
// }).catch(e => {
//     console.log(e)
// })

// race 哪个先用哪个，有一个失败了就失败了 all是所有完成才完成
// let p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log(1)
//     }, 1000)
// })
// let p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log(2)
//     }, 2000)
// })
// Promise.race([p1, p2]).then(data => {
//     console.log(data)
// })

// // 原理
// Promise.race = function (promises) {
//     return new Promise((resolve, reject) => {
//         for (let i = 0; i < promises.length; i++) {
//             promises[i].then(resolve, reject);   //只要一个成功就成功
//         }
//     })
// }

// 如果放弃某个promises的执行结果
// function wrap(p1) {
//     let fail = null;
//     let p2 = new Promise((resolve, reject) => {
//         fail = reject;  // 先将p2失败的方法暴露出来
//     })
//     let p = Promise.race([p1, p2]);
//     p.abort = fail;
//     return p;
// }
// let p = wrap(new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('ok');
//     }, 3000)
// }))
// p.abort('error');
// p.then(data => {
//     console.log(data)
// }).catch(err => {
//     console.log(err)
// })

// 既能捕获同步错误又能捕获异步错误
function fn() {
    // 可能函数中抛出了 同步错误 要通过try-catch 捕获异常
    throw new Error('err');
    //    return new Promise((resolve,reject)=>{
    //        setTimeout(() => {
    //         reject('xxx');
    //        }, 3000);
    //    })
}
Promise.try = function (callback) {
    return new Promise((resolve, reject) => {
        // Promise.resolve 只能返回一个成功的promise
        return Promise.resolve(callback()).then(resolve, reject);
    })
}
Promise.try(fn).then((data) => {
    console.log(data, '---');
}, err => {
    console.log('err:' + err);
}); 
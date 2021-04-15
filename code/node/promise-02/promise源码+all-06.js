const { Agent } = require("http");
const { resolve } = require("path");
const { rejects } = require("assert");
const { promises } = require("fs");

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
// promise的处理函数
const resolvePromise = function (promise2, x, resole, reject) {
    // console.log(promise2, x, resole, reject);
    // resole(promise2)
    // 处理X的类型 来决定是调用resole 还是调用reject
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    }
    // 判断x是不是一个普通值  先认为是一个peomise
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        try {
            let then = x.then; //检测有没有then方法
            let called; //默认没有调用成功 和失败
            if (typeof then === 'function') {
                //  是promise
                then.call(x, y => {
                    // resole(y)
                    // 有可能resolev里面还是放上一个promise，一直放
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resole, reject)
                }, r => {
                    if (called) return;    //防止多次调用
                    called = true
                    reject(r)
                })
            } else {
                resole(x)
            }
        } catch (e) {
            if (called) return;    //防止多次调用
            called = true
            reject(e)
        }
    } else {
        reject(e);
    }
}
class Promise {
    constructor(executor) {
        //创建promise executor会立即执行
        this.value = undefined; //成功的值   
        this.reason = undefined;  //失败的原因
        this.status = PENDING;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        let resolve = value => {    //成功
            if (value instanceof Promise) {
                // 如果一个promise resolve了一个新的promise 会等到这个内部的promise执行完成
                return value.then(resolve, reject);   //和resolvePromise的功能一样的
            }
            if (this.status === PENDING) {
                this.value = value;
                this.status = FULFILLED;
                this.onResolvedCallbacks.forEach(fn => fn());  //发布 有可能resolve在then的后边执行，此时先将方法存起来，到时候成功了，依次执行这些回调
            }
        }
        let reject = reason => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED;
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        // 可能有异常的情况
        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
        executor(resolve, reject);
    }
    then(onFulfilled, onRejected) {
        // then方法调用后应该返回一个新的promise
        let promise2 = new Promise((resole, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resole, reject)
                    } catch (e) {
                        reject(e)
                    }
                })

            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resole, reject)
                    } catch (e) {
                        reject(e)
                    }
                })

            }

            // 订阅
            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resole, reject)
                        } catch (e) {
                            reject(e)
                        }
                    });

                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason); resole(x)
                            resolvePromise(promise2, x, resole, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
            }
        })
        return promise2;
    }
    catch(errCallback) {
        // catch相当于是一个then，只是没有调用resolve的回调，只调用reject，就是一个语法题
        return this.then(null, errCallback)
    }
}
module.exports = Promise;


// 先全局安装 再进行测试 promises-aplus-tests 文件名
// promise.finally 最终都会执行 无论怎么样都执行
// promise.try()   捕获同步异常和异步异常

// promise.all()
// 全部完成才算完成 如果有一个失败就失败
// promise.all()是按照顺序执行的 promise.race
Promise.all([fs.readFile('./name.txt', 'utf8'), 1, 2, 3, fs.readFile('./age.txt', 'utf8')]).then(data => {
    console.log(data)
}, err => {
    console.log(err)
})

// promise.all()原理
const isPromise = value => {
    if ((typeof value === 'object' && value !== null) || typeof value === 'function') {
        return typeof value.then === 'function';
    }
    return false;
}
Promise.all = function (promises) {
    return new Promise((resolve, rejects) => {
        let arr = [];   //存放最终结果的
        let i = 0;
        let processData = (index, data) => {
            arr[index] = data;    //将数据放到数组中 成功的数量和传入的数量相等的时候 将结果提出去即可
            if (++i === promises.length) {
                resolve(arr)
            }
        }
        for (let i = 0; i < promises.length; i++) {
            let current = promises[i];   //获取当前的每一项
            if (isPromise(current)) {
                current.then(data => {
                    processData(i, data);
                }, reject)
            } else {
                processData(i, current)
            }
        }
    })
}

// promises.race()  有一个成功就成功 有一个失败就失败
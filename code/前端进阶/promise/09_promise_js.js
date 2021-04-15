const { retry } = require("async");
const { resolve } = require("path");

const ENUM = {
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED'
}
resolvePromise = (x, promise2, resolve, reject) => {
    // 根据x值来解析promise是成功还是失败
    if (x === promise2) {
        return reject(new TypeError('循环返回了'))
    }
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        let called;
        try {
            let then = x.then;
            if (typeof then == 'function') {
                then.call(x, data => {
                    if (called) return;
                    called = true;
                    resolvePromise(data, promise2, resolve, reject)
                }, reason => {
                    if (called) return;
                    called = true;
                    reject(reason)
                })
            } else {
                resolve(x)
            }
        } catch (error) {
            if (called) return;
            called = true;
            reject(error)
        }
    } else {
        resolve(x)
    }
}


class Promise {
    constructor(executor) {
        this.status = ENUM.PENDING
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []
        const resolve = value => {
            // 如果value是一个promise 也要递归
            if (value instanceof Promise) {
                return value.then(resolve, reject)
            }
            if (this.status === ENUM.PENDING) {
                this.status = ENUM.FULFILLED
                this.value = value
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        const reject = reason => {
            if (this.status === ENUM.PENDING) {
                this.status = ENUM.REJECTED
                this.reason = reason
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject)  //立即执行
        } catch (e) {
            reject(e)
        }
    }
    // 为啥把reject和resoleve写在constructor中，因为这样不准被外部调用 
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data;
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
        // 调用then方法 创建一个新的promise
        const promise2 = new Promise((resolve, reject) => {
            if (this.status === ENUM.FULFILLED) {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.status === ENUM.REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.status === ENUM.PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        })
        return promise2;
    }
    catch(errCallback) {
        return this.then(null, errCallback)
    }
    static resolve(val) {
        return new Promise((resolve, reject) => {
            resolve(val)
        })
    }
    static reject(val) {
        return new Promise((resolve, reject) => {
            reject(val)
        })
    }
}
// promises-aplus-tests  测试promise.js
Promise.defer = Promise.deferred = function () {
    const dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject
    })
    return dfd
}
// 测试运行 promises-aplus-tests 08_promise_js.js
module.exports = Promise;

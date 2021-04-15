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
        this.value = undefined;
        this.reason = undefined;
        this.status = PENDING;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        let resolve = value => {
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
}
module.exports = Promise;
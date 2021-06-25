```js
(function () {
    "use strict";

    /* 自定义Promise类 */
    function Promise(executor) {
        var self = this,
            change;

        if (!(self instanceof Promise)) throw new TypeError('undefined is not a promise!');
        if (typeof executor !== "function") throw new TypeError('Promise resolver ' + executor + ' is not a function!');

        self.state = 'pending';
        self.result = undefined;
        self.onFulfilledCallbacks = [];
        self.onRejectedCallbacks = [];

        change = function change(state, result) {
            if (self.state !== 'pending') return;
            self.state = state;
            self.result = result;

            var callbacks = state === 'fulfilled' ? self.onFulfilledCallbacks : self.onRejectedCallbacks,
                i = 0,
                len = callbacks.length,
                callback;
            if (callbacks.length > 0) {
                setTimeout(function () {
                    for (; i < len; i++) {
                        callback = callbacks[i];
                        if (typeof callback === "function") callback(result);
                    }
                }, 0);
            }
        };

        try {
            executor(function resolve(result) {
                change('fulfilled', result);
            }, function reject(reason) {
                change('rejected', reason);
            });
        } catch (err) {
            change('rejected', err);
        }
    }

    // 验证是否为Promise实例「THENABLE」
    function isPromise(x) {
        if (x == null) return false;
        if (/^(object|function)$/i.test(typeof x)) {
            if (typeof x.then === "function") {
                return true;
            }
        }
        return false;
    }

    // 处理onFulfilled或者onRejected方法执行返回结果的处理
    function handle(promiseNew, x, resolve, reject) {
        if (x === promiseNew) throw new TypeError('Chaining cycle detected for promise #<Promise>');
        if (isPromise(x)) {
            try {
                x.then(resolve, reject);
            } catch (err) {
                reject(err);
            }
            return;
        }
        // 返回值不是promise实例，而且执行没有报错，则promiseNew一定是成功的，x是它的结果...
        resolve(x);
    }

    // 构造函数原型
    Promise.prototype = {
        constructor: Promise,
        self: true,
        then: function (onFulfilled, onRejected) {
            var self = this,
                promiseNew,
                x;

            if (typeof onFulfilled !== "function") {
                onFulfilled = function onFulfilled(result) {
                    return result;
                };
            }

            if (typeof onRejected !== "function") {
                onRejected = function onRejected(reason) {
                    throw reason;
                };
            }

            promiseNew = new Promise(function (resolve, reject) {
                // resolve & reject 可以设置返回的@TP「新promise实例」是成功还是失败以及结果等
                // 但是执行哪个方法，由监听onFulfilled|onRejected方法报错以及返回值来决定
                switch (self.state) {
                    case 'fulfilled':
                        setTimeout(function () {
                            try {
                                x = onFulfilled(self.result);
                                handle(promiseNew, x, resolve, reject);
                            } catch (err) {
                                reject(err);
                            }
                        }, 0);
                        break;
                    case 'rejected':
                        setTimeout(function () {
                            try {
                                x = onRejected(self.result);
                                handle(promiseNew, x, resolve, reject);
                            } catch (err) {
                                reject(err);
                            }
                        }, 0);
                        break;
                    default:
                        self.onFulfilledCallbacks.push(function (result) {
                            try {
                                x = onFulfilled(result);
                                handle(promiseNew, x, resolve, reject);
                            } catch (err) {
                                reject(err);
                            }
                        });
                        self.onRejectedCallbacks.push(function (reason) {
                            try {
                                x = onRejected(reason);
                                handle(promiseNew, x, resolve, reject);
                            } catch (err) {
                                reject(err);
                            }
                        });
                }
            });
            return promiseNew;
        },
        catch: function (onRejected) {
            return this.then(null, onRejected);
        }
    };
    if (typeof Symbol !== "undefined") Promise.prototype[Symbol.toStringTag] = 'Promise';

    // 普通对象：私有静态方法
    Promise.resolve = function resolve(result) {
        return new Promise(function (resolve) {
            resolve(result);
        });
    };
    Promise.reject = function reject(reason) {
        return new Promise(function (_, reject) {
            reject(reason);
        });
    };
    Promise.all = function all(promises) {
        var promiseNew,
            results = [],
            n = 0;
        if (!Array.isArray(promises)) throw new TypeError(promises + ' is not iterable');

        // 控制集合中的每一项都是promise实例
        promises = promises.map(function (promise) {
            if (!isPromise(promise)) return Promise.resolve(promise);
            return promise;
        });

        // 返回一个全新的promise实例 @AP
        promiseNew = new Promise(function (resolve, reject) {
            promises.forEach(function (promise, index) {
                promise.then(function (result) {
                    // result存储的是当前迭代这一项的成功结果
                    n++;
                    results[index] = result;

                    // 都处理成功
                    if (n >= promises.length) resolve(results);
                }).catch(function (reason) {
                    // 只要有一项失败，@AP就是失败
                    reject(reason);
                });
            });
        });
        return promiseNew;
    };
    
    /* 暴露API */
    if (typeof window !== "undefined") window.Promise = Promise;
    if (typeof module === "object" && typeof module.exports === "object") module.exports = Promise;
})();

//============
let p1 = Promise.resolve(10);
let p2 = new Promise(resolve => {
    setTimeout(() => {
        resolve(20);
    }, 1000);
});
let p3 = 30;
// 返回一个全新的promise实例@AP，等待集合中所有的promise实例都成功，@AP才是成功，结果是按照顺序依次存储集合中每一项的结果「特殊：如果某一项不是promise实例，我们把它作为一个成功的Promise实例即可」；只要集合中有一项是失败的，则都@AP就是失败的，失败的原因等同于失败这一项的原因；
Promise.all([p1, p2, p3]).then(results => {
    console.log('成功', results);
}).catch(reason => {
    console.log('失败', reason);
});

/* new Promise(resolve => {
    resolve(10);
}).then(result => {
    console.log('success->', result);
    return result * 10;
}).then(result => {
    console.log('success->', result);
    return result * 10;
}).catch(reason => {
    console.log('error->', reason);
}); */


/* // 内置的Promise
let p1 = new Promise(function (resolve, reject) {
    resolve('OK');
    // reject('NO');
});
// 每一次执行THEN方法，都会返回一个“全新的Promise实例 @TP”「then链」
//   + 状态：是由上一个then中传入的onFulfilled或者onRejected执行决定的
//     > 方法执行看返回值，如果返回的不是promise实例，则方法执行不报错，新实例状态就是fulfilled，并且return的结果是新实例的结果，反之执行报错则认为新实例是失败的，结果是报错原因...
//     > 如果返回的也是一个promise实例「@RP」，这样的话，@RP的状态和结果直接影响了@TP的状态和结果
let p2 = p1.then(function (result) {
    console.log('成功->', result);
    return 100;
}, function (reason) {
    console.log('失败->', reason);
    return -100;
});

// 如果THEN中的某个方法不设置，其默认具备“穿透性”「顺延到下一个THEN中的同状态的方法上」
let p3 = p2.then(
    /!*function (result) {
        return result;
    }*!/
    /!*,function(reason){
        throw reason;
    }*!/
);

p3.then(function (result) {
    console.log('成功->', result);
}, function (reason) {
    console.log('失败->', reason);
});
*/


/* // try catch 一般情况下是无法捕捉到异步任务执行报错信息的
try {
    /!* setTimeout(() => {
        throw 'xxx'
    }, 100); *!/
    throw 'xxx';
} catch (err) {
    console.log(err);
} */
```


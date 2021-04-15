#### [**promise基础**]()

1 解决并发问题 （同步多个异步方法的执行结果）

2 链式调用的问题 （现获取name, 通过name在获取age） 解决多个回调嵌套的问题

##### 回调函数

1 同步回调

​    理解：立即执行，完全执行完了才结束，不会放入回调队列中

​    列子：数组遍历相关的回调函数/ Promise的excutor函数

2 异步回调

​    理解：不会立即执行，会放入回调队列中将来执行

​    列子：定时器回调/ ajax回调/promise的成功|失败的回调

##### JS的error处理

1 Error: 所有错误的父类型

2 ReferenceError: 引用的变量不存在

3 TypeError: 数据量类型不正常

4 RangeError: 数据值不在其所允许的范围内

5 SymtaxError: 语法错误

##### event loop

1 JS引擎首先必须先执行所有的初始化同步任务代码

2 每次准备取出第一个红任务执行前，都要将所有的微任务一个一个取出来先执行完

#### 手写简单promise

```javascript
//04.promise.js
// 1 executor 执行器 默认会立即执行
// 2 默认promise的状态是等待态 （三个状态 等待 成功 失败)
// 3 当调用resolve时 会变成成功态 调用reject 会变成失败态
// 4 返回的一个实例上有一个then方法，then中需要提供两个参数 分别是成功对应的函数和失败对应的函数
// 5 如果同时调用成功和失败 默认会采取第一次调用的结果
// 6 抛出异常就走失败逻辑
let Promise = require('./04_promise_js')
// const { resolve } = require("path");

// 7 成功时可以传入成功的值 失败时可以传入失败的原因
let promise = new Promise((resolve, reject) => {
    // resolve('可以')
    console.log(1)
    // throw new Error('jjjj')
    // setTimeout(() => { reject('不可以') }, 1000)
})
promise.then((val) => {
    console.log('success', val)
}, (reason) => {
    console.log('fail', reason)
})
console.log(2)
```

实现

```javascript
//04_promise_js.js
const ENUM = {
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED'
}
class Promise {
    constructor(executor) {
        this.status = ENUM.PENDING
        this.value = undefined
        this.reason = undefined
        const resolve = (value) => {
            if (this.status === ENUM.PENDING) {
                this.status = ENUM.FULFILLED
                this.value = value
            }
        }
        const reject = (reason) => {
            if (this.status === ENUM.PENDING) {
                this.status = ENUM.REJECTED
                this.reason = reason
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
        console.log(this.status)
        if (this.status === ENUM.FULFILLED) {
            onFulfilled(this.value)
        }
        if (this.status === ENUM.REJECTED) {
            onRejected(this.reason)
        }
    }
}
module.exports = Promise;
```

#### 同一个promise可以多次调用then (使用发布订阅模式)

调用then时 当前状态如果是等待 我需要将成功和失败的回调 分别进行存放（订阅）

调用resolve时 将订阅的函数进行执行（发布过程）

```javascript
//05_promise.js
let Promise = require('./05_promise_js')
let promise = new Promise((resolve, reject) => {
    // resolve('可以')
    console.log(1)
    // throw new Error('jjjj')
    setTimeout(() => { reject('不可以') }, 1000)
})
promise.then((val) => {
    console.log('success', val)
}, (reason) => {
    console.log('fail', reason)
})
promise.then((val) => {
    console.log('success', val)
}, (reason) => {
    console.log('fail', reason)
})
```

实现

```javascript
//05_promise_js.js
const ENUM = {
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED'
}
class Promise {
    constructor(executor) {
        this.status = ENUM.PENDING
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []
        const resolve = (value) => {
            if (this.status === ENUM.PENDING) {
                this.status = ENUM.FULFILLED
                this.value = value
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        const reject = (reason) => {
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
        if (this.status === ENUM.FULFILLED) {
            onFulfilled(this.value)
        }
        if (this.status === ENUM.REJECTED) {
            onRejected(this.reason)
        }
        if (this.status === ENUM.PENDING) {
            this.onResolvedCallbacks.push(() => {
                onFulfilled(this.value)
            })
            this.onRejectedCallbacks.push(() => {
                onRejected(this.reason)
            })
        }
    }
}
module.exports = Promise;
```

#### 简单的完整的promise

```javascript
//10_promise_js.js

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

```

#### promise的一些方法

##### finally的实现

作用：无论传入的函数是失败还是成功都执行

```javascript
//执行
Promise.resolve(123).finally(() => {
    // console.log(2344)
    // 如果返回的是成功的promise 会采用上一次的结果
    // 如果返回的是失败的promise 会用失败的结果 传入到catch中
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(12)
        }, 1010);
    })
}).then(data => {
    console.log('succ', data)
}).catch(err => {
    console.log('err', err)
})

```

```javascript
//实现原理
Promise.prototype.finally = function (callback) {
    return this.then((value) => {
        return Promise.resolve(callback()).then(() => value)
    }, (err) => {
        return Promise.resolve(callback()).then(() => { throw err })
    })
}
```

##### all方法的原理实现

作用：可以解决异步并发问题，并且返回的结果按照调用的顺序进行存储

​           成功中有失败，直接走失败

​           全部成功，输出数组

```javascript
//执行
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(100)
    }, 1000);
})
let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(200)
    }, 1000);
})
Promise.all([1, 2, 3, function haha() { console.log(12345) }, p1, p2]).then(data => {
    console.log('resolve', data)
}).catch(err => {
    console.log('reject', err)
})
```

```javascript
//原理实现
Promise.all = function (values) {
    return new Promise((resolve, reject) => {
        let resultArr = [];
        let orderIndex = 0;
        const processResultByKey = (value, index) => {
            resultArr[index] = value;
            if (++orderIndex === values.length) {
                resolve(resultArr)
            }
        }
        for (let i = 0; i < values.length; i++) {
            let value = values[i]
            if (value && typeof value.then === 'function') {
                value.then((value) => {
                    processResultByKey(value, i)
                }, reject)
            } else {
                processResultByKey(value, i)
            }
        }
    })
}
```

##### promisify()方法和promisifyAll()

作用：promisify()对所有函数进行包装 

​           promisifyAll()是对所有的进行包装

可使用插件实现promisefyall（），npm install bluebird 

```javascript
//执行
const bluebird = require('bluebird')
const newFs = bluebird.promisifyAll(fs)
newFs.readFileAsync('./前端进阶/name.js', 'utf8').then(data => {
    console.log(newFs)
})
```

```javascript
//实现
// 实现read方法 自己进行包装
const promisify = (fn) => {
    return (...args) => {
        return new Promise((resolve, reject) => {
            fn(...args, function (err, data) {
                if (err) return reject(err)
                resolve(data)
            })
        })
    }
}
let read = promisify(fs.readFile)
// -----------------------------------------------------
const promisifyAll = (target) => {
    Reflect.ownKeys(target).forEach(key => {
        if (typeof target[key] === 'function') {
            target[key + 'Async'] = promisify(target[key])
        }
    })
    return target;
}
```

##### race（）方法

作用： 一个数组中的方法，最快的执行后，其他的就不执行了。

```javascript
// 实现一个race原理
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            let value = promises[i]
            if (value && typeof value.then === 'function') {
                value.then(resolve, reject)
            } else {
                resolve(value)
            }
        }
    })
}
```

##### promise中断（面试）race（）的应用场景

```javascript
//执行
// 或者可以封装终端方法
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功');
    }, 10000)
})

let newPromise = wrap(promise)
setTimeout(() => {
    newPromise.abort('超时了')
}, 3000)
promise.then((data => {
    console.log('成功' + data)
})).catch((err) => {
    console.log('失败' + err)
})
```

```javascript
//实现原理
function wrap(promise) {
    let abort;
    let newPromise = new Promise((resolve, reject) => {
        abort = reject;
    })
    let p = Promise.race([promise, newPromise])
    p.abort = abort
    return p
}
```

详情链接：https://www.jianshu.com/p/6d2fd4729d95






















const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
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
        if (this.status === FULFILLED) {
            onFulfilled(this.status)
        }
        if (this.status === REJECTED) {
            onRejected(this.reason);
        }

        // 订阅
        if (this.status === PENDING) {
            this.onResolvedCallbacks.push(() => {
                onFulfilled(this.value);
            })
            this.onRejectedCallbacks.push(() => {
                onRejected(this.reason);
            })
        }
    }
}
module.exports = Promise;
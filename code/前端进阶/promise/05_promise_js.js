/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2020-12-30 16:22:22
 * @Date: 2020-12-30 10:30:17
 */
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

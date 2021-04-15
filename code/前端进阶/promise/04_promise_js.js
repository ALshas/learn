/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2020-12-30 11:22:20
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

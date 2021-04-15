const { nextTick } = require("process");
const { setImmediate } = require("timers");

// nextTick node  中的微任务  Vue.nextTick
Promise.resolve().then(data => {
    console.log('then')
})

process.nextTick(() => {   //node中的微任务
    console.log('nextTick')
})

// node ： 主栈执行后，再去清空微任务， timer宏任务执行完， 再去清空微任务。直到timer中的任务都执行完毕
//   然后去执行poll， poll执行完了 再执行check

setTimeout(() => {
    console.log('setTimeout')
})

setImmediate(() => {  //是在当前轮询阶段完成后执行脚本， 也就是poll以后执行
    console.log('setImmediate')
})
// 上面两个的执行顺序受node.js性能的影响  根据调用的上下文影响的
// setImmediate在I/o之后会立即执行

// nextTick不能写递归，写了就回不到主线程中了
new Promise((resolve, reject) => {
    console.log(1111)
    resolve()
}).then(() => {
    console.log(22)
})

setTimeout(() => {
    console.log('timer' + 1);
    Promise.resolve().then(() => {
        console.log('then1')
    })
})
Promise.resolve().then(() => {
    console.log('then2');
    setTimeout(() => {
        console.log('timer' + 2)
    })
})
async function async1() {
    console.log('async1 start')
    // await async2()
    // console.log('async1 end')  这个代码就是下面的代码的意思，但是只限制于浏览器，浏览器只编译一个then, node编译两个then
    Promise.resolve(async2()).then(data => {
        console.log('async1 end')
    })
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(function () {
    console.log('setTimeout')
}, 0)
async1()
new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script end')

// 盲猜输出：script start -  script end - async1 start - async2 - async1 end - promise1 -promise2
//script start
//async1 start
//async2
//promise1   主任务以上
//script end
//async1 end
//promise2     微任务
//setTimeout   宏任务
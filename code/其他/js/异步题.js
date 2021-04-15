setTimeout(() => {
    console.log(7);
});
Promise.resolve()
    .then(() => {
        console.log(0);
        return Promise.resolve(4);
    })
    .then((res) => {
        console.log(res);
    });
Promise.resolve()
    .then(() => {
        console.log(1);
    })
    .then(() => {
        console.log(2);
    })
    .then(() => {
        console.log(3);
    })
    .then(() => {
        console.log(5);
    })
    .then(() => {
        console.log(6);
    });
// 宏任务：[7,]
// 微任务: [0, 4, 1, res, 2, 3, 5, 6]
// 0, 4, 1, res, 2, 3, 5, 6 7
// 正确结果：0
// 1
// 2
// 3
// 4
// 5
// 6
// 7

Promise.resolve().then(() => {
    console.log('Promise1')
    setTimeout(() => {
        console.log('setTimeout2')
    }, 0);
})
setTimeout(() => {
    console.log('setTimeout1');
    Promise.resolve().then(() => {
        console.log('Promise2')
    })
}, 0);

setTimeout(function () {
    console.log('定时器开始啦')
});

new Promise(function (resolve) {
    console.log('马上执行for循环啦');
    for (var i = 0; i < 10000; i++) {
        i == 99 && resolve();
    }
}).then(function () {
    console.log('执行then函数啦')
});

console.log('代码执行结束');
// 代码执行结束 马上执行for循环啦 执行then函数啦 定时器开始啦
// -------------------------------------------------------------------------------------------
// setTimeout(function () {
//     console.log('setTimeout');
// })

// new Promise(function (resolve) {
//     console.log('promise');
// }).then(function () {
//     console.log('then');
// })
// console.log('console');

// 这段代码作为宏任务，进入主线程。
// 先遇到setTimeout，那么将其回调函数注册后分发到宏任务Event Queue。(注册过程与上同，下文不再描述)
// 接下来遇到了Promise，new Promise立即执行，then函数分发到微任务Event Queue。
// 遇到console.log()，立即执行。
// 好啦，整体代码script作为第一个宏任务执行结束，看看有哪些微任务？我们发现了then在微任务Event Queue里面，执行。
// ok，第一轮事件循环结束了，我们开始第二轮循环，当然要从宏任务Event Queue开始。我们发现了宏任务Event Queue中setTimeout对应的回调函数，立即执行。
// 结束。

// promise console then setTimeout
// 宏任务：[setTimeout]
// 微任务: [then]

console.log('1');

setTimeout(function () {
    console.log('2');
    process.nextTick(function () {
        console.log('3');
    })
    new Promise(function (resolve) {
        console.log('4');
        resolve();
    }).then(function () {
        console.log('5')
    })
})
process.nextTick(function () {
    console.log('6');
})
new Promise(function (resolve) {
    console.log('7');
    resolve();
}).then(function () {
    console.log('8')
})

setTimeout(function () {
    console.log('9');
    process.nextTick(function () {
        console.log('10');
    })
    new Promise(function (resolve) {
        console.log('11');
        resolve();
    }).then(function () {
        console.log('12')
    })
})
// 1 7 6 8 2 4 3 5 9 11 10 12
// 1 7 4 11
// 宏任务 ：[2, 9]
// 微任务：[6, 8, 3, 5, 10, 12]

// // 第一轮
// 1 7 6 8 
// 宏任务[第一个setTimeOut, 第二个setTimeOut]
// 微任务[6, 8]

// 第二轮  2 4 3 5 
// 主任务：2 4
// 宏任务：
// 微任务：3 5

// 第三轮 9 11 10 12
// 主任务：9 11 
// 宏任务：
// 微任务：10 12
// 1 7 6 8 2 4 3 5 9 11 10 12

console.log('0')
setTimeout(() => {
    console.log('1')
}, 0)
new Promise((resolve, reject) => {
    for (let i = 0; i < 10; i++) {
        i === 9 && resolve(i)
    }
    console.log(3)
}).then(() => {
    console.log('4')
})
console.log('5')

// 答案：
// 0
// 3
// 5
// 4
// undefined  是resolve输出的 Promise.resolve()在本轮“事件循环”结束时执行
// 1
function Foo() {
    getName = function () {
        alert(2)
    }
    return this;
}
Foo.getName = function () {
    alert(1)
}
Foo.prototype.getName = function () {
    alert(6)
}
var getName = function () {
    alert(5)
}
function getName() {
    alert(4)
}
new Foo.getName();
Foo.getName();
getName();
Foo().getName();
getName();
new Foo().getName();
new new Foo().getName();

new Promise((resolve, reject) => {
    console.log('外部promise')
    resolve()
})
    .then(() => {
        console.log('外部第一个then')
        new Promise((resolve, reject) => {
            console.log('内部promise')
            resolve()
        })
            .then(() => {
                console.log('内部第一个then')
                return Promise.resolve()
            })
            .then(() => {
                console.log('内部第二个then')
            })
    })
    .then(() => {
        console.log('外部第二个then')
    })
    .then(() => {
        console.log('外部第三个then')
    })
    .then(() => {
        console.log('外部第四个then')
    })

// 分析
//外部promise 
//外部第一个then 
//内部promise 
//外部第二个then 
//外部第三个then 
//外部第四个then  
//内部第一个then  
//内部第二个then

// 结果
// 外部promise
// 外部第一个then
// 内部promise
// 内部第一个then
// 外部第二个then
// 外部第三个then
// 外部第四个then
// 内部第二个then

let a = 0
let b = async () => {
    a = a + await 10
    console.log('2', a)
}
b()
a++
console.log('1', a)

var foo = 1
function bar() {
    if (!foo) {
        var foo = 10
    }
    console.log(foo)
}
bar()

console.log('1');

setTimeout(function () {
    console.log('2');
    process.nextTick(function () {
        console.log('3');
    })
    new Promise(function (resolve) {
        console.log('4');
        resolve();
    }).then(function () {
        console.log('5')
    })
})
process.nextTick(function () {
    console.log('6');
})
new Promise(function (resolve) {
    console.log('7');
    resolve();
}).then(function () {
    console.log('8')
})

setTimeout(function () {
    console.log('9');
    process.nextTick(function () {
        console.log('10');
    })
    new Promise(function (resolve) {
        console.log('11');
        resolve();
    }).then(function () {
        console.log('12')
    })
})

function Foo() {
    Foo.a = function () {
        console.log(1)
    }
    this.a = function () {
        console.log(2)
    }
}
Foo.prototype.a = function () {
    console.log(3)
}
Foo.a = function () {
    console.log(4)
}
Foo.a();
let obj = new Foo();
obj.a();
Foo.a();

// ------------------------------------
function Obj() {
    this.a = 100
}
Obj.prototype.a = 300
Obj.a = 200
var obj = new Obj()
console.log(obj.a)

// -----------------------
let arr = [12, 3, 4, 5]
let o = () => {
    console.log(222, o)
    return o
}
console.log(o)


async function async1() {
    console.log('async1 start')
    await async2()          //这句代码等于 Promise.resolve(async2()).then(()=>{console.log('哈哈')})
    console.log('哈哈')
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(() => {
    console.log('setTimeout')
}, 0)
async1()
new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('script end')
})


// 一
Promise.resolve().then(() => {
    console.log(1);
    Promise.resolve().then(() => {
        console.log(11)
    }).then(() => {
        console.log(22)
    }).then(() => {
        console.log(33)
    })
}).then(() => {
    console.log(2)
}).then(() => {
    console.log(3)
})
// 1 11 2 3 22 33   
// ---------------------------------------------------------
// 1
// 11
// 2
// 22
// 3
// 33
// 二
async function async1() {
    console.log('async1 start')
    await async2()          //这句代码等于 Promise.resolve(async2()).then(()=>{console.log('哈哈')})
    console.log('哈哈')
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(() => {
    console.log('setTimeout')
}, 0)
async1()
new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('script end')
})

// script start
// async1 start
// async2
// promise1
// 哈哈
// script end
// setTimeout
// 微任务：[ async1 start,script end]

// 宏任务：[setTimeout,]
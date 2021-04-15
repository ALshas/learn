##### gennerator

```
// 返回值叫迭代器
// function* read() {
//     yield 1;  //产出 所有遇到yield都会停顿
//     yield 2;
//     yield 3;
// }
```

```javascript
// 将类数组转换成数组
// 类数组的定义: 1 索引 2 长度
function add() {
    console.log([...{
        0: 1, 1: 2, length: 2,
        // [Symbol.iterator]() {
        //     let len = this.length;
        //     let index = 0;
        //     return {
        //         next: () => {
        //             return { value: this[index++], done: index === len + 1 };
        //         }
        //     }
        // }
        [Symbol.iterator]: function* () {
            let index = 0;
            while (index !== this.length) {
                yield this[index++];
            }
        }
    }])
}
add(1, 2, 3, 4, 5);
```

```javascript
function* read() {
    try {
        let a = yield 1;
        console.log(a);
        let b = yield 2;
        console.log(b);
        let c = yield 3;
        console.log(c);
    } catch (e) {
        console.log('e:', e)
    }
}
let it = read();
console.log(it.next());
console.log(it.next(100)); //这个给值 100的话 会给到a
it.throw('xxx')
```

```javascript
const fs = require('fs').promises;
function* read() {
    let content = yield fs.readFile('./name.txt', 'utf8');   //  age.txt
    let age = yield fs.readFile(content, 'utf8');    //10
    return age;
}
// let it = read();
// it.next.value.then(data => {
//     it.next(data).value.then(data => {
//         let r = it.next(data)
//         console.log(r.value)
//     })
// })
// 上面部分代码可以通过co实现
// co要安装
let co = require('co');
const { async } = require('rxjs');
co(read()).then(data => {
    console.log(data);
})
```

######  以上代码改成async和await

async、await是gennerator和promise的语法糖

```javascript
async function read() {
    let r = await Promise.all([p1, p2]);   //防止堵塞
    try {
        let content = await fs.readFile('./name.txt', 'utf8');
        let age = await fs.readFile(content, 'utf8');
        let xx = await { age: age + 10 }
        return xx;
    } catch (e) {
        console.log(e);
    }
}
read.then(data => {
    console.log(data);
}, err => {
    console.log(err)
})
```


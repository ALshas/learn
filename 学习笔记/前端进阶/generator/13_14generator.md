### 1 generator

作用：可以暂停 

​           generator生成器 生成迭代器的iterator

​           类数组转换为数组 （类数组：有索引 有长度 能遍历）

​           Symbol中有很多‘元编程’的方法 可以更改js本身的功能

​           迭代器的作用 没有迭代器的数据 不能被迭代（不能被循环）

#### 1 generator的遍历器的实现

如果我们自己去迭代一个对象需要实现一个迭代器接口，自己返回一个具有next方法的对象。内部会调用这个next方法返回结果包含value和done,当done为true时迭代完成

```javascript
let likeArray = { '0': 1, '1': '1', '2': '2', length: 3 };
// console.log(Array.from(likeArray)) 
// Symbol中有很多‘元编程’的方法  可以更改Js本身的功能
likeArray[Symbol.iterator] = function () {
    let index = 0
    return {
        next: () => {
            return { value: this[index], done: this.length === index }
        }
    }
}
```

#### 2 生成器实现与使用

```javascript
//实现
const iterable = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
iterable[Symbol.iterator] = function*() {
    let index = 0;
    while (index !== this.length) {
        yield this[index++]
    }
}
console.log([...iterable]);
```

```javascript
//使用
function * read(){ // 感觉写代码就是同步的写，但是执行还是异步嵌套的执行
    let content = yield fs.readFile('./name.txt','utf8'); // 1
    let age = yield fs.readFile(content,'utf8'); // 2
    return age;
}
```

### 2 co库

//安装 npm install co

#### 1 原理实现

```javascript
function co(it) {
    return new Promise((resolve, reject) => {
        //   异步迭代需要根据函数来实现
        function next(data) {
            let { value, done } = it.next(data)
            if (done) {
                resolve(value)
            } else {
                // Promise.resolve(value).then(data => {
                //     next(data)
                // }).catch(err => {
                //     reject(err)
                // })
                // 简写
                Promise.resolve(value).then(next, reject)
            }
        }
        next()
    })
}
```

### 3 Async+wait

async+await 就是co+generator的语法糖

*号编程async  yield变成await
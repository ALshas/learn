```js
function Fn() {
    let a = 1;
    this.a = a;
}
Fn.prototype.say = function () {
    this.a = 2;
}
Fn.prototype = new Fn;
let f1 = new Fn;
Fn.prototype.b = function () {
    this.a = 3;
};
console.log(f1.a);
console.log(f1.prototype);
console.log(f1.b);
console.log(f1.hasOwnProperty('b'));
console.log('b' in f1);
console.log(f1.constructor == Fn);
```

![1](../..\图片\js高级\原型06.png)

### 检测某个属性是否为当前对象的属性

```js
in: 不论是私有还是功有属性[原型链], 只要 有结果就是true
hasOwnProperty: 检测是否为对象的私有属性，只要私有中没有这个属性，结果就是false

检测当前属性是否为对象的公有属性
function hasPubProperty(obj, attr){
    //局限性：如果私有中有这个属性，公有也有，此方法检测是不准的
    return (attr in obj) && !obj.hasOwnProperty(attr)
}

```

### queryURLParams

```js
/*
 * 问号参数的获取 
 *   问号传递参数的格式：urlencoded
 *     xxx=xxx&xxx=xxx...
 * 
 *   + 客户端页面跳转的时候，基于问号传递参数实现数据的传输
 *   + 客户端向服务器端发送请求，GET系列请求都是基于问号参数实现的数据传递的
 *   + 前端路由中，组件和组件之间的通信也可以基于问号传参
 *   + ...
 * 
 * queryURLParams是项目中一个非常常用的方法
 */
String.prototype.queryURLParams = function queryURLParams(attr) {
    let self = this,
        obj = {};

    /* 1.字符串截取处理 */
    let askIndex = self.indexOf('?'),
        wellIndex = self.indexOf('#'),
        askText = '',
        wellText = '';
    askIndex === -1 ? askIndex = self.length : null;
    wellIndex === -1 ? wellIndex = self.length : null;
    if (askIndex < wellIndex) {
        askText = self.substring(askIndex + 1, wellIndex);
        wellText = self.substring(wellIndex + 1);
    } else {
        askText = self.substring(askIndex + 1);
        wellText = self.substring(wellIndex + 1, askIndex);
    }
    // 井号获取信息了
    if (wellText) obj['HASH'] = wellText;
    // 问号获取信息了
    if (askText) {
        askText.split('&').forEach(item => {
            let [key, value] = item.split('=');
            obj[key] = value;
        });
    } 

    /* 2.利用A元素对象的相关属性「OOP」 */
     
    // A元素对象：hash/host/hostname/pathname/protocol/search...
    // 基于这些私有属性即可获取到URL中每一部分的信息
    let link = document.createElement('a');
    link.href = self;
    let {
        search,
        hash
    } = link;
    link = null;
    if (hash) obj['HASH'] = hash.substring(1);
    if (search) {
        search.substring(1).split('&').forEach(item => {
            let [key, value] = item.split('=');
            obj[key] = value;
        });
    }
    

    /* 3.直接正则处理 */
    let reg1 = /([^?&=#]+)=([^?&=#]+)/g,
        reg2 = /#([^?&=#]+)/g;
    self.replace(reg1, (_, key, value) => obj[key] = value);
    self.replace(reg2, (_, hash) => obj['HASH'] = hash);

    return typeof attr === "undefined" ? obj : (obj[attr] || '');
};

let str = 'http://www.xxx.com/?lx=0&from=weixin&n=100#video';
console.log(str.queryURLParams()); //=>{lx:0,from:'weixin',n:100,HASH:'video'}
console.log(str.queryURLParams('lx')); //=>0
```


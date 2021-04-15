const { time } = require("console");

class Subject {             //被观察者 小宝宝
    constructor() {
        this.arr = [];  //[o1,o2]
        this.state = '我很开心'
    }
    attach(o) {   //原型上的方法 接收两个观察者 我和别人
        this.arr.push(o);  //吧观察者放到arr里面
    }
    setState(newState) {
        this.state = newState
        // 拿出接收到的两个观察者，来告诉观察者我的新的心情
        this.arr.forEach((o) => {
            // 调用观察者里面的Updata来告诉我和别人
            o.update(newState)
        })
    }
}

class Observer {     //观察者  我和别人
    constructor(name) {
        this.name = name
    }
    //    小宝宝通知我和别人换了心情
    update(newState) {
        console.log(this.name + '小宝宝' + newState)
    }
}

let s = new Subject('小宝宝');
let o1 = new Observer('我');
let o2 = new Observer('别人');
s.attach(o1);   // 小宝宝设置心情去通知我
s.attach(o2);  // 小宝宝设置心情去通知别人
s.setState('我不开心了')

// 写成用原型的
// function Subject() {
//     this.arr = [];
//     this.state = 'xxx'
// }
// Subject.prototype.attach = function (o) {

// }
// Subject.prototype.setState = function (o) { }
// ......
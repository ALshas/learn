// 怎么去用es5 来模拟es6中的class
// new 的原理

// es5中米有类， 用构造函数来模拟
function Animal() {
    if (!this instanceof Animal) { //当前是不是通过new来调用
        throw new Error('Not New')
    }
    this.name = { name: 'zf' };
    this.age = 10;
    this.say = 123;
}
Animal.prototype.say = function () {
    console.log('say')
}
let a1 = new Animal();
let a2 = new Animal()
console.log(a1.__proto__ === Animal.prototype);  //true
console.log(a1.__proto__.constructor === Animal); //true
console.log(a1.__proto__.__proto__ === Object.prototype)
console.log(Object.prototype.__proto__)  //null

// ------------------------------- 类的继承 继承实列上的属性 公共属性
function Animal() {
    this.type = '哺乳类';
}
Animal.prototype.say = function () {
    console.log('我是动物')
}
function Tiger(name) {
    this.name = name;
    Animal.call(this);   //调用父类的构造函数 并且让this指向子类即可 使用call改变this指向 实现继承
}

Object.setPrototypeOf(Tiger.prototype, Animal.prototype);  //es语法实现继承
Tiger.prototype = Object.create(Animal.prototype)    //使用Object.cereate实现继承
let tiger = new Tiger('大脑斧');
tiger.say()

// Object.create实现原理
function create(parentProto) {
    function Fn() { }
    Fn.prototype = parentProto;
    let fn = new Fn()
    fn.constructor = Tiger;
    return fn
}
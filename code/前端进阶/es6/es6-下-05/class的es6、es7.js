class Animal {
    type = '哺乳类';   //声明到实列上的
    // constructor() {
    //     this.type = '哺乳类'
    // }
    get a() {      //相当于Object.defineProperty(Animal.prototype.a)
        return 1;  //相当于Animal.prototype.a = 1;
    }
    say() {  // 放到原型上 //Animal.prototype.say
        console.log(this)
    }
    // 静态属性就是定义到类上的属性 es6种只有静态方法
    static flag = '动物';  //es7语法  需要配置class-properties插件
    static flag() {
        return '动物'
    }                     //调用时Animal.flag()  把flag（）当作类调用才行 
    static get flag() {
        return '动物'
    }                      //调用时Animal.flag  把flag当作属性调用就行  
}
let animal = new Animal();   //如果将类中的方法拿出来用必须绑定this 否则默认指向undefind
// let say = animal.say.bind(animal)
// say()

// 静态方法在es6种也会被字类继承
class Animal {
    constructor() {
        this.type = '哺乳类'
    }
    say() {
        console.log('say')
    }
    static flag = 1;
}
class Tiger extends Animal {

}
let tiger = new Tiger()
console.log(Tiger.flag)


//接上面代码
class Tiger extends Animal {
    //如果加了
    constructor(name) {
        super(name)   //super的意思的  Animal.call(tiger);  super是父类， 
        // console.log(super.flag)
    }
}


// new 的原理
function A() {
    this.name = 1;
    this.age = 2;
    return { c: 1 };  //如果一个类返回了一个引用空间 那么实例将这个空间
}
A.prototype.say = function () {
    console.log('say')
}
function mockNew(A) {
    let obj = {};
    let returnVal = A.call(obj);
    if ((typeof returnVal === 'object' && returnVal !== null) || typeof returnVal === 'function') {
        return returnVal;
    }
    obj.__proto__ = A.prototype
    return obj;
}
let a = mockNew(A);
console.log(a)

// minix 混入
// let obj = {
//     name: 'zf',
//     age: 12
//   }
//   @mixin(obj)
//   class School{}
//   function mixin(obj){
//     return function(Constructor){
//       Object.assign(Constructor.prototype, obj)
//     }
//   }
//   let school = new School()
//   console.log(school.name)

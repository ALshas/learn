//proxy 兼容性差
// 代理 我们可以创建一个代理 帮我们干某些事
// 可以取代defineProperty

// let obj = [1,2,3];
// let obj = {a: {a:1}, b:2}
// let proxy = new Proxy(obj, {
//     get(target, key){
//         // Reflect是反射属性
//         // return target[key];
//         return Reflect.get(target, key);
//     },
//     set(target, key, value){
//         // target[key] = value
//         if(key === 'length') return true;
//         console.log('update', target, key, value);  //targer是[1,2,3], key是新增的下标， value是新增的值
//         return Reflect.set(target, key, value);
//     }
// })
// // proxy.push(1);
// proxy.a.a = 100
// console.log(obj)
// 好处 是支持数组 可以直接更改数组 达到拦截的作用
// 上面代码只能监听最外一层， 不会走set

// 改变
let obj = {
    a: {a: 2}
}
let handler = {
    get(target, key){
        // Reflect是反射属性
        // return target[key];
        if(typeof target[key] === 'object'){
            return new Proxy(target[key], handler); //如果是对象 就返回这个对象的代理
        }
        return Reflect.get(target, key);
    },
    set(target, key, value){
        // target[key] = value
        if(key === 'length') return true;
        console.log('update', target, key, value);  //targer是[1,2,3], key是新增的下标， value是新增的值
        return Reflect.set(target, key, value);
    }
}
let proxy = new Proxy(obj, handler);
proxy.a.a = 100;
console.log(obj.a.a)

import { defineProperty } from '../util.js';
import { arrayMethods } from './array'
class Observer {
    constructor(value) {
        // 使用defineProperty重新定义属性
        // 判断一个对象是否被观测过 看他有没有__ob__这个属性
        defineProperty(value, '__ob__', this)
        if (Array.isArray(value)) {
            // 我希望调用push shift unshift splice sort reberse pop
            // 这种叫做函数劫持  切片编程
            value.__proto__ = arrayMethods; // 重写数组原型方法
            // 观测数组中的对象类型 对象变化也要做一些事
            this.observeArray(value);
        } else {
            this.walk(value);
        }
    }
    observeArray(value) {
        for (let i = 0; i < value.length; i++) {
            observe(value[i]);
        }
    }
    walk(data) {
        let keys = Object.keys(data); //H获取对象的Key
        keys.forEach((key) => {
            defineReactive(data, key, data[key]);  //Vue.util.defineReactive;
        })
    }
}
function defineReactive(data, key, value) {
    observe(value)
    Object.defineProperty(data, key, {
        get() {
            console.log('获取值')
            return value
        },
        set(newValue) {
            if (newValue == value) return;
            observe(newValue)   // 如果用户将值改为对象继续监控
            value = newValue
            console.log('设置值')
        }
    })
}
export function observe(data) {
    // typeof null 也是Object
    // 不能不是对象 并且不是null
    if (typeof data !== 'object' || data == null) {
        return;
    }
    if (data.__ob__) {
        return data;
    }
    return new Observer(data)
}
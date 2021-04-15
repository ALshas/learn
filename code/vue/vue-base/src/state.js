import { observe } from "./observer/index";
import { proxy } from "./util.js";

/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-02-03 17:41:23
 * @Date: 2021-02-01 15:33:01
 */
export function initState(vm) {  //vm.$options
    const opts = vm.$options;
    if (opts.props) {
        initProps(vm)
    };
    if (opts.methods) {
        initMethods(vm)
    };
    if (opts.data) {
        initData(vm)
    };
    if (opts.computed) {
        initComputed(vm)
    };
    if (opts.watch) {
        initWatch(vm)
    };
}
function initProps(vm) { }
function initMethods(vm) { }

function initData(vm) {
    // 数据的初始化操作
    let data = vm.$options.data;
    // 为什么要call 因为data在new Vue中，属于Vue的，先在这里把它指向Vue
    data = vm._data = typeof data == 'function' ? data.call(vm) : data
    // 数据的劫持方案  对象Object.defineProperty
    // 数组 是单独处理

    // 当我去vm上取属性时 帮我将属性的取值代理到vm._data上
    for (let key in data) {
        proxy(vm, '_data', key)
    }

    observe(data)
}
function initComputed(vm) { }
function initWatch(vm) { }
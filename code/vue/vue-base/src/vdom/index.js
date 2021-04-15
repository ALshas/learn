/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-02-07 16:57:11
 * @Date: 2021-02-07 15:36:05
 */

export function renderMixin(Vue) { // 用对象来描述dom的结构
    Vue.prototype._c = function () {
        // 创建虚拟dom元素
        return createElement(...arguments)
    }
    Vue.prototype._s = function (val) {// stringify
        return val == null ? '' : (typeof val == 'object') ? JSON.stringify(val) : val;
    }
    Vue.prototype._v = function (text) {//创建虚拟dom文本元素
        return createTextVnode(text);
    }
    Vue.prototype._render = function () {
        const vm = this;
        const render = vm.$options.render;
        console.log(render)
        let vnode = render.call(vm);
        return vnode;
    }
}
function createElement(tag, data = {}, ...children) {
    return vnode(tag, data, data.key, children)
}
function createTextVnode(text) {
    return vnode(undefined, undefined, undefined, undefined, text)
    console.log(text)
}
// 产生虚拟dom的
function vnode(tag, data, key, children, text) {
    return {
        tag,
        data,
        key,
        children,
        text
    }
}
/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-02-07 17:08:01
 * @Date: 2021-02-07 15:27:03
 */
import { patch } from "./vdom/patch";
export function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        const vm = this;
        patch(vm, $el, vnode)
    }
}
export function mountComponent(vm, el) {
    // 调用render方法去渲染 el属性
    //先调用render方法 创建虚拟节点 再将虚拟节点渲染到页面上
    // vm.update()是将虚拟节点变成真实节点
    vm._update(vm._render());
}
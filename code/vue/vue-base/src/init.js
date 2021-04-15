import { compileToFunctions } from "./compiler/index";
import { mountComponent } from "./lifecycle";
import { initState } from "./state";

export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this;
        vm.$options = options

        // 初始化状态(将数据做一个初始化的劫持  当我改变数据是应该更新视图)
        // vue组件中有很多状态 data  props watch cpmputed
        initState(vm)   //初始化状态

        // vue里面核心特性 响应式数据原理
        // vue是一个什么框架 参考mvvm框架  不是mvvm框架  ，vue可以参考dom $ref 
        // mvvM不能跳过数据去更新视图

        //如果当前有el属性说明要渲染模板
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }
    Vue.prototype.$mount = function (el) {
        //挂载操作
        const vm = this;
        const options = vm.$options;
        el = document.querySelector(el);
        vm.$el = el;  //存好el
        // 先判断有没有render 没有就查找有没有emplate  没有temelate就查找有没有外部的html 赋值给template ,然后用template去生成一个render函数 
        // 且赋值给render
        if (!options.render) {
            //没有render 将template转成render方法
            let template = options.template
            if (!template && el) {
                template = el.outerHTML;  //outerHTML代表外层div iner代表里层
            }
            // 编译原理 将模板编译成render函数
            const render = compileToFunctions(template);
            options.render = render
        }
        //渲染时用的都是这个render方法
        // 需要挂载这个组件
        mountComponent(vm, el);

    }
} 
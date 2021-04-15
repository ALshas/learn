export default function applyMixin(Vue) {
    // 父子组件的执行顺序
    Vue.mixin({  //内部会把生命周期函数拍平成一个
        beforeCreate: vuexInit
    });
}
// 组件的渲染是从父到子
function vuexInit() {
    // 给所有的组件增加$store 属性 指向我们创建的store实例
    const options = this.$options; //获取用户所有的选项
    if (options.store) {  //根实例
        this.$store = options.store;
    } else if (options.parent && options.parent.$store) { //儿子 或者孙子
        this.$store = options.parent.$store;
    }
}
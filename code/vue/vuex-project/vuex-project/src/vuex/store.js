import applyMixin from './mixin'
import Module from './module/module';
import ModuleCollection from './module/module-collection';
import { forEachValue } from './util'
export let Vue;

/**
 * @param {*} store  容器
 * @return {*}  rootState  根模块
 * @return {*}  path   所有路径
 * @return {*}  moudule  格式化后的树
 */
function getState(store, path) {   //获取最新的状态 可以保证视图更新
    return path.reduce((newState, current) => {
        return newState[current]
    }, store.state)
}
const installModule = (store, rootState, path, module) => {
    // 对当前模块进行炒作
    // 需要遍历当前模块上的 actiones mutations getters 都把他定义

    // 我要给当前订阅的事件  增加一个命名空间
    let namespace = store._modules.getNamespaced(path)

    // 将所有的子模块的状态安装到父模块的状态上
    if (path.length > 0) {  //vuex可以动态添加模块
        let parent = path.slice(0, -1).reduce((memo, current) => {
            return memo[current]
        }, rootState)
        Vue.set(parent, path[path.length - 1], module.state)
    }
    module.forEachMutation((mutation, key) => {
        store._mutations[namespace + key] = (store._mutations[namespace + key] || []);
        store._mutations[namespace + key].push((payload) => {
            mutation.call(store, getState(store, path), payload);
            store._subscribe.forEach(fn => {
                fn(mutation, store.state)
            });
        });
    });
    module.forEachAction((action, key) => {
        store._actions[namespace + key] = (store._actions[namespace + key] || []);
        store._actions[namespace + key].push(function (payload) {
            action.call(store, this, payload);
        });
    });
    module.forEachGetter((getter, key) => {
        store._wrappedGetters[namespace + key] = function () {
            return getter(module.state);
        }
    });
    module.forEachChild((child, key) => {
        installModule(store, rootState, path.concat(namespace + key), child)
    })
}
function resetStoreVM(store, state) {
    const computed = {};  //定义计算属性
    store.getters = {}  //定义store中的getters
    forEachValue(store._wrappedGetters, (fn, key) => {
        computed[key] = () => {
            return fn()
        }
        Object.defineProperty(store.getters, key, {
            get: () => store._vm[key]
        })
    })
    store._vm = new Vue({
        data: {
            $$state: state
        },
        computed //计算属性有缓存的效果
    })
}
export class Store {  //容器的初始化  
    constructor(options) {  // options就是你new Vuex.store({state, mutation,actions})
        // const state = options.state; //数据变化要更新视图 （vue的核心逻辑依赖收集）
        // // 响应式的数据new Vue({data})
        // // 1 添加状态逻辑 数据再哪里使用 就会收集对应的依赖
        // const computed = {}
        // // 2、处理Gettrer属性 是具有缓存的   computed 带有缓存  （多次取值是如果值不变是不会重新取值）
        // this.getters = {}
        // /* Object.keys(options.getters).forEach(key => {
        //      Object.defineProperty(this.getters, key, {
        //          get: () => options.getters[key](this.state)
        //      })
        //  }) */
        // forEachValue(options.getters, (fn, key) => {
        //     computed[key] = () => {  //将用户的getter定义在实例上
        //         return fn(this.state)
        //     }
        //     Object.defineProperty(this.getters, key, {
        //         get: () => fn(this.state)
        //     })
        // })
        // // 3 计算属性的实现
        // this._vm = new Vue({
        //     data: {  // 属性如果是通过$开头的 默认不会将这个属性挂载vm上
        //         $$state: state  // 会将$$state对应的对象 都通过defineProperty来进行属性劫持
        //     },
        //     computed
        // })
        // // 4 实现mutations
        // this.mutations = {}
        // this.actions = {}
        // forEachValue(options.mutations, (fn, key) => {
        //     this.mutations[key] = (payload) => fn(this.state, payload)
        // })
        // // 5 实现actions
        // forEachValue(options.actions, (fn, key) => {
        //     this.actions[key] = (payload) => fn(this, payload)
        // })

        // -----------------------------上面是简单实现-------------------------------
        const state = options.state;
        this._actions = {};
        this._mutations = {};
        this._wrappedGetters = {}
        this._subscribe = []

        //1 数据的格式化 格式化成为 我想要的结果（树）
        this._modules = new ModuleCollection(options)

        // 2 根模块的状态中 要将子模块通过模块名 定义在根模块上
        installModule(this, state, [], this._modules.root)
        // 通过将状态和getters 都定义在当前vm上
        resetStoreVM(this, state)
        options.plugins.forEach(plugin => plugin(this))
    }
    subscribe(fn) {
        return this._subscribe.push(fn)
    }
    replaceState(state) {
        this._vm._data.$$state = state;
    }
    // 在严格模式下 acions和mutations是有区别的
    commit = (type, payload) => {
        // 调用commit其实就是去找 刚才绑定的mutation
        this._mutations[type].forEach(fn => fn.call(this, payload));
    }
    dispatch = (type, payload) => {
        // this.actions[type](payload)
        this._actions[type].forEach(fn => fn.call(this, payload));
    }
    get state() {  //属性访问
        return this._vm._data.$$state
    }
}
// Vue.use方法会调用插件的install方法 此方法中的参数就是Vue的构造函数
export const install = (_Vue) => {  // 插件的安装  Vue.use()
    //    _vue 是vue的构造函数
    Vue = _Vue;

    // 需要将根组件中注入的store 分派给每一个组件 （子组件） Vue.mixin
    applyMixin(Vue)
}
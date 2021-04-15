/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-03-03 17:49:33
 * @Date: 2021-03-01 11:00:19
 */

import Vue from 'vue';
import Vuex from '@/vuex';  //自己的
// import Vuex from 'vuex';   //别人的
import a from './a'
import b from './b'
//1 Vue.use(Vuex);  vuex是一个对象 Install方法
// 2 Vuex 中有一个Store类
// 3  混入到组件中 增添store属性
import logger from 'vuex/dist/logger'

// plugins subscribe replaceState
function persists(store) { // 每次去服务器上拉去最新的 session、local
    debugger
    let local = localStorage.getItem('VUEX:state');
    if (local) {
        store.replaceState(JSON.parse(local)); // 会用local替换掉所有的状态
    }
    store.subscribe((mutation, state) => {
        // 这里需要做一个节流  throttle lodash
        localStorage.setItem('VUEX:state', JSON.stringify(state));
    });
}


Vue.use(Vuex);  //使用这个插件 内部会调用vuex中的install方法

const store = new Vuex.Store({
    plugins: [
        persists
    ],
    state: {  //当然于data
        age: 10
    },
    getters: {
        myAge(state) {
            return state.age * 2
        }
    },  //计算属性
    mutations: {   //method=> 同步的更改state
        changeAge(state, payload) {
            state.age += payload;   //更新age属性  改状态
        }
    },
    actions: {   //异步操作做完后将结果提交给mutations
        changeAge({ commit, dispatch }, payload) {  //commit 找mutations, dispatch找actions
            setTimeout(() => {
                commit('changeAge', payload)
            }, 1000)
        }
    },
    modules: {
        a, b
    }
});
export default store;
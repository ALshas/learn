/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-03-03 16:33:37
 * @Date: 2021-03-02 10:42:08
 */
import c from './c'
export default {
    namespaced: true,
    state: {
        age: 222
    },
    getters: {

    },
    actions: {

    },
    mutations: {
        changeAge(state, payload) {
            state.age += payload
        }
    },
    modules: {

    }
}
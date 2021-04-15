/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-03-02 10:58:58
 * @Date: 2021-03-02 10:42:14
 */
export default {
    namespaced: true,
    state: {
        age: 333
    },
    getters: {

    },
    actions: {

    },
    mutations: {
        changeAge(state, payload) {
            state.age += payload
        }
    }
}
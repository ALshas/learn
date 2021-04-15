/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-03-02 14:37:42
 * @Date: 2021-03-02 14:37:30
 */
export default {
    namespaced: true,
    state: {
        age: 444
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
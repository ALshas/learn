/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-02-25 17:18:15
 * @Date: 2021-02-25 17:03:25
 */
export function initGlobalApi(Vue) {
    Vue.mixin = function (mixin) {
        console.log(mixin)
    }
}
/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-03-01 12:07:29
 * @Date: 2021-03-01 10:51:56
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store, //每个子组件 都会拥有一个属性 $store
  render: h => h(App),
}).$mount('#app')




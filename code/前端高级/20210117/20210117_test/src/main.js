import Vue from 'vue';
import App from './App.vue';
/* // 基于ES6Module方式导入
import A from './A'; //CommonJS
import B from './B'; //ES6Module */

/* let A = require('./A'); //CommonJS
console.log(A);
let B = require('./B'); //ES6Module
console.log(B); //{default:{sum...}} */

// webpack环境
//   + 支持CommonJS/ES6Module规范
//   + 打包后的内容是放在浏览器中运行的，也是有window的

// 纯NODE环境下运行
//   + 不支持ES6Module规范，只支持CommonJS
//   + 里面是没有window的

// 直接在浏览器环境下运行「webview」
// <script src='xxx.js'>
//   + 不支持CommonJS/ES6Module规范「除非script的type="module"，这样新版本浏览器可以支持ES6Module」
//   + 但是有window

Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
}).$mount('#app')
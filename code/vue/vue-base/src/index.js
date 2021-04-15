/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-02-25 17:17:58
 * @Date: 2021-02-01 15:08:08
 */

import { initGlobalApi } from "./compiler/global-api/index";
import { initMixin } from "./init";
import { lifecycleMixin } from "./lifecycle";
import { renderMixin } from "./vdom/index";

// 为什么不用类 
function Vue(options) {
    this._init(options); //入口方法 做初始化操作
}
// 写成一个个的插件对原型的扩展
initMixin(Vue)
lifecycleMixin(Vue);  //混合生命周期 渲染
renderMixin(Vue); //渲染


// 静态方法 vue.component vue.directive vue.extend vue.minin....
initGlobalApi(Vue)
export default Vue;
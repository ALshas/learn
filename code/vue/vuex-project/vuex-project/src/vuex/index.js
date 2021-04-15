/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-03-03 18:19:52
 * @Date: 2021-03-01 12:08:05
 */
import { Store, install } from './store';  //这个是入口文件 核心是导出所有写好的方法
export default {
    Store,
    install
}
export * from './helpers'
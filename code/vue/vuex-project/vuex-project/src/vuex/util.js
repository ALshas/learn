/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-03-01 17:45:43
 * @Date: 2021-03-01 16:44:26
 */
// 1 功能是遍历对象
export const forEachValue = (obj, callback) => {
    Object.keys(obj).forEach(key => callback(obj[key], key))
}


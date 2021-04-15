/*
 * @Author: your name
 * @Date: 2020-12-14 10:18:20
 * @LastEditTime: 2020-12-14 10:41:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\ts\dome\class.js
 */
var Per = /** @class */ (function () {
    function Per(myName) {
        this.myName = myName;
    }
    Object.defineProperty(Per.prototype, "name", {
        get: function () {
            return this.myName.toUpperCase();
        },
        set: function (newName) {
            this.myName = newName;
        },
        enumerable: false,
        configurable: true
    });
    return Per;
}());
var u = new Per("a");
console.log(u.myName);

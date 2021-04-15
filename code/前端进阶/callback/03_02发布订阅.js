/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2020-12-29 18:03:11
 * @Date: 2020-12-29 17:04:48
 */
let fs = require("fs");
let event = {
  _arr: [],
  on(fn) {
    //订阅
    this._arr.push(fn);
  },
  emit(fn) {  
    //发布
    this._arr.forEach((fn, index) => {fn()});
  },
};
let obj = {};
event.on(function () {
  //   计划1
  console.log("数据来了");
});
event.on(function () {
  if (Object.keys(obj).length === 2) {
    console.log(obj);
  }
});
fs.readFile("./前端进阶/name.js", "utf8", (err, data) => {
  obj.name = data;
  event.emit(); //发布
});
fs.readFile("./前端进阶/age.js", "utf8", (err, data) => {
  obj.age = data;
  event.emit(); //发布
});
// 我刚刚红框框有两个异步的方法 然后这两个异步的方法里都调用了emit（）这个发布
// 然后我调用第一次emit的时候 就会执行订阅的计划一和计划2 因为第一次计划二的判断不成立 所以不打印 只执行计划1
// 然后第二次 用emit的时候 也会执行订阅的计划1和计划2  然后因为计划一执行 计划二也满足条件 所以 就是这样的打印结果

// 实现一个New操作符
function New(func) {
   var res = {}
   if(func.prototype != null){
       res.__proto__ = func.prototype
   }
   var ret =  func.apply(res, Array.prototype.slice.call(arguments, 1))
   
}
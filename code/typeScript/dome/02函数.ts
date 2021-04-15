/*
 * @Author: your name
 * @Date: 2020-12-11 17:08:01
 * @LastEditTime: 2020-12-11 18:32:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\ts\dome\02函数.ts
 */
// 定义式子
function hello(name: string): string {
  return "xx" + name;
}
console.log("11111", hello("oo"));
// type是定义类型的意思， 用来约束一个函数表达式 参数有两个xx,xx 返回一个字符串
type GetFunction = (x: string, y: string) => string;
let getUser: GetFunction = function (ff: string, las: string): string {
  return ff + las;
};

// 断言 强行告诉tss是一个什么类型
let nameData = "12";
console.log((nameData as string).length);

// 可选参数  问号表示，可以有也可以没有这个参数
function print(name: string, age?: number): void {
  console.log(name, age);
}
print("111", 10);
print("111");

// 定义默认值
function ajax(url: string, method: string = "GET") {
  console.log(url, method);
}
ajax("/xix");

//剩余参数
function sum(...numbers: Array<number>) {
  console.log(numbers);
}
console.log(sum(1, 2, 3, 4));

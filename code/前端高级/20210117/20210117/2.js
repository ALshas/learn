/*
 * 开始，写代码很low「不会」 ->  插件/组件 -> 设计模式「逼格很高」 -> 返璞归真
 * 
 * 浏览器或者开发真都应该掌握“懒”字诀
 */
// 获取元素的样式
//  + 元素.style.xxx  获取行内样式
//  + 盒子模型属性「外加:getBoundingClientRect」
//  + 获取所有经过浏览器计算过的样式  
//    + 标准:getComputedStyle
//    + IE6~8:currentStyle
let box = document.querySelector('.box');

/* let isCompatible = typeof getComputedStyle !== "undefined" ? true : false;
const getCss = function getCss(element, attr) {
    if (isCompatible) {
        return window.getComputedStyle(element)[attr];
    }
    return element.currentStyle[attr];
}; */

// 核心：函数重构「闭包」
let getCss = function (ele, attr) {
    if (typeof getComputedStyle !== "undefined") {
        getCss = function (ele, attr) {
            return window.getComputedStyle(ele)[attr];
        };
    } else {
        getCss = function (ele, attr) {
            return ele.currentStyle[attr];
        };
    }
    // 保证第一次也获取值
    return getCss(ele, attr);
};

console.log(getCss(box, 'width'));
console.log(getCss(box, 'backgroundColor'));
console.log(getCss(box, 'height'));
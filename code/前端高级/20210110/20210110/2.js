/* let x = 5;
function fn(x) {
    return function (y) {
        console.log(y + (++x));
    }
}
let f = fn(6);
f(7);
fn(8)(9);
f(10);
console.log(x); */

/* 
// ++x & x++
//  ++x：先累加1，用累加后的结果再去运算
//  x++：先拿原始值去运算，运算结束后，自身累加1
//  ==>累加操作都是数学运算  和 x+=1（x=x+1）不完全一致
let i = 1;
console.log(5 + (++i)); //->7
console.log(i); //->2

i = 1;
console.log(5 + (i++)); //->6
console.log(i); //->2 
*/

/*
 * EC(G)
 *   x=10
 *   fn=0x000「[[scope]]:EC(G)」 
 */
let x = 10;
function fn() {
    /*
     * EC(FN) 闭包
     *   y=20
     *   f=0x001「[[scope]]:EC(FN)」
     */
    let y=20;
    function f() {
        console.log(y);
    }
    window.f = f;
}
fn();
fn = null; //->把0x000堆释放掉 但是之前形成的上下文EC(FN)不受影响
f();
window.f=null;//->把0x001堆释放掉，此时EC(FN)中没有被外面占用的内容了，它也会被释放掉
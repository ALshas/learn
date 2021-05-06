/* var a = {
    n: 1
};
var b = a;
a.x = a = {
    n: 2
};
console.log(a.x);
console.log(b); */


/* var x = [12, 23];
function fn(y) {
    y[0] = 100;
    y = [100];
    y[1] = 200;
    console.log(y);
}
fn(x);
console.log(x); */

/*
 * EC(G)
 *   VO(G)
 *    i=0
 *    A=0x000「A函数 [[scope]]:EC(G)」
 *    y=0x001
 *    B=0x003「B函数 [[scope]]:EC(G)」
 */
var i = 0;
function A() {
    /*
     * EC(A)
     *   AO(A)
     *     i=10
     *     x=0x001「x函数 [[scope]]:EC(A)」
     *   作用域链:<EC(A),EC(G)> 
     *   形参赋值:--
     *   变量提升:...
     */
    var i = 10;
    function x() {
        /*
         * EC(X1)
         *   AO(X1)
         *     
         *   作用域链:<EC(X1),EC(A)>  函数执行的上级上下文是它的作用域「只和在哪创建的有关系，和在哪执行没有关系」
         *   形参赋值:--
         */
        /*
         * EC(X2)
         *   AO(X2)
         *     
         *   作用域链:<EC(X2),EC(A)>
         *   形参赋值:--
         */
        console.log(i);//获取其上级上下文EC(A)中的i =>10
    }
    return x; //return 0x001;
}
var y = A(); //把A执行的返回值「return」赋值给全局的y
y();
function B() {
    /*
     * EC(B)
     *   AO(B) 
     *     i=20
     *   作用域链:<EC(B),EC(G)>
     *   形参赋值:--
     */
    var i = 20;
    y();
}
B();
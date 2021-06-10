
/*
 * EC(G)  「老版本的浏览器」
 *  变量提升:
 *    foo=0x000; [[scope]]:EC(G)
 */
// {
//     function foo() { }
//     foo = 1; //全局的foo=1
// }
// console.log(foo); //->1 


//  console.log(foo); //->undefined
// {
//     console.log(foo); //->函数
//     function foo() {}
//     foo = 1;
//     console.log(foo); //->1
// }
// console.log(foo); //->函数 

/*
/!*
 * EC(G)
 *   变量提升:
 *     function foo;
 *     function foo;
 *!/
console.log(foo); //->undefined
{
    /!*
     * EC(BLOCK)
     *   作用域链:<EC(BLOCK),EC(G)>
     *   变量提升:
     *      foo=0x001; [[scope]]:EC(BLOCK)
     *      foo=0x002; [[scope]]:EC(BLOCK)
     *      ----
     *      foo=0x002;
     *!/
    console.log(foo); //->函数{2}
    function foo() {1} //把之前对foo的操作映射给EC(G)一份  => 全局的foo=0x002
    console.log(foo); //->函数{2}
    foo = 1;//把私有的foo=1
    console.log(foo); //->1
    function foo() {2} //把之前对foo的操作映射给EC(G)一份  => 全局的foo=1
    console.log(foo); //->1
}
console.log(foo); //->1
*/


/* debugger;
{
    function foo(x) {}
    foo = 1;
    function foo(y) {}
    foo = 2;
}
console.log(foo); */
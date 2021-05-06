/*
 * EC(G)
 *   变量提升:
 *      var a;
 *      fn=0x000; [[scope]]:EC(G)
 */
console.log(a); //->undefined
var a = 12;
function fn() {
    /*
     * EC(FN)
     *    作用域链:<EC(FN),EC(G)>
     *    形参赋值:-- 
     *    变量提升:var a;
     */
    console.log(a); //->undefined
    var a = 13;
}
fn();
console.log(a); //->12


/*
 * EC(G)
 *   变量提升:
 *      var a;
 *      fn=0x000; [[scope]]:EC(G)
 */
console.log(a); //->undefined
var a = 12;
function fn() {
    /*
     * EC(FN)
     *    作用域链:<EC(FN),EC(G)>
     *    形参赋值:-- 
     *    变量提升:--
     */
    console.log(a); //->不是自己的私有变量,是EC(G)中的全局变量 12
    a = 13;
}
fn();
console.log(a); //->13

/*
 * EC(G)
 *   变量提升:
 *      fn=0x000; [[scope]]:EC(G)
 */
console.log(a); //->ReferenceError:a is not defined
a = 12;
function fn() {
    console.log(a);
    a = 13;
}
fn();
console.log(a);
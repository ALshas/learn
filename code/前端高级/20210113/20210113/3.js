/* /!*
 * EC(G) 
 *  变量提升:
 *    var x;
 *    func=0x000; [[scope]]:EC(G)
 * 
 * -------VO(G)/GO
 *    x=1
 *    func=0x000;
 *!/
var x = 1;
function func(x, y = function anonymous1(){x = 2}){
    /!*
     * EC(FUNC)
     *   作用域链:<EC(FUNC),EC(G)> 
     *   形参赋值:
     *     x=5 
     *     y=0x0001; [[scope]]:EC(FUNC)
     *   变量提升:--
     * 
     * --------AO(FUNC)
     *     x=2
     *     y=0x0001
     *!/
    x = 3; 
    y();
    /!*
     * EC(AN)
     *   作用域链:<EC(AN),EC(FUNC)> 
     *   形参赋值:--
     *   变量提升:--
     *   代码执行:
     *     x=2
     *!/
    console.log(x); //=>2
}
func(5);
console.log(x); //=>1 */

/* debugger;
var x = 1;
function func(x, y = function anonymous1(){x = 2}){
    var x = 3; 
    y();
    console.log(x);
}
func(5);
console.log(x); */


/* var x = 1;
function func(x, y = function anonymous1(){x = 2}){
    /!*
     * EC(FUNC) 
     *   作用域链:<EC(FUNC),EC(G)>
     *   初始THIS:window
     *   形参赋值:
     *      x=5
     *      y=0x0001; [[scope]]:EC(FUNC)
     *!/
    /!*
     * EC(BLOCK) 
     *   作用域链:<EC(BLOCK),EC(FUNC)>
     *   变量提升:
     *     var x;  -> COPY:5   ->3  ->4
     *     var y;  -> COPY:0x0001 -> 0x0002 [[scope]]:EC(BLOCK)
     *!/
    var x = 3; 
    var y=function anonymous2(){x = 4};
    y();
    console.log(x); //=>4
}
func(5);
console.log(x); //=>1 */


/* function fn(x, y) {
    // 严谨
    if(typeof x==="undefined"){
        x=0;
    }
    if(typeof y==="undefined"){
        y=0;
    }
    // 简写「不严谨」
    x=x||0;
    y=y||0;
} */
/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-02-07 15:17:28
 * @Date: 2021-02-04 14:49:36
 */
/* <div id='my'>hello{{name}}<span>xixi</span></div> */
// {
//     tag: 'div',
//     parent: null,
//     type: 1,
//     attrs: [],  //属性
//     children: [{tag: null, parent: 父div, attrs: [],text: hello{{name}}},{tag: 'span',parent: 父div, attrs:[],text: 'xixi'}]
// }

import { generate } from "./generate"
import { parseHTML } from "./parse"
export function compileToFunctions(template) {
    //html模板-》render函数
    //ast语法树
    //虚拟dom 是用对象来描述节点的
    // ast是对语法转义 虚拟dom是对结构转义 
    // 1 需要将html代码转化成为‘ast'语法树 可以用ast树来描述语言本身
    // 启前端必须要掌握的数据结构（树）
    let ast = parseHTML(template)
    // 2 优化静态节点
    // 3 通过这棵树 重新生成代码
    let code = generate(ast)
    // 4  将字符串转成函数
    // 限制取值范围 通过with来进行取值 稍后调用render函数就可以通过改变this 让这个函数内部取到结果
    // let render = `with(this){return ${code}}`;
    console.log(code)
    let renderFn = new Function(code);
    console.log(renderFn)
    return renderFn
    // let obj = { a: 1, b: 2 }
    // with (obj) {
    //     console.log(a, b)//输出1 2
    // }

}
/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-02-07 15:17:08
 * @Date: 2021-02-04 17:58:05
 */
//编写： <div id='app' style='color: red'>hello {{name}}<span>hello</span></div>
//结果： render(){
//     return _c('div', {id: 'app', style: {color: red}}, _v('hello'+ _s(name)), _c('span', null,_v('hello')))
// }
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;  // {{ xxx }}

// 生成属性
function genProps(attrs) {
    let str = '';
    for (let i = 0; i < attrs.length; i++) {
        let attr = attrs[i];
        if (attr.name === 'style') {
            let obj = {}
            attr.value.split(';').forEach(item => {
                let [key, value] = item.split(':');
                obj[key] = value;
            })
            attr.value = obj;
        }
        str += `${attr.name}:${JSON.stringify(attr.value)}, `;
    }
    let _str = str.substring(0, str.lastIndexOf(','));
    return `{${_str}}`;
}
function getChildren(el) { // 生成儿子节点
    const children = el.children;
    if (children) {
        return `${children.map(c => gen(c)).join(',')}`
    } else {
        return false;
    }
}
function gen(node) {
    if (node.type == 1) {
        return generate(node);// 产生元素节点的字符串
    } else {
        let text = node.text;//获取文本
        // 如果是普通文本 不带{{}}的
        if (!defaultTagRE.test(text)) {
            return `_v(${JSON.stringify(text)})`
        }
        let lastIndex = defaultTagRE.lastIndex = 0;//如果正则是全局模式 每次使用前置为0
        let tokens = [];//存放每一段的代码
        let match, index;//每次匹配到的结果

        while (match = defaultTagRE.exec(text)) {
            index = match.index; //保存匹配到的索引
            if (index > lastIndex) {
                tokens.push(JSON.stringify(text.slice(lastIndex, index)));
            }
            tokens.push(`_s(${match[1].trim()})`)
            lastIndex = index + match[0].length;
        }
        if (lastIndex < text.length) {
            tokens.push(JSON.stringify(text.slice(lastIndex)))
        }
        return `_v(${tokens.join('+')})`;
    }
}
export function generate(el) {
    let children = getChildren(el);
    let code = `_c('${el.tag}',${el.attrs.length ? `${genProps(el.attrs)}` : 'undefined'
        }${children ? `,${children}` : ''})`;
    return code;
}
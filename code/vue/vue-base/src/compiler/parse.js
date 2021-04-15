/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-02-04 17:56:13
 * @Date: 2021-02-04 17:55:39
 */

const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;  //匹配标签名<aa-123>
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;//?:匹配不捕获  <my:xx
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;  // {{ xxx }}

// 数据结构 树 栈 链表 队列
export function parseHTML(html) {
    function createASTElement(tagName, attrs) {
        return {
            tag: tagName,  //标签名
            type: 1,  //元素类型是1
            children: [],  //孩子列表
            attrs,   //属性
            parent: null //父元素
        }
    }
    let root;  //树根
    let currentParent;  //记录
    let stack = [];  //判断标签是否符合预期
    // 解析开始标签
    function start(tagName, attrs) {
        let element = createASTElement(tagName, attrs)
        if (!root) {
            root = element
        }
        currentParent = element; //当前解析的标签 保存起来
        stack.push(element)  //将生成的ast元素放到栈中
    }
    // 解析结束标签 
    function end(tagName) { //在结尾标签处 创建父子关系
        let element = stack.pop(); //取出栈中最后一个
        currentParent = stack[stack.length - 1]
        if (currentParent) {
            // 有值 就去判断是谁的父亲
            // 在闭合时 可以知道这个标签的父亲是谁
            element.parent = currentParent
            currentParent.children.push(element)
        }
    }
    // 标签文本
    function chars(text) {
        text = text.replace(/\s/g, '');  //替换文本空字符
        if (text) {
            currentParent.children.push({
                type: 3,  //文本是3 元素是1
                text
            })
        }
    }
    while (html) {
        //    只要Html不为空 就一直解析
        // 当前第一个属性是不是以尖叫号开头
        let textEnd = html.indexOf('<')
        if (textEnd == 0) {
            // 肯定是标签
            const startTagMatch = parseStartTag();  //开始标签匹配的结果
            if (startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs)
                continue;  //如果匹配到了开始标签 就结束走下一步
            }
            const endTagMatch = html.match(endTag)
            // 匹配到了结束标签
            if (endTagMatch) {
                advance(endTagMatch[0].length)
                end(endTagMatch[1]);  //将结束标签传入
                continue;
            }
        }
        // 表示是个文本 
        let text;
        if (textEnd >= 0) {
            text = html.substring(0, textEnd)
        }
        if (text) {
            advance(text.length)
            chars(text)
        }
    }
    // 前进
    function advance(n) {  //将字符串进行截取操作 再更新Html内容
        html = html.substring(n)
    }
    // 解析开始标签
    function parseStartTag() {
        // 匹配标签开头的正则
        let start = html.match(startTagOpen)  ////{0: "<div" 1: "div"}
        if (start) {
            // 制作结构  0是匹配字符串 1 是匹配分组(标签名)
            const match = {
                tagName: start[1],
                attrs: []
            }
            advance(start[0].length)// 删除开始标签  此时的html id="app"> <div id="my">hello{{name}}<span>xixi</span></div></div>
            // 如果直接是闭合标签 说明没有属性
            let end;
            let attr;
            // 不是结尾标签且能匹配到属性
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                match.attrs.push({ name: attr[1], value: attr[3] || attr[4] || attr[5] })  ////match.attrs输出 [0: name: "id" value: "app"]
                advance(attr[0].length); //去掉当前属性
            }
            if (end) {
                //去掉>
                advance(end[0].length)
                return match;
            }
        }
    }
    return root;
}
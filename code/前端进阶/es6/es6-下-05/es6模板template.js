// 模板引擎 如何实现一个模板引擎
//  ejs   npm install ejs
// 常见的模板引擎 ejs jade handlerbar underscore nunjunks
let fs = require('fs');
let ejs = req
let template = fs.readFileSync('./template.html', 'utf8');
// 实现模板引擎的原理 正则
function render(templateStr, obj) {
    return templateStr.replace(/\{\{(.+?)\}\}/g, function () {
        return obj[arguments[1]]
    })
}
let r = render(template, { name: 'jw', age: 10 })
console.log(r)
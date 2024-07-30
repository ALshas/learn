
var a = 1;
function one(c) {
    var b = 2;
    console.log(a, b, c);
}
one(3);

const LexicalEnvironment = require('./LexicalEnvironment');
const ExecutionContext = require('./ExecutionContext');
const ECStack = require('./ECStack');                                                                                                                                                                                                                                                                                                                                                                                                                 
//1.将变量环境设置为全局环境
//2.将词法环境设置为 全局环境
const globalLexicalEnvironment = LexicalEnvironment.NewObjectEnvironment(global, null);    
console.log('globalLexicalEnvironment',globalLexicalEnvironment )
const globalEC = new ExecutionContext(globalLexicalEnvironment, global);
ECStack.push(globalEC);
//令 env 为当前运行的执行环境的环境变量的 环境记录
let env = ECStack.current.lexicalEnvironment.environmentRecord;
//如果 code 是 eval 代码 ，则令 configurableBindings 为 true，否则令 configurableBindings 为 false。
let configurableBindings = false;
//如果代码是 严格模式下的代码 ，则令 strict 为 true，否则令 strict 为 false。
let strict = false;
//按源码顺序遍历 code，对于每一个 VariableDeclaration 和 VariableDeclarationNoIn 表达式：
//令 dn 为 d 中的标识符。
let dn = 'a';
//以 dn 为参数，调用 env 的 HasBinding 具体方法，并令 varAlreadyDeclared 为调用的结果
let varAlreadyDeclared = env.HasBinding(dn);
//如果 varAlreadyDeclared 为 false，则：
if (!varAlreadyDeclared) {
    //以 dn 和 configurableBindings 为参数，调用 env 的 CreateMutableBinding 具体方法。
    env.CreateMutableBinding(dn, configurableBindings);
    //以 dn、undefined 和 strict 为参数，调用 env 的 SetMutableBinding 具体方法。
    env.SetMutableBinding(dn, undefined, strict);
}
console.log(env.GetBindingValue('a'));
const DeclarativeEnvironmentRecords = require("./DeclarativeEnvironmentRecords");
const ObjectEnvironmentRecords = require("./ObjectEnvironmentRecords");
class LexicalEnvironment {
    /**
    * 当调用 GetIdentifierReference 抽象运算时
     * @param {*} lex 词法环境
     * @param {*} name  标识符字符串
     * @param {*} strict  布尔型标识
    */
   static GetIdentifierReference(lex, name, strict) {
        //if (!lex) return { name: undefined };
        if (!lex) throw new Error(`ReferenceError: ${name} is not defined`);
        let envRec = lex.environmentRecord;
        let exists = envRec.HasBinding(name);
        if (exists) {
            const value = envRec.GetBindingValue(name);
            return { name: value };
        } else {
            lex = lex.outer;
            return LexicalEnvironment.GetIdentifierReference(lex, name, strict);
        }
    }
    /**
     * 创建新的声明式词法环境
     * @param {*} lexicalEnvironment 父词法环境
     * @returns 
     */
    static NewDeclarativeEnvironment(lexicalEnvironment) {
        let env = new LexicalEnvironment();
        let envRec = new DeclarativeEnvironmentRecords();
        env.environmentRecord = envRec;
        env.outer = lexicalEnvironment;
        return env;
    }
    /**
     * 创建新的对象式词法环境
     * @param {*} lexicalEnvironment 父词法环境
     * @returns 
     */
    static NewObjectEnvironment(object, lexicalEnvironment) {
        let env = new LexicalEnvironment();
        let envRec = new ObjectEnvironmentRecords(object);
        env.environmentRecord = envRec;
        env.outer = lexicalEnvironment;
        return env;;
    }
}
module.exports = LexicalEnvironment;
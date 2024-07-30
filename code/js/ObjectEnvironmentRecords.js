const EnvironmentRecord = require('./EnvironmentRecord');
class ObjectEnvironmentRecords extends EnvironmentRecord {
    constructor(bindings) {
        super();
        this.bindings = bindings;
        this.provideThis = false;
    }
    /**
     * 判断其关联的绑定对象是否有名为 N 的属性
     * 如果包含该绑定则返回 true，反之返回 false。其中字符串 N 是标识符文本。
     * @param {*} N 名称
     */
    HasBinding(N) {
        const envRec = this;
        const bindings = envRec.bindings;
        return bindings.hasOwnProperty(N);
    }
    /**
    * 会在其关联的绑定对象上创建一个名称为 N 的属性
    * @param {*} N  绑定名称
    * @param {*} D  可选参数 D 的值为true，则该绑定在后续操作中可以被删除
    */
    CreateMutableBinding(N, D) {
        //令 envRec 为函数调用时对应的声明式环境记录项
        const envRec = this;
        const bindings = envRec.bindings;
        //执行断言：envRec 没有 N 的绑定。
        console.assert(!bindings.hasOwnProperty(N));
        const configValue = D;
        //在 envRec 中为 N 创建一个可变绑定,并将绑定的值设置为 undefined
        //如果 D 为 true 则新创建的绑定可在后续操作中通过调用 DeleteBinding 删除
        Object.defineProperty(bindings, N, {
            value: undefined,
            enumerable: true,
            configurable: configValue,
            writable: true
        });
    }
    /**
     * 尝试设置其关联的绑定对象中名为 N 的属性的值为 V
     * @param {*} N 绑定名称
     * @param {*} V 绑定的值
     * @param {*} S S 用于指定是否为严格模式 当 S 为 true 并且该绑定不允许赋值时，则抛出一个 TypeError 异常
     */
    SetMutableBinding(N, V, S) {
        //令 envRec 为函数调用时对应的声明式环境记录项
        const envRec = this;
        const bindings = envRec.bindings;
        //执行断言：envRec 必须有 N 的绑定。
        console.assert(this.HasBinding(N));
        //否则该操作会尝试修改一个不可变绑定的值，因此如果 S 的值为 true，则抛出一个 TypeError 异常。
        const propertyDescriptor = Object.getOwnPropertyDescriptor(bindings, N);
        if (S && !propertyDescriptor.writable) {
            throw new Error("TypeError: Assignment to constant variable.");
        }
        //如果 envRec 中 N 的绑定为可变绑定，则将其值修改为 V
        bindings[N] = V;
    }
    /**
     *返回其关联的绑定对象中名为 N 的属性的值
     * @param {*} N 绑定的名称
     * @param {*} S 用于指定是否为严格模式 如果 S 的值为 true 并且该绑定不存在或未初始化，则抛出一个 ReferenceError 异常
     */
    GetBindingValue(N, S) {
        //令 envRec 为函数调用时对应的声明式环境记录项
        const envRec = this;
        const bindings = envRec.bindings;
        //执行断言：envRec 必须有 N 的绑定。
        console.assert(bindings.hasOwnProperty(N), `变量${N}尚未定义`);
        //如果 envRec 中 N 的绑定是一个未初始化的不可变绑定，则如果 S 为 false，返回 undefined，否则抛出一个 ReferenceError 异常。
        const V = bindings[N];
        const propertyDescriptor = Object.getOwnPropertyDescriptor(bindings, N);
        if (!propertyDescriptor.uninitialized) {
            if (!S) return V;
            throw new Error(`ReferenceError: Cannot access '${N}' before initialization`);
        }
        //否则返回 envRec 中与 N 绑定的值
        return V;
    }
    /**
    * 删除其关联的绑定对象上 [[Configurable]] 特性的值为 true 的属性所对应的绑定
    * @param {*} N 绑定的名称 如果 N 指定的绑定存在，将其删除并返回 true。如果绑定存在但无法删除则返回false。如果绑定不存在则返回 true
    */
    DeleteBinding(N) {
        //令 envRec 为函数调用时对应的声明式环境记录项
        const envRec = this;
        const bindings = envRec.bindings;
        if (!bindings.hasOwnProperty(N)) {
            return true;
        }
        const propertyDescriptor = Object.getOwnPropertyDescriptor(bindings, N);
        if (!propertyDescriptor.configurable) {
            return false;
        }
        delete bindings[N];
        return true;
    }
    /**
     * 返回 undefined，除非其 provideThis 标识的值为 true。
     */
    ImplicitThisValue() {
        const envRec = this;
        if (provideThis) {
            return envRec.bindings;
        }
        return undefined;
    }
}
module.exports = ObjectEnvironmentRecords;
const EnvironmentRecord = require('./EnvironmentRecord');
class DeclarativeEnvironmentRecords extends EnvironmentRecord {
    /**
     * 判断环境记录项是否包含对某个标识符的绑定
     * 如果包含该绑定则返回 true，反之返回 false。其中字符串 N 是标识符文本。
     * @param {*} N 名称
     */
    HasBinding(N) {
        let envRec = this;
        return N in envRec;
    }
    /**
     * 在环境记录项中创建一个新的可变绑定
     * @param {*} N  绑定名称
     * @param {*} D  可选参数 D 的值为true，则该绑定在后续操作中可以被删除
     */
    CreateMutableBinding(N, D) {
        //令 envRec 为函数调用时对应的声明式环境记录项
        let envRec = this;
        //执行断言：envRec 没有 N 的绑定。
        console.assert(!this.HasBinding(N));
        //在 envRec 中为 N 创建一个可变绑定,并将绑定的值设置为 undefined
        //如果 D 为 true 则新创建的绑定可在后续操作中通过调用 DeleteBinding 删除
        Object.defineProperty(envRec, N, {
            value: undefined,
            writable: true,
            configurable: D
        });

    }
    /**
     * 环境记录项中设置一个已经存在的绑定的值
     * @param {*} N 绑定名称
     * @param {*} V 绑定的值
     * @param {*} S S 用于指定是否为严格模式 当 S 为 true 并且该绑定不允许赋值时，则抛出一个 TypeError 异常
     */
    SetMutableBinding(N, V, S) {
        //令 envRec 为函数调用时对应的声明式环境记录项
        let envRec = this;
        //执行断言：envRec 必须有 N 的绑定。
        console.assert(this.HasBinding(N));
        //否则该操作会尝试修改一个不可变绑定的值，因此如果 S 的值为 true，则抛出一个 TypeError 异常。
        const propertyDescriptor = Object.getOwnPropertyDescriptor(envRec, N);
        if (S && !propertyDescriptor.writable) {
            throw new Error("TypeError: Assignment to constant variable.");
        }
        //如果 envRec 中 N 的绑定为可变绑定，则将其值修改为 V
        envRec[N] = V;
    }
    /**
     * 返回环境记录项中一个已经存在的绑定的值
     * @param {*} N 绑定的名称
     * @param {*} S 用于指定是否为严格模式 如果 S 的值为 true 并且该绑定不存在或未初始化，则抛出一个 ReferenceError 异常
     */
    GetBindingValue(N, S) {
        //令 envRec 为函数调用时对应的声明式环境记录项
        let envRec = this;
        //执行断言：envRec 必须有 N 的绑定。
        console.assert(this.HasBinding(N));
        //如果 envRec 中 N 的绑定是一个未初始化的不可变绑定，则如果 S 为 false，返回 undefined，否则抛出一个 ReferenceError 异常。
        const V = envRec[N];
        const propertyDescriptor = Object.getOwnPropertyDescriptor(envRec, N);
        if (!propertyDescriptor.uninitialized) {
            if (!S) return V;
            throw new Error(`ReferenceError: Cannot access '${N}' before initialization`);
        }
        //否则返回 envRec 中与 N 绑定的值
        return V;
    }
    /**
     * 从环境记录项中删除一个绑定
     * @param {*} N 绑定的名称 如果 N 指定的绑定存在，将其删除并返回 true。如果绑定存在但无法删除则返回false。如果绑定不存在则返回 true
     */
    DeleteBinding(N) {
        //令 envRec 为函数调用时对应的声明式环境记录项
        let envRec = this;
        if (!this.HasBinding(N)) {
            return true;
        }
        const propertyDescriptor = Object.getOwnPropertyDescriptor(envRec, N);
        if (!propertyDescriptor.configurable) {
            return false;
        }
        delete envRec[N];
        return true;
    }
    /**
     * 当从该环境记录项的绑定中获取一个函数对象并且调用时，该方法返回该函数对象使用的 this 对象的值。
     */
    ImplicitThisValue() {
        return undefined;
    }
    /**
    * 创建一个不可变绑定
    * @param {*} N 名称
    */
    CreateImmutableBinding(N) {
        //令 envRec 为函数调用时对应的声明式环境记录项
        let envRec = this;
        //执行断言：envRec 没有 N 的绑定。
        console.assert(!this.HasBinding(N));
        //在 envRec 中为 N 创建一个不可变绑定，并记录为未初始化
        Object.defineProperty(envRec, N, {
            value: undefined,
            uninitialized: true
        });
    }
    /**
     * 将当前名称为参数 N 的绑定的值修改为参数 V 指定的值
     * @param {*} N 当前名称
     * @param {*} V 绑定的值
     */
    InitializeImmutableBinding(N, V) {
        //令 envRec 为函数调用时对应的声明式环境记录项
        let envRec = this;
        //执行断言：envRec 没有 N 的绑定
        const propertyDescriptor = Object.getOwnPropertyDescriptor(envRec, N);
        console.assert(propertyDescriptor && propertyDescriptor.uninitialized);
        envRec[N] = V;
        propertyDescriptor.uninitialized = true;
    }

}
module.exports = DeclarativeEnvironmentRecords;
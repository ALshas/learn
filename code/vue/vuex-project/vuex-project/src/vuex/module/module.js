import { forEachValue } from "../util";

class Module {
    get namespaced() {
        return !!this._rawModule.namespaced
    }
    constructor(rawModule) {
        // _raw: rootModule,   //原来的模块（用户定义的）
        // _children: {},       // 模块的儿子
        // state: rootModule.state  //当前模块的状态

        this._children = {};
        this._rawModule = rawModule;
        this.state = rawModule.state
    }
    getChild(key) {
        return this._children[key];
    }
    addChild(key, module) {
        this._children[key] = module
    }
    forEachMutation(fn) {
        if (this._rawModule.mutations) {
            forEachValue(this._rawModule.mutations, fn)
        }
    }
    forEachAction(fn) {
        if (this._rawModule.actions) {
            forEachValue(this._rawModule.actions, fn)
        }
    }
    forEachGetter(fn) {
        if (this._rawModule.getters) {
            forEachValue(this._rawModule.getters, fn)
        }
    }
    forEachChild(fn) {
        forEachValue(this._children, fn);
    }
}
export default Module
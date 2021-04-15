import { forEachValue } from "../util";
import Module from './module'
class ModuleCollection {
    constructor(options) {
        this.register([], options)
    }
    getNamespaced(path) {
        let root = this.root; //从根模块找起来
        return path.reduce((str, key) => {
            root = root.getChild(key); // 不停的去找当前的模块
            return str + (root.namespaced ? key + '/' : '')
        }, '')  //参数就是一个字符串
    }
    register(path, rootModule) { //path是一个数组  [a, c]   [b]
        let newModule = new Module(rootModule)
        if (path.length == 0) {
            //是根模块
            this.root = newModule;   //this.root是树根
        } else {
            let parent = path.slice(0, -1).reduce((memo, current) => {
                // return memo._children[current];
                return memo.getChild(current)
            }, this.root);
            // parent._children[path[path.length - 1]] = newModule;
            parent.addChild(path[path.length - 1], newModule)
        }
        if (rootModule.modules) {
            forEachValue(rootModule.modules, (module, moduleName) => {
                this.register(path.concat(moduleName), module);
            })
        }
    }
}
export default ModuleCollection
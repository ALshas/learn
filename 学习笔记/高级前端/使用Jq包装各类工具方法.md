```js
(function () {
    "use strict";
    var getProto = Object.getPrototypeOf,
        class2type = {},
        toString = class2type.toString,
        hasOwn = class2type.hasOwnProperty,
        fnToString = hasOwn.toString,
        ObjectFunctionString = fnToString.call(Object);

    // 专门进行数据类型检测的办法 
    var toType = function toType(obj) {
        if (obj == null) return obj + "";
        if (typeof obj !== "object" && typeof obj !== "function") return typeof obj;
        var reg = /^\[object ([0-9A-Za-z]+)\]$/,
            value = reg.exec(toString.call(obj))[1] || "object";
        return value.toLowerCase();
    };

    // 检测是否为一个函数
    var isFunction = function isFunction(obj) {
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    };

    // 检测是否为一个window对象
    var isWindow = function isWindow(obj) {
        return obj != null && obj === obj.window;
    };

    // 检测是否为数组或者类数组
    var isArrayLike = function isArrayLike(obj) {
        var length = !!obj && "length" in obj && obj.length,
            type = toType(obj);
        if (isFunction(obj) || isWindow(obj)) return false;
        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && (length - 1) in obj;
    };

    // 检测是否为纯粹的对象：直属类是Object 或者 obj.__proto__===Object.prototype（数组/正则等都不是）
    var isPlainObject = function isPlainObject(obj) {
        var proto, Ctor;
        if (!obj || toType(obj) !== "object") return false;
        proto = getProto(obj);
        if (!proto) return true;
        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
    };

    // 检测是否为空对象
    var isEmptyObject = function isEmptyObject(obj) {
        if (obj == null) return false;
        var keys = Object.keys(obj);
        if (typeof Symbol !== "undefined") {
            keys = keys.concat(Object.getOwnPropertySymbols(obj));
        }
        return keys.length === 0;
    };

    // 检测是否为数字
    var isNumeric = function isNumeric(obj) {
        var type = toType(obj);
        return (type === "number" || type === "string") && !isNaN(+obj);
    };

    // 函数防抖
    var debounce = function debounce(func, wait, immediate) {
        if (typeof func !== "function") throw new TypeError('func must be required and be an function!');
        if (typeof wait === "boolean") {
            immediate = wait;
            wait = 300;
        }
        if (typeof wait !== "number") wait = 300;
        if (typeof immediate !== "boolean") immediate = false;
        var timer = null,
            result;
        return function proxy() {
            var runNow = !timer && immediate,
                params = [].slice.call(arguments),
                self = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(function () {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                };
                !immediate ? result = func.apply(self, params) : null;
            }, wait);
            runNow ? result = func.apply(self, params) : null;
            return result;
        };
    };

    // 函数节流
    var throttle = function throttle(func, wait) {
        if (typeof func !== "function") throw new TypeError('func must be required and be an function!');
        if (typeof wait !== "number") wait = 300;
        var timer = null,
            previous = 0,
            result;
        return function proxy() {
            var now = +new Date(),
                remaining = wait - (now - previous),
                self = this,
                params = [].slice.call(arguments);
            if (remaining <= 0) {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                result = func.apply(self, params);
                previous = +new Date();
            } else if (!timer) {
                timer = setTimeout(function () {
                    if (timer) {
                        clearTimeout(timer);
                        timer = null;
                    }
                    result = func.apply(self, params);
                    previous = +new Date();
                }, remaining);
            }
            return result;
        };
    };

    // 遍历数组/类数组/对象「支持回调函数返回值处理：返回false则结束循环，这是内置方法forEach/map不具备的」
    var each = function each(obj, callback) {
        typeof callback !== "function" ? callback = Function.prototype : null;
        var length,
            i = 0,
            keys = [];
        if (isArrayLike(obj)) {
            // 数组或者类数组
            length = obj.length;
            for (; i < length; i++) {
                var item = obj[i],
                    result = callback.call(item, item, i);
                if (result === false) break;
            }
        } else {
            // 对象
            keys = Object.keys(obj);
            typeof Symbol !== "undefined" ? keys = keys.concat(Object.getOwnPropertySymbols(obj)) : null;
            i = 0;
            length = keys.length;
            for (; i < length; i++) {
                var key = keys[i],
                    value = obj[key];
                if (callback.call(value, value, key) === false) break;
            }
        }
        return obj;
    };

    // 实现数组和对象深/浅合并
    var merge = function merge() {
        var options,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            treated = arguments[length - 1],
            deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[i] || {};
            i++;
        }

        if (Array.isArray(treated) && treated.treated) {
            // 传递了记录已经处理过的内容的集合
            // 后期循环的时候少循环处理一项
            length--;
        } else {
            // 没传递，最后传递的这个值，不是用来存储处理过的内容，而是进行合并比较的
            treated = [];
            treated.treated = true;
        }

        if (typeof target !== "object" && !isFunction(target)) target = {};
        for (; i < length; i++) {
            options = arguments[i];
            if (options == null) continue;

            // 放置死递归处理的操作
            if (treated.indexOf(options) > -1) return options;
            treated.push(options);

            each(options, function (copy, name) {
                var copyIsArray = Array.isArray(copy),
                    copyIsObject = isPlainObject(copy),
                    src = target[name],
                    clone = src;
                if (deep && copy && (copyIsArray || copyIsObject)) {
                    if (copyIsArray && !Array.isArray(src)) clone = [];
                    if (copyIsObject && !isPlainObject(src)) clone = {};
                    target[name] = merge(deep, clone, copy, treated);
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            });
        }
        return target;
    };

    // 实现数组和对象深/浅拷贝
    var clone = function clone() {
        var target = arguments[0],
            deep = false,
            type,
            isArray,
            isObject,
            result,
            Ctor,
            treated = arguments[arguments.length - 1];
        !Array.isArray(treated) || !treated.treated ? (treated = [], treated.treated = true) : null;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1];
        }
        
        // 防止死递归的处理
        if (treated.indexOf(target) > -1) return target;
        treated.push(target);

        // 校验类型
        type = toType(target);
        isArray = Array.isArray(target);
        isObject = isPlainObject(target);

        // 特殊值的拷贝
        if (target == null) return target;
        Ctor = target.constructor;
        if (/^(regexp|date)$/i.test(type)) return new Ctor(target);
        if (/^(error)$/i.test(type)) return new Ctor(target.message);
        if (/^(function|generatorfunction)$/i.test(type)) {
            return function proxy() {
                var args = Array.from(arguments);
                return target.apply(this, args);
            };
        }
        if (!isArray && !isObject) return target;

        // 如果是数组/对象，我们依次迭代赋值给新的数组/对象
        result = new Ctor();
        each(target, function (copy, name) {
            if (deep) {
                // 深拷贝
                result[name] = clone(deep, copy, treated);
                return;
            }
            // 浅拷贝
            result[name] = copy;
        });
        return result;
    };


    /* 暴露API */
    var utils = {
        toType: toType,
        isFunction: isFunction,
        isWindow: isWindow,
        isArrayLike: isArrayLike,
        isPlainObject: isPlainObject,
        isEmptyObject: isEmptyObject,
        isNumeric: isNumeric,
        debounce: debounce,
        throttle: throttle,
        each: each,
        merge: merge,
        clone: clone
    };

    // 转移_的使用权
    var $_ = window._;
    utils.noConflict = function noConflict() {
        if (window._ === utils) {
            window._ = $_;
        }
        return utils;
    };

    if (typeof window !== "undefined") {
        window._ = window.$utils = utils;
    }
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = utils;
    }
})();
```


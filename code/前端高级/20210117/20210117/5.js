/*
 * JS代码运行的环境:
 *   + 浏览器 OR Hybrid -> webview
 *   + NODE
 *   + webpack
 *   + ... 
 */
(function (global, factory) {
    // global -> 在浏览器环境下运行(或者webview等)它的值是window，在NODE环境下运行值可能是global
    "use strict";
    if (typeof module === "object" && typeof module.exports === "object") {
        // 支持CommonJS模块的导入导出规范「NODE OR WEBPACK」
        //   + global.document 存在说明是WEBPACK环境「global->window」
        module.exports = global.document ?
            factory(global, true) :
            // 在其余的没有window的环境下，我们导出一个函数，后期执行函数，如果我们可以传递一个window进来，也能正常使用，否则报错
            function (w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };
    } else {
        // 浏览器或者webview中基于<script>直接导入的
        //  + global：window
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function factory(window, noGlobal) {
    // 直接SCRIPT导入的
    //   + window:window  noGlobal:undefined
    // 基于WEBPACK中的CommonJS/ES6Module规范导入的JQ
    //   + window:window  noGlobal:true
    "use strict";
    var version = "3.5.1",
        jQuery = function (selector, context) {
            return new jQuery.fn.init(selector, context);
        };

    // 导入JQ「执行代码」&& 暴露给全局之前
    var _$ = window.$;
    jQuery.noConflict = function () {
        if (window.$ === jQuery) {
            window.$ = _$;
        }
        return jQuery;
    };

    // 浏览器直接导入
    //   + $() 或者 jQuery() -> 都是把内部的jQuery方法执行
    if (typeof noGlobal === "undefined") {
        window.jQuery = window.$ = jQuery;
    }

    // 基于WEBPACK处理
    //   + module.exports=jQuery;
    return jQuery;
});
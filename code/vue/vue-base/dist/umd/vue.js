(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    /*
     * @Author: liusha
     * @LastModifiedBy: liusha
     * @LastEditTime: 2021-02-25 17:18:15
     * @Date: 2021-02-25 17:03:25
     */
    function initGlobalApi(Vue) {
      Vue.mixin = function (mixin) {
        console.log(mixin);
      };
    }

    function _typeof(obj) {
      "@babel/helpers - typeof";

      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function (obj) {
          return typeof obj;
        };
      } else {
        _typeof = function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
      }

      return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }

    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }

    function _iterableToArrayLimit(arr, i) {
      if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }

    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

      return arr2;
    }

    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    /*
     * @Author: liusha
     * @LastModifiedBy: liusha
     * @LastEditTime: 2021-02-07 15:17:08
     * @Date: 2021-02-04 17:58:05
     */
    //编写： <div id='app' style='color: red'>hello {{name}}<span>hello</span></div>
    //结果： render(){
    //     return _c('div', {id: 'app', style: {color: red}}, _v('hello'+ _s(name)), _c('span', null,_v('hello')))
    // }
    var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{ xxx }}
    // 生成属性

    function genProps(attrs) {
      var str = '';

      for (var i = 0; i < attrs.length; i++) {
        var attr = attrs[i];

        if (attr.name === 'style') {
          (function () {
            var obj = {};
            attr.value.split(';').forEach(function (item) {
              var _item$split = item.split(':'),
                  _item$split2 = _slicedToArray(_item$split, 2),
                  key = _item$split2[0],
                  value = _item$split2[1];

              obj[key] = value;
            });
            attr.value = obj;
          })();
        }

        str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ", ");
      }

      var _str = str.substring(0, str.lastIndexOf(','));

      return "{".concat(_str, "}");
    }

    function getChildren(el) {
      // 生成儿子节点
      var children = el.children;

      if (children) {
        return "".concat(children.map(function (c) {
          return gen(c);
        }).join(','));
      } else {
        return false;
      }
    }

    function gen(node) {
      if (node.type == 1) {
        return generate(node); // 产生元素节点的字符串
      } else {
        var text = node.text; //获取文本
        // 如果是普通文本 不带{{}}的

        if (!defaultTagRE.test(text)) {
          return "_v(".concat(JSON.stringify(text), ")");
        }

        var lastIndex = defaultTagRE.lastIndex = 0; //如果正则是全局模式 每次使用前置为0

        var tokens = []; //存放每一段的代码

        var match, index; //每次匹配到的结果

        while (match = defaultTagRE.exec(text)) {
          index = match.index; //保存匹配到的索引

          if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)));
          }

          tokens.push("_s(".concat(match[1].trim(), ")"));
          lastIndex = index + match[0].length;
        }

        if (lastIndex < text.length) {
          tokens.push(JSON.stringify(text.slice(lastIndex)));
        }

        return "_v(".concat(tokens.join('+'), ")");
      }
    }

    function generate(el) {
      var children = getChildren(el);
      var code = "_c('".concat(el.tag, "',").concat(el.attrs.length ? "".concat(genProps(el.attrs)) : 'undefined').concat(children ? ",".concat(children) : '', ")");
      return code;
    }

    /*
     * @Author: liusha
     * @LastModifiedBy: liusha
     * @LastEditTime: 2021-02-04 17:56:13
     * @Date: 2021-02-04 17:55:39
     */
    var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; //匹配标签名<aa-123>

    var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); //?:匹配不捕获  <my:xx

    var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 标签开头的正则 捕获的内容是标签名

    var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); // 匹配标签结尾的 </div>

    var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的

    var startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >
    // 数据结构 树 栈 链表 队列

    function parseHTML(html) {
      function createASTElement(tagName, attrs) {
        return {
          tag: tagName,
          //标签名
          type: 1,
          //元素类型是1
          children: [],
          //孩子列表
          attrs: attrs,
          //属性
          parent: null //父元素

        };
      }

      var root; //树根

      var currentParent; //记录

      var stack = []; //判断标签是否符合预期
      // 解析开始标签

      function start(tagName, attrs) {
        var element = createASTElement(tagName, attrs);

        if (!root) {
          root = element;
        }

        currentParent = element; //当前解析的标签 保存起来

        stack.push(element); //将生成的ast元素放到栈中
      } // 解析结束标签 


      function end(tagName) {
        //在结尾标签处 创建父子关系
        var element = stack.pop(); //取出栈中最后一个

        currentParent = stack[stack.length - 1];

        if (currentParent) {
          // 有值 就去判断是谁的父亲
          // 在闭合时 可以知道这个标签的父亲是谁
          element.parent = currentParent;
          currentParent.children.push(element);
        }
      } // 标签文本


      function chars(text) {
        text = text.replace(/\s/g, ''); //替换文本空字符

        if (text) {
          currentParent.children.push({
            type: 3,
            //文本是3 元素是1
            text: text
          });
        }
      }

      while (html) {
        //    只要Html不为空 就一直解析
        // 当前第一个属性是不是以尖叫号开头
        var textEnd = html.indexOf('<');

        if (textEnd == 0) {
          // 肯定是标签
          var startTagMatch = parseStartTag(); //开始标签匹配的结果

          if (startTagMatch) {
            start(startTagMatch.tagName, startTagMatch.attrs);
            continue; //如果匹配到了开始标签 就结束走下一步
          }

          var endTagMatch = html.match(endTag); // 匹配到了结束标签

          if (endTagMatch) {
            advance(endTagMatch[0].length);
            end(endTagMatch[1]); //将结束标签传入

            continue;
          }
        } // 表示是个文本 


        var text = void 0;

        if (textEnd >= 0) {
          text = html.substring(0, textEnd);
        }

        if (text) {
          advance(text.length);
          chars(text);
        }
      } // 前进


      function advance(n) {
        //将字符串进行截取操作 再更新Html内容
        html = html.substring(n);
      } // 解析开始标签


      function parseStartTag() {
        // 匹配标签开头的正则
        var start = html.match(startTagOpen); ////{0: "<div" 1: "div"}

        if (start) {
          // 制作结构  0是匹配字符串 1 是匹配分组(标签名)
          var match = {
            tagName: start[1],
            attrs: []
          };
          advance(start[0].length); // 删除开始标签  此时的html id="app"> <div id="my">hello{{name}}<span>xixi</span></div></div>
          // 如果直接是闭合标签 说明没有属性

          var _end;

          var attr; // 不是结尾标签且能匹配到属性

          while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
            match.attrs.push({
              name: attr[1],
              value: attr[3] || attr[4] || attr[5]
            }); ////match.attrs输出 [0: name: "id" value: "app"]

            advance(attr[0].length); //去掉当前属性
          }

          if (_end) {
            //去掉>
            advance(_end[0].length);
            return match;
          }
        }
      }

      return root;
    }

    /*
     * @Author: liusha
     * @LastModifiedBy: liusha
     * @LastEditTime: 2021-02-07 15:17:28
     * @Date: 2021-02-04 14:49:36
     */
    function compileToFunctions(template) {
      //html模板-》render函数
      //ast语法树
      //虚拟dom 是用对象来描述节点的
      // ast是对语法转义 虚拟dom是对结构转义 
      // 1 需要将html代码转化成为‘ast'语法树 可以用ast树来描述语言本身
      // 启前端必须要掌握的数据结构（树）
      var ast = parseHTML(template); // 2 优化静态节点
      // 3 通过这棵树 重新生成代码

      var code = generate(ast); // 4  将字符串转成函数
      // 限制取值范围 通过with来进行取值 稍后调用render函数就可以通过改变this 让这个函数内部取到结果
      // let render = `with(this){return ${code}}`;

      console.log(code);
      var renderFn = new Function(code);
      console.log(renderFn);
      return renderFn; // let obj = { a: 1, b: 2 }
      // with (obj) {
      //     console.log(a, b)//输出1 2
      // }
    }

    /*
     * @Author: liusha
     * @LastModifiedBy: liusha
     * @LastEditTime: 2021-02-07 18:03:49
     * @Date: 2021-02-07 17:01:21
     */
    function patch(oldVnode, vnode) {
      //   将虚拟节点转化成真实节点
      //   创建一个元素
      var el = createElm(vnode); //产生真实的dom

      var parentElm = oldVnode.parentNode; // 获取老的app的父亲=》body

      parentElm.insertBefore(el, oldVnode, nextSibling); //当前的真实元素插入到app的后面

      parentElm.removeChild(oldVnode); // 删除老的节点
    }

    function createElm(vnode) {
      var tag = vnode.tag,
          children = vnode.children;
          vnode.key;
          vnode.data;
          var text = vnode.text;

      if (typeof tag == 'string') {
        vnode.el = document.createElement(tag);
        children.forEach(function (child) {
          vnode.el.appendChild(createElm(child));
        });
      } else {
        // 创建文件 放到vnode.el上
        vnode.el = document.createTextNode(text);
      }

      return vnode.el;
    } // vue 的渲染流程=》 先初始化数据=》将模板进行编译 =》 render函数=-》生成虚拟节点=》生成真实的dom=>放到页面

    /*
     * @Author: liusha
     * @LastModifiedBy: liusha
     * @LastEditTime: 2021-02-07 17:08:01
     * @Date: 2021-02-07 15:27:03
     */
    function lifecycleMixin(Vue) {
      Vue.prototype._update = function (vnode) {
        var vm = this;
        patch(vm, $el);
      };
    }
    function mountComponent(vm, el) {
      // 调用render方法去渲染 el属性
      //先调用render方法 创建虚拟节点 再将虚拟节点渲染到页面上
      // vm.update()是将虚拟节点变成真实节点
      vm._update(vm._render());
    }

    function proxy(vm, data, key) {
      Object.defineProperty(vm, key, {
        get: function get() {
          return vm[data][key]; // vm._Data.a
        },
        set: function set(newValue) {
          vm[data][key] = newValue;
        }
      });
    }
    function defineProperty(target, key, value) {
      Object.defineProperty(target, key, {
        enumerable: false,
        configurable: false,
        value: value
      });
    }

    /*
     * @Author: liusha
     * @LastModifiedBy: liusha
     * @LastEditTime: 2021-02-03 17:19:03
     * @Date: 2021-02-02 18:07:12
     */
    // 拿到数组原型上的方法（原来的方法）
    var oldArrayProtoMethods = Array.prototype; // 继承一下  相当于 arrayMethods.__proto__ = oldArrayProtoMethods

    var arrayMethods = Object.create(oldArrayProtoMethods);
    var methods = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'];
    methods.forEach(function (method) {
      arrayMethods[method] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var result = oldArrayProtoMethods[method].apply(this, args);
        var ob = this.__ob__; // 这个this指向value
        // 有可能数组中有对象

        var inserted;

        switch (method) {
          case 'push': //arr.push({a: 1}, {b:2})

          case 'unshift':
            //这两个方法都是追加的意思 追加的内容可能是对象类型 应该再次进行劫持 
            inserted = args;
            break;

          case 'splice':
            inserted = args.slice(2);
        }

        if (inserted) ob.observeArray(inserted); // 对新增的每一项进行观测

        return result;
      };
    });

    var Observer = /*#__PURE__*/function () {
      function Observer(value) {
        _classCallCheck(this, Observer);

        // 使用defineProperty重新定义属性
        // 判断一个对象是否被观测过 看他有没有__ob__这个属性
        defineProperty(value, '__ob__', this);

        if (Array.isArray(value)) {
          // 我希望调用push shift unshift splice sort reberse pop
          // 这种叫做函数劫持  切片编程
          value.__proto__ = arrayMethods; // 重写数组原型方法
          // 观测数组中的对象类型 对象变化也要做一些事

          this.observeArray(value);
        } else {
          this.walk(value);
        }
      }

      _createClass(Observer, [{
        key: "observeArray",
        value: function observeArray(value) {
          for (var i = 0; i < value.length; i++) {
            observe(value[i]);
          }
        }
      }, {
        key: "walk",
        value: function walk(data) {
          var keys = Object.keys(data); //H获取对象的Key

          keys.forEach(function (key) {
            defineReactive(data, key, data[key]); //Vue.util.defineReactive;
          });
        }
      }]);

      return Observer;
    }();

    function defineReactive(data, key, value) {
      observe(value);
      Object.defineProperty(data, key, {
        get: function get() {
          console.log('获取值');
          return value;
        },
        set: function set(newValue) {
          if (newValue == value) return;
          observe(newValue); // 如果用户将值改为对象继续监控

          value = newValue;
          console.log('设置值');
        }
      });
    }

    function observe(data) {
      // typeof null 也是Object
      // 不能不是对象 并且不是null
      if (_typeof(data) !== 'object' || data == null) {
        return;
      }

      if (data.__ob__) {
        return data;
      }

      return new Observer(data);
    }

    /*
     * @Author: liusha
     * @LastModifiedBy: liusha
     * @LastEditTime: 2021-02-03 17:41:23
     * @Date: 2021-02-01 15:33:01
     */

    function initState(vm) {
      //vm.$options
      var opts = vm.$options;

      if (opts.props) ;

      if (opts.methods) ;

      if (opts.data) {
        initData(vm);
      }

      if (opts.computed) ;

      if (opts.watch) ;
    }

    function initData(vm) {
      // 数据的初始化操作
      var data = vm.$options.data; // 为什么要call 因为data在new Vue中，属于Vue的，先在这里把它指向Vue

      data = vm._data = typeof data == 'function' ? data.call(vm) : data; // 数据的劫持方案  对象Object.defineProperty
      // 数组 是单独处理
      // 当我去vm上取属性时 帮我将属性的取值代理到vm._data上

      for (var key in data) {
        proxy(vm, '_data', key);
      }

      observe(data);
    }

    function initMixin(Vue) {
      Vue.prototype._init = function (options) {
        var vm = this;
        vm.$options = options; // 初始化状态(将数据做一个初始化的劫持  当我改变数据是应该更新视图)
        // vue组件中有很多状态 data  props watch cpmputed

        initState(vm); //初始化状态
        // vue里面核心特性 响应式数据原理
        // vue是一个什么框架 参考mvvm框架  不是mvvm框架  ，vue可以参考dom $ref 
        // mvvM不能跳过数据去更新视图
        //如果当前有el属性说明要渲染模板

        if (vm.$options.el) {
          vm.$mount(vm.$options.el);
        }
      };

      Vue.prototype.$mount = function (el) {
        //挂载操作
        var vm = this;
        var options = vm.$options;
        el = document.querySelector(el);
        vm.$el = el; //存好el
        // 先判断有没有render 没有就查找有没有emplate  没有temelate就查找有没有外部的html 赋值给template ,然后用template去生成一个render函数 
        // 且赋值给render

        if (!options.render) {
          //没有render 将template转成render方法
          var template = options.template;

          if (!template && el) {
            template = el.outerHTML; //outerHTML代表外层div iner代表里层
          } // 编译原理 将模板编译成render函数


          var render = compileToFunctions(template);
          options.render = render;
        } //渲染时用的都是这个render方法
        // 需要挂载这个组件


        mountComponent(vm);
      };
    }

    /*
     * @Author: liusha
     * @LastModifiedBy: liusha
     * @LastEditTime: 2021-02-07 16:57:11
     * @Date: 2021-02-07 15:36:05
     */
    function renderMixin(Vue) {
      // 用对象来描述dom的结构
      Vue.prototype._c = function () {
        // 创建虚拟dom元素
        return createElement.apply(void 0, arguments);
      };

      Vue.prototype._s = function (val) {
        // stringify
        return val == null ? '' : _typeof(val) == 'object' ? JSON.stringify(val) : val;
      };

      Vue.prototype._v = function (text) {
        //创建虚拟dom文本元素
        return createTextVnode(text);
      };

      Vue.prototype._render = function () {
        var vm = this;
        var render = vm.$options.render;
        console.log(render);
        var vnode = render.call(vm);
        return vnode;
      };
    }

    function createElement(tag) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
      }

      return vnode(tag, data, data.key, children);
    }

    function createTextVnode(text) {
      return vnode(undefined, undefined, undefined, undefined, text);
    } // 产生虚拟dom的


    function vnode(tag, data, key, children, text) {
      return {
        tag: tag,
        data: data,
        key: key,
        children: children,
        text: text
      };
    }

    /*
     * @Author: liusha
     * @LastModifiedBy: liusha
     * @LastEditTime: 2021-02-25 17:17:58
     * @Date: 2021-02-01 15:08:08
     */

    function Vue(options) {
      this._init(options); //入口方法 做初始化操作

    } // 写成一个个的插件对原型的扩展


    initMixin(Vue);
    lifecycleMixin(Vue); //混合生命周期 渲染

    renderMixin(Vue); //渲染
    // 静态方法 vue.component vue.directive vue.extend vue.minin....

    initGlobalApi(Vue);

    return Vue;

})));
//# sourceMappingURL=vue.js.map

### this基础题

##### 题1

```js
var num = 10;
var obj = {
    num: 20
}
obj.fn = (function (num) {
    this.num = num * 3;
    num++;
    return function (n) {
        this.num += n;
        num++;
        console.log(num) 
    }
})(obj.num)
var fn = obj.fn;
fn(5)  // 22
obj.fn(10);  // 23
console.log(num, obj.num) // 浏览器是65 30 node环境是10 30
```

![](../..\图片\js高级\this指向2.png)

##### 题2

```js
let obj = {
    name: 'xixi',
    fn: (function () {
        return function () {
            console.log(this.name)
        }
    })()
}
obj.fn();
let fn = obj.fn;
fn()
```

分析：

```js
/*
 * EC(G)
 *   变量提升:-- 
 * ----VO(G)
 *   obj = 0x000
 *   fn = 0x001
 */
let obj = {
    // fn:0x001
    fn: (function () {
        /* 
         * EC(AN)
         *   作用域链:<EC(AN),EC(G)>
         *   初始THIS:window
         *   形参赋值:--
         *   变量提升:--
         */
        return function () {
            console.log(this);
        }; //return 0x001; [[scope]]:EC(AN)
    })()
};
obj.fn(); //this->obj 
let fn = obj.fn;
fn(); //this->window 
```

##### 题3

```javascript
var fullName = 'language'
var obj = {
    fullName: 'javascript',
    prop: {
        getFullName: function () {
            return this.fullName;
        }
    }
}
console.log(obj.prop.getFullName())  //unfefined
var test = obj.prop.getFullName;
console.log(test())   // 浏览器 language  node是输出undefined
```

分析：

```javascript
var fullName = 'language'; //window.fullName='language'
var obj = { //window.obj=0x000
    fullName: 'javascript',
    prop: {
        getFullName: function () {
            return this.fullName;
        }
    }
};
console.log(obj.prop.getFullName()); //this->obj.prop   ->obj.prop.fullName  ->undefined
var test = obj.prop.getFullName;
console.log(test()); //this->window   ->window.fullName  ->'language' 
```

##### 题4

```js
var name = 'window';
var Tom = {
    name: 'Tom',
    show: function () {
        console.log(this.name)
    },
    wait: function () {
        var fun = this.show;
        fun()
    }
}
Tom.wait() // 浏览器输出window node环境输出undefined
```

分析：

```javascript
var name = 'window';
var Tom = {
    name: "Tom",
    show: function () {
        // this->window
        console.log(this.name); //->'window'
    },
    wait: function () {
        // this->Tom
        var fun = this.show; //fun=Tom.show
        fun();
    }
};
Tom.wait(); 
```

##### 题5

```javascript
window.val = 1;
var json = {
    val: 10, //20
    dbl: function () {
        this.val *= 2
    }
}
json.dbl();//20
var dbl = json.dbl;
dbl()  //2  这里是window.val == 2
json.dbl.call(window) 4
alert(window.val + json.val)
```

分析：

```javascript
window.val = 1; //val是GO的属性，“也可以说”是全局变量「val=100 / window.val=100」
var json = {
    // val是json对象的一个属性「json.val」
    val: 10,
    dbl: function () {
        this.val *= 2;
    }
}
json.dbl();
// this->json
// json.val *= 2  =>  json.val=json.val*2  => json.val=20
var dbl = json.dbl;
dbl();
// this->window
// window.val *= 2  =>  window.val=2
json.dbl.call(window);
// this->window 基于call方法强制改变方法中的this是window
// window.val *= 2  => window.val=4
alert(window.val + json.val); //=>“24” 
```

##### 题6

```js
(function () {
    var val = 1;
    var json = {
        val: 10,
        dbl: function () {
            val *= 2
        }
    }
    json.dbl()
    alert(json.val + val)
})()
```

分析：

```js
 (function () {
    // this->window
    var val = 1;
    var json = {
        val: 10,
        dbl: function () {
            // this->json
            // val不是json.val，是其上级上下文中的val变量
            val *= 2;  //由于是val所以只能去拿与Json同级别的val，想要拿json里面的val,必须是this.val或者是json.val等
        }
    };
    json.dbl();
    alert(json.val + val); //=>“12”
})(); 
```
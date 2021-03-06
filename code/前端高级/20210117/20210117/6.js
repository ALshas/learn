/*
 * 函数防抖和节流 
 *   我们自己规定频发触发的条件「例如：我们规定300MS内，只要触发两次就是频繁」
 *   防抖:防止“帕金森”，在频繁触发的模式下，我们只识别“一次”「识别第一次、也可以只识别最后一次」
 *   节流:降低触发的频率，它能识别“多次”「浏览器有自己的最快反应时间，例如：谷歌5~7ms IE10~17ms，这样在我们的疯狂操作下，谷歌浏览器的频率是5ms执行一次，节流是降低这个频率，比如我们设定频率是300ms，在疯狂触发的时候，我们控制间隔300ms才让其执行一次」
 *    
 *   点击事件一般以防抖为主「但是有些需求也是节流」
 *   键盘输入事件 或者 滚动条滚动事件 都是以节流为主
 */
let box = document.querySelector('.box');

/*
 * debounce:函数防抖
 *   @params
 *     func「function,required」:最后要执行的函数
 *     wait「number」:设定的频发触发的频率时间，默认值是300
 *     immediate「boolean」:设置是否是开始边界触发，默认值是false
 *   @return
 *     func执行的返回结果
 * update 2021/01/17 by zhouxiaotian
 */
function debounce(func, wait, immediate) {
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
        if (timer) clearTimeout(timer); //干掉之前的
        timer = setTimeout(function () {
            if (timer) { //当最新的结束后，把没用的这个定时器也干掉「良好的习惯」
                clearTimeout(timer);
                timer = null;
            };
            !immediate ? result = func.apply(self, params) : null;
        }, wait);
        runNow ? result = func.apply(self, params) : null;
        return result;
    };
}

/*
 * throttle:函数节流
 *   @params
 *     func「function,required」:最后要执行的函数
 *     wait「number」:设定的频发触发的频率时间，默认值是300
 *   @return
 *     func执行的返回结果
 * update 2021/01/17 by zhouxiaotian
 */
function throttle(func, wait) {
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
            // 立即执行即可
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            result = func.apply(self, params);
            previous = +new Date();
        } else if (!timer) {
            // 没有达到间隔时间，而且之前也没有设置过定时器，此时我们设置定时器，等到remaining后执行一次
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
}

function fn(ev) {
    // console.log('OK', ev, this);
    console.log('OK');
}
window.onscroll = throttle(fn, 500);
// document.body.onscroll=proxy


/* box.onclick = debounce(fn, 300, true);
// box.onclick=proxy  疯狂点击box，疯狂触发proxy，但是我们最终想执行的是fn，所以需要我们在proxy中，基于一些逻辑的处理，让fn只执行一次即可
 */


// 模拟获取数据
function queryData(callback) {
    setTimeout(() => {
        typeof callback === "function" ? callback('OK') : null;
    }, 1000);
}

/* let isRun = false;
box.onclick = function () {
    if (isRun) return;
    isRun = true;
    queryData(result => {
        console.log(result);
        isRun = false;
    });
}; */
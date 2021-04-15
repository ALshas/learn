var that
class Tab {
    constructor(id) {
        // 选取元素
        that = this
        this.main = document.querySelector(id)
        this.lis = this.main.querySelectorAll('li')
        this.sections = this.main.querySelectorAll('section')
        this.add = this.main.querySelector('.tabadd')
        this.ul = this.main.querySelector('.fisrstnav ul:first-child')
        this.fsection = this.main.querySelector('.tabscon')
        this.init()
    }
    init() {
        this.updateNode()
        this.add.onclick = this.addTab
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;

            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }
    //切换功能
    toggleTab() {
        that.clearClass()
        this.className = 'liactive'
        that.sections[this.index].className = 'conactive'
    }
    updateNode() {
        this.lis = this.main.querySelectorAll('li')
        this.sections = this.main.querySelectorAll('section')
        this.remove = this.main.querySelectorAll('.icon-guanbi')
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child')
    }
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = ''
            this.sections[i].className = ''
        }
    }
    //添加功能
    addTab() {
        that.clearClass()
        var random = Math.random()
        var li = '<li class="liactive"><span>测试1</span><span class="iconfont icon-guanbi">x</span></li>'
        var section = '<section class="conactive">测试' + random + '</section>'
        that.ul.insertAdjacentHTML('beforeend', li)
        that.fsection.insertAdjacentHTML('beforeend', section)
        that.init()
    }
    // 删除功能
    removeTab(e) {
        e.stopPropagation()   //阻止冒泡 防止触发Li  
        var index = this.parentNode.index
        that.lis[index].remove()
        that.sections[index].remove()
        that.init()
        // 删除的不是选择状态的li的时候，原来选中状态Li保持不变
        if (document.querySelector('.liactive')) return;
        // 当我们删除了选中状态的这个Li的时候,让他前一个Li处于选中状态
        index--;
        // 手动调用我们的点击事件,不需要鼠标触发
        that.lis[index] && that.lis[index].click();
    }
    // 修改功能
    editTab() {
        var str = this.innerHTML
        // 双击 禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.getSelection.empty()
        this.innerHTML = '<input type="text" />'
        var input = this.children[0]
        input.value = str
        input.select()   //文本框里面的文字处于选定状态
        input.onblur = function () {
            this.parentNode.innerHTML = this.value
        }
        // 按回车也可以把文本框里面的值给span
        input.onkeyup = function (e) {
            if (e.keyCode === 13) {
                // 手动调用表单失去焦点事件 不需要鼠标离开操作
                this.blur()
            }
        }
    }
}
new Tab('#tab')
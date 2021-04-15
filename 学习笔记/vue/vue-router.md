#### 1、谈谈你对vue-router的理解

vue-router是vue环境的一种路由
他有三种模式 hash模式、history模式（常用）node模式（不常用）
他有两种传参方式 params和query ,区别是：

1、query相当于get请求，页面跳转的时候，可以在地址栏看到请求参数，而params相当于post请求，参数不会再地址栏中显示

2、使用时命名也不同

hash模式和history的实现原理 hash模式是H5的HashHistory.push()实现，history是HTML5History.pushState()实现
最后再随便说几个钩子函数，并且说出钩子函数是干什么的





#### vue-router源码解析

安装工具  npm install @vue/cli -g

​                  快速运行工具 npm install -g @vue/cli-service global

​                  命令后面加上--force是强制覆盖的意思
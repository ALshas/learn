#### webpack配置

--save-dev  意思是在开发环境的时候安装

npx webpack 执行的是node_module里面 bin里面的文件，且可以指定开发模式和生产模式

webpack-cli解析用户传递的参数

```javascript
  "scripts": {
    "buildDev": "webpack --mode development",
    "build": "webpack --mode production"
  },
```

webpack配置文件默认叫webpack.config.js webpack.file.js

通过 --config 指定执行文件是哪一个

webpack-merge主要用来合并配置文件的 （webpack-merge插件）

如果是开发环境 要使用 webpack-dev-server

webpack-dev-server是在内存中打包的 不会产生实体文件
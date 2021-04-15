##### 1、基本配置

```javascript
mkdir ’项目名‘
npm init 初始化
创建git上传忽略文件.gitignore
```

2、安装配置文件

```javascript
1 安装react相关
npm i react react-dom @types/react @types/react-dom react-router-dom @types/react-router-dom react-transition-group @types/react-transition-group react-swipe @types/react-swipe antd qs @types/qs -S
2 安装webpack相关
npm i webpack webpack-cli webpack-dev-server html-webpack-plugin -D
3 TS相关库
npm i typescript ts-loader source-map-loader style-loader css-loader less-loader less url-loader file-loader -D
4 redux相关库
npm i redux react-redux @types/react-redux redux-thunk redux-logger @types/redux-logger redux-promise @types/redux-promise -S
5 react-router 链接库
npm i connected-react-router -S
6 axios
npm i express express-session body-parser cors axios -S
```

3、创建tsconfig.js且开启配置

```javascript
{
  "compilerOptions": {
    "target": "es5",                         
    "module": "commonjs",                     
    "jsx": "react",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    "sourceMap": true,                     /* Generates corresponding '.map' file. */
    "outDir": "./dist",                        /* Redirect output structure to the directory. */
    "strictNullChecks": true,              /* Enable strict null checks. */
    "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    "esModuleInterop": true,                  
    "skipLibCheck": true,                     /* Skip type checking of declaration files. */
    "forceConsistentCasingInFileNames": true  /* Disallow inconsistently-cased references to the same file. */
  },
  "include": [
    "./src/**/*"
  ]
}

```

4、创建webpack.config.js文件

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { webpack } = require('webpack');

module.exports = {
    mode: 'development',
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, 'dist')
    },
    devtool: "source-map",
    devServer:{
        hot: true,
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback:{          
            index: './index.html'  //webpack打包后生成到目标跟目录下面的Index.html文件
        }
    resolve: {
        alias: {   //别名
            "~": path.resolve(__dirname, 'node_modules'), //~代表当前根目录
            "@": path.resolve(__dirname)
        },
        extensions: [ '.tsx', '.ts', '.js', '.json' ]
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                enforce: "pre",
                test: /\.(j|t)sx?$/,
                loader: 'source-map-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(gif|svg|png|jpg|jpeg)$/,
                use: ['url-loader']
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
        }),
    ]
}
```

5、配置package.json文件

```javascript
"scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server"
 },
```

6、新建index.html 、index.tsx文件

```html
// index.tsx
import React from 'react';
import ReactDOM from 'react-dom'
ReactDOM.render(<h1>hello</h1>, document.getElementById('root'))
// ------------------------------------------------------------------------             
//index.tsx
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>              
```

7、运行

```javascript
npm run dev
```

---------------------------------------------------------------------

1、打开mongodb  启动服务

1、进入mongdb安装目录bin下

2、mongod --dbpath=C:\Users\admin\Desktop\..学习\LearningNotes\LearningNotes\code\ts\2020rt\db --port=9000
/*
 * @Author: your name
 * @Date: 2020-12-16 17:41:06
 * @LastEditTime: 2020-12-17 15:22:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\ts\2020rt\webpack.config.js
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HotModuleReplacementPlugin = require('html-webpack-plugin');
const { webpack } = require('webpack');

module.exports = {
    mode: 'development',
    entry: "./src/index.tsx",
    output: {
        // filename: '[name].bundle.js',
        // path: path.resolve(__dirname, "dist")
        filename: "bundle.js",
        path: path.join(__dirname, 'dist')
    },
    devtool: "source-map",
    devServer:{
        hot: true,
        // port: 9001,
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback:{          
            index: './index.html'  //webpack打包后生成到目标跟目录下面的Index.html文件
        }
        // open: true,
        // contentBase: "./dist"
    },
    resolve: {
        alias: {   //别名
            "~": path.resolve(__dirname, 'node_modules'), //~代表当前根目录
            "@": path.resolve(__dirname, 'src')
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
            // title: "hello dog",
            // hash: false,
            template: './src/index.html'
        }),
        // new webpack.HotModuleReplacementPlugin()
    ]
}
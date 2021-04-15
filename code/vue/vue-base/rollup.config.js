/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-01-17 18:50:52
 * @Date: 2021-01-15 13:13:46
 */
import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
export default {
    input: './src/index.js',
    output: {
        format: 'umd',  //模块化类型
        file: 'dist/umd/vue.js',
        name: 'Vue', //打包后的全局变量的名字
        sourcemap: true
    },
    plugins: [
        babel({
            exclude: 'node_modules/**', //预设 把es6转es5
        }),
        // process.env.ENV === 'development' ? serve({
        //     open: true,
        //     openPage: './public/index.html',
        //     port: 3000,
        //     contentBase: ''
        // }) : null
        serve({
            port: 3000,
            contentBase: '',
            openPage: '/index.html',  //打开页面
        })
    ]
}
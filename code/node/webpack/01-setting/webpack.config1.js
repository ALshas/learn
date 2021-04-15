// webpack是基于nodejs 语法commonjs规范
// const path = require("path");
// console.log("aaa", path.resolve(__dirname, "./src/index.js"));
// module.exports = {
//   mode: "development",
//   // 入口
//   entry: path.resolve(__dirname, "./src/index.js"), //当前根目录下的'./src/index.js文件
//   output: {
//     // 出口配置
//     filename: "bundle.js",
//     path: path.resolve(__dirname, "dist"),
//   },
// };

// 一般情况 分成两个模式 一个是开发模式
// 一个是生产模式
// 一个是基本配置
module.exports = (env) => {
  //env是环境变量
  //   console.log(env);
};

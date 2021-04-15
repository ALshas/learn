const path = require("path");
const merge = require("webpack-merge");
module.exports = (env) => {
  //env是环境变量
  //env是环境变量
  console.log(env);
  let isDev = env.development;
  const base = {
    entry: path.resolve(__dirname, "../src/index.js"),
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "../dist"),
    },
  };
  //   函数要返回配置文件，没返回会采用默认配置
  if (isDev) {
    return merge();
  }
};

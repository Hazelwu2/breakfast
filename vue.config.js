const timeStamp = new Date().getTime();
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?
    '/breakfast' :
    '/',
  configureWebpack: {
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.版本号】
      filename: `js/breakfast${timeStamp}.js`,
      chunkFilename: `js/breakfast${timeStamp}.js`
    }
  },
}
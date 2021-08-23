// 这里的webpack配置会和公共的webpack.config.js进行合并
module.exports = {
  // NODE_ENV：用于确定在开发环境还是生产环境
  // publicPath: './', //打包后的位置(如果不设置这个静态资源会报404)
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  // outputDir: 'dist', // 输出文件目录
  // assetsDir: 'static', // 放置静态资源
  configureWebpack: { // 别名配置
    resolve: {
      alias: {
        // html中使用时前面加~
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }

}
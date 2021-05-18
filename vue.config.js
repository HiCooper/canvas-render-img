module.exports = {
  lintOnSave: false,
  assetsDir: 'static',
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      console.log('正在打包...')
    } else {
      // 为开发环境修改配置...
      console.log('启动开发环境')
    }
  },
  devServer: {
    open: process.platform === 'darwin',
    port: 3001,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: '<url>',
        ws: true,
        changOrigin: true
      }
    },
    before: app => {
    }
  }
}

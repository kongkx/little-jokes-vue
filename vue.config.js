const fs = require('fs')
const path = require('path')
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './privkey.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, './cert.pem')),
    },
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://localhost',
        changeOrigin: false,
      },
    },
    disableHostCheck: true,
  },
  chainWebpack: config => {
    config.output.filename('[name].[hash].js').end()
  },
  pwa: {
    name: '小小笑话',
    themeColor: '#fdcd31',
    msTileColor: '#fdcd31',
    appleMobileWebAppCapable: 'yes',
    // appleMobileWebAppStatusBarStyle: 'black-translucent',
    manifestOptions: {
      background_color: '#fdcd31',
    },
  },
}

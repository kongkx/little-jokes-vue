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
        // target: 'http://localhost',
        target: 'https://jokes.kongkx.com',
        changeOrigin: false,
      },
    },
    disableHostCheck: true,
  },
  chainWebpack: config => {
    config.output.filename('[name].[hash].js').end()
    if (process.env.npm_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
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

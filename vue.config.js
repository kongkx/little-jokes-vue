// const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    https: true,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://localhost',
        // target: 'https://jokes.kongkx.com',
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
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/service-worker.js',
      importWorkboxFrom: 'local',
    },
    // appleMobileWebAppStatusBarStyle: 'black-translucent',
    manifestOptions: {
      background_color: '#fdcd31',
    },
  },
}

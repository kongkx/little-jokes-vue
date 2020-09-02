const fs = require("fs");
const path = require("path");
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "./privkey.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "./cert.pem"))
    },
    hotOnly: false,
    proxy: {
      "/api": {
        target: "http://localhost",
        changeOrigin: false
      }
    },
    disableHostCheck: true
  },
  chainWebpack: config => {
    config.output.filename("[name].[hash].js").end();
  }
  // configureWebpack: (config) => {
  //   config.output.filename = '[name].[hash].js'
  // },
  // configureWebpack: (config) => {
  //   if (process.env.NODE_ENV !== 'production') {
  //     return {
  //       plugins: [
  //         new BrowserSyncPlugin(
  //           // BrowserSync options
  //           {
  //             // browse to http://localhost:3000/ during development
  //             host: 'localhost',
  //             https: true,
  //             port: 4000,
  //             // proxy the Webpack Dev Server endpoint
  //             // (which should be serving on http://localhost:3100/)
  //             // through BrowserSync
  //             proxy: 'https://localhost:8080/',
  //           },
  //           // plugin options
  //           {
  //             // prevent BrowserSync from reloading the page
  //             // and let Webpack Dev Server take care of this
  //             reload: false,
  //           }
  //         ),
  //       ],
  //     }
  //   }
  // },
};

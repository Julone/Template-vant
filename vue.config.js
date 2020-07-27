const path = require('path');
const globalLessVariables = path.resolve(__dirname, './global.variables.less');
const resolve = (dir) => path.join(__dirname, dir);
const CompressionPlugin = require('compression-webpack-plugin');
var InDevEnv = process.env.NODE_ENV === 'development';
// var postPlugins = [require('postcss-px2rem')({ remUnit: 42, })];

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
  filenameHashing: true,
  assetsDir: 'static',
  productionSourceMap: false,
  configureWebpack: config => {
    if (InDevEnv) {
      config.devtool = 'source-map'
    } else {
      config.externals = {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex'
      }
      return {
        plugins: [new CompressionPlugin({
          test: /\.js$|\.html$|\.css$/,
          threshold: 1024, // 1kb == 1024
          deleteOriginalAssets: false
        })]
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('api', resolve('src/api/api_cur.js'))
  },
  css: {
    sourceMap: InDevEnv,
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${globalLessVariables}";`
        },
      },
      // postcss: {
      //  plugins: postPlugins
      // }
    }
  },
  devServer: {
    port: 8080,
    proxy: {
      '^/api': {
        target: 'http://tm.lilanz.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '^/exec.ashx': { // * cur
        target: 'http://tm.lilanz.com/qywx/webbll',
        changeOrigin: true,
      },
    }
  }
}
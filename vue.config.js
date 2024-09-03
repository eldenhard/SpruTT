const { defineConfig } = require('@vue/cli-service');

const TerserPlugin = require('terser-webpack-plugin')
module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true
            }
          }
        })
      ]
    }
  },
});
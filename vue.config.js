const { defineConfig } = require('@vue/cli-service')
const TerserPlugin = require('terser-webpack-plugin') // для минификации JavaScript
module.exports = defineConfig({
  transpileDependencies: true,

  // Настройка Webpack
  configureWebpack: {
    optimization: {
      minimize: true, // минимизация удаляются лишние пробелы и символы, переменные становятся короче, а записи сокращаются,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // удаляем все console.log
              drop_debugger: true
            },
            output: {
              comments: false // удаляем комментарии
            }
          }
        })
      ]
    }
  }
  
})

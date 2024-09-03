const { defineConfig } = require('@vue/cli-service');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // Удаляет console.log
              drop_debugger: true,
            },
            output: {
              comments: false,
            },
          },
          extractComments: false, // Удаляет комментарии из финальных файлов
        }),
      ],
    },
  },
});

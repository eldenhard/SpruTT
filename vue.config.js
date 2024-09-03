const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    optimization: {
      minimize: true,
      minimizer: [
        new (require('terser-webpack-plugin'))({
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
            output: {
              comments: false,
            },
          },
        }),
      ],
    },
  },
});
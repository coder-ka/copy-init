const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackConfig = require("./webpack.config");

module.exports = merge(webpackConfig, {
  devtool: "cheap-module-eval-source-map",
  devServer: {
    hot: true
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});

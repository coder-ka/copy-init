const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackConfig = require("./webpack.config");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(webpackConfig, {
  devtool: "source-map",
  optimization: {
    minimizer: [new TerserPlugin()]
  },
  plugins: [new CleanWebpackPlugin(), new webpack.HashedModuleIdsPlugin()]
});

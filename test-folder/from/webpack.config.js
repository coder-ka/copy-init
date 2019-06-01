const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * Webpack Configuration
 */
module.exports = {
  mode: process.env.NODE_ENV,

  entry: {
    main: "./src/index.js"
  },

  output: {
    path: `${__dirname}/dist`,
    filename: "[name].[hash].js"
  },

  resolve: {
    extensions: [".js", ".json", ".vue", ".scss"]
  },

  module: {
    rules: [
      // VUE
      {
        test: /\.vue$/,
        use: ["vue-loader"]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development"
            }
          },
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              includePaths: ["node_modules"]
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
    ]
  },

  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "initial"
    }
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`,
      inject: "body",
      // favicon: `${__dirname}/favicon.ico`,
      minify: {},
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      chunksSortMode: "dependency"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};

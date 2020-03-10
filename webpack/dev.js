/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const webpackMerge = require("webpack-merge");
const base = require("./base");
module.exports = webpackMerge(base, {
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(process.cwd(), "dist"),
    compress: true,
    historyApiFallback: true,
    inline: true
  }
});

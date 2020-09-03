/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const base = require("./base");
module.exports = merge(base, {
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|glb|glsl)$/i,
        use: [
          {
            loader: "file-loader",
            options: { name: "[path][name].[ext]" },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(process.cwd(), "dist"),
    compress: true,
    historyApiFallback: true,
    inline: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Playable",
      filename: "index.html",
      template: path.join(process.cwd(), "src", "index.ejs"),
    }),
  ],
});

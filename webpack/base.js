/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.join(process.cwd(), "src", "main.ts"),
  output: {
    path: path.join(process.cwd(), "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {}
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: "Playable",
      filename: "index.html",
      template: path.join(process.cwd(), "src", "index.ejs")
    })
  ]
};

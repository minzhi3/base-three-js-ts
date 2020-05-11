/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const webpackMerge = require("webpack-merge");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const base = require("./base");
module.exports = webpackMerge(base, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|glb)$/i,
        use: [
          {
            loader: "url-loader",
            options: {},
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Playable",
      filename: "index.html",
      template: path.join(process.cwd(), "src", "index.ejs"),
      inlineSource: ".(js|css)$",
    }),
    new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
  ],
});

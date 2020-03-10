/* eslint-disable @typescript-eslint/no-var-requires */

const webpackMerge = require("webpack-merge");
const base = require("./base");
module.exports = webpackMerge(base, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {}
          }
        ]
      }
    ]
  }
});

/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const base = require("./base");
module.exports = merge(base, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|glb|glsl)$/i,
        use: [
          {
            loader: "url-loader",
            options: {},
          },
        ],
      },
    ],
  },
  plugins: [new BundleAnalyzerPlugin()],
});

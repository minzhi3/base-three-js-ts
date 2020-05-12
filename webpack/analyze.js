/* eslint-disable @typescript-eslint/no-var-requires */
const webpackMerge = require("webpack-merge");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const base = require("./base");
module.exports = webpackMerge(base, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|glb|gltf)$/i,
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

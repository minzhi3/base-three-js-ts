/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  entry: path.join(process.cwd(), "src", "main.ts"),
  output: {
    path: path.join(process.cwd(), "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {},
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      fs: false,
      path: false
    }
  }
};

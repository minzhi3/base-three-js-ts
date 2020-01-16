// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  mode: "development",

  entry: "./src/main.ts",
  output: {
    path: path.join(__dirname, "web_files"),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "web_files"),
    compress: true,
    historyApiFallback: true,
    inline: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  }
};

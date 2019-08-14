const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// in webpack we use
// entry points : code to be copied
// outputs : copied code is rewritten here
// plugins : complex processing of input files ex: our html file

module.exports = {
  entry: ["babel-polyfill", "./src/js/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"), // must be an absolute path
    filename: "js/bundle.js"
  },
  devServer: {
    contentBase: "./dist"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html"
    })
  ],
  module: {
    rules: [
      // this rule uses the babel loader on all JS files besides files in the node_modules
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};

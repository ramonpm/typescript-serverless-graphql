const path = require("path");
const slsw = require("serverless-webpack");
var nodeExternals = require("webpack-node-externals");

const entries = {};

Object.keys(slsw.lib.entries).forEach(
  key => (entries[key] = ['./source-map-install.js', slsw.lib.entries[key]])
);

module.exports = {
  entry: entries,
  mode: "development",
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"]
  },
  // externals: ['aws-sdk'],
  externals: [nodeExternals()],
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js"
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      }
    ]
  }
};

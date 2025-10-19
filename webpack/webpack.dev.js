const path = require("path");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    hot: true,
    open: true,
    port: 8080,
    historyApiFallback: true,
    static: path.resolve(__dirname, "./dist"),
  },
  plugins: [new ReactRefreshWebpackPlugin()],
};

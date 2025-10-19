const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const production = process.env.NODE_ENV === "production";

module.exports = {
  entry: path.resolve(__dirname, "..", "./src/index.tsx"),

  output: {
    publicPath: "auto",
    path: path.resolve(__dirname, "..", "./dist"),
    filename: production ? "static/scripts/[name].[contenthash].js" : "static/scripts/[name].js",
  },

  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|webp)$/,
        type: "asset/resource",
        generator: {
          filename: "static/images/[hash][ext][query]",
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "static/fonts/[hash][ext][query]",
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack", "url-loader"],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          production ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: true,
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]__[hash:base64:5]",
                auto: /\.module\.\w+$/i,
                namedExport: false,
                exportLocalsConvention: "as-is",
              },
              importLoaders: 2,
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts", ".json"],
    alias: {
      components: path.resolve(__dirname, "..", "./src/components"),
      fonts: path.resolve(__dirname, "..", "./src/fonts"),
      src: path.resolve(__dirname, "..", "./src"),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "./public/index.html"),
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: production ? "static/styles/[name].[contenthash].css" : "static/styles/[name].css",
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
    }),
  ],
};

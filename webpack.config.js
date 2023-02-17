const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // подключили плагин

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src", "pages", "index.js"),
  devtool: "inline-source-map",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "build"),
    //clean: true, // очищаем папку билд от старого кода (тперь мы подключили плагин: CleanWebpackPlugin)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    port: 8080,
    open: true,
    hot: true,
    watchFiles: ["*/**/*.html"],
  },
};

const path = require("path");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackObfuscator = require("webpack-obfuscator");
const CopyPlugin = require("copy-webpack-plugin");

const ROOT_PATH = "../..";

module.exports = () => ({
  output: {
    chunkFilename: "[chunkhash].chunk.js",
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                mode: "local",
                localIdentName: "[hash:base64:5]",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                sourceMap: false,
                plugins: [["autoprefixer", {}]],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: false,
              additionalData: '@import "src/Styles/variables.scss";',
              sassOptions: {
                outputStyle: "compressed",
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, ROOT_PATH, "public"),
          globOptions: {
            ignore: ["**/index.ejs"],
          },
          to: path.resolve(__dirname, ROOT_PATH, "dist"),
        },
      ],
    }),
    new WebpackObfuscator(
      {
        rotateStringArray: true,
        reservedStrings: ["s*"],
      },
      ["*node_modules*"],
    ),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
          minChunks: 2,
          minSize: 0,
        },
      },
    },
    minimizer: [
      new CssMinimizerPlugin({
        test: /\.css$/i,
        parallel: true,
        minify: CssMinimizerPlugin.cleanCssMinify,
      }),
    ],
  },
});

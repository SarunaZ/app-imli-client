const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.ejs$/i,
        use: ["html-loader", "template-ejs-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.tsx|.ts?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
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
                localIdentName: "[name]_[local]__[hash:base64:5]",
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
              additionalData: `@import "src/Styles/variables.scss";`,
              sassOptions: {
                outputStyle: "compressed",
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: "./.env",
      systemvars: true,
    }),
    new WebpackManifestPlugin({
      fileName: "asset-manifest.json",
    }),
    new MiniCssExtractPlugin({
      filename: "[contenthash].css",
      chunkFilename: "[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "./public/index.ejs"),
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".scss"],
    modules: ["src", "node_modules"],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        test: /\.css$/i,
        parallel: true,
        minify: CssMinimizerPlugin.cleanCssMinify,
      }),
    ],
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, "./public"),
    },
    compress: true,
    port: 3000,
  },
};

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ROOT_PATH = "../../..";

module.exports = {
  entry: path.resolve(__dirname, ROOT_PATH,"src/index.tsx"),
  output: {
    path: path.resolve(__dirname, ROOT_PATH ,"dist"),
    filename: "[name].js",
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
              additionalData: "@import \"src/Styles/variables.scss\";",
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
    new Dotenv({
      path: ".env",
      systemvars: true,
    }),
    new WebpackManifestPlugin({
      fileName: "asset-manifest.json",
    }),
    new MiniCssExtractPlugin({
      filename: "[contenthash].css",
      chunkFilename: "[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, ROOT_PATH ,"public"),
          to: path.resolve(__dirname, ROOT_PATH ,"dist"),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, ROOT_PATH ,"public/index.ejs"),
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".scss"],
    modules: ["src", "node_modules"],
  },
}

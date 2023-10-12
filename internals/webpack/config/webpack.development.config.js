const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ROOT_PATH = "../../..";

module.exports = () => ({
  output: {
    chunkFilename: "[name].chunk.js",
  },
  watchOptions: {
    ignored: "/node_modules/",
    poll: 1000,
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
                localIdentName: "[name]__[local]",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                sourceMap: true,
                plugins: [["autoprefixer", {}]],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              additionalData: "@import \"src/Styles/variables.scss\";",
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css",
    }),
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, ROOT_PATH ,"public") ,
    },
    hot: true,
    compress: true,
    port: 3000,
  },
});

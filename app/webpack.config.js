const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(
      __dirname,
      "./dist"
    ),
    filename: "bundle.js",
    publicPath: '/'
  },
  module: {
    rules: [{
        test: /\.svg$/,
        use: ['@svgr/webpack'],
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
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                mode: "local",
                localIdentName: '[name]_[local]__[hash:base64:5]',
              },
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                sourceMap: false,
                plugins: [
                  ["autoprefixer", {}]
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
              additionalData: `@import "src/Styles/variables.scss";`
            }
          }
        ],
        exclude: /node_modules/
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      "template": "public/index.html",
    }),
    new Dotenv()
  ],
  resolve: {
    extensions: [
      ".tsx",
      ".ts",
      ".js",
      ".jsx",
      ".scss"
    ],
    modules: ["src", 'node_modules'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        "test": /\.tsx|.ts|.js?$/i,
        "exclude": /node_modules/,
      }),
    ],
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(
        __dirname,
        "./public"
      ),
    },
  },
};
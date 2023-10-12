const baseConfig = require('./internals/webpack/config/webpack.base.config');
const envConfig = env => require(`./internals/webpack/config/webpack.${env}.config`)(env)
const { merge } = require('webpack-merge');
const path = require("path");

module.exports = (_, { mode, preset } = { mode: "development", presets: [] }) => {
  console.log(mode, 'mode');
  return merge(
    baseConfig,
    envConfig(mode)
  ) 
}
// const ROOT_PATH = "./";

// module.exports = {
//   entry: path.resolve(__dirname, ROOT_PATH,"src/index.tsx"),
//   output: {
//     path: path.resolve(__dirname, ROOT_PATH ,"dist"),
//     filename: "[name].js",
//     publicPath: "/",
//   },
//   module: {
//     rules: [
//       {
//         test: /\.ejs$/i,
//         use: ["html-loader", "template-ejs-loader"],
//       },
//       {
//         test: /\.svg$/,
//         use: ["@svgr/webpack"],
//       },
//       {
//         test: /\.tsx|.ts?$/,
//         exclude: /node_modules/,
//         loader: "ts-loader",
//       },
//     ],
//   },
//   plugins: [
//     new Dotenv({
//       path: ".env",
//       systemvars: true,
//     }),
//     new WebpackManifestPlugin({
//       fileName: "asset-manifest.json",
//     }),
//     new CopyPlugin({
//       patterns: [
//         {
//           from: path.resolve(__dirname, ROOT_PATH ,"public"),
//           to: path.resolve(__dirname, ROOT_PATH ,"dist"),
//         },
//       ],
//     }),
//     new HtmlWebpackPlugin({
//       filename: "index.html",
//       template: path.resolve(__dirname, ROOT_PATH ,"public/index.ejs"),
//     }),
//   ],
//   resolve: {
//     extensions: [".tsx", ".ts", ".js", ".jsx", ".scss"],
//     modules: ["src", "node_modules"],
//   },
// }
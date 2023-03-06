const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.tsx|.ts|.js?$/,
      exclude: /node_modules/,
      loader: 'ts-loader',
    }, ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      test: /\.tsx|.ts|.js?$/i,
      exclude: /node_modules/,
    })],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, './public')
    }
  }
}
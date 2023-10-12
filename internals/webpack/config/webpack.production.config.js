const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const loadPresets = require("../presets/webpack-load-preset");

module.exports = () => {
  return {
    output: {
      chunkFilename: "[chunkhash].chunk.js",
    },
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            minSize: 0
          }
        }
      },
      minimizer: [
        new CssMinimizerPlugin({
          test: /\.css$/i,
          parallel: true,
          minify: CssMinimizerPlugin.cleanCssMinify,
        }),
      ],
    },
  }
};

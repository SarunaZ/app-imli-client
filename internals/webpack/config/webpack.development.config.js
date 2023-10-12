const path = require("path");

const ROOT_PATH = "../../..";

module.exports = () => {
  return {
    output: {
      chunkFilename: "[name].chunk.js",
    },
    watchOptions: {
      ignored: "/node_modules/",
      poll: 1000,
    },
    devServer: {
      historyApiFallback: true,
      static: {
        directory: path.resolve(__dirname, ROOT_PATH ,"public") ,
      },
      hot: true,
      compress: true,
      port: 3000,
    },
  }
};

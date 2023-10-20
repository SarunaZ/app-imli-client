const { merge } = require('webpack-merge');
const baseConfig = require('./internals/webpack/webpack.base.config');
const envConfig = env => require(`./internals/webpack/webpack.${env}.config`)(env)

module.exports = (_, { mode } = { mode: "development" }) => 
  merge(baseConfig, envConfig(mode)); 
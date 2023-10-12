const { merge } = require('webpack-merge');
const baseConfig = require('./internals/webpack/config/webpack.base.config');
const envConfig = env => require(`./internals/webpack/config/webpack.${env}.config`)(env)
// const loadPresets = require("../presets/webpack-load-preset");

module.exports = (_, { mode } = { mode: "development" }) => 
  merge(baseConfig, envConfig(mode)); 
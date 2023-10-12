const webpackMerge = require("webpack-merge");

/**
 * Loading different webpack configuration presets, so that its possible to make config modular
 * @param {object} env 
 * @returns webpackMerge
 */
module.exports = env => {
  const { presets } = env;
  console.log(env, 'env');
  const mergedPresets = [].concat(...[presets]);
  const mergedConfigs = mergedPresets.map(
    presetFile => require(`./presets/webpack.${presetFile}`)(env)
  );

  return webpackMerge({}, ...mergedConfigs);
};
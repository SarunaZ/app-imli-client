const { merge } = require("webpack-merge");
const baseConfig = require("./internals/webpack/webpack.base.config");
const envConfig = (mode, env) =>
  require(`./internals/webpack/webpack.${mode}${
    env.ssr === "true" ? "-ssr" : undefined
  }.config`)(mode);

module.exports = (env, { mode } = { mode: "development" }) => {
  return merge(baseConfig, envConfig(mode, env));
};

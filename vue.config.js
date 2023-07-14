/**
 * @typedef { import("@vue/cli-service").ProjectOptions } Options
 */

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

/** @type {Options} */
const options = {
  chainWebpack: config => {
    // config.output.filename("js/app.js");

    config.devServer.port(8088).end();

    config.resolve
      .plugin("tsconfig-paths-webpack-plugin")
      .use(TsconfigPathsPlugin, [
        {
          configFile: "tsconfig.json"
        }
      ]);
  }
};

module.exports = options;

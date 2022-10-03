/**
 * @typedef { import("@vue/cli-service").ProjectOptions } Options
 */

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const AliasPlugin = require("enhanced-resolve/lib/AliasPlugin");
const { DefinePlugin } = require("webpack");
const paths = require("./tsconfig.json").compilerOptions.paths;

const processedPaths = Object.keys(paths).map(key => ({
  name: key.replace("/*", ""),
  alias: paths[key].map(entry => entry.replace("/*", "").replace("./", ""))
}));

/** @type {Options} */
const options = {
  chainWebpack: config => {
    config.output.filename("js/app.js");

    config.devServer.port(8088).end();

    config.resolve
      .plugin("tsconfig-paths-webpack-plugin")
      .use(TsconfigPathsPlugin, [
        {
          configFile: "tsconfig.json"
        }
      ]);

    config.resolve
      .plugin("enhanced-resolve")
      .use(AliasPlugin, ["described-resolve", processedPaths, "resolve"]);
  }
};

module.exports = options;

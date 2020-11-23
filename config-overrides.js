/* eslint-disable */

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const removeWebpackPlugins = require("react-app-rewire-unplug");
const { TypedCssModulesPlugin } = require("typed-css-modules-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const {
  override,
  fixBabelImports,
  addLessLoader,
  addBundleVisualizer,
  addWebpackPlugin,
} = require('customize-cra');

const appBuild = path.resolve('build');

const proxyFile = path.resolve(__dirname, 'proxy');

const removePlugins = () => (config) => {
  return removeWebpackPlugins(config, config.mode, {
    pluginNames: [
      // "MiniCssExtractPlugin",
      "InlineChunkHtmlPlugin",
      "ManifestPlugin",
      "GenerateSW",
    ],
    verbose: true,
  });
};

const supportMjs = () => (config) => {
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto",
  });

  return config;
};

const webpackConfig = () => (config) => {
  config.optimization.splitChunks = {};
  config.optimization.runtimeChunk = false;
  config.devServer = {
    hot: true,
    compress: true,
    host: '127.0.0.1',
    localPort: 8080,
    open: true,
    overlay: { warnings: false, errors: true },
  };
  return config;
};

module.exports = override(
  // webpackConfig(),
  // supportMjs(),
  // removePlugins(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      cssModules: {
        localIdentName: "[path][name]__[local]--[hash:base64:5]",
      },
    },
  }),
  addBundleVisualizer({}, true),
  addWebpackPlugin(
    new TypedCssModulesPlugin({
      globPattern: "src/**/*.css",
      camelCase: "dashesOnly"
    })
  ),
)


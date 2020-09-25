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
      "MiniCssExtractPlugin",
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
  config.output = {
    ...config.output,
    path: appBuild,
    filename: path.join(
      process.env.npm_package_name,
      "js",
      `bundle.js`
    ),
    chunkFilename: path.join(
      process.env.npm_package_name,
      "js",
      "chunks",
      "[name].js"
    ),
  }
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

module.exports = {
  webpack: override(
    webpackConfig(),
    supportMjs(),
    removePlugins(),
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
    addWebpackPlugin(
      new MiniCssExtractPlugin({
        filename: path.join(
          process.env.npm_package_name,
          "css",
          `bundle.css`
        ),
        chunkFilename: path.join(
          process.env.npm_package_name,
          "css",
          "chunks",
          "[id].css"
        ),
      })
    ),
    addWebpackPlugin(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "locales",
            to: path.join(process.env.npm_package_name, 'locales'),
          },
        ],
      })
    )
  ),
  paths(paths) {
    paths.proxySetup = path.join(proxyFile, 'setupProxy.js');
    paths.appBuild = appBuild;
    return paths;
  },
};

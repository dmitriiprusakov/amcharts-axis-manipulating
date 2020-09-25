/* eslint-disable */
const http = require('http');
const express = require('express');
const webpack = require('webpack');

const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');

module.exports = function () {
  const app = express();

  app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*:*');
    res.set(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });

  const compiler = webpack(webpackConfig);
  app.use(webpackHotMiddleware(compiler));

  const proxyServer = http.createServer(app);
  proxyServer.listen(webpackConfig.devServer.localPort);
};


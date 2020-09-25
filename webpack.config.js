/* eslint-disable */
const { paths } = require('react-app-rewired');
// require normalized overrides
require('react-app-rewired/config-overrides');

const config = require(`${paths.scriptVersion}/config/webpack.config`);
const webpackConfig = config(process.env.NODE_ENV);

module.exports = webpackConfig;

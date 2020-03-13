// config/build.js
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod.config');

webpack(webpackConfig, () => { });
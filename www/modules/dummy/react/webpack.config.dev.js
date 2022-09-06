const { merge } = require('webpack-merge');
const {
  devJscTransformConfiguration,
  getDevConfiguration,
} = require('centreon-frontend/packages/frontend-config/webpack/patch/dev');

const getBaseConfig = require('./webpack.config');

module.exports = merge(
  getBaseConfig(devJscTransformConfiguration),
  getDevConfiguration(),
);

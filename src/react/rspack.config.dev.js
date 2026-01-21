const { merge } = require('webpack-merge');

const { getDevConfiguration } = require('@centreon/js-config/rspack/patch/dev');
const {
  devServerPlugins
} = require('@centreon/js-config/rspack/patch/devServer');

const baseConfig = require('./rspack.config');

module.exports = merge(baseConfig(true), getDevConfiguration(), {
  plugins: devServerPlugins
});

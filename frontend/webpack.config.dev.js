const { merge } = require('webpack-merge');

const frontendDevPatch = require('@centreon/frontend-core/webpack/patch/dev');

const baseConfig = require('./webpack.config');

module.exports = merge(baseConfig, frontendDevPatch);

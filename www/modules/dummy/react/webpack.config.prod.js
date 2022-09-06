const { merge } = require('webpack-merge');

const getBaseConfig = require('./webpack.config');

module.exports = merge(getBaseConfig(), {
  performance: {
    assetFilter: (assetFilename) => assetFilename.endsWith('.js'),
    hints: 'error',
    maxAssetSize: 840000,
    maxEntrypointSize: 1000000,
  },
});

const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.config');

module.exports = merge(baseConfig, {
  performance: {
    assetFilter: (assetFilename) => assetFilename.endsWith('.js'),
    maxAssetSize: 800000,
    maxEntrypointSize: 850000,
    hints: 'error',
  },
});

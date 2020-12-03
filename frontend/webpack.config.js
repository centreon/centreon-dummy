const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');

const frontendBase = require('@centreon/frontend-core/webpack/base');
const frontendModulePatch = require('@centreon/frontend-core/webpack/patch/module');

const baseOutputPath = path.resolve(`${__dirname}/../www/modules/dummy/static`);

module.exports = merge(
  frontendBase,
  frontendModulePatch('modules/dummy/static/'),
  {
    entry: {
      'pages/home/dummy/index': './pages/home/dummy/index.tsx',
      'hooks/header/topCounter/index': './hooks/header/topCounter/index.tsx',
    },
    output: {
      path: baseOutputPath,
      library: '[chunkhash:8]',
    },
    plugins: [
      new CleanWebpackPlugin({
        dry: false,
        dangerouslyAllowCleanPatternsOutsideProject: true, // because outputPath is not in the current context
        cleanOnceBeforeBuildPatterns: [
          `${baseOutputPath}/**/*.js`,
          `${baseOutputPath}/**/*.css`,
        ],
      }),
    ],
  },
);

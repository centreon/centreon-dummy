/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const path = require('node:path');

const { merge } = require('webpack-merge');
const rspack = require('@rspack/core');

const getBaseConfiguration = require('@centreon/js-config/rspack/base');
const getModuleConfiguration = require('@centreon/js-config/rspack/patch/module');

const moduleFederationConfiguration = require('./moduleFederation.json');

const baseOutputPath = path.resolve(`${__dirname}/../static`);

const moduleConfiguration = getModuleConfiguration({
  federatedComponentConfiguration: moduleFederationConfiguration,
  outputPath: baseOutputPath
});

module.exports = (enableCoverage = false) => {
  return merge(
    getBaseConfiguration({
      enableCoverage,
      moduleFederationConfig: {
        exposes: {
          './reactExample': './pages/reactExample/index'
        }
      },
      moduleName: 'centreonModuleBootstrap',
      postCssBase: './'
    }),
    moduleConfiguration,
    {
      entry: {
        'pages/reactExample/index': './pages/reactExample/index.tsx'
      },
      optimization: {
        splitChunks: false
      },
      plugins: [
        new rspack.ProvidePlugin({
          React: 'react'
        })
      ]
    }
  );
};

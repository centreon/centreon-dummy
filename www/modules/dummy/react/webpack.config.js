const path = require('path');

const { merge } = require('webpack-merge');
const getBaseConfiguration = require('centreon-frontend/packages/frontend-config/webpack/base');
const getModuleConfiguration = require('centreon-frontend/packages/frontend-config/webpack/patch/module');

const moduleFederationConfiguration = require('./moduleFederation.json');

const baseOutputPath = path.resolve(`${__dirname}../../static`);

const moduleConfiguration = getModuleConfiguration({
  assetPublicPath: 'modules/dummy/static/',
  federatedComponentConfiguration: moduleFederationConfiguration,
  outputPath: baseOutputPath,
});

const entries = {
  'hooks/header/topCounter/index': './hooks/header/topCounter/index.tsx',
  'pages/home/dummy/index': './pages/home/dummy/index.tsx',
};

module.exports = (jscTransformConfiguration) =>
  merge(
    getBaseConfiguration({
      jscTransformConfiguration,
      moduleFederationConfig: {
        exposes: {
          './dummy': './pages/home/dummy/index',
          './monitoring/hooks/topCounter': './hooks/header/topCounter/index',
        },
      },
      moduleName: 'centreonDummy',
    }),
    moduleConfiguration,
    {
      entry: entries,
    },
  );

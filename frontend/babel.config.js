module.exports = {
  extends: '@centreon/frontend-core/babel/typescript',
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ],
};

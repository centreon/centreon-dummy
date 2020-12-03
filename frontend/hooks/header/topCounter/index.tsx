import * as React from 'react';

import { StylesProvider, createGenerateClassName } from '@material-ui/core';

import Counter from './Counter';

const generateClassName = createGenerateClassName({
  seed: 'dummy-topCounter',
  productionPrefix: 'dummy-topCounter',
});

export default (): JSX.Element => (
  <StylesProvider generateClassName={generateClassName}>
    <Counter />
  </StylesProvider>
);

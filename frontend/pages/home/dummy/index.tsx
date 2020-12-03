import React from 'react';

import { createGenerateClassName, StylesProvider } from '@material-ui/core';

import Listing from './Listing';

// generate seed to avoid css class name collision
const generateClassName = createGenerateClassName({
  seed: 'dummy',
  productionPrefix: 'dummy',
});

const DummyPage = (): JSX.Element => (
  <StylesProvider generateClassName={generateClassName}>
    <Listing />
  </StylesProvider>
);

export default DummyPage;

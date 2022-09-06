import { FC } from 'react';

import { Module, QueryProvider } from '@centreon/ui';

import DummyListing from './Listing';

const DummyPage: FC = () => (
  <QueryProvider>
    <Module maxSnackbars={1} seedName="dummy">
      <DummyListing />
    </Module>
  </QueryProvider>
);

export default DummyPage;

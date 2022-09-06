import { Module, QueryProvider } from '@centreon/ui';

import Counter from './Counter';

export default (): JSX.Element => (
  <Module maxSnackbars={1} seedName="dummy-topcounter">
    <QueryProvider>
      <Counter />
    </QueryProvider>
  </Module>
);

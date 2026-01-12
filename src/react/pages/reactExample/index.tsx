import React from 'react';

import { Module, QueryProvider } from '@centreon/ui';
import { createStore, useAtom } from 'jotai';
import Services from './Services';
import { userAtom } from '@centreon/ui-context';

const store = createStore()

export default function PackagesPage() {
  const [user] = useAtom(userAtom)
  return (
    <QueryProvider>
      <Module maxSnackbars={1} seedName="centreon-bootstrap-module" store={store}>
        <div style={{paddingInline: "24px"}}>
          <h1 style={{fontWeight: "bold"}} >Welcome {user.name} !</h1>
          <Services/>
        </div>
      </Module>
    </QueryProvider>
  );
}

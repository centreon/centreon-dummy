import React from 'react';

import {
  ListingPage,
  Listing,
  StatusChip,
  SeverityCode,
  ColumnType,
} from '@centreon/ui';

const ComponentColumn = (): JSX.Element => (
  <StatusChip label="OK" severityCode={SeverityCode.Ok} />
);

// describe columns
const configuration = [
  {
    id: 'name',
    label: 'Name',
    type: ColumnType.string,
    getFormattedString: ({ name }): string => name,
  },
  {
    id: 'description',
    label: 'Description',
    type: ColumnType.string,
    getFormattedString: ({ description }): string => description,
  },
  {
    id: '#',
    label: 'Custom',
    type: ColumnType.component,
    Component: ComponentColumn,
  },
];

const tenElements = new Array(10).fill(0);

const listing = [...tenElements].map((_, index) => ({
  id: index,
  name: `E${index}`,
  description: `Entity ${index}`,
  active: index % 2 === 0,
  selected: index % 3 === 0,
  disableCheckbox: index % 4 === 0,
}));

const DummyPage = (): JSX.Element => (
  <ListingPage
    listing={
      <Listing
        columnConfiguration={configuration}
        totalRows={listing.length}
        tableData={listing}
      />
    }
  />
);

export default DummyPage;

import React from 'react';

import axios from 'axios';

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

const DummyPage = (): JSX.Element => {
  const [dummies, setDummies] = React.useState([]);

  React.useEffect(() => {
    axios.get('./api/v21.04/dummy/dummies').then(({ data }) => {
      setDummies(data.result);
    });
  }, []);

  return (
    <ListingPage
      filters={<></>}
      listing={
        <Listing
          columnConfiguration={configuration}
          totalRows={dummies.length}
          tableData={dummies}
        />
      }
    />
  );
}

export default DummyPage;

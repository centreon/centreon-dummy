import * as React from 'react';

import axios from 'axios';

import { makeStyles } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/DescriptionOutlined';

import { IconNumber } from '@centreon/ui';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 100,
  },
}));

export default (): JSX.Element => {
  const classes = useStyles();

  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    axios.get('./api/v21.04/dummy/dummies').then(({ data }) => {
      setCounter(data.meta.total);
    });
  }, []);

  return (
    <div className={classes.wrapper}>
      <DescriptionIcon fontSize="large" style={{ color: 'white' }} />
      <IconNumber iconType="colored" iconColor="green" iconNumber={counter} />
    </div>
  );
};

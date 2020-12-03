import * as React from 'react';

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

  return (
    <div className={classes.wrapper}>
      <DescriptionIcon fontSize="large" style={{ color: 'white' }} />
      <IconNumber iconType="colored" iconColor="green" iconNumber={10} />
    </div>
  );
};

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CheckCircle from '@material-ui/icons/CheckCircle';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import ClearRounded from '@material-ui/icons/ClearRounded';

const useStyles = makeStyles(() => ({
  minWidth: {
    minWidth: '30px',
  },
  green: {
    color: 'green',
  },
}));

export default function CustomPasswordMatchChecker({
  password,
  password_confirmation,
}) {
  const classes = useStyles();
  const passwordLength = password.length

  return (
    <ListItem>
      <ListItemIcon className={classes.minWidth}>
        {password === password_confirmation ? (
          <CheckCircle className={passwordLength > 0? classes.green: ''} fontSize="small" />
        ) : (
          <ClearRounded fontSize="small" />
        )}
      </ListItemIcon>
      {password === password_confirmation
        ? 'Passwords Match'
        : 'Password Must Match'}
    </ListItem>
  );
}

import React from 'react';
import { FlatButton } from './FlatButton';
import { theme } from '../../theme';
import { ButtonProps } from '@material-ui/core/Button';

const styles = {
  '&:hover': {
    boxShadow: `2px 2px ${theme.palette.error.dark}`,
  },
  color: theme.palette.error.main,
  borderColor: theme.palette.error.main,
};

export const DangerousButton = (props: ButtonProps) => {
  return (
    <FlatButton variant="outlined" styles={styles} {...props}>
      {props.children}
    </FlatButton>
  );
};

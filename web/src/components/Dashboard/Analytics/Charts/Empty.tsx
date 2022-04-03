import Box from '@material-ui/core/Box';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { colors } from '../../../../theme/palette';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 111,
      width: 312,
    },
    empty: {
      color: colors.grayLight,
    },
  })
);

export type EmptyProps = {
  message?: string;
};

const defaultProps = {
  message: 'No data available.',
};

export const Empty = (props: EmptyProps) => {
  const { message } = { ...defaultProps, ...props };
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Typography className={classes.empty}>{message}</Typography>
    </Box>
  );
};

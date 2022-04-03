import ListItem from '@material-ui/core/ListItem';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { colors } from '../../theme/palette';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subtitle: {
      marginRight: theme.spacing(1),
      color: colors.grayLight,
    },
    title: {
      backgroundColor: colors.grayLight20,
    },
  })
);

export type OptionGroupProps = {
  title?: string;
};

const defaultProps = {
  title: 'Title',
};

export const OptionGroup: React.FC<OptionGroupProps> = (props) => {
  const { children, title } = { ...defaultProps, ...props };
  const classes = useStyles();

  return (
    <div>
      <ListItem className={classes.title}>
        <Typography>{title}</Typography>
      </ListItem>
      {children}
    </div>
  );
};

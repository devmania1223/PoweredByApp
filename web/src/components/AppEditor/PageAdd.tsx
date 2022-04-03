import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import React from 'react';
import { colors } from '../../theme/palette';
import { LiiingoTooltip } from '../LiiingoTooltip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageAdd: {
      backgroundColor: colors.grayLight20,
      width: '100%',
      justifyContent: 'space-between',
    },
    addButton: {
      '&:hover': {
        backgroundColor: colors.blueAccent20,
        color: colors.blueAccent,
      },
      '&.Mui-disabled': {
        color: colors.grayLight,
      },
    },
  })
);

export type PageAddProps = {
  length: number;
  addPage: () => void;
  pageLimit?: number;
};

export const PageAdd = (props: PageAddProps) => {
  const { length, addPage, pageLimit } = { ...props };
  const classes = useStyles();

  const disabled = length === pageLimit;
  const delay = disabled ? 0 : 2000;
  const message = disabled ? "You've reached your plan's limit of 5 pages" : 'Add Page';

  return (
    <ListItem className={classes.pageAdd}>
      <Typography>{length > 1 ? 'Pages' : 'Page'}</Typography>
      <LiiingoTooltip message={message} placement="right" delay={delay}>
        <IconButton disabled={disabled} onClick={addPage} size="small" className={classes.addButton}>
          <Add />
        </IconButton>
      </LiiingoTooltip>
    </ListItem>
  );
};

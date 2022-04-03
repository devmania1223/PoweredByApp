import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import React, { useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subMenu: {
      justifyContent: 'space-between',
    },
  })
);

export type MediaContentMenuProps = {
  name: string;
};

export const MediaContentMenu: React.FC<MediaContentMenuProps> = (props) => {
  const { children, name } = { ...props };
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const onClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem button onClick={onClick} className={classes.subMenu}>
        <Typography>{name}</Typography>
        {open ? <ArrowDropUp /> : <ArrowDropDown />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Grid container>{children}</Grid>
      </Collapse>
    </>
  );
};

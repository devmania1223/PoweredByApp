import { CircularProgress } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import ListItem from '@material-ui/core/ListItem';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useRef, useState } from 'react';
import { colors } from '../../theme/palette';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      '&.Mui-selected': {
        backgroundColor: theme.palette.background.default,
      },
    },
    pageName: {
      '&.Mui-focused': {
        borderRadius: 5,
        borderStyle: 'solid',
        borderColor: colors.blueAccent20,
        borderWidth: 0.5,
      },
      '&.Mui-disabled': {
        color: colors.pureBlack,
      },
    },
    spinner: {
      marginRight: 5,
    },
  })
);

export type PageMenuItemAddProps = {
  visible: boolean;
  loading: boolean;
  addTopic: (pageName: string) => void;
  setVisible: (visible: boolean) => void;
};

export const PageMenuItemAdd = (props: PageMenuItemAddProps) => {
  const { visible, loading, addTopic, setVisible } = {
    ...props,
  };
  const [disabled, setDisabled] = useState(true);
  const pageName = useRef(null);
  const classes = useStyles();

  const renamePage = () => {
    setDisabled(false);
    setTimeout(() => {
      if (pageName.current !== null) {
        pageName.current.focus();
        pageName.current.select();
      }
    }, 1);
  };

  useEffect(() => {
    if (visible) {
      renamePage();
    }
  }, [visible]);

  useEffect(() => {
    if (!loading) {
      setVisible(false);
    }
  }, [loading, setVisible]);

  return visible ? (
    <ListItem key="add_page" classes={{ root: classes.item }}>
      {loading ? (
        <Typography>
          <CircularProgress className={classes.spinner} size={15} />
          Adding Page
        </Typography>
      ) : (
        <InputBase
          disabled={disabled}
          inputRef={pageName}
          fullWidth={false}
          className={classes.pageName}
          defaultValue=""
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              pageName.current.blur();
            }
          }}
          onBlur={(e) => {
            setDisabled(true);
            let pageTitle = e.target.value;
            addTopic(pageTitle);
          }}
        />
      )}
    </ListItem>
  ) : null;
};

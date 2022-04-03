import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { colors } from '../../theme/palette';
import { LANGUAGE_MAP } from '../../util/constants';
import { LiiingoDialog } from '../LiiingoDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    deleteButton: {
      backgroundColor: colors.redLight,
      color: colors.redDark,
      '&:hover': {
        backgroundColor: colors.redDark,
        color: colors.pureWhite,
      },
      '&:disabled': {
        backgroundColor: colors.grayLight20,
      },
    },
    actionBox: {
      margin: 15,
    },
    content: {
      marginLeft: 25,
    },
    dismissText: {
      color: colors.grayDark,
    },
    menu: {
      backgroundColor: colors.pureWhite,
    },
  })
);

export type PrimaryLanguageDeleteDialogProps = {
  open: boolean;
  current: string;
  supported: string[];
  handleDelete: () => void;
  handleClose: () => void;
  handleChangePrimary: (languageCode: string) => void;
};

export const PrimaryLanguageDeleteDialog = (props: PrimaryLanguageDeleteDialogProps) => {
  const { open, handleDelete, handleClose, handleChangePrimary, supported, current } = { ...props };
  const [selected, setSelected] = useState('');
  const classes = useStyles();

  return (
    <LiiingoDialog
      titleVariant="light"
      open={open}
      title="Delete Primary Language?"
      handleClose={handleClose}
      actions={
        <>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            disabled={!selected}
            className={classes.deleteButton}
            onClick={() => {
              handleChangePrimary(selected);
              handleDelete();
              handleClose();
            }}
          >
            {'Delete & Replace'}
          </Button>
        </>
      }
    >
      <Typography variant="body2" className={classes.content}>
        Deleting a language will remove the content in that language.
      </Typography>
      <Typography variant="body2" className={classes.content}>
        Please select a primary language to replacce the one you are deleting.
      </Typography>
      <Box className={classes.actionBox}>
        <TextField
          fullWidth
          select
          required
          variant="outlined"
          label="Primary Language"
          value={selected}
          error={!selected}
          onChange={(e) => setSelected(e.target.value)}
          SelectProps={{
            MenuProps: {
              classes: {
                paper: classes.menu,
              },
            },
          }}
        >
          {supported.map((lang) => {
            if (lang !== current) {
              return <MenuItem value={lang}>{LANGUAGE_MAP[lang]}</MenuItem>;
            }
            return null;
          })}
        </TextField>
      </Box>
    </LiiingoDialog>
  );
};

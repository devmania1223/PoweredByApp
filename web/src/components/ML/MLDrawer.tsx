import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles/createTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  addSupportedLanguage,
  changeDefaultLanguage,
  removeSupportedLanguage,
  saveLanguages,
  _defaultLanguage,
  _supportedLanguages,
} from '../../store/slices/locationSlice';
import { FlatButton } from '../Buttons/FlatButton';
import { LiiingoTempDrawer } from '../LiiingoTempDrawer';
import { MultilanguageSearch } from './MLSearch';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      width: 264,
    },
    content: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      width: 557,
      height: '75%',
      marginLeft: 10,
    },
    buttonBox: {
      marginBottom: 75,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: 80,
    },
    button: {
      height: 40,
      marginRight: 10,
    },
  })
);

export type MultilanguageDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  primary: string;
  supported: string[];
  addLanguages: (languages: string) => void;
  removeLanguage: (languageCode: string) => void;
  changePrimary: (languageCode: string) => void;
  saveLanguages: () => void;
};

export const MultilanguageDrawer = (props: MultilanguageDrawerProps) => {
  const { open, setOpen, primary, supported, addLanguages, removeLanguage, changePrimary, saveLanguages } = {
    ...props,
  };
  const classes = useStyles();

  return (
    <LiiingoTempDrawer open={open} setOpen={setOpen} title={'Multilingual'} onClose={saveLanguages}>
      <Box className={classes.content}>
        <Typography className={classes.text} variant="body2">
          Make your app available to more users by adding additional languages.
        </Typography>
        <MultilanguageSearch
          primary={primary}
          supported={supported}
          addLanguages={addLanguages}
          removeLanguage={removeLanguage}
          changePrimary={changePrimary}
        />
        <Box className={classes.buttonBox}>
          <FlatButton
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => {
              saveLanguages();
              setOpen(false);
            }}
          >
            Done
          </FlatButton>
        </Box>
      </Box>
    </LiiingoTempDrawer>
  );
};

const MultilanguageDrawerContainer = (
  props: Omit<
    MultilanguageDrawerProps,
    'primary' | 'supported' | 'addLanguages' | 'removeLanguage' | 'changePrimary' | 'saveLanguages'
  >
) => {
  const dispatch = useDispatch();

  const actions = bindActionCreators(
    {
      addLanguages: addSupportedLanguage,
      removeLanguage: removeSupportedLanguage,
      changePrimary: changeDefaultLanguage,
      saveLanguages: saveLanguages,
    },
    dispatch
  );

  const primary = useSelector(_defaultLanguage);
  const supported = useSelector(_supportedLanguages);

  const state = {
    primary,
    supported,
  };

  return <MultilanguageDrawer {...props} {...state} {...actions} />;
};

export default MultilanguageDrawerContainer;

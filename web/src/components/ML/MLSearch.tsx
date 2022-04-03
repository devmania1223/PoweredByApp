import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { MultilanguageList } from './MLList';
import { MultilanguageSearchBar } from './MLSearchBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    message: {
      marginBottom: 10,
    },
    box: {
      marginTop: 40,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
  })
);

export type MultilanguageSearchProps = {
  primary: string;
  supported: string[];
  addLanguages: (languages: string) => void;
  removeLanguage: (languageCode: string) => void;
  changePrimary: (languageCode: string) => void;
};

export const MultilanguageSearch = (props: MultilanguageSearchProps) => {
  const { primary, supported, addLanguages, removeLanguage, changePrimary } = { ...props };
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Typography variant="body2">MY LANGUAGES</Typography>
      <Typography className={classes.message} variant="body2">
        Add any languages you would like to have in your app.
      </Typography>
      <MultilanguageSearchBar supported={supported} addLanguages={addLanguages} removeLanguage={removeLanguage} />
      <MultilanguageList
        primary={primary}
        languageCodes={supported}
        removeLanguage={removeLanguage}
        changePrimary={changePrimary}
      />
    </Box>
  );
};

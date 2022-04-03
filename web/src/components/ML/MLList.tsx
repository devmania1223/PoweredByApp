import List from '@material-ui/core/List';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { MultilanguageListItem } from './MLListItem';
import { MLContextMenu } from './MLContextMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      //height: 368,
      display: 'flex',
      flexDirection: 'column',
      //height: '100%',
      flexGrow: 1,
      overflow: 'auto',
    },
  })
);

export type MultilanguageListProps = {
  primary: string;
  languageCodes: string[];
  removeLanguage: (languageCode: string) => void;
  changePrimary: (languageCode: string) => void;
};

export const MultilanguageList = (props: MultilanguageListProps) => {
  const { primary, languageCodes, changePrimary, removeLanguage } = { ...props };
  const classes = useStyles();

  return (
    <>
      <List className={classes.list}>
        {languageCodes.map((code, index) => (
          <MLContextMenu
            index={index.toString()}
            primary={code === primary}
            languageCode={code}
            supported={languageCodes}
            removeLanguage={removeLanguage}
            changePrimary={changePrimary}
          >
            <MultilanguageListItem
              primary={code === primary}
              supported={languageCodes}
              languageCode={code}
              count={languageCodes.length}
              index={index}
              removeLanguage={removeLanguage}
              changePrimary={changePrimary}
            />
          </MLContextMenu>
        ))}
      </List>
    </>
  );
};

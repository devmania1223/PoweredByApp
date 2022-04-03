import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import ListItem from '@material-ui/core/ListItem';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { colors } from '../../theme/palette';
import { LANGUAGE_MAP } from '../../util/constants';
import { MultilanguageMenu } from './MLMenu';
import { LiiingoTooltip } from '../LiiingoTooltip';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemLight: {
      margin: 0,
      backgroundColor: colors.pureWhite,
    },
    listItemDark: {
      margin: 0,
      backgroundColor: colors.grayLight5,
    },
    primary: {
      marginLeft: 10,
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
    },
    language: {
      display: 'flex',
      alignItems: 'center',
    },
  })
);

export type MultilanguageListItemProps = {
  primary: boolean;
  languageCode: string;
  count: number;
  index: number;
  supported: string[];
  removeLanguage: (languageCode: string) => void;
  changePrimary: (languageCode: string) => void;
};

export const MultilanguageListItem = (props: MultilanguageListItemProps) => {
  const { primary, languageCode, count, index, supported, removeLanguage, changePrimary } = { ...props };
  const classes = useStyles();

  return (
    <LiiingoTooltip message="Right-click for language options" placement="bottom" delay={2000}>
      <ListItem disableGutters className={index % 2 ? classes.listItemLight : classes.listItemDark}>
        <Box className={classes.content}>
          <Box className={classes.language}>
            <Typography variant="body2">{LANGUAGE_MAP[languageCode]}</Typography>
            {primary && <Chip className={classes.primary} color="secondary" label="Primary" />}
          </Box>
          {count > 1 && (
            <MultilanguageMenu
              primary={primary}
              languageCode={languageCode}
              supported={supported}
              removeLanguage={removeLanguage}
              changePrimary={changePrimary}
            />
          )}
        </Box>
      </ListItem>
    </LiiingoTooltip>
  );
};

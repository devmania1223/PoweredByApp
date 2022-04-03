import { Typography } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { NEW_LANGUAGE_CONTENT_TIP } from '../../util/constants';
import { LiiingoDismissableTip } from '../LiiingoDismissableTip';

export const APP_NAME_ID = 'name';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    newLanguageTip: {
      width: 235,
    },
  })
);

export type MultilanguageTipProps = {
  removeTip: () => void;
};

export const MultilanguageTip = (props: MultilanguageTipProps) => {
  const classes = useStyles();
  const { removeTip } = { ...props };

  return (
    <LiiingoDismissableTip fixed name={NEW_LANGUAGE_CONTENT_TIP} onClose={removeTip}>
      <div className={classes.newLanguageTip}>
        <Typography variant="caption">
          All of your content will present in your primary language until the content is updated for the newly selected
          language.
        </Typography>
      </div>
    </LiiingoDismissableTip>
  );
};

import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { PAGE_INCOGNITO_TIP } from '../../util/constants';
import { LiiingoDismissableTip } from '../LiiingoDismissableTip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    incognitoTip: {
      width: 211,
    },
  })
);

export type IncognitoTipProps = {
  removeTip: () => void;
};

export const IncognitoTip = (props: IncognitoTipProps) => {
  const classes = useStyles();
  const { removeTip } = { ...props };

  return (
    <LiiingoDismissableTip name={PAGE_INCOGNITO_TIP} fixed onClose={removeTip}>
      <div className={classes.incognitoTip}>
        <Typography variant="caption">
          When a page is incognito, the page will only be visible to users who have a direct link or QR Code to the
          page.
        </Typography>
      </div>
    </LiiingoDismissableTip>
  );
};

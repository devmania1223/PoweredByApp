import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { PAGE_HIDDEN_TIP } from '../../util/constants';
import { LiiingoDismissableTip } from '../LiiingoDismissableTip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inactiveTip: {
      width: 235,
    },
  })
);

export type InactiveTipProps = {
  removeTip: () => void;
};

export const InactiveTip = (props: InactiveTipProps) => {
  const classes = useStyles();
  const { removeTip } = { ...props };

  return (
    <LiiingoDismissableTip name={PAGE_HIDDEN_TIP} fixed onClose={removeTip}>
      <div className={classes.inactiveTip}>
        <Typography variant="caption">
          When a page is inactive, the page will no longer be visible to mobile users.
        </Typography>
      </div>
    </LiiingoDismissableTip>
  );
};

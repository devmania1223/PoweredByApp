import { Box, makeStyles, Theme } from '@material-ui/core';
import createStyles from '@material-ui/styles/createStyles';
import React, { useRef } from 'react';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { colors } from '../../theme/palette';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    placeholder: {
      height: 188,
      backgroundColor: colors.grayDark20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

export type PlaceholderProps = {
  icon: React.FunctionComponent<SvgIconProps>;
};

export const Placeholder = (props: PlaceholderProps) => {
  const { icon: Icon } = { ...props };
  const classes = useStyles();
  const ref = useRef(null);
  const focusable = {
    ref: ref,
    tabIndex: -1,
    onClick: () => {
      ref?.current?.focus();
    },
  };

  return (
    <Box {...focusable} className={classes.placeholder}>
      <Icon fontSize="large" />
    </Box>
  );
};

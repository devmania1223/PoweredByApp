import { makeStyles } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import React, { useState } from 'react';
const useStyles = makeStyles(() => ({
  fullWidth: {
    width: '100%',
  },
}));

export type LiiingoBadgeProps = {
  text?: string;
  horizontal?: 'left' | 'right';
  vertical?: 'top' | 'bottom';
};

const defaultProps = {
  text: 'Text',
  horizontal: 'left' as LiiingoBadgeProps['horizontal'],
  vertical: 'bottom' as LiiingoBadgeProps['vertical'],
};

export const LiiingoBadge: React.FC<LiiingoBadgeProps> = (props) => {
  const { children, text, vertical, horizontal } = { ...defaultProps, ...props };
  const [hideBadge, setHideBadge] = useState(true);
  const [focusBadge, setFocusBadge] = useState(false);
  const classes = useStyles();

  return (
    <Badge
      color={focusBadge ? 'primary' : 'default'}
      badgeContent={text}
      anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
      invisible={hideBadge && !focusBadge}
      className={classes.fullWidth}
    >
      <div
        className={classes.fullWidth}
        onPointerOver={() => {
          setHideBadge(false);
        }}
        onPointerLeave={() => {
          setHideBadge(true);
        }}
        onFocus={() => {
          if (!(text === 'App Name' && vertical === 'bottom')) setFocusBadge(true);
        }}
        onDoubleClick={() => {
          setFocusBadge(true);
        }}
        onBlur={() => {
          setFocusBadge(false);
        }}
      >
        {children}
      </div>
    </Badge>
  );
};

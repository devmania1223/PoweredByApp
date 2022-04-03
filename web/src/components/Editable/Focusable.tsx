import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { LiiingoBadge } from '../AppEditor/LiiingoBadge';

const useStyles = makeStyles<Theme, { dim: boolean }>({
  focused: {
    border: '2px solid blue', //TODO: update this to match design
    padding: 2,
  },
  unFocused: (props) => ({
    border: 'none', //TODO: update this to match design
    padding: 4, // (2px padding) + (2px placeholder for the border)
    opacity: props.dim ? 0.5 : 1,
  }),
});

export interface FocusableProps {
  isFocused: boolean;
  newElement?: boolean;
  onFocus: () => void;
  badgeVertical?: 'top' | 'bottom';
  badgeHorizontal?: 'left' | 'right';
  label?: string;
  dim?: boolean;
}
export const Focusable: React.FC<FocusableProps> = ({
  isFocused,
  onFocus,
  label = 'Edit',
  badgeVertical = 'top',
  badgeHorizontal = 'left',
  dim,
  ...rest
}) => {
  const classes = useStyles({ dim });
  const { children, ...passthroughProps } = rest;

  return (
    <div className={isFocused ? classes.focused : classes.unFocused} onClick={onFocus} {...passthroughProps}>
      {label === '' ? (
        <>{children}</>
      ) : (
        <LiiingoBadge vertical={badgeVertical} horizontal={badgeHorizontal} text={label}>
          {children}
        </LiiingoBadge>
      )}
    </div>
  );
};

import React, { MouseEvent } from 'react';
import IconButton from '@material-ui/core/IconButton';
import HelpOutline from '@material-ui/icons/HelpOutline';

export type HelpPopoverButtonProps = {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  ariaLabel: string;
};
export const HelpPopoverButton = ({ onClick, ariaLabel }: HelpPopoverButtonProps) => {
  return (
    <IconButton onClick={onClick} color="secondary" aria-label={ariaLabel}>
      <HelpOutline />
    </IconButton>
  );
};

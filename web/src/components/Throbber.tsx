import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Theme, withStyles } from '@material-ui/core/styles';
import * as React from 'react';

export type ThrobberProps = {
  withOverlay?: boolean;
  isVisible?: boolean;
};
export const Throbber = ({ withOverlay = false, isVisible = true }: ThrobberProps) => {
  if (!isVisible) {
    return null;
  }

  if (withOverlay) {
    return (
      <LimitedBackdrop open={true}>
        <CircularProgress />
      </LimitedBackdrop>
    );
  }
  return <CircularProgress />;
};

/**
 * Heads Up:
 * The parent component MUST use `position: relative` for this backdrop
 * to properly size itself (the size is supposed to just cover the parent)
 */
const LimitedBackdrop = withStyles((theme: Theme) => {
  return {
    root: {
      zIndex: 2,
      position: 'absolute',
      height: '100%',
      backgroundColor: 'rgba(255,255,255,0.8)',
    },
  };
})(Backdrop);

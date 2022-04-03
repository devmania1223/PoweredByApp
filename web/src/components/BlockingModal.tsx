import Backdrop from '@material-ui/core/Backdrop';
import { Theme } from '@material-ui/core/styles/createTheme';

import withStyles from '@material-ui/core/styles/withStyles';
import React, { ReactNode } from 'react';
import { drawerWidth } from './AppEditor/LiiingoDrawer';

type BlockingModalProps = {
  open: boolean;
  children: ReactNode;
  fullPage?: boolean;
};

export const BlockingModal = (props: BlockingModalProps) => {
  const { open, fullPage = false, children } = props;

  const LimitedBackdrop = withStyles((theme: Theme) => {
    if (fullPage) {
      return {
        root: {
          [theme.breakpoints.up('sm')]: {
            left: drawerWidth,
          },
          zIndex: 3,
        },
      };
    } else {
      return {
        root: {
          position: 'absolute',
          zIndex: 2,
          borderRadius: 7,
        },
      };
    }
  })(Backdrop);

  return <LimitedBackdrop open={open}>{children}</LimitedBackdrop>;
};

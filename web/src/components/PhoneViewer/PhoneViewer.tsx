import Box from '@material-ui/core/Box';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import bottomMenuBar from './bottom-menu-bar.png';
import iPhoneFrame from './ios-phone.png';
import iPhoneStatusBar from './ios-statusbar.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minHeight: 600,
    },
    phoneFrame: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      backgroundImage: `url(${iPhoneFrame})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      width: 350,
      padding: '70px 40px',
      boxSizing: 'border-box',
    },
    phoneScreen: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'white',
    },
    phoneStatusBar: {
      marginTop: 3,
      marginBottom: 3,
      backgroundImage: `url(${iPhoneStatusBar})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      height: 10,
      display: 'flex',
    },
    contentWrapper: {
      flex: 1,
      maxHeight: 470,
      overflowY: 'scroll',
    },
    contentItem: {},
    phoneFooter: {
      display: 'flex',
      backgroundImage: `url(${bottomMenuBar})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      height: 35,
    },
  })
);
export type PhoneViewerProps = {};
const defaultProps = {};
export const PhoneViewer: React.FC<PhoneViewerProps> = (props) => {
  const { children } = { ...props, ...defaultProps };
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.phoneFrame}>
        <Box className={classes.phoneScreen}>
          <Box className={classes.phoneStatusBar}></Box>
          <Box className={classes.contentWrapper}>
            {React.Children.map(children, (Child) => (
              <Box className={classes.contentItem}>{Child}</Box>
            ))}
          </Box>
          <Box className={classes.phoneFooter}></Box>
        </Box>
      </Box>
    </Box>
  );
};

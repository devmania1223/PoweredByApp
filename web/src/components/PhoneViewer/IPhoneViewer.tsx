import Box from '@material-ui/core/Box';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { colors } from '../../theme/palette';
import Footer from './IphoneBottomMenu';
import Header from './IphoneStatusbar';

export const IPHONE_RADIUS = 25;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      minHeight: 750,
      width: 375,
    },
    contentWrapper: {
      flex: 1,
    },
    phoneScreen: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: colors.pureWhite,
      borderRadius: IPHONE_RADIUS,
      border: 'solid',
      borderWidth: 10,
      borderColor: colors.pureBlack,
      width: 400,
    },
    phoneFooter: {
      minWidth: '100%',
      borderBottomLeftRadius: IPHONE_RADIUS,
      borderBottomRightRadius: IPHONE_RADIUS,
    },
  })
);
export type IPhoneViewerProps = {
  onFocusContent: (id: string) => void;
  isFocused: boolean;
  logoUrl: string;
  appName: string;
};
const defaultProps = {};
export const IPhoneViewer: React.FC<IPhoneViewerProps> = (props) => {
  const { children, onFocusContent, isFocused, logoUrl, appName } = { ...props, ...defaultProps };
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.phoneScreen}>
        <Header onFocusContent={onFocusContent} isFocused={isFocused} logoUrl={logoUrl} appName={appName} />
        <Box className={classes.contentWrapper}>{children}</Box>
        <Footer className={classes.phoneFooter} />
      </Box>
    </Box>
  );
};

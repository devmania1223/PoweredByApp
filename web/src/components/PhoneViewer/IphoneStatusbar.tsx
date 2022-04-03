import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import { colors } from '../../theme/palette';
import { Focusable } from '../Editable/Focusable';
import Bottom from './IphoneStatusbarBottom';
import Top from './IphoneStatusbarTop';
import { IPHONE_RADIUS } from './IPhoneViewer';
import LiiingoLogo from './LiiingoStatusbarLogo';

export const HEADER_LOGO_IMAGE_URL_ID = 'headerLogo';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      height: 50,
      width: 50,
      borderStyle: 'solid',
      borderColor: colors.grayMedium,
    },
    box: {
      alignItems: 'center',
      width: 375,
      height: 144,
      display: 'flex',
      flexDirection: 'column',
    },
    headerTop: {
      minWidth: '100%',
      borderTopLeftRadius: IPHONE_RADIUS,
      borderTopRightRadius: IPHONE_RADIUS,
    },
    headerBottom: {
      minWidth: '100%',
    },
  })
);

export type IphoneStatusbarProps = {
  onFocusContent?: (id: string) => void;
  isFocused?: boolean;
  logoUrl: string;
  appName: string;
};

const IphoneStatusbar = (props: IphoneStatusbarProps) => {
  const { onFocusContent, isFocused, logoUrl, appName } = { ...props };
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Top className={classes.headerTop} />
      <Focusable isFocused={isFocused} onFocus={() => onFocusContent(HEADER_LOGO_IMAGE_URL_ID)} label="Logo">
        {!!logoUrl ? <Avatar alt="logo" src={logoUrl} className={classes.logo} /> : <LiiingoLogo />}
      </Focusable>
      <Bottom className={classes.headerBottom} appname={appName} />
    </Box>
  );
};

export default IphoneStatusbar;

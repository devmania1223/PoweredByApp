import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { LogoChangePayload } from '../../store/slices/locationSlice';
import { colors } from '../../theme/palette';
import { CLOSED_BEST_PRACTICES } from '../../util/constants';
import { FlatButton } from '../Buttons/FlatButton';
import { LiiingoDismissableTip } from '../LiiingoDismissableTip';
import { LiiingoSuccessSnackbar } from '../LiiingoSuccessSnackbar';
import { LiiingoWarning } from '../LiiingoWarning';
import { Throbber } from '../Throbber';
import { CardTitle } from './CardComponents/CardTitle';
import { QRMenu } from './CardComponents/Menu/QRMenu';
import { QREditor } from './QREditor/QREditor';
import { QRContextMenu } from './CardComponents/Menu/QRContextMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    qrCode: {
      height: 224,
      width: 200,
      backgroundColor: colors.grayLight20,
    },
    formCard: {
      marginBottom: 20,
      backgroundColor: theme.palette.background.paper,
      width: 500,
    },
    spinnerBox: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 247,
    },
    content: {
      width: 250,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    button: {
      height: 32,
      width: 155,
    },
    qrContent: {
      width: 200,
    },
    bigBox: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    contentBox: {
      width: 500,
      height: 239,
      display: 'flex',
      marginBottom: 8,
    },
    titleBox: {
      display: 'flex',
      alignItems: 'center',
    },
  })
);

export type QRCardProps = {
  loading: boolean;
  qrCodePath: string;
  qrLinkPath: string;
  qrZipPath: string;
  qrLogo: string;
  primaryColor: string;
  secondaryColor: string;
  saveQR: () => void;
  changeLogo: (logo: LogoChangePayload) => void;
  changePrimary: (primary: string) => void;
  changeSecondary: (secondary: string) => void;
};

export const QRCard = (props: QRCardProps) => {
  const {
    loading,
    qrCodePath,
    qrLinkPath,
    qrZipPath,
    qrLogo,
    primaryColor,
    secondaryColor,
    saveQR,
    changeLogo,
    changePrimary,
    changeSecondary,
  } = props;

  const [openEditor, setOpenEditor] = useState(false);
  const [qrUpdated, setQrUpdated] = useState(false);
  const classes = useStyles();
  /**
   * Warning will need to be set later with redux
   */
  const warning = false;

  const handleQrMsg = () => {
    setQrUpdated(true);
    setTimeout(() => setQrUpdated(false), 3000);
  };

  const handleOpen = () => {
    setOpenEditor(true);
  };

  const Menu = () => (
    <>
      <QRMenu qrLinkPath={qrLinkPath} qrZipPath={qrZipPath} />
    </>
  );

  return (
    <Card variant="outlined" className={classes.formCard}>
      {loading ? (
        <Box className={classes.spinnerBox}>
          <Throbber isVisible={true} />
          <LiiingoSuccessSnackbar open={qrUpdated} text="QR Code updated!" onClose={() => setQrUpdated(false)} />
        </Box>
      ) : (
        <QRContextMenu qrLinkPath={qrLinkPath} qrZipPath={qrZipPath}>
          <Box className={classes.bigBox}>
            <Box className={classes.contentBox}>
              <CardContent className={classes.content}>
                <Box className={classes.titleBox}>
                  {warning && (
                    <LiiingoWarning message="Your app's QR Code contains a light color that may not scan on a white background." />
                  )}
                  <CardTitle title="QR Code" menu={Menu} msg="QR Code Options" />
                </Box>
                <Typography variant="body2">
                  Make your app's custom QR Code recognizable to your audience by adding a custom logo and colors.
                </Typography>
                <FlatButton className={classes.button} variant="contained" color="secondary" onClick={handleOpen}>
                  Design QR Code
                </FlatButton>
                <QREditor
                  open={openEditor}
                  setOpen={(open: boolean) => setOpenEditor(open)}
                  handleUpdate={handleQrMsg}
                  logo={qrLogo}
                  saveQR={saveQR}
                  primary={primaryColor}
                  secondary={secondaryColor}
                  changeLogo={changeLogo}
                  changePrimary={changePrimary}
                  changeSecondary={changeSecondary}
                />
              </CardContent>
              <CardContent className={classes.qrContent}>
                <CardMedia className={classes.qrCode} image={qrCodePath} src="img" />
              </CardContent>
            </Box>
            <LiiingoDismissableTip name={CLOSED_BEST_PRACTICES}>
              <Typography variant="caption">
                See Liiingo's recommended{' '}
                <Link href="https://www.liiingo.com/bestpractices" target="_blank">
                  Best Practices
                </Link>{' '}
                on how to use your app's QR Code to place your app directly into the hands of your audience!
              </Typography>
            </LiiingoDismissableTip>
          </Box>
        </QRContextMenu>
      )}
    </Card>
  );
};

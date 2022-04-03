import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React, { useState, useLayoutEffect } from 'react';
import { LogoChangePayload } from '../../../store/slices/locationSlice';
import { colors } from '../../../theme/palette';
import { CLOSED_NOT_SCANNABLE, CLOSED_QR_DIALOG } from '../../../util/constants';
import { FlatButton } from '../../Buttons/FlatButton';
import { LiiingoDismissableTip } from '../../LiiingoDismissableTip';
import { LiiingoTempDrawer } from '../../LiiingoTempDrawer';
import { LiiingoPreviewQrCodeSvg } from './LiiingoDemoQrCodeSvg';
import { QRColorPickerPopover } from './QRColorPickerPopover';
import { QRDialog } from './QRDialog';
import { QRLogoOption } from './QRLogoOption';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editorBox: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      width: 547,
      height: '100%',
      marginLeft: 10,
      marginRight: 10,
    },
    buttonBox: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: 80,
      background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), #92A0AC',
      marginLeft: -10,
      marginRight: -10,
      marginTop: 40,
    },
    button: {
      height: 40,
      marginRight: 30,
    },
    previewBox: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    desc: {
      width: 344,
      marginBottom: 40,
    },
    preview: {
      width: 254,
    },
    acceptedLogo: {
      color: colors.grayLight,
    },
    info: {
      width: 254,
    },
    colorBox: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    menu: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      left: 0,
      top: 0,
    },
    optionBox: {
      overflowY: 'auto',
      position: 'relative',
    },
  })
);

export type QREditorProps = {
  open: boolean;
  logo: string;
  primary: string;
  secondary: string;
  setOpen: (open: boolean) => void;
  handleUpdate: () => void;
  changeLogo: (logo: LogoChangePayload) => void;
  changePrimary: (primary: string) => void;
  changeSecondary: (secondary: string) => void;
  saveQR: () => void;
};

export const QREditor = (props: QREditorProps) => {
  const { open, logo, primary, secondary, setOpen, handleUpdate, changeLogo, changePrimary, changeSecondary, saveQR } =
    {
      ...props,
    };
  const [previewLogo, setPreviewLogo] = useState(logo);
  const [logoName, setLogoName] = useState('');
  const [primaryColor, setPrimaryColor] = useState(primary);
  const [secondaryColor, setSecondaryColor] = useState(secondary);
  const [openDialog, setOpenDialog] = useState(false);
  const [primaryError, setPrimaryError] = useState(false);
  const [secondaryError, setSecondaryError] = useState(false);
  const [isDrag, setIsDrag] = useState(false);

  const classes = useStyles();
  const resetEditor = () => {
    setPrimaryColor(primary);
    setSecondaryColor(secondary);
    setPreviewLogo(logo);
  };

  const handleOpen = (open: boolean) => {
    let isEdited = false;
    if (primary !== primaryColor) isEdited = true;
    if (secondary !== secondaryColor) isEdited = true;
    if (logo !== previewLogo) isEdited = true;
    if (!open && !localStorage.getItem(CLOSED_QR_DIALOG) && isEdited) {
      /**
       * when redux is implemented
       * check if the QR has been changed
       * display dialog for if the form is dirty
       */
      setOpenDialog(true);
    } else {
      setOpen(open);
      resetEditor();
    }
  };

  const handleSave = () => {
    changeLogo({ name: logoName, url: previewLogo });
    changePrimary(primaryColor);
    changeSecondary(secondaryColor);
    saveQR();
    setOpen(false);
    handleUpdate();
  };

  const useWindowSize = () => {
    const [size, setSize] = useState(0);
    useLayoutEffect(() => {
      function updateSize() {
        setSize(window.innerHeight);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  };

  const height = useWindowSize();

  const handleDragStart = () => {
    if (!isDrag) setIsDrag(true);
  };

  const handleDragStop = () => {
    if (isDrag) setIsDrag(false);
  };

  window.addEventListener('dragover', handleDragStart, false);
  window.addEventListener('dragleave', handleDragStop, false);
  window.addEventListener('drop', handleDragStop, false);

  return (
    <LiiingoTempDrawer title="Design Your QR Code" open={open} setOpen={handleOpen}>
      <QRDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        closeDrawer={() => {
          setOpen(false);
          resetEditor();
        }}
      />
      <Box className={classes.editorBox}>
        <Box className={classes.menu}>
          <Typography className={classes.desc} variant="body2">
            Make your app's QR Code easily recognizable to your audience by adding a custom logo and colors.
          </Typography>
          <Box component="div" className={classes.optionBox} height={height - 300}>
            <Box className={classes.colorBox}>
              {/**
               * Color Pickers
               */}
              <QRColorPickerPopover
                setColor={setPrimaryColor}
                setError={setPrimaryError}
                id="primaryColor"
                name="customQrCodeColors.primary"
                label="Primary Color"
                color={primaryColor ?? '#000000'}
              />
              <QRColorPickerPopover
                setColor={setSecondaryColor}
                setError={setSecondaryError}
                id="secondaryColor"
                name="customQrCodeColors.secondary"
                label="Secondary Color"
                color={secondaryColor ?? '#000000'}
              />
            </Box>
            <Box className={classes.previewBox}>
              <div className={classes.preview} style={{ height: 254 }}>
                <QRLogoOption
                  imageUrl={previewLogo}
                  setImagePreview={(file: File) => {
                    setLogoName(file.name);
                    setPreviewLogo(URL.createObjectURL(file));
                  }}
                  isDrag={isDrag}
                />
              </div>
              <div className={classes.preview}>
                <LiiingoPreviewQrCodeSvg
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  customQrLogoUrl={previewLogo}
                />
                <LiiingoDismissableTip name={CLOSED_NOT_SCANNABLE}>
                  This QR Code preview is not scannable. Finish editing your app's QR Code to scan from the My App
                  dashboard.
                </LiiingoDismissableTip>
              </div>
            </Box>
          </Box>
        </Box>
        <Box className={classes.buttonBox}>
          <FlatButton className={classes.button} onClick={() => handleOpen(false)}>
            Cancel
          </FlatButton>
          <FlatButton
            disabled={primaryError || secondaryError}
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Save
          </FlatButton>
        </Box>
      </Box>
    </LiiingoTempDrawer>
  );
};

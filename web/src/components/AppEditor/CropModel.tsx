import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles/createTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeBackground } from '../../store/slices/topicSlice';
import { makeChange } from '../../store/slices/editorSlice';
import { FlatButton } from '../Buttons/FlatButton';
import { LiiingoTempDrawer } from '../LiiingoTempDrawer';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      width: 264,
    },
    content: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      width: 557,
      height: '100%',
      background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), #92A0AC !important',
    },
    buttonBox: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: 80,
      background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), #92A0AC',
    },
    button: {
      height: 40,
      marginRight: 10,
    },
    dropZone: {
      display: 'flex',
      marginTop: 50,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      overflow: 'hidden',
    },
  })
);

export type CropImageProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  imageUrl?: string;
  sendCropData: (image: string, fileName: string) => void;
};

export const CropImage = (props: CropImageProps) => {
  const { open, setOpen, imageUrl, sendCropData } = {
    ...props,
  };

  const classes = useStyles();
  const [cropper, setCropper] = useState<any>();

  const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      const base64_string = cropper.getCroppedCanvas().toDataURL().split(',')[1];
      const base64_type = cropper.getCroppedCanvas().toDataURL().split(',')[0].split(';')[0].split(':')[1];
      const fileName = 'imgFile.' + base64_type.split('/')[1];
      const blob = b64toBlob(base64_string, base64_type);
      const url = URL.createObjectURL(blob);

      sendCropData(url, fileName);
    }
  };

  return (
    <LiiingoTempDrawer
      open={open}
      setOpen={setOpen}
      title={'Crop Image'}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Box className={classes.content}>
        <div className={classes.dropZone}>
          {imageUrl && (
            <Cropper
              style={{ width: '100%', height: '100%' }}
              initialAspectRatio={1}
              preview=".img-preview"
              src={imageUrl}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={0.9}
              checkOrientation={false}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              guides={true}
            />
          )}
          {!imageUrl && <Typography>No selected image</Typography>}
        </div>
        <Box className={classes.buttonBox}>
          <FlatButton
            className={classes.button}
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </FlatButton>
          {imageUrl && (
            <FlatButton
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => {
                if (imageUrl !== '') {
                  setOpen(false);
                  getCropData();
                }
              }}
            >
              Save
            </FlatButton>
          )}
        </Box>
      </Box>
    </LiiingoTempDrawer>
  );
};

const CropImageContainer = (props: Omit<CropImageProps, 'primary' | 'supported' | 'changePrimary'>) => {
  const dispatch = useDispatch();

  const actions = bindActionCreators(
    {
      changeBackground,
      makeChange,
    },
    dispatch
  );

  const state = {};

  return <CropImage {...props} {...state} {...actions} />;
};

export default CropImageContainer;

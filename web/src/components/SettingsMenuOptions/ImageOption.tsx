import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { useImageOptionField } from '../../hooks/useImageUploadField';
import { colors } from '../../theme/palette';
import { checkMultipleValidationRules, recommendHighSolution } from '../../util/imageValidators';

export const PreviewMinHeight = 133;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageBox: {
      minWidth: '100%',
      minHeight: PreviewMinHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.grayLight5,
    },
    image: {
      height: '100%',
      width: '100%',
      backgroundColor: colors.grayMedium,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      boxSizing: 'border-box',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    },
    imageNew: {
      height: '100%',
      width: 'auto',
    },
  })
);

export type ImageOptionProps = {
  imageUrl?: string;
  setImagePreview: (file: File) => void;
};

export const ImageOption = (props: ImageOptionProps) => {
  const { imageUrl, setImagePreview } = { ...props };
  const classes = useStyles();

  const [ImageOptionField, imageFieldProps] = useImageOptionField({
    fieldName: `spotlightImage`, //<--- TODO: This doesn't jive
    maxFileSizeBytes: 3000000,
    initialValue: imageUrl,
    validateImage: checkMultipleValidationRules([recommendHighSolution]),
    setImagePreview: setImagePreview,
  });

  return (
    <ListItem key={`image_${imageUrl}`} disableGutters={true}>
      <Box className={classes.imageBox}>
        <ImageOptionField {...imageFieldProps} />
      </Box>
    </ListItem>
  );
};

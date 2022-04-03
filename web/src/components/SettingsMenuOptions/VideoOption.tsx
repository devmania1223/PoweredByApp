import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { useVideoOptionField } from '../../hooks/useVideoUploadField';
import { colors } from '../../theme/palette';
import { PreviewMinHeight } from './ImageOption';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    previewBox: {
      minWidth: '100%',
      minHeight: PreviewMinHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.grayLight5,
    },
  })
);

export type VideoOptionProps = {
  videoUrl?: string;
  setVideo: (file: File) => void;
};

export const VideoOption = (props: VideoOptionProps) => {
  const { videoUrl, setVideo } = { ...props };
  const classes = useStyles();

  const [VideoOptionField, videoFieldProps] = useVideoOptionField({
    fieldName: `spotlightImage`,
    initialValue: videoUrl,
    setVideo: setVideo,
  });

  return (
    <ListItem key={`video_${videoUrl}`} disableGutters={true}>
      <Box className={classes.previewBox}>
        <VideoOptionField {...videoFieldProps} />
      </Box>
    </ListItem>
  );
};

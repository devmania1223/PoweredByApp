import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { FileType } from '../../store/models';
import { colors } from '../../theme/palette';
import { DraggableMenuWrapper } from './DraggableMenuWrapper';
import { DroppableMenuWrapper } from './DroppableMenuWrapper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      width: 87,
      height: 87,
      backgroundColor: colors.grayLight5,
      borderRadius: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    button: {
      backgroundColor: colors.grayDark20,
      borderRadius: 5,
      width: 75,
      height: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

export type InsertButtonOptionProps = {
  contentType: FileType; //EnumLocationExhibitTemplatedContentLiiingoContentType;
  index: number;
  buttonText: string;
  hoverText?: string;
};

export const InsertButtonOption = (props: InsertButtonOptionProps) => {
  const { contentType, index, hoverText, buttonText } = { ...props };
  const classes = useStyles();
  const [show, setShow] = useState(false);

  return (
    <DroppableMenuWrapper id={contentType}>
      <Box
        className={classes.box}
        onPointerOver={() => {
          setShow(true);
        }}
        onPointerLeave={() => {
          setShow(false);
        }}
      >
        <DraggableMenuWrapper id={contentType} index={index}>
          <Box className={classes.button}>
            <Typography>{buttonText}</Typography>
          </Box>
        </DraggableMenuWrapper>
        <Typography variant="caption">{show && (hoverText ?? contentType)}</Typography>
      </Box>
    </DroppableMenuWrapper>
  );
};

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { FileType } from '../../store/models';
import { colors } from '../../theme/palette';
import { DraggableMenuWrapper } from './DraggableMenuWrapper';
import { DroppableMenuWrapper } from './DroppableMenuWrapper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      width: 67,
      height: 67,
      backgroundColor: colors.grayLight5,
      borderRadius: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    icon: {
      backgroundColor: colors.grayDark20,
      borderColor: colors.grayDark20,
      borderStyle: 'solid',
      borderRadius: 5,
      borderWidth: 3,
    },
  })
);

export type InsertMediaOptionProps = {
  contentType: FileType;
  index: number;
  icon: React.FunctionComponent<SvgIconProps>;
  hoverText?: string;
};

export const InsertMediaOption = (props: InsertMediaOptionProps) => {
  const { contentType, index, icon: Icon, hoverText } = { ...props };
  const classes = useStyles();
  const [show, setShow] = useState(false);

  return (
    <Grid container item xs={6}>
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
            <Icon fontSize="large" className={classes.icon} />
          </DraggableMenuWrapper>
          <Typography variant="caption">{show && (hoverText ?? contentType)}</Typography>
        </Box>
      </DroppableMenuWrapper>
    </Grid>
  );
};

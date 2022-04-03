import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import { Variant } from '@material-ui/core/styles/createTypography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { colors } from '../../theme/palette';
import { DraggableMenuWrapper } from './DraggableMenuWrapper';
import { DroppableMenuWrapper } from './DroppableMenuWrapper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      width: 168,
      height: 72,
      backgroundColor: colors.grayLight5,
      borderRadius: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
  })
);

export enum EnumTags {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
  p = 'p',
}

export enum TextInitialValue {
  h1 = 'Heading 1',
  h2 = 'Heading 2',
  h3 = 'Heading 3',
  h4 = 'Heading 4',
  p = 'Paragraph 1',
}

export type InsertTypographyOptionProps = {
  index: number;
  displayName: string;
  displayVariant: 'inherit' | Variant;
  desc: string;
  tag: EnumTags;
};

export const InsertTypographyOption = (props: InsertTypographyOptionProps) => {
  const { index, displayName, tag, desc, displayVariant } = { ...props };
  const classes = useStyles();

  return (
    <DroppableMenuWrapper id={tag}>
      <DraggableMenuWrapper id={tag} index={index}>
        <Box className={classes.box}>
          <Typography variant={displayVariant}>{displayName}</Typography>
          <Typography variant="caption">{desc}</Typography>
        </Box>
      </DraggableMenuWrapper>
    </DroppableMenuWrapper>
  );
};

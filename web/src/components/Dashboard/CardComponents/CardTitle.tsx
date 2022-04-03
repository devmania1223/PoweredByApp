import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { colors } from '../../../theme/palette';
import { LiiingoTooltip } from '../../LiiingoTooltip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: colors.grayLight,
    },
    titleBox: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    icon: {
      color: colors.grayLight,
      '&:hover': {
        color: colors.tealAccent,
      },
    },
    button: {
      '&:hover': {
        backgroundColor: colors.tealAccent20,
      },
    },
    menu: {
      backgroundColor: colors.pureWhite,
      filter: 'drop-shadow(0px 2px 8px rgba(24, 27, 32, 0.2))',
      borderRadius: 5,
    },
    info: {
      color: colors.grayLight,
      fontSize: 12,
    },
  })
);

export type CardTitleProps = {
  title: string;
  info?: string;
  menu?: React.FunctionComponent;
  msg?: string;
};

export const CardTitle = (props: CardTitleProps) => {
  const { title, info, menu: Menu, msg } = { ...props };
  const classes = useStyles();

  return (
    <Box className={classes.titleBox}>
      <Typography className={classes.title} variant="h5">
        {title}
      </Typography>
      {info && <Typography className={classes.info}>{info}</Typography>}
      {Menu && (
        <LiiingoTooltip placement="left" message={msg} delay={2000}>
          <div>
            <Menu />
          </div>
        </LiiingoTooltip>
      )}
    </Box>
  );
};

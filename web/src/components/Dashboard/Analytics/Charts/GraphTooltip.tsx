import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { colors } from '../../../../theme/palette';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    changeBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    box: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      height: 68,
      width: 110,
      borderRadius: 4,
      backgroundColor: colors.grayDark,
    },
    empty: {
      color: colors.grayLight,
    },
    header: {
      color: colors.pureWhite,
    },
    negative: {
      color: colors.redDark,
    },
    positive: {
      color: colors.greenDark,
    },
    divider: {
      width: '75%',
      backgroundColor: colors.grayLight,
    },
    dividerVertical: {
      height: '75%',
      backgroundColor: colors.grayLight,
      marginRight: 5,
      marginLeft: 5,
    },
  })
);

export type GraphTooltipProps = {
  title: string | number;
  value: string | number;
  change?: number;
};

export const GraphTooltip = (props: GraphTooltipProps) => {
  const { title, value, change } = { ...props };
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Typography className={classes.header} variant="body2">
        {title}
      </Typography>
      <Divider className={classes.divider} />
      <Box className={classes.changeBox}>
        {change ? (
          change > 0 ? (
            <>
              <ArrowUpwardIcon fontSize="default" className={classes.positive} />
              <Typography variant="caption" className={classes.positive}>
                {Math.abs(change)}%
              </Typography>
            </>
          ) : (
            <>
              <ArrowDownwardIcon fontSize="default" className={classes.negative} />
              <Typography variant="caption" className={classes.negative}>
                {Math.abs(change)}%
              </Typography>
            </>
          )
        ) : (
          <Typography variant="caption" className={classes.empty}>
            --%
          </Typography>
        )}
        <Divider className={classes.dividerVertical} orientation="vertical" />
        <Typography variant="caption" className={classes.header}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

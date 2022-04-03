import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import React from 'react';
import { TopContentType, Topic } from '../../../../store/models';
import { colors } from '../../../../theme/palette';
import { LiiingoTooltip } from '../../../LiiingoTooltip';
import { ChartContent } from './ChartContent';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bar: {
      height: 5,
      width: '100%',
    },
    progressBox: {
      width: 312,
    },
    labelBox: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      marginTop: 15,
      marginBottom: 5,
    },
    infoBox: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    divider: {
      marginRight: 2,
      marginLeft: 2,
    },
    increase: {
      color: colors.greenDark,
    },
    decrease: {
      color: colors.redDark,
    },
  })
);

export type MostViewedData = {
  title: string;
  total: number;
  change?: number;
};

export type MostViewedProps = {
  data?: TopContentType[]; //sorted from greatest to least
  total?: number;
  topics?: Topic[];
};

export const MostViewed = (props: MostViewedProps) => {
  const { data, total, topics } = { ...props };
  const classes = useStyles();
  const sessionCount = total ?? data[0]?.value; //using the greatest number of views as the total sessionCount
  const pageNames = topics.map((page) => page.name.find((lang) => lang.language === 'en').name || page.name[0].name);

  return (
    <ChartContent name="MOST VIEWED" label="Pages">
      {data.length > 0 ? (
        data.slice(0, 5).map((dataPoint, index) => (
          <Box key={index} className={classes.progressBox}>
            <Box className={classes.labelBox}>
              <Typography variant="caption">{dataPoint.label.name}</Typography>
              <Box className={classes.infoBox}>
                {dataPoint.change ? (
                  <>
                    {dataPoint.change < 0 ? (
                      <ArrowDownwardIcon fontSize="inherit" className={classes.decrease} />
                    ) : (
                      <ArrowUpwardIcon fontSize="inherit" className={classes.increase} />
                    )}
                    <Typography
                      className={dataPoint.change < 0 ? classes.decrease : classes.increase}
                      variant="caption"
                    >
                      {`${Math.abs(dataPoint.change)}%`}
                    </Typography>
                  </>
                ) : (
                  <LiiingoTooltip placement="top" message="Percentages will show after 30 days of data.">
                    <Typography variant="caption">-- %</Typography>
                  </LiiingoTooltip>
                )}

                <Divider className={classes.divider} orientation="vertical" />
                <Typography variant="caption">{dataPoint.value}</Typography>
              </Box>
            </Box>
            <LinearProgress
              className={classes.bar}
              variant="determinate"
              value={(dataPoint.value / sessionCount) * 100}
            />
          </Box>
        ))
      ) : (
        <LiiingoTooltip placement="top" message="Most Viewed pages will show after 30 days of data.">
          {pageNames.map((pageName, index) => (
            <Box key={index} className={classes.progressBox}>
              <Box className={classes.labelBox}>
                <Typography variant="caption">{pageName}</Typography>
                <Box className={classes.infoBox}>
                  <Typography variant="caption">-- %</Typography>
                  <Divider className={classes.divider} orientation="vertical" />
                  <Typography variant="caption"> 0</Typography>
                </Box>
              </Box>
              <LinearProgress className={classes.bar} variant="determinate" value={0} />
            </Box>
          ))}
        </LiiingoTooltip>
      )}
    </ChartContent>
  );
};

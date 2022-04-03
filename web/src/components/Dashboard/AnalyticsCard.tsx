import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import LiiingoAnalytics from './Analytics/LiiingoAnalytics';
import { CardTitle } from './CardComponents/CardTitle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formCard: {
      marginBottom: 20,
      width: 352,
      maxHeight: 671,
      backgroundColor: theme.palette.background.paper,
    },
    analyticsContent: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
  })
);

export type AnalyticsCardProps = {
  orgId: string;
};

export const AnalyticsCard = (props: AnalyticsCardProps) => {
  const classes = useStyles();

  const { orgId } = { ...props };

  return (
    <Card variant="outlined" className={classes.formCard}>
      <CardContent className={classes.analyticsContent}>
        <CardTitle title="Analytics" info="Last 30 Days" />
        <LiiingoAnalytics orgId={orgId} />
      </CardContent>
    </Card>
  );
};

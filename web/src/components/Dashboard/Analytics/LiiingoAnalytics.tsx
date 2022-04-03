import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Throbber } from '../..';
import { useAppDispatch } from '../../../store/hooks';
import { PageViewsType, TopContentType, Topic, UserTraffic } from '../../../store/models';
import {
  fetchAllAnalytics,
  _loading,
  _newTraffic,
  _pageViews,
  _returningTraffic,
  _topContent,
  _userTraffic,
} from '../../../store/slices/analyticsSlice';
import { _topics } from '../../../store/slices/topicSlice';
import { MostViewed, PageViews, Traffic } from './Charts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      marginTop: 10,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between',
    },
    loadingBox: {
      display: 'flex',
      alignitems: 'center',
      justifyContent: 'center',
    },
  })
);

export type LiiingoAnalyticsProps = {
  orgId: string;
  loading: boolean;
  topContent: TopContentType[];
  userTraffic: UserTraffic[];
  newTraffic: UserTraffic[];
  returningTraffic: UserTraffic[];
  pageViews: PageViewsType[];
  topics: Topic[];
};

export const LiiingoAnalytics = (props: Omit<LiiingoAnalyticsProps, 'orgId'>) => {
  const { loading, topContent, userTraffic, newTraffic, returningTraffic, pageViews, topics } = { ...props };
  const classes = useStyles();

  return loading ? (
    <Box className={classes.loadingBox}>
      <Throbber />
    </Box>
  ) : (
    <Box className={classes.content}>
      <Traffic userTraffic={userTraffic} newTraffic={newTraffic} returningTraffic={returningTraffic} />
      <Divider variant="middle" />
      <MostViewed data={topContent} topics={topics} />
      <Divider variant="middle" />
      <PageViews data={pageViews} topics={topics} />
    </Box>
  );
};

const LiiingoAnalyticsContainer = (
  props: Omit<
    LiiingoAnalyticsProps,
    'loading' | 'topContent' | 'topics' | 'userTraffic' | 'newTraffic' | 'returningTraffic' | 'pageViews'
  >
) => {
  const { orgId } = { ...props };
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (orgId) {
      dispatch(fetchAllAnalytics(orgId));
    }
  }, [dispatch, orgId]);

  const topContent = useSelector(_topContent);
  const userTraffic = useSelector(_userTraffic);
  const newTraffic = useSelector(_newTraffic);
  const returningTraffic = useSelector(_returningTraffic);
  const pageViews = useSelector(_pageViews);
  const loadingAnalytics = useSelector(_loading);
  const topics = useSelector(_topics);

  const state = {
    loading: loadingAnalytics,
    topContent,
    userTraffic,
    newTraffic,
    returningTraffic,
    pageViews,
    topics,
  };

  return <LiiingoAnalytics {...state} />;
};

export default LiiingoAnalyticsContainer;

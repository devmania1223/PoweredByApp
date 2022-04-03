import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addDays, format, formatISO } from 'date-fns';
import * as api from '../api-client';
import { PageViewsType, TopContentResponse, TopContentType, TrafficResponse, UserTraffic } from '../models';
import { AppState } from '../store';

export interface AnalyticsState {
  topContent: TopContentType[];
  userTraffic: UserTraffic[];
  newTraffic: UserTraffic[];
  returningTraffic: UserTraffic[];
  pageViews: PageViewsType[];
  isLoading: boolean;
}

const initAnalyticsState: AnalyticsState = {
  topContent: [],
  userTraffic: [],
  newTraffic: [],
  returningTraffic: [],
  pageViews: [],
  isLoading: false,
};

export const fetchAllAnalytics = createAsyncThunk<void, string, { state: AppState }>(
  'analytics/fetchAllAnalytics',
  async (orgId: string, { dispatch }) => {
    dispatch(getTraffic(orgId));
    dispatch(getTopContent(orgId));
    dispatch(getPageViews(orgId));
  }
);

export const getTraffic = createAsyncThunk<
  { userTraffic: UserTraffic[]; newTraffic: UserTraffic[]; returningTraffic: UserTraffic[] },
  string,
  { state: AppState }
>('analytics/getTraffic', async (orgId: string) => {
  const now = Date.now();
  const startDate = formatISO(addDays(now, -30));
  const endDate = formatISO(now);

  const rawData: TrafficResponse[] = await api.getSession(startDate, endDate, [orgId]);

  const data = rawData
    .filter((item) => item.metadata.viewedContent.length > 0)
    .filter((item) => {
      if (item.metadata.viewedContent.filter((obj) => orgId === obj.organizationId).length) {
        return true;
      }
      return false;
    });

  const userTraffic: UserTraffic[] = prepareUserTrafficData(data, orgId);

  const uniqueViews = data.reverse().reduce(
    (unique, all) => {
      const index = unique.firstVisit.findIndex((item) => item.udid === all.udid);
      if (index === -1) {
        unique.firstVisit.push(all);
      } else {
        unique.returnVisit.push(all);
      }
      return unique;
    },
    { firstVisit: [], returnVisit: [] }
  );

  //NOTE:
  // newTraffic is the first time that udid has been seen in the last 30 days
  const newTraffic = prepareUserTrafficData(uniqueViews.firstVisit, orgId);
  const returningTraffic = prepareUserTrafficData(uniqueViews.returnVisit, orgId);

  return { userTraffic, newTraffic, returningTraffic };
});

export const getTopContent = createAsyncThunk<TopContentType[], string, { state: AppState }>(
  'analytics/getTopContent',
  async (orgId: string) => {
    const now = Date.now();
    const startDate = formatISO(addDays(now, -30));
    const endDate = formatISO(now);

    const comparisonStart = formatISO(addDays(now, -60));

    const thisMonth = await prepareTopContent(startDate, endDate, orgId);
    const lastMonth = await prepareTopContent(comparisonStart, startDate, orgId);

    const exclude = ['exhibitId', 'name', 'orgName', 'locationName', 'areaName'];

    const topContent: TopContentType[] = Object.keys(thisMonth)
      .filter((key) => !exclude.includes(key))
      .map((key) => {
        return {
          label: thisMonth[key].name,
          value: thisMonth[key].value,
          change: lastMonth[key]
            ? Math.round(((thisMonth[key].value - lastMonth[key].value) / lastMonth[key].value) * 100)
            : null,
        };
      })
      .sort((a, b) => (b.value > a.value ? 1 : a.value > b.value ? -1 : 0));

    return topContent;
  }
);

export const getPageViews = createAsyncThunk<PageViewsType[], string, { state: AppState }>(
  'analytics/getPageViews',
  async (orgId: string) => {
    const now = Date.now();
    const startDate = formatISO(addDays(now, -30));
    const endDate = formatISO(now);
    const rawData: TrafficResponse[] = await api.getSession(startDate, endDate, [orgId]);

    const pageViews: PageViewsType[] = rawData
      .filter((item) => item.metadata.viewedContent.length > 0)
      .map((item) => item.metadata.viewedContent.map((test) => ({ ...test, createdDate: item.createdDate })))
      .flat()
      .reduce((data, { exhibitId, createdDate }) => {
        const timestamp = parseInt(createdDate.$date.$numberLong, 10);
        const key = format(new Date(timestamp), 'M/d');
        const display = format(new Date(timestamp), 'MMM d, yyyy');
        const datapoint = data.find((item) => item.exhibitId === exhibitId);
        if (datapoint) {
          const element = datapoint.views.find((value) => value.key === key);
          if (element) {
            element.value++;
          } else {
            datapoint.views.push({
              key,
              value: 1,
              display,
              timestamp,
            });
          }
        } else {
          data.push({
            exhibitId,
            views: [
              {
                key,
                value: 1,
                display,
                timestamp,
              },
            ],
          });
        }
        return data;
      }, [])
      .map((obj) => ({
        exhibitId: obj.exhibitId,
        views: obj.views.sort((a, b) => (a.timestamp > b.timestamp ? 1 : b.timestamp > a.timestamp ? -1 : 0)),
      }));

    return pageViews;
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: initAnalyticsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTopContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.topContent = action.payload;
    });
    builder.addCase(getTraffic.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userTraffic = action.payload.userTraffic;
      state.newTraffic = action.payload.newTraffic;
      state.returningTraffic = action.payload.returningTraffic;
    });
    builder.addCase(getPageViews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pageViews = action.payload;
    });
    builder
      .addMatcher(
        isAnyOf(fetchAllAnalytics.pending, getPageViews.pending, getTopContent.pending, getTraffic.pending),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchAllAnalytics.fulfilled,
          fetchAllAnalytics.rejected,
          getPageViews.rejected,
          getTopContent.rejected,
          getTraffic.rejected
        ),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

// Export reducer
export default analyticsSlice.reducer;

// Export actions
//export const {} = analyticsSlice.actions;

// Export selectors
export const _topContent = (state) => state.analytics.topContent;
export const _userTraffic = (state) => state.analytics.userTraffic;
export const _newTraffic = (state) => state.analytics.newTraffic;
export const _returningTraffic = (state) => state.analytics.returningTraffic;
export const _pageViews = (state) => state.analytics.pageViews;
export const _loading = (state) => state.analytics.isLoading;

const prepareTopContent = async (startDate: string, endDate: string, orgId: string) => {
  const data: TopContentResponse[] = await api.getTopContent(startDate, endDate, [orgId]);

  const preparedData = data
    .filter((obj) => orgId === obj.metadata.organizationId)
    .filter((obj) => obj.metadata.exhibitName)
    .map((obj) => ({
      exhibitId: obj.metadata.exhibitId,
      name: Array.isArray(obj.metadata.exhibitName)
        ? obj.metadata.exhibitName.find((lang) => lang.language === 'en') || obj.metadata.exhibitName[0].name
        : obj.metadata.exhibitName,
      orgName: obj.metadata.orgName,
      locationName: obj.metadata.locationName,
      areaName: obj.metadata.areaName.find((lang) => lang.language === 'en') || obj.metadata.areaName[0].name,
    }))
    .reduce((obj, item: { exhibitId; name; orgName; locationName; areaName }) => ({
      ...obj,
      [item.exhibitId]: {
        name: item.name,
        value: obj[item.exhibitId] && obj[item.exhibitId].value ? obj[item.exhibitId].value + 1 : 1,
      },
    }));

  return preparedData;
};

const prepareUserTrafficData = (rawData: TrafficResponse[], orgId: string) => {
  const userTraffic: UserTraffic[] = rawData
    .reduce((data, { createdDate }) => {
      const timestamp = parseInt(createdDate.$date.$numberLong, 10);
      const key = format(new Date(timestamp), 'M/d');
      const display = format(new Date(timestamp), 'MMM d, yyyy');
      const element = data.find((value) => value.key === key);

      if (element) {
        element.value++;
      } else {
        data.push({
          key,
          value: 1,
          display,
          timestamp,
        });
      }

      return data;
    }, [])
    .sort((a, b) => (a.timestamp > b.timestamp ? 1 : b.timestamp > a.timestamp ? -1 : 0));

  return userTraffic;
};

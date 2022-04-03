import axiosInstance from '.';
import axios from 'axios';

export const getLocationMetricsDownload = () => {
  return axiosInstance
    .post('/analytics/metrics', {
      exportToCsv: true,
      type: 'location',
    })
    .then((res: any) => res.data);
};

export const getTopicMetricsDownload = () => {
  return axiosInstance
    .post<string>('/analytics/metrics', {
      exportToCsv: true,
      type: 'topic',
    })
    .then((res: any) => res.data);
};

export const getTopContent = (startDate, endDate, orgId) => {
  const ids = orgId.filter((id) => id !== 0 && id !== '' && id !== 'all');
  return axiosInstance
    .post('/user-analytic/getByType', {
      type: 'top_content',
      start_date: startDate,
      end_date: endDate,
      orgId: ids,
    })
    .then((res: any) => res.data);
};

export const getShareData = (startDate, endDate, orgId) => {
  const ids = orgId.filter((id) => id !== 0 && id !== '' && id !== 'all');
  return axiosInstance
    .post('/user-analytic/getByType', {
      type: 'share',
      start_date: startDate,
      end_date: endDate,
      orgId: ids,
    })
    .then((res: any) => res.data);
};

export const getDownload = (startDate, endDate, orgId) => {
  const ids = orgId.filter((id) => id !== 0 && id !== '' && id !== 'all');
  return axiosInstance
    .post('/user-analytic/getByType', {
      type: 'download',
      start_date: startDate,
      end_date: endDate,
      orgId: ids,
    })
    .then((res: any) => res.data);
};

export const getSession = (startDate, endDate, orgId) => {
  const ids = orgId.filter((id) => id !== 0 && id !== '' && id !== 'all');
  return axiosInstance
    .post('/user-analytic/getByType', {
      type: 'session',
      start_date: startDate,
      end_date: endDate,
      orgId: ids,
    })
    .then((res: any) => res.data);
};

// TODO: figure out wtf api.appcenter.ms is

const _orgName = process.env.REACT_APP_APPCENTER_ORGANIZATION_NAME;
const _appNames = process.env.REACT_APP_APPCENTER_APP_NAMES;
// const sessionDurationChartOption: string = 'location';

export const getAnalyticsFromAppCenter = ({ orgId, event, property }) => {
  const date = new Date();
  // tslint:disable-next-line: no-magic-numbers
  date.setDate(date.getDate() - 90);
  const current = encodeURI(date.toISOString());
  const records = 100;
  return axios
    .get(
      // tslint:disable-next-line: max-line-length
      // `https://api.appcenter.ms/v0.1/apps/${_orgName}/${_appNames[0]}/analytics/events/QR_CODE_SCANNED_5bc4e179eda6afbd223694a5/properties/exhibitName/counts?start=2019-05-31T18%3A30%3A00.000Z&%24top=100`,
      // tslint:disable-next-line: max-line-length
      `https://api.appcenter.ms/v0.1/apps/${_orgName}/${_appNames[0]}/analytics/events/${event}_${orgId}/properties/${property}/counts?start=${current}&%24top=${records}`,
      // `https://api.appcenter.ms/v0.1/apps/${_orgName}/${_appNames[0]}/analytics/versions?start=${current}&%24top=30&versions=`,
      {
        headers: {
          'X-API-Token': process.env.REACT_APP_APPCENTER_TOKEN,
        },
      }
    )
    .then((res: any) => res.data);
};

export const getActiveUser = () => {
  const today = new Date();
  const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  const isoDate = encodeURI(prevMonth.toISOString());
  return axios
    .get(
      `https://appcenter.ms/api/v0.1/apps/${_orgName}/${_appNames[0]}/analytics/active_device_counts/?start=${isoDate}`,
      {
        headers: {
          'X-API-Token': process.env.REACT_APP_APPCENTER_TOKEN,
        },
      }
    )
    .then((res: any) => res.data);
};
export const getDailySession = () => {
  //   https://appcenter.ms/api/v0.1/apps/${_orgName}/${_appNames[0]}/analytics/sessions_per_device/?start=2019-07-06T15%3A33%3A06.342Z&interval=P1D
  const today = new Date();
  const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  const isoDate = encodeURI(prevMonth.toISOString());
  return axios
    .get(
      `https://appcenter.ms/api/v0.1/apps/${_orgName}/${_appNames[0]}/analytics/sessions_per_device/?start=${isoDate}&interval=P1D`,
      {
        headers: {
          'X-API-Token': process.env.REACT_APP_APPCENTER_TOKEN,
        },
      }
    )
    .then((res: any) => res.data);
};
export const getSessionDuration = () => {
  const today = new Date();
  const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  const isoDate = encodeURI(prevMonth.toISOString());
  return axios
    .get(
      `https://appcenter.ms/api/v0.1/apps/${_orgName}/${_appNames[0]}/analytics/session_durations_distribution/?start=${isoDate}&interval=P1D`,
      {
        headers: {
          'X-API-Token': process.env.REACT_APP_APPCENTER_TOKEN,
        },
      }
    )
    .then((res: any) => res.data);
};
export const getTopDevices = () => {
  const today = new Date();
  const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  const isoDate = encodeURI(prevMonth.toISOString());
  return axios
    .get(`https://appcenter.ms/api/v0.1/apps/${_orgName}/${_appNames[0]}/analytics/models/?start=${isoDate}&$top=4`, {
      headers: {
        'X-API-Token': process.env.REACT_APP_APPCENTER_TOKEN,
      },
    })
    .then((res: any) => res.data);
};
export const getDataByCountry = () => {
  const today = new Date();
  const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  const isoDate = encodeURI(prevMonth.toISOString());
  return axios
    .get(`https://appcenter.ms/api/v0.1/apps/${_orgName}/${_appNames[0]}/analytics/places/?start=${isoDate}`, {
      headers: {
        'X-API-Token': process.env.REACT_APP_APPCENTER_TOKEN,
      },
    })
    .then((res: any) => res.data);
};
export const getDataByLanguage = () => {
  const today = new Date();
  const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  const isoDate = encodeURI(prevMonth.toISOString());
  return axios
    .get(`https://appcenter.ms/api/v0.1/apps/${_orgName}/${_appNames[0]}/analytics/languages/?start=${isoDate}`, {
      headers: {
        'X-API-Token': process.env.REACT_APP_APPCENTER_TOKEN,
      },
    })
    .then((res: any) => res.data);
};

export const getActiveUserByVersion = () => {
  const today = new Date();
  const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  const isoDate = encodeURI(prevMonth.toISOString());
  return axios
    .get(
      `https://appcenter.ms/api/v0.1/apps/${_orgName}/${_appNames[0]}/analytics/versions/?start=${isoDate}&count=20`,
      {
        headers: {
          'X-API-Token': process.env.REACT_APP_APPCENTER_TOKEN,
        },
      }
    )
    .then((res: any) => res.data);
};

// https://appcenter.ms/api/v0.1/apps/RZ_Ventive/Liiingo-Android/analytics/places/?start=2021-06-24T18:00:38Z

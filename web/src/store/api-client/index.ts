import axios from 'axios';
import { Stream } from 'stream';
import { ACCESS_TOKEN } from '../../util/constants';
import { toAbridgedAxiosError } from './axiosErrorHelpers';
// https://www.npmjs.com/package/blob-util

// For network requests that don't need these header-params, just create another axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_LIIINGO_URL,
  // headers: {
  //   //Accept: 'application/json, text/plain, */*',
  //   //'Content-Type': 'application/json', //multipart/form-data; boundary=----WebKitFormBoundaryBGVvH3OfggAP4Tad
  // },
});

// Intercept requests and append current AUTH token to header
axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem(ACCESS_TOKEN);
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

// Intercept all responses, for handling errors in one place
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    //TODO: pop an alert with server error
    console.error(`AXIOS ERROR: ${error} \n RESPONSE FROM SERVER: ${error.response?.data}`);
    return Promise.reject(error);
  }
);

export function stripQuotes(res): string {
  return res.replace(/['"]+/g, '');
}

export async function getFileFromUrl(url: string | Object | undefined): Promise<any> {
  if (typeof url !== 'string') return;
  try {
    // const response = await axios.get(url, {
    //   responseType: 'stream',
    // });
    // return await streamToString(response.data);
    const blobVila = await fetch(url).then((r) => r.blob());
    return blobVila;
  } catch (error) {
    throw toAbridgedAxiosError(error);
  }
}

export const streamToString = (stream: Stream): Promise<Buffer> => {
  const chunks: any[] = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });
};

export default axiosInstance;
export * from './analytics';
export * from './auth';
export * from './device';
export * from './file';
export * from './location';
export * from './organization';
export * from './overlay';
export * from './push-notifications';
export * from './section';
export * from './topics';
export * from './user';

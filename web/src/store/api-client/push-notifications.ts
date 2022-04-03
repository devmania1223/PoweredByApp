import axiosInstance from '.';

export const send = (payload) => {
  return axiosInstance.post('/notification/save', payload).then((res: any) => res.data);
};
export const get = (payload) => {
  return axiosInstance.post('/notification/get', payload).then((res: any) => res.data);
};
export const cancel = (payload) => {
  return axiosInstance.post('/notification/deleteNotification', payload).then((res: any) => res.data);
};

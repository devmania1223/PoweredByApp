import axiosInstance from '.';
import { User } from '../models';
import { newUser } from '../models/user/User';

export const getUser = () => {
  return axiosInstance.post<User>('/user/getDetails', {}).then((res) => newUser(res.data));
};

export const initUser = (token: string) => {
  return axiosInstance
    .post<User>('/user/getDetails', {}, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => newUser(res.data));
};

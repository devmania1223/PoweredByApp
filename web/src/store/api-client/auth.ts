import axiosInstance, { stripQuotes } from '.';

export const login = (email: string, password: string) => {
  console.log('login');
  return axiosInstance
    .post(
      '/auth/login',
      {
        email: email,
        password: password,
      },
      {
        responseType: 'text',
      }
    )
    .then((res) => stripQuotes(res.data));
};

export const refreshToken = (authToken: string) => {
  return axiosInstance
    .post(
      '/auth/refresh',
      {},
      {
        responseType: 'text',
        headers: { Authorization: `Bearer ${authToken}` },
      }
    )
    .then((res) => stripQuotes(res.data));
};

export const startImpersonation = (organizationId: string) => {
  return axiosInstance
    .post('/organization/impersonateStart', {
      id: organizationId,
    })
    .then((res: any) => res.data);
};

export const stopImpersonation = () => {
  return axiosInstance.post('/organization/impersonateStop', {}).then((res: any) => res.data);
};

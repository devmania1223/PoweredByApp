import { AxiosError, AxiosResponse } from 'axios';

export interface AbridgedAxiosError extends Error {
  response?: {
    status: AxiosResponse['status'];
    statusText: AxiosResponse['statusText'];
    headers: AxiosResponse['headers'];
  };
  request?: {
    method: string;
    path: string;
  };
}

export const toAbridgedAxiosError: (axiosError: AxiosError, overrideMessage?: string) => AbridgedAxiosError = (
  axiosError,
  overrideMessage
) => {
  const abridgedError: AbridgedAxiosError = Object.assign(new Error(), {
    response: axiosError.response && {
      status: axiosError.response.status,
      statusText: axiosError.response.statusText,
      headers: axiosError.response.headers,
    },
    request: axiosError.request && {
      method: axiosError.request.method,
      path: axiosError.request.path,
    },
    message: !!overrideMessage ? `${overrideMessage} => ${axiosError.message}` : axiosError.message,
    stack: axiosError.stack,
    name: `AbridgedAxiosError: ${axiosError.name}`,
    isAxiosError: axiosError.isAxiosError,
    toJSON: axiosError.toJSON,
  });

  return abridgedError;
};

import axios, { AxiosError, AxiosResponse } from 'axios';

const REQ_TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = REQ_TIMEOUT;
axios.defaults.baseURL = process.env.REACT_APP_BACK_END_URL;

export const setupAxiosInterceptors = (): void => {
  const onResponseSuccess = async (response: AxiosResponse<any, any>): Promise<AxiosResponse<any, any>> => response;
  const onResponseError = async (err: AxiosError): Promise<void> => {
    const status = err.status ?? (err.response !== undefined ? err.response.status : 0);
    if (status === 403 || status === 401) {
      console.log('err ', err);
    }
    throw err;
  };
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

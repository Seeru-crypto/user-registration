import axios, {AxiosResponse} from 'axios';
import config from "./config.json"

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = config.BACK_URL;

export const setupAxiosInterceptors = () => {

    const onResponseSuccess = (response:  AxiosResponse<any, any>) => response;
    const onResponseError = (err : any) => {
        const status = err.status || (err.response ? err.response.status : 0);
        if (status === 403 || status === 401) {
            console.log("err ", err)
        }
        return Promise.reject(err);
    };
    axios.interceptors.response.use(onResponseSuccess, onResponseError);
};


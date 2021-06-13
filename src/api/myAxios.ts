import { message } from 'antd';
import axios, { AxiosError } from 'axios';
import { baseURL } from '../config';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { IResponse } from '../lib/types/api';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL,
  responseType: 'json',
});

axiosInstance.interceptors.request.use((config) => {
  Nprogress.start();
  if (!config.url?.includes('login')) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => {
    Nprogress.done();
    return res.data;
  },
  (error: AxiosError): Promise<AxiosError> => {
    const errorInfo = error.response;
    Nprogress.done();
    if (!errorInfo?.data.data) {
      switch (errorInfo?.status) {
        case 400:
          message.error('Request error (400)', 1);
          break;
        case 401:
          localStorage.clear();
          window.location.href = '/login';
          message.error('Unauthorized, please log in again (401)', 1);
          break;
        case 403:
          message.error('Access denied (403)', 1);
          break;
        case 404:
          message.error('Content not found (404)', 1);
          break;
        case 408:
          message.error('Request timeout (408)', 1);
          break;
        case 500:
          message.error('Server error (500)', 1);
          break;
        case 501:
          message.error('Service not implemented (501)', 1);
          break;
        case 502:
          message.error('Network error (502)', 1);
          break;
        case 503:
          message.error('Service unavailable (503)', 1);
          break;
        case 504:
          message.error('Gateway timeout(504)', 1);
          break;
        case 505:
          message.error('HTTP version is not supported(505)', 1);
          break;
        default:
          message.error(`Connection error(${errorInfo?.status})!`, 1);
      }
    }
    return new Promise(() => {});
  }
);
export default axiosInstance 
export async function apiGetResponse(url: string, param?: {}):Promise<IResponse> {
  const aipResponse = await axiosInstance.get(creatUrl(url, param)).then((res) => res);
  return aipResponse;
}
export async function apiPostResponse(url: string, param: {}) {
  const aipResponse = await axiosInstance.post(creatUrl(url), param).then((res) => res);
  return aipResponse;
}

export async function apiPutResponse(url: string, param: {}) {
  const aipResponse = await axiosInstance.put(creatUrl(url), param).then((res) => res);
  return aipResponse;
}

export async function apiDeleteResponse(url: string, param: {}) {
  const aipResponse = await axiosInstance.delete(creatUrl(url), param).then((res) => res);
  return aipResponse;
}

const creatUrl = (path: string | [], params?: {}): string => {
  const paths = typeof path === 'string' ? path : path.join('/');
  let name = '';
  if (params) {
    name = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    return `${paths}?${name}`;
  }
  return `${paths}`;
};

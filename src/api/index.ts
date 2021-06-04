import { message } from 'antd';
import axios, { AxiosError } from 'axios';
import storage from '../lib/types/storage';
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3000/',
  responseType: 'json',
});

axiosInstance.interceptors.request.use((config) => {
  if (!config.url?.includes('login')) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: 'Bearer ' + storage?.token,
      },
    };
  }
  return config;
});
axiosInstance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error: AxiosError): Promise<AxiosError> => {
    const errorInfo: any = error.response;
    if (errorInfo.config.url.includes('login')) {
      message.error(errorInfo.data.data);
    }
    if (!errorInfo.data.data) {
      switch (errorInfo.status) {
        case 400:
          message.error('Request error (400)');
          break;
        case 401:
          message.error('Unauthorized, please log in again (401)');
          break;
        case 403:
          message.error('Access denied (403)');
          break;
        case 404:
          message.error('Content not found (404)');
          break;
        case 408:
          message.error('Request timeout (408)');
          break;
        case 500:
          message.error('Server error (500)');
          break;
        case 501:
          message.error('Service not implemented (501)');
          break;
        case 502:
          message.error('Network error (502)');
          break;
        case 503:
          message.error('Service unavailable (503)');
          break;
        case 504:
          message.error('Gateway timeout(504)');
          break;
        case 505:
          message.error('HTTP version is not supported(505)');
          break;
        default:
          message.error(`Connection error(${errorInfo.status})!`);
      }
    }

    return new Promise(() => {});
  }
);
async function apiGetResponse(url: string, param: {}) {
  const aipResponse = await axiosInstance.get(creatUrl(url, param)).then((res) => res);
  return aipResponse;
}
async function apiPostResponse(url: string, param: {}) {
  const aipResponse = await axiosInstance.post(creatUrl(url), param).then((res) => res);
  return aipResponse;
}

async function apiPutResponse(url: string, param: {}) {
  const aipResponse = await axiosInstance.put(creatUrl(url), param).then((res) => res);
  return aipResponse;
}

async function apiDeleteResponse(url: string, param: {}) {
  const aipResponse = await axiosInstance.delete(creatUrl(url), param).then((res) => res);
  return aipResponse;
}

export const reqLogin = async (query: { username: string; password: string }) => {
  const res = await apiPostResponse('login', query);
  return res;
};

export const creatUrl = (path: string | [], params?: {}): string => {
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

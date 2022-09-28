import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';
import { HTTP_METHODS } from '../consts/api';

const baseAxios: AxiosInstance = axios.create();

const createApi =
  (axiosInstance: AxiosInstance, methodType: Method) =>
  (config: AxiosRequestConfig) => {
    return axiosInstance({
      method: methodType,
      ...config,
    });
  };

const http = {
  get: createApi(baseAxios, HTTP_METHODS.GET),
}

export default http;
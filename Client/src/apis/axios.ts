import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';
import token from '../utils/token';
import storage from '../utils/localStorage';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../const/path';
import { APIError } from '../types/api';
import { API_URL } from '../const/apiUrl';

const host =
  window.location.hostname === 'localhost' ? 'http://127.0.0.1:8000' : 'api';

export const instance = axios.create({
  baseURL: host,
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accesstoken = token.get(ACCESS_TOKEN);
    if (accesstoken !== null) {
      Object.assign(config.headers, { authorization: `bearer ${accesstoken}` });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // 2xx 범위 내에 있는 모든 상태 코드는 이 함수를 트리거하게 합니다
    // response 데이터로 작업하기 -> console.log("get response", response)
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    // 만료된 토큰일 경우
    if (status === 419 || status === 401) {
      const originalRequest = config;
      const refreshToken: string = storage.get(REFRESH_TOKEN) as string;
      storage.set(ACCESS_TOKEN, refreshToken);

      // refresh token Post API 호출
      return await instance.post(API_URL.refreshToken).then((res) => {
        if (res.status === 200) {
          storage.set(ACCESS_TOKEN, res.data.refresh_token);
          Object.assign(config.headers, {
            authorization: `bearer ${refreshToken}`,
          });

          return axios(originalRequest);
        }
      });
    }

    return Promise.reject(error);
  }
);

export const createDefaultAPIError = (error: unknown): APIError => {
  if (error instanceof AxiosError) {
    return {
      code: 400,
      message: error.response?.data.message,
    };
  }
  return { code: 400, message: '알 수 없는 에러입니다.' };
};

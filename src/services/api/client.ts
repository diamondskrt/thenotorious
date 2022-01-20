import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import router from '@/router';

const axiosConfigs: AxiosRequestConfig = {
  timeout: 600000,
  baseURL: process.env.VUE_APP_API_URL,
};

const client = axios.create(axiosConfigs);

client.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    handleError(error);
  }
);

const handleError = (error: AxiosError): void => {
  switch (error?.response?.status) {
    case 403: {
      redirectToBasePage();
      return;
    }
    default:
      throw error;
  }
};

const redirectToBasePage = (): void => {
  router.push('/');
};

export { client };

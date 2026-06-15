/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosRequestHeaders,
} from 'axios';
import { type HttpClient } from '../models/http-client';
import { type HttpClientConfig } from '../models/http-client-config';

class AxiosHttpClient implements HttpClient {
  private axiosInstance: AxiosInstance;
  private getToken: () => string | null;

  constructor(config: HttpClientConfig = {}, getToken: () => string | null) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL || 'https://api.example.com', // Default if not provided
      timeout: config.timeout || 10000, // Default to 10 seconds timeout if not provided
      headers: config.headers || {}, // Default to no additional headers
    });

    // Função para obter o token, que será usada no interceptor
    this.getToken = getToken;

    // Interceptor para adicionar o token nas requisições
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = this.getToken();
        if (token) {
          // Garantindo que os headers estão tipados corretamente
          config.headers = {
            ...(config.headers || {}),
            Authorization: `Bearer ${token}`,
          } as AxiosRequestHeaders;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }

  async patch<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return response.data;
  }
}

export { AxiosHttpClient };

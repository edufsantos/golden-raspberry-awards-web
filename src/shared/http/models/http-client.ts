/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpClient {
  get<T>(url: string, config?: Record<string, any>): Promise<T>;
  post<T>(url: string, data: any, config?: Record<string, any>): Promise<T>;
  put<T>(url: string, data: any, config?: Record<string, any>): Promise<T>;
  patch<T>(url: string, data: any, config?: Record<string, any>): Promise<T>;
  delete<T>(url: string, config?: Record<string, any>): Promise<T>;
}

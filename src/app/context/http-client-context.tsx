/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, type ReactNode } from 'react';

import { AxiosHttpClient } from '@/shared/http/axios/axios-http-client';
import type { HttpClient } from '@/shared/http/models/http-client';
import type { HttpClientConfig } from '@/shared/http/models/http-client-config';

const HttpClientContext = createContext<HttpClient | undefined>(undefined);

// Provider component
interface HttpClientProviderProps {
  children: ReactNode;
  config: HttpClientConfig;
}

const HttpClientProvider: React.FC<HttpClientProviderProps> = ({
  children,
  config,
}) => {
  //  Como no projeto atual não há uma implementacao de autenticação, o token é passado como null. mas os codigo ja esta preparado para receber um token, caso seja necessário futuramente.
  const httpClient = new AxiosHttpClient(config, () => null);

  return (
    <HttpClientContext.Provider value={httpClient}>
      {children}
    </HttpClientContext.Provider>
  );
};

const useHttpClient = (): HttpClient => {
  const context = useContext(HttpClientContext);
  if (!context) {
    throw new Error('useHttpClient must be used within an HttpClientProvider');
  }
  return context;
};

export { HttpClientProvider, useHttpClient };

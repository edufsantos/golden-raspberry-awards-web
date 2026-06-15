/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode } from 'react';

import { useHttpClient } from '@/app/context/http-client-context';
import { DashboardService } from '@/features/dashboard/services/dashboard-service';
import { MoviesService } from '@/features/movies/services/movies-service';
import { useLogger } from '@/shared/context/logger-context';

// Definir o tipo do contexto
interface ServicesContextProps {
  dashboardService: DashboardService;
  moviesService: MoviesService;
}

const ServicesContext = createContext<ServicesContextProps | undefined>(
  undefined
);

export const ServicesProvider = ({ children }: { children: ReactNode }) => {
  const httpClient = useHttpClient();
  const logger = useLogger();

  const dashboardService = new DashboardService(httpClient, logger);
  const moviesService = new MoviesService(httpClient, logger);

  return (
    <ServicesContext.Provider value={{ dashboardService, moviesService }}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = (): ServicesContextProps => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};

import { useEffect, useState } from 'react';

import { useServices } from '@/app/context/services-context';

import type { DashboardSummary } from '../models/dashboard';

export const useDashboardQuery = () => {
  const { dashboardService } = useServices();

  const [data, setData] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await dashboardService.fetchDashboardSummary();
        if (!mounted) return;
        setData(response);
      } catch {
        if (!mounted) return;
        setIsError(true);
      } finally {
        if (!mounted) return;
        setIsLoading(false);
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, [dashboardService]);

  return {
    data,
    isLoading,
    isError,
  };
};

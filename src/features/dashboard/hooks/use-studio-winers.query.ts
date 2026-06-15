import { useEffect, useState } from 'react';

import { useServices } from '@/app/context/services-context';

import type { StudioWinners } from '../models/fetch-studio-winners';

export const useStudioWinners = () => {
  const { dashboardService } = useServices();

  const [data, setData] = useState<StudioWinners[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await dashboardService.fetchStudiosWithWinCount();
        if (!mounted) return;
        setData(response);
      } catch {
        if (!mounted) return;
        setIsError(true);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
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

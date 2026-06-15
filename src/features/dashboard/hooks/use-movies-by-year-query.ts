import { useEffect, useState } from 'react';

import { useServices } from '@/app/context/services-context';

import type { Movie } from '../models/dashboard';

export const useMoviesByYearQuery = (year: number | null) => {
  const { dashboardService } = useServices();

  const [data, setData] = useState<Movie[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (year === null) {
      setData([]);
      setIsError(false);
      setIsFetching(false);
      return;
    }

    let mounted = true;

    const run = async () => {
      setIsFetching(true);
      setIsError(false);

      try {
        const response = await dashboardService.fetchMoviesByYear(year);
        if (!mounted) return;
        setData(response);
      } catch {
        if (!mounted) return;
        setIsError(true);
      } finally {
        if (!mounted) return;
        setIsFetching(false);
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, [dashboardService, year]);

  return {
    data,
    isFetching,
    isError,
  };
};

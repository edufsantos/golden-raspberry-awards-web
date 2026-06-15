import { useEffect, useState } from 'react';

import { useServices } from '@/app/context/services-context';
import type { MovieByYear } from '../models/fetch-movies-by-year';

export const useMoviesByYearQuery = (year: number) => {
  const { dashboardService } = useServices();

  const [data, setData] = useState<MovieByYear[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
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
        if (mounted) {
          setIsFetching(false);
        }
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

import { useState } from 'react';

import { useServices } from '@/app/context/services-context';
import type { MovieByYear } from '../models/fetch-movies-by-year';

export const useMoviesByYearQuery = (year: number) => {
  const { dashboardService } = useServices();

  const [data, setData] = useState<MovieByYear[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  const refetch = () => {
    setIsFetching(true);
    setIsError(false);

    dashboardService
      .fetchMoviesByYear(year)
      .then((response) => {
        setData(response);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  return {
    data,
    isFetching,
    isError,
    refetch,
  };
};

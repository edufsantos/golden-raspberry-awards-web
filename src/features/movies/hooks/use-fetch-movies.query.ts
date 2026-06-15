import { useEffect, useState } from 'react';

import { useServices } from '@/app/context/services-context';
import { useAppStore } from '@/app/store/store';
import type { MoviesPaginated } from '../models/movie';

export const useFetchMoviesQuery = () => {
  const { moviesService } = useServices();

  const page = useAppStore((state) => state.movies.page);
  const size = useAppStore((state) => state.movies.size);
  const year = useAppStore((state) => state.movies.year);
  const winner = useAppStore((state) => state.movies.winner);

  const [data, setData] = useState<MoviesPaginated | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      if (!hasLoadedOnce) {
        setIsLoading(true);
      }
      setIsFetching(true);
      setIsError(false);

      try {
        const response = await moviesService.fetchMovies({
          page,
          size,
          winner,
          year: year.trim() ? Number(year) : undefined,
        });

        if (!mounted) return;
        setData(response);
        setHasLoadedOnce(true);
      } catch {
        if (!mounted) return;
        setIsError(true);
      } finally {
        if (mounted) {
          setIsLoading(false);
          setIsFetching(false);
        }
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, [hasLoadedOnce, moviesService, page, size, winner, year]);

  return {
    data,
    isLoading,
    isFetching,
    isError,
  };
};

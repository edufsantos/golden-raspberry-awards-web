import { useEffect, useState } from 'react';

import { useServices } from '@/app/context/services-context';
import type { Movie } from '../models/movie';

export const useFetchMovieByIdQuery = (id: number) => {
  const { moviesService } = useServices();

  const [data, setData] = useState<Movie | null>(null);
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
        const response = await moviesService.fetchMovieById(id);

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
  }, [hasLoadedOnce, moviesService, id]);

  return {
    data,
    isLoading,
    isFetching,
    isError,
  };
};

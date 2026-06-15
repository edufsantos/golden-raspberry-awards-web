import { useAppStore } from '@/app/store/store';
import { useFetchMoviesQuery } from './use-fetch-movies.query';

export const useMoviesTableHandler = () => {
  const page = useAppStore((state) => state.movies.page);
  const year = useAppStore((state) => state.movies.year);
  const winner = useAppStore((state) => state.movies.winner);

  const setPage = useAppStore((state) => state.movies.setPage);
  const setYear = useAppStore((state) => state.movies.setYear);
  const setWinner = useAppStore((state) => state.movies.setWinner);

  const { data, isLoading, isError, isFetching } = useFetchMoviesQuery();

  return {
    page,
    year,
    winner,
    setPage,
    setYear,
    setWinner,
    data,
    isLoading,
    isError,
    isFetching,
  };
};

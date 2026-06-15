import { useAppStore } from '@/app/store/store';
import { useMoviesByYearQuery } from './use-movies-by-year.query';

export const useMoviesByYearHandler = () => {
  const searchYear = useAppStore((state) => state.dashboard.searchYear);
  const setSearchYear = useAppStore((state) => state.dashboard.setSearchYear);

  const moviesByYearQuery = useMoviesByYearQuery(
    searchYear ? Number(searchYear) : new Date().getFullYear(),
  );

  const handleSearch = () => {
    const trimmedValue = searchYear.trim();
    if (!trimmedValue) {
      return;
    }

    const year = Number(trimmedValue);
    if (!Number.isFinite(year)) {
      return;
    }
  };

  return {
    searchYear,
    setSearchYear,
    handleSearch,
    moviesByYearQuery,
  };
};

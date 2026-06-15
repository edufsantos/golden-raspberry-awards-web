import { create } from 'zustand';

import { initialDashboardSliceState } from '@/features/dashboard/store/dashboard-slice';
import type { WinnerFilter } from '@/features/movies/models/movie';
import { initialMoviesSliceState } from '@/features/movies/store/movies-slice';

type AppStore = {
  dashboard: {
    searchYear: string;
    setSearchYear: (searchYear: string) => void;
  };
  movies: {
    page: number;
    size: number;
    year: string;
    winner: WinnerFilter;
    setPage: (page: number) => void;
    setSize: (size: number) => void;
    setYear: (year: string) => void;
    setWinner: (winner: WinnerFilter) => void;
  };
};

const useAppStore = create<AppStore>((set) => ({
  dashboard: {
    ...initialDashboardSliceState,
    setSearchYear: (searchYear) =>
      set((state) => ({
        dashboard: { ...state.dashboard, searchYear },
      })),
  },
  movies: {
    ...initialMoviesSliceState,
    setPage: (page) =>
      set((state) => ({
        movies: { ...state.movies, page },
      })),
    setSize: (size) =>
      set((state) => ({
        movies: { ...state.movies, size, page: 0 },
      })),
    setYear: (year) =>
      set((state) => ({
        movies: { ...state.movies, year, page: 0 },
      })),
    setWinner: (winner) =>
      set((state) => ({
        movies: { ...state.movies, winner, page: 0 },
      })),
  },
}));

export { useAppStore };

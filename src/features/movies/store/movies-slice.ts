import type { WinnerFilter } from '../models/movie';

interface MoviesSliceState {
  page: number;
  size: number;
  year: string;
  winner: WinnerFilter;
}

const initialMoviesSliceState: MoviesSliceState = {
  page: 0,
  size: 10,
  year: '',
  winner: 'all',
};

export { initialMoviesSliceState };
export type { MoviesSliceState };

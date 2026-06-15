export type Movie = {
  id: number;
  year: number;
  title: string;
  studios?: string[];
  producers?: string[];
  winner: boolean;
};

export type PaginatedMoviesResponse = {
  content: Movie[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
};

export type WinnerFilter = 'yes' | 'no' | 'all';

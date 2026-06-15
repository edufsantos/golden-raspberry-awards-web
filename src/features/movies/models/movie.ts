export type RawMovie = {
  id: number;
  year: number;
  title: string;
  studios?: string[];
  producers?: string[];
  winner: boolean;
};

export type PaginatedMoviesApiResponse = {
  content: RawMovie[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
};

export type WinnerFilter = 'yes' | 'no' | 'all';

export class Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;

  constructor(
    id: number,
    year: number,
    title: string,
    studios: string[],
    producers: string[],
    winner: boolean,
  ) {
    this.id = id;
    this.year = year;
    this.title = title;
    this.studios = studios;
    this.producers = producers;
    this.winner = winner;
  }

  static fromApiResponse(responseData: Record<string, unknown>) {
    return new Movie(
      responseData.id as number,
      responseData.year as number,
      responseData.title as string,
      (responseData.studios as string[]) ?? [],
      (responseData.producers as string[]) ?? [],
      responseData.winner as boolean,
    );
  }
}

export class MoviesPaginated {
  movies: Movie[];
  total: number;
  total_elements: number;
  number: number;
  size: number;

  constructor(
    movies: Movie[],
    total: number,
    total_elements: number,
    number: number,
    size: number,
  ) {
    this.movies = movies;
    this.total = total;
    this.total_elements = total_elements;
    this.number = number;
    this.size = size;
  }

  static fromApiResponse(responseData: PaginatedMoviesApiResponse) {
    return new MoviesPaginated(
      responseData.content.map(Movie.fromApiResponse),
      responseData.totalPages,
      responseData.totalElements,
      responseData.number,
      responseData.size,
    );
  }
}

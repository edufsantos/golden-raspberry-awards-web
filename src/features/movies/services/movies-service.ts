import type { HttpClient } from '@/shared/http/models/http-client';
import { type LoggerInterface } from '@/shared/utils/logger';

import {
  Movie,
  MoviesPaginated,
  type PaginatedMoviesApiResponse,
  type RawMovie,
  type WinnerFilter,
} from '../models/movie';

class MoviesService {
  private readonly httpClient: HttpClient;
  private readonly logger: LoggerInterface;

  constructor(httpClient: HttpClient, logger: LoggerInterface) {
    this.httpClient = httpClient;
    this.logger = logger;
  }

  async fetchMovies(params: {
    page: number;
    size: number;
    year?: number;
    winner?: WinnerFilter;
  }): Promise<MoviesPaginated> {
    try {
      const winnerValue =
        params.winner === 'yes'
          ? true
          : params.winner === 'no'
            ? false
            : undefined;

      const response = await this.httpClient.get<PaginatedMoviesApiResponse>(
        '/movies',
        {
          params: {
            page: params.page,
            size: params.size,
            year: params.year,
            winner: winnerValue,
          },
        },
      );

      return MoviesPaginated.fromApiResponse(response);
    } catch (error) {
      this.logger.error(`MoviesService.fetchMovies failed: ${String(error)}`);
      throw error;
    }
  }

  async fetchMovieById(id: number): Promise<Movie> {
    try {
      const response = await this.httpClient.get<RawMovie>(`/movies/${id}`);
      return Movie.fromApiResponse(response);
    } catch (error) {
      this.logger.error(
        `MoviesService.fetchMovieById failed for id ${id}: ${String(error)}`,
      );
      throw error;
    }
  }
}

export { MoviesService };

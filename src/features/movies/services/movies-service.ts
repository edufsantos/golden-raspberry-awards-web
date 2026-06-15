import type { HttpClient } from '@/shared/http/models/http-client';
import { type LoggerInterface } from '@/shared/utils/logger';

import type {
  Movie,
  PaginatedMoviesResponse,
  WinnerFilter,
} from '../models/movie';

type ApiPaginatedMovies = {
  content?: Movie[];
  totalPages?: number;
  totalElements?: number;
  number?: number;
  size?: number;
};

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
  }): Promise<PaginatedMoviesResponse> {
    try {
      const winnerValue =
        params.winner === 'yes'
          ? true
          : params.winner === 'no'
            ? false
            : undefined;

      const response = await this.httpClient.get<ApiPaginatedMovies>(
        '/api/movies',
        {
          params: {
            page: params.page,
            size: params.size,
            year: params.year,
            winner: winnerValue,
          },
        },
      );

      return {
        content: response.content ?? [],
        totalPages: response.totalPages ?? 0,
        totalElements: response.totalElements ?? 0,
        number: response.number ?? params.page,
        size: response.size ?? params.size,
      };
    } catch (error) {
      this.logger.error(`MoviesService.fetchMovies failed: ${String(error)}`);
      throw error;
    }
  }
}

export { MoviesService };

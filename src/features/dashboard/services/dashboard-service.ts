import type { HttpClient } from '@/shared/http/models/http-client';
import { type LoggerInterface } from '@/shared/utils/logger';

import type {
  DashboardSummary,
  Movie,
  ProducerAwardsIntervalResponse,
  StudiosWithWinCountResponse,
  YearsWithMultipleWinnersResponse,
} from '../models/dashboard';

class DashboardService {
  private readonly httpClient: HttpClient;
  private readonly logger: LoggerInterface;

  constructor(httpClient: HttpClient, logger: LoggerInterface) {
    this.httpClient = httpClient;
    this.logger = logger;
  }

  async fetchDashboardSummary(): Promise<DashboardSummary> {
    try {
      const [yearsResponse, studiosResponse, producerIntervals] =
        await Promise.all([
          this.httpClient.get<YearsWithMultipleWinnersResponse>(
            '/api/movies/yearsWithMultipleWinners',
          ),
          this.httpClient.get<StudiosWithWinCountResponse>(
            '/api/movies/studiosWithWinCount',
          ),
          this.httpClient.get<ProducerAwardsIntervalResponse>(
            '/api/movies/maxMinWinIntervalForProducers',
          ),
        ]);

      return {
        yearsWithMultipleWinners: yearsResponse.years ?? [],
        topStudios: (studiosResponse.studios ?? []).slice(0, 3),
        producerIntervals: {
          min: producerIntervals.min ?? [],
          max: producerIntervals.max ?? [],
        },
      };
    } catch (error) {
      this.logger.error(
        `DashboardService.fetchDashboardSummary failed: ${String(error)}`,
      );
      throw error;
    }
  }

  async fetchMoviesByYear(year: number): Promise<Movie[]> {
    try {
      const response = await this.httpClient.get<Movie[]>(
        '/api/movies/winnersByYear',
        {
          params: { year },
        },
      );
      return response ?? [];
    } catch (error) {
      this.logger.error(
        `DashboardService.fetchMoviesByYear failed: ${String(error)}`,
      );
      throw error;
    }
  }
}

export { DashboardService };

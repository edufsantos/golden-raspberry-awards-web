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
          this.httpClient.get<YearsWithMultipleWinnersResponse>('/movies', {
            params: { projection: 'years-with-multiple-winners' },
          }),
          this.httpClient.get<StudiosWithWinCountResponse>('/movies', {
            params: { projection: 'studios-with-win-count' },
          }),
          this.httpClient.get<ProducerAwardsIntervalResponse>(
            '/producers/awards-interval',
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
      const response = await this.httpClient.get<
        Movie[] | { content?: Movie[] }
      >('/movies', {
        params: { year },
      });

      if (Array.isArray(response)) {
        return response;
      }

      return response.content ?? [];
    } catch (error) {
      this.logger.error(
        `DashboardService.fetchMoviesByYear failed: ${String(error)}`,
      );
      throw error;
    }
  }
}

export { DashboardService };

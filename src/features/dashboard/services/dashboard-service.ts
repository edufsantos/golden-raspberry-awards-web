import type { HttpClient } from '@/shared/http/models/http-client';
import { type LoggerInterface } from '@/shared/utils/logger';

import {
  MovieByYear,
  type MovieByYearApiResponse,
} from '../models/fetch-movies-by-year';
import {
  ProducerWinIntervals,
  type ProducerWinIntervalsApiResponse,
} from '../models/fetch-producer-win-intervals';
import {
  StudioWinners,
  type StudiosWithWinCountApiResponse,
} from '../models/fetch-studio-winners';
import {
  MultipleWinnersYear,
  type YearsWithMultipleWinnersApiResponse,
} from '../models/fetch-years-with-multiple-winners';

class DashboardService {
  private readonly httpClient: HttpClient;
  private readonly logger: LoggerInterface;

  constructor(httpClient: HttpClient, logger: LoggerInterface) {
    this.httpClient = httpClient;
    this.logger = logger;
  }

  async fetchMoviesByYear(year: number): Promise<MovieByYear[]> {
    try {
      if (!year) {
        this.logger.warn(
          'DashboardService.fetchMoviesByYear called with invalid year parameter',
        );
      }
      const response = await this.httpClient.get<MovieByYearApiResponse>(
        '/movies/winnersByYear',
        {
          params: { year },
        },
      );
      return MovieByYear.fromApiResponse(response);
    } catch (error) {
      this.logger.error(
        `DashboardService.fetchMoviesByYear failed: ${String(error)}`,
      );
      throw error;
    }
  }

  async fetchYearsWithMultipleWinners(): Promise<MultipleWinnersYear[]> {
    try {
      const response =
        await this.httpClient.get<YearsWithMultipleWinnersApiResponse>(
          '/movies/yearsWithMultipleWinners',
        );
      return MultipleWinnersYear.fromApiResponse(response);
    } catch (error) {
      this.logger.error(
        `DashboardService.fetchYearsWithMultipleWinners failed: ${String(error)}`,
      );
      throw error;
    }
  }

  async fetchStudiosWithWinCount(): Promise<StudioWinners[]> {
    try {
      const response =
        await this.httpClient.get<StudiosWithWinCountApiResponse>(
          '/movies/studiosWithWinCount',
        );
      // TODO: Caso a api tenha um param para limitar a quantidade de estúdios retornados, seria melhor do que limitar aqui no frontend.
      // Seria interessante também ter um endpoint específico para retornar apenas o top 3 estúdios. Vou deixar esse comentário para discutirmos na próxima reunião de alinhamento.
      return StudioWinners.fromApiResponse(response);
    } catch (error) {
      this.logger.error(
        `DashboardService.fetchStudiosWithWinCount failed: ${String(error)}`,
      );
      throw error;
    }
  }

  async fetchProducerWinIntervals(): Promise<ProducerWinIntervals> {
    try {
      const response =
        await this.httpClient.get<ProducerWinIntervalsApiResponse>(
          '/movies/maxMinWinIntervalForProducers',
        );
      return ProducerWinIntervals.fromApiResponse(response);
    } catch (error) {
      this.logger.error(
        `DashboardService.fetchProducerWinIntervals failed: ${String(error)}`,
      );
      throw error;
    }
  }
}

export { DashboardService };

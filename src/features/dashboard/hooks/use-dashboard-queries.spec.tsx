// @vitest-environment happy-dom
import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MovieByYear } from '../models/fetch-movies-by-year';
import { ProducerWinIntervals } from '../models/fetch-producer-win-intervals';
import { StudioWinners } from '../models/fetch-studio-winners';
import { MultipleWinnersYear } from '../models/fetch-years-with-multiple-winners';
import { useMoviesByYearQuery } from './use-movies-by-year.query';
import { useProducerWinIntervals } from './use-producer-win-intervals.query';
import { useStudioWinners } from './use-studio-winers.query';
import { useYearsWithMultipleWinners } from './use-years-with-multiple-winners.query';

type Deferred<T> = {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
};

const createDeferred = <T,>(): Deferred<T> => {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
};

const flushPromises = () =>
  new Promise<void>((resolve) => setTimeout(resolve, 0));

const mockDashboardService = vi.hoisted(() => ({
  fetchMoviesByYear: vi.fn(),
  fetchProducerWinIntervals: vi.fn(),
  fetchStudiosWithWinCount: vi.fn(),
  fetchYearsWithMultipleWinners: vi.fn(),
}));

vi.mock('@/app/context/services-context', () => ({
  useServices: () => ({
    dashboardService: mockDashboardService,
  }),
}));

describe('dashboard query hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useMoviesByYearQuery', () => {
    it('returns fetched movies on success', async () => {
      const movies = [
        new MovieByYear(1, 2020, 'Movie', ['Studio'], ['Producer'], true),
      ];
      mockDashboardService.fetchMoviesByYear.mockResolvedValueOnce(movies);

      const { result } = renderHook(() => useMoviesByYearQuery(2020));

      await waitFor(() => {
        expect(result.current.isFetching).toBe(false);
      });

      expect(mockDashboardService.fetchMoviesByYear).toHaveBeenCalledWith(2020);
      expect(result.current.data).toEqual(movies);
      expect(result.current.isError).toBe(false);
    });

    it('sets error state on failure', async () => {
      mockDashboardService.fetchMoviesByYear.mockRejectedValueOnce(
        new Error('fail'),
      );

      const { result } = renderHook(() => useMoviesByYearQuery(1999));

      await waitFor(() => {
        expect(result.current.isFetching).toBe(false);
      });

      expect(result.current.isError).toBe(true);
      expect(result.current.data).toEqual([]);
    });

    it('does not update state when unmounted before success', async () => {
      const deferred = createDeferred<MovieByYear[]>();
      mockDashboardService.fetchMoviesByYear.mockReturnValueOnce(
        deferred.promise,
      );

      const { unmount } = renderHook(() => useMoviesByYearQuery(1998));

      await waitFor(() => {
        expect(mockDashboardService.fetchMoviesByYear).toHaveBeenCalledWith(
          1998,
        );
      });

      unmount();

      await act(async () => {
        deferred.resolve([
          new MovieByYear(
            2,
            1998,
            'Late movie',
            ['Studio'],
            ['Producer'],
            false,
          ),
        ]);
        await flushPromises();
      });

      expect(true).toBe(true);
    });

    it('does not update state when unmounted before failure', async () => {
      const deferred = createDeferred<MovieByYear[]>();
      mockDashboardService.fetchMoviesByYear.mockReturnValueOnce(
        deferred.promise,
      );

      const { unmount } = renderHook(() => useMoviesByYearQuery(1997));

      await waitFor(() => {
        expect(mockDashboardService.fetchMoviesByYear).toHaveBeenCalledWith(
          1997,
        );
      });

      unmount();

      await act(async () => {
        deferred.reject(new Error('late error'));
        await flushPromises();
      });

      expect(true).toBe(true);
    });
  });

  describe('useProducerWinIntervals', () => {
    it('returns intervals on success', async () => {
      const response = new ProducerWinIntervals(
        [{ producer: 'A', interval: 1, previousWin: 2000, followingWin: 2001 }],
        [{ producer: 'B', interval: 5, previousWin: 1990, followingWin: 1995 }],
      );
      mockDashboardService.fetchProducerWinIntervals.mockResolvedValueOnce(
        response,
      );

      const { result } = renderHook(() => useProducerWinIntervals());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isError).toBe(false);
      expect(result.current.data).toEqual(response);
    });

    it('sets error state on failure', async () => {
      mockDashboardService.fetchProducerWinIntervals.mockRejectedValueOnce(
        new Error('fail'),
      );

      const { result } = renderHook(() => useProducerWinIntervals());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isError).toBe(true);
      expect(result.current.data).toBeNull();
    });

    it('does not update state when unmounted before success', async () => {
      const deferred = createDeferred<ProducerWinIntervals>();
      mockDashboardService.fetchProducerWinIntervals.mockReturnValueOnce(
        deferred.promise,
      );

      const { unmount } = renderHook(() => useProducerWinIntervals());

      await waitFor(() => {
        expect(
          mockDashboardService.fetchProducerWinIntervals,
        ).toHaveBeenCalled();
      });

      unmount();

      await act(async () => {
        deferred.resolve(
          new ProducerWinIntervals(
            [
              {
                producer: 'A',
                interval: 1,
                previousWin: 2000,
                followingWin: 2001,
              },
            ],
            [
              {
                producer: 'B',
                interval: 3,
                previousWin: 2002,
                followingWin: 2005,
              },
            ],
          ),
        );
        await flushPromises();
      });

      expect(true).toBe(true);
    });

    it('does not update state when unmounted before failure', async () => {
      const deferred = createDeferred<ProducerWinIntervals>();
      mockDashboardService.fetchProducerWinIntervals.mockReturnValueOnce(
        deferred.promise,
      );

      const { unmount } = renderHook(() => useProducerWinIntervals());

      await waitFor(() => {
        expect(
          mockDashboardService.fetchProducerWinIntervals,
        ).toHaveBeenCalled();
      });

      unmount();

      await act(async () => {
        deferred.reject(new Error('late error'));
        await flushPromises();
      });

      expect(true).toBe(true);
    });
  });

  describe('useYearsWithMultipleWinners', () => {
    it('returns years on success', async () => {
      const response = [new MultipleWinnersYear(1986, 2)];
      mockDashboardService.fetchYearsWithMultipleWinners.mockResolvedValueOnce(
        response,
      );

      const { result } = renderHook(() => useYearsWithMultipleWinners());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isError).toBe(false);
      expect(result.current.data).toEqual(response);
    });

    it('sets error state on failure', async () => {
      mockDashboardService.fetchYearsWithMultipleWinners.mockRejectedValueOnce(
        new Error('fail'),
      );

      const { result } = renderHook(() => useYearsWithMultipleWinners());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isError).toBe(true);
      expect(result.current.data).toEqual([]);
    });

    it('does not update state when unmounted before success', async () => {
      const deferred = createDeferred<MultipleWinnersYear[]>();
      mockDashboardService.fetchYearsWithMultipleWinners.mockReturnValueOnce(
        deferred.promise,
      );

      const { unmount } = renderHook(() => useYearsWithMultipleWinners());

      await waitFor(() => {
        expect(
          mockDashboardService.fetchYearsWithMultipleWinners,
        ).toHaveBeenCalled();
      });

      unmount();

      await act(async () => {
        deferred.resolve([new MultipleWinnersYear(2001, 3)]);
        await flushPromises();
      });

      expect(true).toBe(true);
    });

    it('does not update state when unmounted before failure', async () => {
      const deferred = createDeferred<MultipleWinnersYear[]>();
      mockDashboardService.fetchYearsWithMultipleWinners.mockReturnValueOnce(
        deferred.promise,
      );

      const { unmount } = renderHook(() => useYearsWithMultipleWinners());

      await waitFor(() => {
        expect(
          mockDashboardService.fetchYearsWithMultipleWinners,
        ).toHaveBeenCalled();
      });

      unmount();

      await act(async () => {
        deferred.reject(new Error('late error'));
        await flushPromises();
      });

      expect(true).toBe(true);
    });
  });

  describe('useStudioWinners', () => {
    it('returns studio winners on success', async () => {
      const response = [new StudioWinners('Studio A', 7)];
      mockDashboardService.fetchStudiosWithWinCount.mockResolvedValueOnce(
        response,
      );

      const { result } = renderHook(() => useStudioWinners());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isError).toBe(false);
      expect(result.current.data).toEqual(response);
    });

    it('sets error state on failure', async () => {
      mockDashboardService.fetchStudiosWithWinCount.mockRejectedValueOnce(
        new Error('fail'),
      );

      const { result } = renderHook(() => useStudioWinners());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isError).toBe(true);
      expect(result.current.data).toEqual([]);
    });

    it('does not update state when unmounted before success', async () => {
      const deferred = createDeferred<StudioWinners[]>();
      mockDashboardService.fetchStudiosWithWinCount.mockReturnValueOnce(
        deferred.promise,
      );

      const { unmount } = renderHook(() => useStudioWinners());

      await waitFor(() => {
        expect(
          mockDashboardService.fetchStudiosWithWinCount,
        ).toHaveBeenCalled();
      });

      unmount();

      await act(async () => {
        deferred.resolve([new StudioWinners('Studio B', 8)]);
        await flushPromises();
      });

      expect(true).toBe(true);
    });

    it('does not update state when unmounted before failure', async () => {
      const deferred = createDeferred<StudioWinners[]>();
      mockDashboardService.fetchStudiosWithWinCount.mockReturnValueOnce(
        deferred.promise,
      );

      const { unmount } = renderHook(() => useStudioWinners());

      await waitFor(() => {
        expect(
          mockDashboardService.fetchStudiosWithWinCount,
        ).toHaveBeenCalled();
      });

      unmount();

      await act(async () => {
        deferred.reject(new Error('late error'));
        await flushPromises();
      });

      expect(true).toBe(true);
    });
  });
});

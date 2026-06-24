// @vitest-environment happy-dom
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useMoviesByYearHandler } from './use-movies-by.handler';

const mockSetSearchYear = vi.hoisted(() => vi.fn());
const mockRefetch = vi.hoisted(() => vi.fn());
const mockMoviesByYearQueryResult = vi.hoisted(() => ({
  data: [],
  isFetching: false,
  isError: false,
  refetch: mockRefetch,
}));

const mockUseMoviesByYearQuery = vi.hoisted(() => vi.fn());

const mockStore = vi.hoisted(() => ({
  dashboard: {
    searchYear: '',
    setSearchYear: mockSetSearchYear,
  },
}));

vi.mock('@/app/store/store', () => ({
  useAppStore: (selector: (state: typeof mockStore) => unknown) =>
    selector(mockStore),
}));

vi.mock('./use-movies-by-year.query', () => ({
  useMoviesByYearQuery: (year: number | null) => mockUseMoviesByYearQuery(year),
}));

describe('useMoviesByYearHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockStore.dashboard.searchYear = '';
    mockUseMoviesByYearQuery.mockReturnValue(mockMoviesByYearQueryResult);
  });

  it('uses typed year when searchYear exists', () => {
    mockStore.dashboard.searchYear = '1999';

    const { result } = renderHook(() => useMoviesByYearHandler());

    expect(mockUseMoviesByYearQuery).toHaveBeenCalledWith(1999);
    expect(result.current.searchYear).toBe('1999');
    expect(result.current.setSearchYear).toBe(mockSetSearchYear);
    expect(result.current.moviesByYearQuery).toBe(mockMoviesByYearQueryResult);
  });

  it('uses current year when searchYear is empty', () => {
    mockStore.dashboard.searchYear = '';

    renderHook(() => useMoviesByYearHandler());

    expect(mockUseMoviesByYearQuery).toHaveBeenCalledWith(
      new Date().getFullYear(),
    );
  });

  it('returns early in handleSearch when input is blank', () => {
    mockStore.dashboard.searchYear = '   ';

    const { result } = renderHook(() => useMoviesByYearHandler());

    expect(() => result.current.handleSearch()).not.toThrow();
  });

  it('returns early in handleSearch when input is invalid number', () => {
    mockStore.dashboard.searchYear = 'abc';

    const { result } = renderHook(() => useMoviesByYearHandler());

    expect(() => result.current.handleSearch()).not.toThrow();
  });

  it('executes numeric path in handleSearch', () => {
    mockStore.dashboard.searchYear = '2020';

    const { result } = renderHook(() => useMoviesByYearHandler());

    result.current.handleSearch();

    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it('does not call refetch when input is blank', () => {
    mockStore.dashboard.searchYear = '   ';

    const { result } = renderHook(() => useMoviesByYearHandler());

    result.current.handleSearch();

    expect(mockRefetch).not.toHaveBeenCalled();
  });
});
it('does not call refetch when input is invalid number', () => {
  mockStore.dashboard.searchYear = 'abc';

  const { result } = renderHook(() => useMoviesByYearHandler());

  result.current.handleSearch();

  expect(mockRefetch).not.toHaveBeenCalled();
});

// @vitest-environment happy-dom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Movie } from '../models/movie';
import { MoviesTable } from './movies-table';

afterEach(() => {
  cleanup();
});

const mockUseMoviesTableHandler = vi.hoisted(() => vi.fn());
const moviesPaginationSpy = vi.hoisted(() => vi.fn());

vi.mock('../hooks/use-movies-table.handler', () => ({
  useMoviesTableHandler: () => mockUseMoviesTableHandler(),
}));

vi.mock('./movies-pagination', () => ({
  MoviesPagination: (props: {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }) => {
    moviesPaginationSpy(props);
    return (
      <div data-testid='movies-pagination'>
        <span>{`page:${props.page}-total:${props.totalPages}`}</span>
        <button type='button' onClick={() => props.onPageChange(0)}>
          first-page
        </button>
        <button type='button' onClick={() => props.onPageChange(1)}>
          page-2
        </button>
        <button type='button' onClick={() => props.onPageChange(10)}>
          out-of-range-page
        </button>
      </div>
    );
  },
}));

describe('MoviesTable', () => {
  const setPage = vi.fn();
  const setYear = vi.fn();
  const setWinner = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseMoviesTableHandler.mockReturnValue({
      page: 1,
      year: '1999',
      winner: 'all',
      setPage,
      setYear,
      setWinner,
      data: {
        movies: [
          new Movie(1, 1999, 'Movie 1', ['Studio 1'], ['Producer 1'], true),
          new Movie(2, 2000, 'Movie 2', ['Studio 2'], ['Producer 2'], false),
        ],
        total: 3,
        total_elements: 20,
        number: 2,
        size: 10,
      },
      isLoading: false,
      isError: false,
      isFetching: false,
    });
  });

  it('renders rows and pagination using handler data', () => {
    render(<MoviesTable />);

    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
    expect(screen.getAllByText('Yes').length).toBeGreaterThan(0);
    expect(screen.getAllByText('No').length).toBeGreaterThan(0);
    expect(screen.getByTestId('movies-pagination')).toBeInTheDocument();

    expect(moviesPaginationSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 2,
        totalPages: 3,
        onPageChange: expect.any(Function),
      }),
    );
  });

  it('shows loading state', () => {
    mockUseMoviesTableHandler.mockReturnValue({
      page: 0,
      year: '',
      winner: 'all',
      setPage,
      setYear,
      setWinner,
      data: null,
      isLoading: true,
      isError: false,
      isFetching: false,
    });

    render(<MoviesTable />);

    expect(screen.getByText('Loading movies...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    mockUseMoviesTableHandler.mockReturnValue({
      page: 0,
      year: '',
      winner: 'all',
      setPage,
      setYear,
      setWinner,
      data: null,
      isLoading: false,
      isError: true,
      isFetching: false,
    });

    render(<MoviesTable />);

    expect(
      screen.getByText('Error loading movies. Please try again.'),
    ).toBeInTheDocument();
  });

  it('shows fetching indicator and empty state when there are no movies', () => {
    mockUseMoviesTableHandler.mockReturnValue({
      page: 0,
      year: '',
      winner: 'all',
      setPage,
      setYear,
      setWinner,
      data: {
        movies: [],
        total: 0,
        total_elements: 0,
        number: 0,
        size: 10,
      },
      isLoading: false,
      isError: false,
      isFetching: true,
    });

    render(<MoviesTable />);

    expect(screen.getByText('Updating list...')).toBeInTheDocument();
    expect(screen.getByText('No movies found.')).toBeInTheDocument();
  });

  it('propagates year and winner filter changes', () => {
    render(<MoviesTable />);

    fireEvent.change(screen.getByPlaceholderText('Filter by year'), {
      target: { value: '2025' },
    });
    fireEvent.change(screen.getByDisplayValue('List all'), {
      target: { value: 'yes' },
    });

    expect(setYear).toHaveBeenCalledWith('2025');
    expect(setWinner).toHaveBeenCalledWith('yes');
  });

  it('clamps page change to zero when total pages is zero', () => {
    mockUseMoviesTableHandler.mockReturnValue({
      page: 0,
      year: '1999',
      winner: 'all',
      setPage,
      setYear,
      setWinner,
      data: {
        movies: [new Movie(1, 1999, 'Movie 1', [], [], true)],
        total: 0,
        total_elements: 1,
        number: 0,
        size: 10,
      },
      isLoading: false,
      isError: false,
      isFetching: false,
    });

    render(<MoviesTable />);

    fireEvent.click(screen.getByRole('button', { name: 'out-of-range-page' }));

    expect(setPage).toHaveBeenCalledWith(0);
  });

  it('changes page when requested page is in range', () => {
    render(<MoviesTable />);

    fireEvent.click(screen.getByRole('button', { name: 'page-2' }));

    expect(setPage).toHaveBeenCalledWith(1);
  });

  it('clamps page change to last page when requested page is too high', () => {
    mockUseMoviesTableHandler.mockReturnValue({
      page: 2,
      year: '1999',
      winner: 'all',
      setPage,
      setYear,
      setWinner,
      data: {
        movies: [new Movie(1, 1999, 'Movie 1', [], [], true)],
        total: 3,
        total_elements: 1,
        number: 2,
        size: 10,
      },
      isLoading: false,
      isError: false,
      isFetching: false,
    });

    render(<MoviesTable />);

    fireEvent.click(screen.getByRole('button', { name: 'out-of-range-page' }));

    expect(setPage).toHaveBeenCalledWith(2);
  });

  it('uses fallback page and total values when data is null', () => {
    mockUseMoviesTableHandler.mockReturnValue({
      page: 4,
      year: '2005',
      winner: 'no',
      setPage,
      setYear,
      setWinner,
      data: null,
      isLoading: false,
      isError: false,
      isFetching: false,
    });

    render(<MoviesTable />);

    expect(moviesPaginationSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 4,
        totalPages: 0,
      }),
    );
    expect(screen.getByText('No movies found.')).toBeInTheDocument();
  });
});

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
const mockUseMovieDetailsModalHandler = vi.hoisted(() => vi.fn());
const moviesFiltersSpy = vi.hoisted(() => vi.fn());
const moviesPaginationSpy = vi.hoisted(() => vi.fn());
const movieDetailsModalSpy = vi.hoisted(() => vi.fn());

vi.mock('../hooks/use-movies-table.handler', () => ({
  useMoviesTableHandler: () => mockUseMoviesTableHandler(),
}));

vi.mock('../hooks/use-movie-details-modal.handler', () => ({
  useMovieDetailsModalHandler: () => mockUseMovieDetailsModalHandler(),
}));

vi.mock('./movies-filters', () => ({
  MoviesFilters: (props: {
    year: string;
    winner: 'all' | 'yes' | 'no';
    onYearChange: (value: string) => void;
    onWinnerChange: (value: 'all' | 'yes' | 'no') => void;
  }) => {
    moviesFiltersSpy(props);
    return (
      <div data-testid='movies-filters'>
        <button type='button' onClick={() => props.onYearChange('2025')}>
          change-year
        </button>
        <button type='button' onClick={() => props.onWinnerChange('yes')}>
          change-winner
        </button>
      </div>
    );
  },
}));

vi.mock('./movies-pagination', () => ({
  MoviesPagination: (props: {
    page: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
  }) => {
    moviesPaginationSpy(props);
    return (
      <div data-testid='movies-pagination'>
        <span>{`page:${props.page}-total:${props.totalPages}`}</span>
        <button type='button' onClick={props.onPrev}>
          prev-page
        </button>
        <button type='button' onClick={props.onNext}>
          next-page
        </button>
      </div>
    );
  },
}));

vi.mock('./movie-details-modal', () => ({
  MovieDetailsModal: (props: { movieId: number; onClose: () => void }) => {
    movieDetailsModalSpy(props);
    return (
      <div data-testid='movie-details-modal'>
        <span>{`movie:${props.movieId}`}</span>
        <button type='button' onClick={props.onClose}>
          close-modal
        </button>
      </div>
    );
  },
}));

describe('MoviesTable', () => {
  const setPage = vi.fn();
  const setYear = vi.fn();
  const setWinner = vi.fn();
  const openMovieDetails = vi.fn();
  const closeMovieDetails = vi.fn();

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

    mockUseMovieDetailsModalHandler.mockReturnValue({
      selectedMovieId: null,
      isMovieDetailsOpen: false,
      openMovieDetails,
      closeMovieDetails,
    });
  });

  it('renders filters, rows and pagination using handler data', () => {
    render(<MoviesTable />);

    expect(screen.getByTestId('movies-filters')).toBeInTheDocument();
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
    expect(screen.getByText('Sim')).toBeInTheDocument();
    expect(screen.getByText('Não')).toBeInTheDocument();
    expect(screen.getByTestId('movies-pagination')).toBeInTheDocument();

    expect(moviesFiltersSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        year: '1999',
        winner: 'all',
        onYearChange: setYear,
        onWinnerChange: setWinner,
      }),
    );

    expect(moviesPaginationSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 2,
        totalPages: 3,
        onPrev: expect.any(Function),
        onNext: expect.any(Function),
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

    expect(screen.getByText('Carregando filmes...')).toBeInTheDocument();
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
      screen.getByText('Erro ao carregar filmes. Tente novamente.'),
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

    expect(screen.getByText('Atualizando tabela...')).toBeInTheDocument();
    expect(screen.getByText('Nenhum filme encontrado.')).toBeInTheDocument();
  });

  it('opens movie details when action button is clicked', () => {
    render(<MoviesTable />);

    const detailButtons = screen.getAllByRole('button', {
      name: 'Ver detalhes',
    });

    fireEvent.click(detailButtons[0]);

    expect(openMovieDetails).toHaveBeenCalledWith(1);
  });

  it('renders open modal and closes it through modal callback', () => {
    mockUseMovieDetailsModalHandler.mockReturnValue({
      selectedMovieId: 99,
      isMovieDetailsOpen: true,
      openMovieDetails,
      closeMovieDetails,
    });

    render(<MoviesTable />);

    expect(screen.getByTestId('movie-details-modal')).toBeInTheDocument();
    expect(movieDetailsModalSpy).toHaveBeenCalledWith(
      expect.objectContaining({ movieId: 99, onClose: closeMovieDetails }),
    );

    fireEvent.click(screen.getByRole('button', { name: 'close-modal' }));

    expect(closeMovieDetails).toHaveBeenCalledTimes(1);
  });

  it('propagates filter callbacks from child component props', () => {
    render(<MoviesTable />);

    fireEvent.click(screen.getByRole('button', { name: 'change-year' }));
    fireEvent.click(screen.getByRole('button', { name: 'change-winner' }));

    expect(setYear).toHaveBeenCalledWith('2025');
    expect(setWinner).toHaveBeenCalledWith('yes');
  });

  it('goes to previous page without going below zero', () => {
    mockUseMoviesTableHandler.mockReturnValue({
      page: 0,
      year: '1999',
      winner: 'all',
      setPage,
      setYear,
      setWinner,
      data: {
        movies: [new Movie(1, 1999, 'Movie 1', [], [], true)],
        total: 3,
        total_elements: 1,
        number: 0,
        size: 10,
      },
      isLoading: false,
      isError: false,
      isFetching: false,
    });

    render(<MoviesTable />);

    fireEvent.click(screen.getByRole('button', { name: 'prev-page' }));

    expect(setPage).toHaveBeenCalledWith(0);
  });

  it('goes to next page when there is another page', () => {
    render(<MoviesTable />);

    fireEvent.click(screen.getByRole('button', { name: 'next-page' }));

    expect(setPage).toHaveBeenCalledWith(2);
  });

  it('does not go to next page when already at the end', () => {
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

    fireEvent.click(screen.getByRole('button', { name: 'next-page' }));

    expect(setPage).not.toHaveBeenCalled();
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
    expect(screen.getByText('Nenhum filme encontrado.')).toBeInTheDocument();
  });
});

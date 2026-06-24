// @vitest-environment happy-dom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { MoviesByYearPanel } from './movies-by-year-panel';

const { useMoviesByYearHandlerMock } = vi.hoisted(() => ({
  useMoviesByYearHandlerMock: vi.fn(),
}));

vi.mock('../hooks/use-movies-by.handler', () => ({
  useMoviesByYearHandler: useMoviesByYearHandlerMock,
}));

afterEach(() => {
  cleanup();
});

describe('MoviesByYearPanel', () => {
  it('renders input and triggers setSearchYear and handleSearch', () => {
    const setSearchYear = vi.fn();
    const handleSearch = vi.fn();

    useMoviesByYearHandlerMock.mockReturnValue({
      searchYear: '',
      setSearchYear,
      handleSearch,
      moviesByYearQuery: {
        isFetching: false,
        isError: false,
        data: null,
      },
    });

    render(<MoviesByYearPanel />);

    const input = screen.getByPlaceholderText('Search by year');
    const button = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: '1990' } });
    fireEvent.click(button);

    expect(screen.getByText('List movies winners by year')).toBeInTheDocument();
    expect(setSearchYear).toHaveBeenCalledWith('1990');
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });

  it('renders loading message while fetching', () => {
    useMoviesByYearHandlerMock.mockReturnValue({
      searchYear: '2001',
      setSearchYear: vi.fn(),
      handleSearch: vi.fn(),
      moviesByYearQuery: {
        isFetching: true,
        isError: false,
        data: null,
      },
    });

    render(<MoviesByYearPanel />);

    expect(screen.getByText('Buscando filmes...')).toBeInTheDocument();
  });

  it('renders error message when query fails', () => {
    useMoviesByYearHandlerMock.mockReturnValue({
      searchYear: '2001',
      setSearchYear: vi.fn(),
      handleSearch: vi.fn(),
      moviesByYearQuery: {
        isFetching: false,
        isError: true,
        data: null,
      },
    });

    render(<MoviesByYearPanel />);

    expect(
      screen.getByText('Erro ao buscar filmes para o ano informado.'),
    ).toBeInTheDocument();
  });

  it('renders movies table when data exists and there is no error', () => {
    useMoviesByYearHandlerMock.mockReturnValue({
      searchYear: '1999',
      setSearchYear: vi.fn(),
      handleSearch: vi.fn(),
      moviesByYearQuery: {
        isFetching: false,
        isError: false,
        data: [
          {
            id: 1,
            year: 1999,
            title: 'Movie 1',
            studios: [],
            producers: [],
            winner: true,
          },
          {
            id: 2,
            year: 1999,
            title: 'Movie 2',
            studios: [],
            producers: [],
            winner: false,
          },
        ],
      },
    });

    render(<MoviesByYearPanel />);

    expect(screen.getByText('Id')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.queryByText('Sim')).not.toBeInTheDocument();
  });

  it('does not render table when there is error even if data exists', () => {
    useMoviesByYearHandlerMock.mockReturnValue({
      searchYear: '1999',
      setSearchYear: vi.fn(),
      handleSearch: vi.fn(),
      moviesByYearQuery: {
        isFetching: false,
        isError: true,
        data: [
          {
            id: 1,
            year: 1999,
            title: 'Movie 1',
            studios: [],
            producers: [],
            winner: true,
          },
        ],
      },
    });

    render(<MoviesByYearPanel />);

    expect(screen.queryByText('ID')).not.toBeInTheDocument();
    expect(
      screen.getByText('Erro ao buscar filmes para o ano informado.'),
    ).toBeInTheDocument();
  });
});

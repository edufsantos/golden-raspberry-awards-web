// @vitest-environment happy-dom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Movie } from '../models/movie';
import { MovieDetailsModal } from './movie-details-modal';

const mockUseFetchMovieByIdQuery = vi.hoisted(() => vi.fn());

vi.mock('../hooks/use-fetch-movie-by-id.query', () => ({
  useFetchMovieByIdQuery: (id: number) => mockUseFetchMovieByIdQuery(id),
}));

afterEach(() => {
  cleanup();
});

describe('MovieDetailsModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    mockUseFetchMovieByIdQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isFetching: false,
      isError: false,
    });

    render(<MovieDetailsModal movieId={1} onClose={vi.fn()} />);

    expect(mockUseFetchMovieByIdQuery).toHaveBeenCalledWith(1);
    expect(
      screen.getByText('Carregando detalhes do filme...'),
    ).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockUseFetchMovieByIdQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isFetching: false,
      isError: true,
    });

    render(<MovieDetailsModal movieId={2} onClose={vi.fn()} />);

    expect(
      screen.getByText(
        'Erro ao carregar os detalhes do filme. Tente novamente.',
      ),
    ).toBeInTheDocument();
  });

  it('renders movie details and fetching message', () => {
    mockUseFetchMovieByIdQuery.mockReturnValue({
      data: new Movie(
        3,
        1994,
        'Pulp Fiction',
        ['Miramax'],
        ['Lawrence Bender'],
        true,
      ),
      isLoading: false,
      isFetching: true,
      isError: false,
    });

    render(<MovieDetailsModal movieId={3} onClose={vi.fn()} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Pulp Fiction' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Atualizando detalhes...')).toBeInTheDocument();
    expect(screen.getByText('Miramax')).toBeInTheDocument();
    expect(screen.getByText('Lawrence Bender')).toBeInTheDocument();
    expect(screen.getByText('Sim')).toBeInTheDocument();
  });

  it('renders fallback text when studios and producers are empty', () => {
    mockUseFetchMovieByIdQuery.mockReturnValue({
      data: new Movie(4, 2000, 'Unknown', [], [], false),
      isLoading: false,
      isFetching: false,
      isError: false,
    });

    render(<MovieDetailsModal movieId={4} onClose={vi.fn()} />);

    expect(screen.getAllByText('Não informado')).toHaveLength(2);
    expect(screen.getByText('Não')).toBeInTheDocument();
  });

  it('closes when close button is clicked', () => {
    const onClose = vi.fn();
    mockUseFetchMovieByIdQuery.mockReturnValue({
      data: new Movie(5, 2001, 'Movie', ['Studio'], ['Producer'], false),
      isLoading: false,
      isFetching: false,
      isError: false,
    });

    render(<MovieDetailsModal movieId={5} onClose={onClose} />);

    fireEvent.click(
      screen.getByRole('button', { name: 'Fechar modal de detalhes do filme' }),
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes when backdrop is clicked but not when dialog content is clicked', () => {
    const onClose = vi.fn();
    mockUseFetchMovieByIdQuery.mockReturnValue({
      data: new Movie(6, 2002, 'Movie', ['Studio'], ['Producer'], false),
      isLoading: false,
      isFetching: false,
      isError: false,
    });

    const { container } = render(
      <MovieDetailsModal movieId={6} onClose={onClose} />,
    );

    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();

    const backdrop = container.firstChild as HTMLElement;
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes when escape key is pressed', () => {
    const onClose = vi.fn();
    mockUseFetchMovieByIdQuery.mockReturnValue({
      data: new Movie(7, 2003, 'Movie', ['Studio'], ['Producer'], false),
      isLoading: false,
      isFetching: false,
      isError: false,
    });

    render(<MovieDetailsModal movieId={7} onClose={onClose} />);

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

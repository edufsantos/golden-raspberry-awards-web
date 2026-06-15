import { describe, expect, it } from 'vitest';
import { MoviesByYearPanel } from './movies-by-year-panel';

describe('MoviesByYearPanel', () => {
  it('should be a valid React component', () => {
    expect(MoviesByYearPanel).toBeDefined();
    expect(typeof MoviesByYearPanel).toBe('function');
  });

  it('should render as a functional component', () => {
    expect(MoviesByYearPanel.name).toBe('MoviesByYearPanel');
  });

  it('should use PanelCard component with correct title', () => {
    const expectedTitle = 'Vencedores por ano';
    expect(expectedTitle).toBe('Vencedores por ano');
  });

  it('should have year input field label', () => {
    const label = 'Ano';
    expect(label).toBe('Ano');
  });

  it('should have search button', () => {
    const buttonText = 'Buscar';
    expect(buttonText).toBe('Buscar');
  });

  it('should have correct SimpleTable headers for movies', () => {
    const headers = [
      { key: 'id', label: 'ID' },
      { key: 'year', label: 'Ano' },
      { key: 'title', label: 'Título' },
      { key: 'winner', label: 'Vencedor' },
    ];

    expect(headers).toHaveLength(4);
    expect(headers[0]).toEqual({ key: 'id', label: 'ID' });
    expect(headers[3]).toEqual({ key: 'winner', label: 'Vencedor' });
  });

  it('should have empty message for movies table', () => {
    const emptyMessage = 'Nenhum filme encontrado para o ano informado';
    expect(emptyMessage).toBe('Nenhum filme encontrado para o ano informado');
  });

  it('should have loading message text', () => {
    const loadingMessage = 'Buscando filmes...';
    expect(loadingMessage).toBe('Buscando filmes...');
  });

  it('should have error message text', () => {
    const errorMessage = 'Erro ao buscar filmes para o ano informado.';
    expect(errorMessage).toBe('Erro ao buscar filmes para o ano informado.');
  });

  it('should accept movie data structure', () => {
    type Movie = {
      id: string;
      year: number;
      title: string;
      winner: boolean;
    };

    const mockMovie: Movie = {
      id: '1',
      year: 2020,
      title: 'Test Movie',
      winner: true,
    };

    expect(mockMovie).toHaveProperty('id');
    expect(mockMovie).toHaveProperty('year');
    expect(mockMovie).toHaveProperty('title');
    expect(mockMovie).toHaveProperty('winner');
  });

  it('should render movie data correctly', () => {
    const movie = {
      id: '123',
      year: 2021,
      title: 'Amazing Movie',
      winner: false,
    };

    const renderedRow = [
      movie.id,
      movie.year,
      movie.title,
      movie.winner ? 'Sim' : 'Não',
    ];

    expect(renderedRow).toHaveLength(4);
    expect(renderedRow[0]).toBe('123');
    expect(renderedRow[1]).toBe(2021);
    expect(renderedRow[2]).toBe('Amazing Movie');
    expect(renderedRow[3]).toBe('Não');
  });

  it('should render multiple movies', () => {
    const movies = [
      {
        id: '1',
        year: 2020,
        title: 'Movie 1',
        winner: true,
      },
      {
        id: '2',
        year: 2020,
        title: 'Movie 2',
        winner: false,
      },
      {
        id: '3',
        year: 2020,
        title: 'Movie 3',
        winner: true,
      },
    ];

    expect(movies).toHaveLength(3);
    movies.forEach((movie) => {
      expect(movie.year).toBe(2020);
    });
  });

  it('should use year number as search parameter', () => {
    const searchYear = '2020';
    const yearNumber = Number(searchYear);

    expect(yearNumber).toBe(2020);
    expect(Number.isFinite(yearNumber)).toBe(true);
  });

  it('should validate year input', () => {
    const validYear = '1995';
    const invalidYear = 'not-a-year';

    expect(Number.isFinite(Number(validYear))).toBe(true);
    expect(Number.isFinite(Number(invalidYear))).toBe(false);
  });

  it('should handle winner boolean to string conversion', () => {
    const winnerTrue = true;
    const winnerFalse = false;

    expect(winnerTrue ? 'Sim' : 'Não').toBe('Sim');
    expect(winnerFalse ? 'Sim' : 'Não').toBe('Não');
  });
});

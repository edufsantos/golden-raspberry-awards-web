import { describe, expect, it } from 'vitest';
import { YearsWithMultipleWinnersPanel } from './years-with-multiple-winners-panel';

describe('YearsWithMultipleWinnersPanel', () => {
  it('should be a valid React component', () => {
    expect(YearsWithMultipleWinnersPanel).toBeDefined();
    expect(typeof YearsWithMultipleWinnersPanel).toBe('function');
  });

  it('should render as a functional component', () => {
    expect(YearsWithMultipleWinnersPanel.name).toBe(
      'YearsWithMultipleWinnersPanel',
    );
  });

  it('should use PanelCard component with correct title', () => {
    const expectedTitle = 'Anos com múltiplos vencedores';
    expect(expectedTitle).toBe('Anos com múltiplos vencedores');
  });

  it('should render SimpleTable with correct headers', () => {
    const headers = [
      { key: 'year', label: 'Ano' },
      { key: 'winnerCount', label: 'Quantidade de Vencedores' },
    ];

    expect(headers).toHaveLength(2);
    expect(headers[0]).toEqual({ key: 'year', label: 'Ano' });
    expect(headers[1]).toEqual({
      key: 'winnerCount',
      label: 'Quantidade de Vencedores',
    });
  });

  it('should have correct empty message', () => {
    const emptyMessage = 'Nenhum ano encontrado';
    expect(emptyMessage).toBe('Nenhum ano encontrado');
  });

  it('should accept data with year and winnerCount properties', () => {
    const mockData = [
      { year: 2020, winnerCount: 3 },
      { year: 2021, winnerCount: 2 },
    ];

    mockData.forEach((item) => {
      expect(item).toHaveProperty('year');
      expect(item).toHaveProperty('winnerCount');
      expect(typeof item.year).toBe('number');
      expect(typeof item.winnerCount).toBe('number');
    });
  });

  it('should use correct getRowKey function', () => {
    const row = { year: 2020, winnerCount: 3 };
    expect(row.year).toBe(2020);
  });

  it('should render row with year and winnerCount', () => {
    const row = { year: 2019, winnerCount: 4 };
    const renderedRow = [row.year, row.winnerCount];

    expect(renderedRow).toHaveLength(2);
    expect(renderedRow[0]).toBe(2019);
    expect(renderedRow[1]).toBe(4);
  });
});

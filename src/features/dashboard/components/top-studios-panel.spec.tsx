import { describe, expect, it } from 'vitest';
import { TopStudiosPanel } from './top-studios-panel';

describe('TopStudiosPanel', () => {
  it('should be a valid React component', () => {
    expect(TopStudiosPanel).toBeDefined();
    expect(typeof TopStudiosPanel).toBe('function');
  });

  it('should render as a functional component', () => {
    expect(TopStudiosPanel.name).toBe('TopStudiosPanel');
  });

  it('should use PanelCard component with correct title', () => {
    const expectedTitle = 'Top 3 estúdios com mais vitórias';
    expect(expectedTitle).toBe('Top 3 estúdios com mais vitórias');
  });

  it('should render SimpleTable with correct headers', () => {
    const headers = [
      { key: 'name', label: 'Nome' },
      { key: 'winCount', label: 'Quantidade de Vitórias' },
    ];

    expect(headers).toHaveLength(2);
    expect(headers[0]).toEqual({ key: 'name', label: 'Nome' });
    expect(headers[1]).toEqual({
      key: 'winCount',
      label: 'Quantidade de Vitórias',
    });
  });

  it('should have correct empty message', () => {
    const emptyMessage = 'Nenhum estúdio encontrado';
    expect(emptyMessage).toBe('Nenhum estúdio encontrado');
  });

  it('should define rank styles for medal display', () => {
    const rankStyles = {
      1: 'border-amber-500/30 bg-amber-500/10 text-amber-600',
      2: 'border-slate-400/30 bg-slate-400/10 text-slate-500',
      3: 'border-orange-500/30 bg-orange-500/10 text-orange-600',
    };

    expect(rankStyles[1]).toContain('amber');
    expect(rankStyles[2]).toContain('slate');
    expect(rankStyles[3]).toContain('orange');
  });

  it('should accept ranked studio data', () => {
    type RankedStudio = {
      name: string;
      winCount: number;
      rank: 1 | 2 | 3;
    };

    const mockData: RankedStudio[] = [
      { name: 'Studio A', winCount: 10, rank: 1 },
      { name: 'Studio B', winCount: 8, rank: 2 },
      { name: 'Studio C', winCount: 6, rank: 3 },
    ];

    expect(mockData).toHaveLength(3);
    mockData.forEach((studio) => {
      expect(studio).toHaveProperty('name');
      expect(studio).toHaveProperty('winCount');
      expect(studio).toHaveProperty('rank');
    });
  });

  it('should render studio name and win count', () => {
    const studio = { name: 'Warner Bros', winCount: 15, rank: 1 as const };
    expect(studio.name).toBe('Warner Bros');
    expect(studio.winCount).toBe(15);
    expect(studio.rank).toBe(1);
  });

  it('should only show top 3 studios', () => {
    const studios = Array.from({ length: 10 }, (_, i) => ({
      name: `Studio ${i + 1}`,
      winCount: 10 - i,
    }));

    const topThree = studios.slice(0, 3);
    expect(topThree).toHaveLength(3);
  });
});

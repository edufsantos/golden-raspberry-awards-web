// @vitest-environment happy-dom
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TopStudiosPanel } from './top-studios-panel';

const { useStudioWinnersRankedHandlerMock } = vi.hoisted(() => ({
  useStudioWinnersRankedHandlerMock: vi.fn(),
}));

vi.mock('../hooks/use-studio-winners-ranked.handler', () => ({
  useStudioWinnersRankedHandler: useStudioWinnersRankedHandlerMock,
}));

describe('TopStudiosPanel', () => {
  it('renders ranked studios and win counts', () => {
    useStudioWinnersRankedHandlerMock.mockReturnValue({
      rankedStudioWinners: [
        { name: 'Studio A', winCount: 10, rank: 1 },
        { name: 'Studio B', winCount: 8, rank: 2 },
        { name: 'Studio C', winCount: 6, rank: 3 },
      ],
    });

    render(<TopStudiosPanel />);

    expect(
      screen.getByText('Top 3 estúdios com mais vitórias'),
    ).toBeInTheDocument();
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Quantidade de Vitórias')).toBeInTheDocument();
    expect(screen.getByText('Studio A')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders empty message when there are no studios', () => {
    useStudioWinnersRankedHandlerMock.mockReturnValue({
      rankedStudioWinners: [],
    });

    render(<TopStudiosPanel />);

    expect(screen.getByText('Nenhum estúdio encontrado')).toBeInTheDocument();
  });

  it('renders one medal icon per ranked row', () => {
    useStudioWinnersRankedHandlerMock.mockReturnValue({
      rankedStudioWinners: [
        { name: 'Studio A', winCount: 10, rank: 1 },
        { name: 'Studio B', winCount: 8, rank: 2 },
        { name: 'Studio C', winCount: 6, rank: 3 },
      ],
    });

    const { container } = render(<TopStudiosPanel />);
    const icons = container.querySelectorAll('svg');

    expect(icons.length).toBe(3);
  });
});

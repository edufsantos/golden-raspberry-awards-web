// @vitest-environment happy-dom
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ProducersIntervalsPanel } from './producers-intervals-panel';

const { useProducerWinIntervalsMock } = vi.hoisted(() => ({
  useProducerWinIntervalsMock: vi.fn(),
}));

vi.mock('../hooks/use-producer-win-intervals.query', () => ({
  useProducerWinIntervals: useProducerWinIntervalsMock,
}));

describe('ProducersIntervalsPanel', () => {
  it('renders min and max sections with rows', () => {
    useProducerWinIntervalsMock.mockReturnValue({
      data: {
        min: [
          {
            producer: 'Produtor Min',
            interval: 1,
            previousWin: 2000,
            followingWin: 2001,
          },
        ],
        max: [
          {
            producer: 'Produtor Max',
            interval: 10,
            previousWin: 1990,
            followingWin: 2000,
          },
        ],
      },
      isLoading: false,
      isError: false,
    });

    render(<ProducersIntervalsPanel />);

    expect(
      screen.getByText(
        'Producers with longest and shortest intervals between wins',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Minimum')).toBeInTheDocument();
    expect(screen.getByText('Maximum')).toBeInTheDocument();
    expect(screen.getByText('Produtor Min')).toBeInTheDocument();
    expect(screen.getByText('Produtor Max')).toBeInTheDocument();
  });

  it('renders empty state for both tables when data is null', () => {
    useProducerWinIntervalsMock.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    render(<ProducersIntervalsPanel />);

    const empties = screen.getAllByText('No data');
    expect(empties).toHaveLength(2);
  });
});

// @vitest-environment happy-dom
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { YearsWithMultipleWinnersPanel } from './years-with-multiple-winners-panel';

const { useYearsWithMultipleWinnersMock } = vi.hoisted(() => ({
  useYearsWithMultipleWinnersMock: vi.fn(),
}));

vi.mock('../hooks/use-years-with-multiple-winners.query', () => ({
  useYearsWithMultipleWinners: useYearsWithMultipleWinnersMock,
}));

afterEach(() => {
  cleanup();
});

describe('YearsWithMultipleWinnersPanel', () => {
  it('renders table with years data', () => {
    useYearsWithMultipleWinnersMock.mockReturnValue({
      data: [
        { year: 1980, winnerCount: 2 },
        { year: 1990, winnerCount: 3 },
      ],
      isLoading: false,
      isError: false,
    });

    render(<YearsWithMultipleWinnersPanel />);

    expect(
      screen.getByText('List years with multiple winners'),
    ).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Win Count')).toBeInTheDocument();
    expect(screen.getByText('1980')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders empty message when hook returns null data', () => {
    useYearsWithMultipleWinnersMock.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });

    render(<YearsWithMultipleWinnersPanel />);

    expect(screen.getByText('No years found')).toBeInTheDocument();
  });
});

// @vitest-environment happy-dom
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { StudioWinners } from '../models/fetch-studio-winners';
import { useStudioWinnersRankedHandler } from './use-studio-winners-ranked.handler';

const mockUseStudioWinners = vi.hoisted(() => vi.fn());

vi.mock('./use-studio-winers.query', () => ({
  useStudioWinners: () => mockUseStudioWinners(),
}));

describe('useStudioWinnersRankedHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns top 3 winners with rank', () => {
    mockUseStudioWinners.mockReturnValue({
      data: [
        new StudioWinners('Studio A', 10),
        new StudioWinners('Studio B', 8),
        new StudioWinners('Studio C', 7),
        new StudioWinners('Studio D', 6),
      ],
    });

    const { result } = renderHook(() => useStudioWinnersRankedHandler());

    expect(result.current.rankedStudioWinners).toEqual([
      { name: 'Studio A', winCount: 10, rank: 1 },
      { name: 'Studio B', winCount: 8, rank: 2 },
      { name: 'Studio C', winCount: 7, rank: 3 },
    ]);
  });

  it('returns empty array when service data is null', () => {
    mockUseStudioWinners.mockReturnValue({ data: null });

    const { result } = renderHook(() => useStudioWinnersRankedHandler());

    expect(result.current.rankedStudioWinners).toEqual([]);
  });

  it('keeps rank sequence when there are fewer than 3 items', () => {
    mockUseStudioWinners.mockReturnValue({
      data: [new StudioWinners('Studio X', 2), new StudioWinners('Studio Y', 1)],
    });

    const { result } = renderHook(() => useStudioWinnersRankedHandler());

    expect(result.current.rankedStudioWinners).toEqual([
      { name: 'Studio X', winCount: 2, rank: 1 },
      { name: 'Studio Y', winCount: 1, rank: 2 },
    ]);
  });
});

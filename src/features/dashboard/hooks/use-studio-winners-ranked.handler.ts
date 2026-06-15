import type { StudioWinCount } from '../models/fetch-studio-winners';
import { useStudioWinners } from './use-studio-winers.query';

export type RankedStudioWinCount = StudioWinCount & {
  rank: 1 | 2 | 3;
};

export const useStudioWinnersRankedHandler = () => {
  const { data: studioWinners } = useStudioWinners();

  const rankedStudioWinners: RankedStudioWinCount[] = (studioWinners ?? [])
    .slice(0, 3)
    .map((studio, index) => ({
      ...studio,
      rank: (index + 1) as RankedStudioWinCount['rank'],
    }));

  return {
    rankedStudioWinners,
  };
};

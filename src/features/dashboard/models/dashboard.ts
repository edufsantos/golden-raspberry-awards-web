export type YearWinnerCount = {
  year: number;
  winnerCount: number;
};

export type YearsWithMultipleWinnersResponse = {
  years: YearWinnerCount[];
};

export type StudioWinCount = {
  name: string;
  winCount: number;
};

export type StudiosWithWinCountResponse = {
  studios: StudioWinCount[];
};

export type ProducerAwardInterval = {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
};

export type ProducerAwardsIntervalResponse = {
  min: ProducerAwardInterval[];
  max: ProducerAwardInterval[];
};

export type Movie = {
  id: number;
  year: number;
  title: string;
  winner: boolean;
};

export type DashboardSummary = {
  yearsWithMultipleWinners: YearWinnerCount[];
  topStudios: StudioWinCount[];
  producerIntervals: ProducerAwardsIntervalResponse;
};

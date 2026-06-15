export type ProducerAwardInterval = {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
};

export type ProducerWinIntervalsApiResponse = {
  min: ProducerAwardInterval[];
  max: ProducerAwardInterval[];
};

export class ProducerWinIntervals {
  min: ProducerAwardInterval[];
  max: ProducerAwardInterval[];

  constructor(min: ProducerAwardInterval[], max: ProducerAwardInterval[]) {
    this.min = min;
    this.max = max;
  }

  static fromApiResponse(responseData: ProducerWinIntervalsApiResponse) {
    return new ProducerWinIntervals(responseData.min, responseData.max);
  }
}

export type YearsWithMultipleWinnersApiResponse = {
  years: {
    year: number;
    winnerCount: number;
  }[];
};

export class MultipleWinnersYear {
  year: number;
  winnerCount: number;

  constructor(year: number, winnerCount: number) {
    this.year = year;
    this.winnerCount = winnerCount;
  }

  static fromApiResponse(responseData: YearsWithMultipleWinnersApiResponse) {
    return responseData.years.map(
      (yearData) =>
        new MultipleWinnersYear(yearData.year, yearData.winnerCount),
    );
  }
}

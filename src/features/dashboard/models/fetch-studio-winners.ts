export type StudioWinCount = {
  name: string;
  winCount: number;
};

export type StudiosWithWinCountApiResponse = {
  studios: StudioWinCount[];
};

export class StudioWinners {
  name: string;
  winCount: number;

  constructor(name: string, winCount: number) {
    this.name = name;
    this.winCount = winCount;
  }

  static fromApiResponse(responseData: StudiosWithWinCountApiResponse) {
    return responseData.studios.map(
      (studio) => new StudioWinners(studio.name, studio.winCount),
    );
  }
}

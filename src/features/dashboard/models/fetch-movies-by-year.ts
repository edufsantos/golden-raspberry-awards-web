export type Movie = {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
};

// Esta recebendo outra tipagem, mas se a assinatura da api mudar, basta alterar a tipagem do MovieByYearApiResponse e adaptar a função fromApiResponse para mapear os dados corretamente. Assim, o modelo MovieByYear fica desacoplado da estrutura exata da resposta da API, facilitando futuras mudanças.
export type MovieByYearApiResponse = Movie[];

export class MovieByYear {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;

  constructor(
    id: number,
    year: number,
    title: string,
    studios: string[],
    producers: string[],
    winner: boolean,
  ) {
    this.id = id;
    this.year = year;
    this.title = title;
    this.studios = studios;
    this.producers = producers;
    this.winner = winner;
  }

  static fromApiResponse(responseData: MovieByYearApiResponse) {
    return responseData.map(
      (movie) =>
        new MovieByYear(
          movie.id,
          movie.year,
          movie.title,
          movie.studios,
          movie.producers,
          movie.winner,
        ),
    );
  }
}
